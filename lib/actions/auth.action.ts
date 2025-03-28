"use server";

import { auth, db } from "@/firebase/admin";
import { cookies } from "next/headers";
import { DecodedIdToken } from "firebase-admin/auth";

// Session duration (1 week)
const SESSION_DURATION = 60 * 60 * 24 * 7;

// Set session cookie
export async function setSessionCookie(idToken: string) {
  try {
    const cookieStore = await cookies();

    // Create session cookie
    const sessionCookie = await auth.createSessionCookie(idToken, {
      expiresIn: SESSION_DURATION * 1000, // milliseconds
    });

    if (!sessionCookie) {
      console.error("Failed to create session cookie");
      return null;
    }

    // Set cookie in the browser
    cookieStore.set("session", sessionCookie, {
      maxAge: SESSION_DURATION,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      sameSite: "lax",
    });

    return sessionCookie;
  } catch (error) {
    console.error("Error setting session cookie:", error);
    return null;
  }
}

// Ensure user document exists in Firestore
async function ensureUserDocument(uid: string, email: string, name?: string) {
  try {
    const userRef = db.collection("users").doc(uid);
    const userDoc = await userRef.get();

    if (!userDoc.exists) {
      // Create new user document
      const userData = {
        email,
        name: name || email.split('@')[0], // Use part of email as name if not provided
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      await userRef.set(userData);
      console.log("Created new user document for:", uid);
      return { success: true, data: userData };
    }

    return { success: true, data: userDoc.data() };
  } catch (error) {
    console.error("Error ensuring user document:", error);
    return { success: false, error };
  }
}

export async function signUp(params: SignUpParams) {
  const { uid, name, email } = params;

  try {
    // Create or update user document in Firestore
    const { success, error, data } = await ensureUserDocument(uid, email, name);
    
    if (!success) {
      console.error("Failed to create user document:", error);
      return {
        success: false,
        message: "Failed to create account. Please try again.",
      };
    }

    return {
      success: true,
      message: "Account created successfully. Please sign in.",
      user: { ...data, id: uid },
    };
  } catch (error: any) {
    console.error("Error creating user:", error);

    if (error.code === "auth/email-already-exists") {
      return {
        success: false,
        message: "This email is already in use",
      };
    }

    return {
      success: false,
      message: "Failed to create account. Please try again.",
    };
  }
}

export async function signIn(params: SignInParams) {
  const { email, idToken } = params;

  try {
    // Verify the user exists in Auth
    const userRecord = await auth.getUserByEmail(email);
    if (!userRecord) {
      return {
        success: false,
        message: "User does not exist. Create an account.",
      };
    }

    // Ensure user document exists in Firestore
    const { success: docSuccess, data: userData } = await ensureUserDocument(userRecord.uid, email);
    if (!docSuccess) {
      return {
        success: false,
        message: "Failed to verify user data. Please try again.",
      };
    }

    // Set the session cookie
    const sessionCookie = await setSessionCookie(idToken);
    if (!sessionCookie) {
      return {
        success: false,
        message: "Failed to create session. Please try again.",
      };
    }

    return {
      success: true,
      message: "Signed in successfully.",
      user: {
        ...userData,
        id: userRecord.uid,
      },
    };
  } catch (error: any) {
    console.error("Sign in error:", error);
    return {
      success: false,
      message: "Failed to log into account. Please try again.",
    };
  }
}

// Sign out user by clearing the session cookie
export async function signOut() {
  try {
    const cookieStore = await cookies();
    cookieStore.delete("session");
    return { success: true };
  } catch (error) {
    console.error("Error signing out:", error);
    return { success: false };
  }
}

// Get current user from session cookie
export async function getCurrentUser(): Promise<User | null> {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get("session")?.value;

    if (!sessionCookie) {
      console.log("No session cookie found");
      return null;
    }

    try {
      // First verify the session cookie
      const decodedClaims = await auth.verifySessionCookie(sessionCookie, true);
      
      if (!decodedClaims || !decodedClaims.uid) {
        console.error("Invalid session cookie claims");
        return null;
      }

      // Get user info from Firestore
      const userDoc = await db.collection("users").doc(decodedClaims.uid).get();
      
      if (!userDoc.exists) {
        console.error("User document not found for uid:", decodedClaims.uid);
        // Try to ensure user document exists
        const userRecord = await auth.getUser(decodedClaims.uid);
        if (userRecord.email) {
          const { success, data } = await ensureUserDocument(decodedClaims.uid, userRecord.email);
          if (success && data) {
            return {
              ...data,
              id: decodedClaims.uid,
            } as User;
          }
        }
        return null;
      }

      const userData = userDoc.data();
      if (!userData) {
        console.error("User data is empty for uid:", decodedClaims.uid);
        return null;
      }

      return {
        ...userData,
        id: userDoc.id,
      } as User;

    } catch (verifyError) {
      console.error("Session verification failed:", verifyError);
      // Clear invalid session cookie
      cookieStore.delete("session");
      return null;
    }
  } catch (error) {
    console.error("Get current user error:", error);
    return null;
  }
}

// Check if user is authenticated
export async function isAuthenticated() {
  try {
    const user = await getCurrentUser();
    return !!user;
  } catch (error) {
    console.error("Error checking authentication:", error);
    return false;
  }
}

// Clear session cookie
export async function clearSession() {
  try {
    const cookieStore = cookies();
    cookieStore.delete("session");
    return { success: true };
  } catch (error) {
    console.error("Error clearing session:", error);
    return { success: false };
  }
}
