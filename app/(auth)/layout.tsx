import { ReactNode } from "react";
import { redirect } from "next/navigation";

import { isAuthenticated, clearSession } from "@/lib/actions/auth.action";

const AuthLayout = async ({ children }: { children: ReactNode }) => {
  try {
    const isUserAuthenticated = await isAuthenticated();
    
    if (isUserAuthenticated) {
      redirect("/");
    }
  } catch (error) {
    // If there's an error checking authentication, clear the session using server action
    await clearSession();
    console.error("Auth layout error:", error);
  }

  return <div className="auth-layout">{children}</div>;
};

export default AuthLayout;

export const dynamic = 'force-dynamic';
