"use client";

import { Pencil, User, Mail, Briefcase, Phone } from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";
import { useThemeStore } from "@/store/useThemeStore";

export default function ProfilePage() {
  const { user } = useAuthStore(); // ✅ subscribe to global state
  const { theme } = useThemeStore();

  const handleEdit = () => {
    window.location.href = "/settings";
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            No profile found
          </p>
          <button
            onClick={() => (window.location.href = "/settings")}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors"
          >
            Create Profile
          </button>
        </div>
      </div>
    );
  }

  const fields = [
    { icon: <User className="h-5 w-5" />, label: "Name", value: user.name },
    { icon: <Mail className="h-5 w-5" />, label: "Email", value: user.email },
    {
      icon: <Briefcase className="h-5 w-5" />,
      label: "Role",
      value: user.role || "—",
    },
    {
      icon: <Phone className="h-5 w-5" />,
      label: "Phone",
      value: user.phone || "—",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4">
      <div className="max-w-md mx-auto">
     
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Profile Information
          </h1>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                  <span className="text-white font-bold text-2xl">
                    {user.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </span>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                    {user.name}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    {user.role || "Member"}
                  </p>
                </div>
              </div>
              <button
                onClick={handleEdit}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                <Pencil size={18} />
                Edit Profile
              </button>
            </div>
          </div>

          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {fields.map((field, index) => (
              <div
                key={index}
                className="p-6 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
              >
                <div className="flex items-center">
                  <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 mr-4">
                    {field.icon}
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                      {field.label}
                    </div>
                    <div className="text-lg font-semibold text-gray-900 dark:text-white">
                      {field.value}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="p-6 bg-gray-50 dark:bg-gray-900/50 border-t border-gray-200 dark:border-gray-700">
            <div className="flex justify-between items-center">
              <div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Account Status
                </div>
                <div className="font-medium text-green-600 dark:text-green-400">
                  Active
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Member Since
                </div>
                <div className="font-medium text-gray-900 dark:text-white">
                  Today
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Profile Completeness
            </div>
            <div className="text-xl font-bold text-gray-900 dark:text-white">
              85%
            </div>
            <div className="mt-2 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div className="h-full w-4/5 bg-blue-600"></div>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Last Updated
            </div>
            <div className="text-xl font-bold text-gray-900 dark:text-white">
              Just now
            </div>
            <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Everything's up to date
            </div>
          </div>
        </div>

        <div className="mt-6 flex gap-3">
          <button
            onClick={() => (window.location.href = "/dashboard")}
            className="flex-1 px-4 py-3 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-300 rounded-lg font-medium transition-colors border border-gray-300 dark:border-gray-600"
          >
            Back to Dashboard
          </button>
          <button
            onClick={() => (window.location.href = "/settings")}
            className="flex-1 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
          >
            Account Settings
          </button>
        </div>
      </div>
    </div>
  );
}
