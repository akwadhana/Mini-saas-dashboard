"use client";

import "./globals.css";
import Sidebar from "@/components/Sidebar";
import { useAuthStore } from "@/store/useAuthStore";
import { useThemeStore } from "@/store/useThemeStore";
import { useEffect } from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // --- hooks first
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const hydrated = useAuthStore((s) => s.hydrated);

  const theme = useThemeStore((s) => s.theme);
  const setTheme = useThemeStore((s) => s.setTheme);

  // --- side effects
  useEffect(() => {
    // apply dark mode class
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  useEffect(() => {
    // load saved theme from localStorage on mount
    const savedTheme = localStorage.getItem("theme") as "light" | "dark";
    if (savedTheme) setTheme(savedTheme);
    else setTheme("light");
  }, [setTheme]);

  // conditional render after hooks
  if (!hydrated) {
    return (
      <html lang="en">
        <body className="flex items-center justify-center h-screen">
          <p className="text-gray-500">Loading...</p>
        </body>
      </html>
    );
  }

  return (
    <html lang="en">
      <body className="flex min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
        {isAuthenticated && <Sidebar />}
        <main className="flex-1 p-6">{children}</main>
      </body>
    </html>
  );
}
