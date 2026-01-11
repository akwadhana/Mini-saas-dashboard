"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Home,
  User,
  Settings,
  ChevronLeft,
  ChevronRight,
  Menu,
  LogOut,
} from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";

type NavItem = {
  name: string;
  href: string;
  icon: React.ReactNode;
};

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const logout = useAuthStore((state) => state.logout);

  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems: NavItem[] = [
    { name: "Dashboard", href: "/dashboard", icon: <Home size={20} /> },
    { name: "Profile", href: "/profile", icon: <User size={20} /> },
    { name: "Settings", href: "/settings", icon: <Settings size={20} /> },
  ];

  const sidebarContent = (
    <div
      className={`flex flex-col bg-gray-100 dark:bg-gray-900 h-full transition-all duration-300 ${
        collapsed ? "w-20" : "w-64"
      }`}
    >
    
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="flex items-center justify-between p-4 border-b border-gray-300 dark:border-gray-700"
      >
        {!collapsed && <span className="font-bold">Menu</span>}
        {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
      </button>

  
      <nav className="flex-1 mt-4">
        {navItems.map((item) => {
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-2 m-1 rounded transition-colors relative ${
                isActive
                  ? "bg-indigo-600 text-white"
                  : "text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-800"
              }`}
            >
              {item.icon}
              {!collapsed && <span>{item.name}</span>}
            </Link>
          );
        })}
      </nav>

      <button
        onClick={() => {
          logout();
          router.push("/login");
        }}
        className="flex items-center gap-3 px-4 py-3 m-2 rounded-lg text-red-600 hover:bg-red-50 dark:hover:bg-red-900 transition-colors"
      >
        <LogOut size={18} />
        {!collapsed && <span>Logout</span>}
      </button>
    </div>
  );

  return (
    <>
   
      <div className="hidden md:flex">{sidebarContent}</div>

    
      <button
        className="md:hidden p-4 fixed top-2 left-2 z-50 bg-gray-200 dark:bg-gray-700 rounded"
        onClick={() => setMobileOpen(true)}
      >
        <Menu size={24} />
      </button>

      
      {mobileOpen && (
        <div className="fixed inset-0 z-40 flex md:hidden">
          <div
            className="fixed inset-0 bg-black opacity-50"
            onClick={() => setMobileOpen(false)}
          />

          <div className="relative w-64 bg-gray-100 dark:bg-gray-900 flex flex-col">
            <button
              className="p-4 border-b border-gray-300 dark:border-gray-700"
              onClick={() => setMobileOpen(false)}
            >
              Close
            </button>

            <nav className="mt-4 flex-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-3 px-4 py-2 m-1 rounded transition-colors ${
                    pathname === item.href
                      ? "bg-indigo-600 text-white"
                      : "text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-800"
                  }`}
                >
                  {item.icon}
                  <span>{item.name}</span>
                </Link>
              ))}
            </nav>

          
            <button
              onClick={() => {
                logout();
                router.push("/login");
              }}
              className="flex items-center gap-3 px-4 py-3 m-2 rounded-lg text-red-600 hover:bg-red-50 dark:hover:bg-red-900 transition-colors"
            >
              <LogOut size={18} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
