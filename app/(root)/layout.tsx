import Link from "next/link";
import Image from "next/image";
import { ReactNode } from "react";
import { redirect } from "next/navigation";

import { isAuthenticated } from "@/lib/actions/auth.action";

const Layout = async ({ children }: { children: ReactNode }) => {
  try {
    const isUserAuthenticated = await isAuthenticated();
    
    if (!isUserAuthenticated) {
      // Clear any invalid session state by redirecting to sign-in
      redirect("/sign-in");
    }

    return (
      <div className="root-layout">
        <nav>
          <Link href="/" className="flex items-center gap-2">
            <Image src="/logo.svg" alt="MockMate Logo" width={38} height={32} />
            <h2 className="text-primary-100">PrepWise</h2>
          </Link>
        </nav>

        {children}
      </div>
    );
  } catch (error) {
    console.error("Error in root layout:", error);
    // If there's an error, redirect to sign-in as a fallback
    redirect("/sign-in");
  }
};

export default Layout;

export const dynamic = 'force-dynamic';
