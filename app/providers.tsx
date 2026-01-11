"use client";

import { ReactNode, useEffect, useState } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter, usePathname } from "next/navigation";

export default function Providers({ children }: { children: ReactNode }) {
  const { isAuthenticated } = useAuthStore();
  const [hydrated, setHydrated] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;

    const publicPaths = ["/login", "/signup"];
    if (!isAuthenticated && !publicPaths.includes(pathname)) {
      router.push("/login");
    }

    if (isAuthenticated && publicPaths.includes(pathname)) {
      router.push("/dashboard");
    }
  }, [isAuthenticated, hydrated, pathname, router]);

  if (!hydrated) return null; // Avoid SSR mismatch

  return <>{children}</>;
}
