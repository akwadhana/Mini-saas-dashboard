"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import { useThemeStore } from "@/store/useThemeStore";

import { Users, DollarSign, Activity, ArrowUp, ArrowDown } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

type ApiUser = { id: number; firstName: string; lastName: string; email: string; age: number };
type Metric = {
  title: string;
  value: string | number;
  change: string;
  trend: "up" | "down";
  icon: React.ReactNode;
  color: string;
};

export default function DashboardPage() {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();
  const profile = useAuthStore((state) => state.user); // reactive
  const { theme } = useThemeStore();

  const [apiUsers, setApiUsers] = useState<ApiUser[]>([]);
  const [apiLoading, setApiLoading] = useState(true);
  const [activeChart, setActiveChart] = useState<"line" | "bar">("line");

  // Redirect unauthenticated users
  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  // Fetch API users
  useEffect(() => {
    fetch("https://dummyjson.com/users?limit=5")
      .then((res) => res.json())
      .then((data) => setApiUsers(data.users || []))
      .catch(() => setApiUsers([]))
      .finally(() => setApiLoading(false));
  }, []);

  const isLoading = apiLoading || !profile;

  // Mock chart & metrics
  const chartData = [
    { month: "Jan", users: 1200, revenue: 85000 },
    { month: "Feb", users: 1350, revenue: 92000 },
    { month: "Mar", users: 1240, revenue: 81000 },
    { month: "Apr", users: 1430, revenue: 105000 },
    { month: "May", users: 1620, revenue: 128000 },
    { month: "Jun", users: 1720, revenue: 142000 },
  ];

  const monthlyUsers = apiUsers.length || 1720;
  const revenue = monthlyUsers * 85;
  const churnRate = 3.2;

  const metrics: Metric[] = [
    {
      title: "Total Users",
      value: monthlyUsers.toLocaleString(),
      change: "+12.5%",
      trend: "up",
      icon: <Users className="h-5 w-5" />,
      color: "bg-blue-500",
    },
    {
      title: "Monthly Revenue",
      value: `₦${revenue.toLocaleString()}`,
      change: "+8.3%",
      trend: "up",
      icon: <DollarSign className="h-5 w-5" />,
      color: "bg-green-500",
    },
    {
      title: "Churn Rate",
      value: `${churnRate}%`,
      change: "-0.8%",
      trend: "down",
      icon: <Activity className="h-5 w-5" />,
      color: "bg-purple-500",
    },
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 dark:border-blue-400 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-300">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-4 md:p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
     
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Welcome back{profile?.name ? `, ${profile.name}` : ""} 👋
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-1">
            Here's what's happening with your SaaS today.
          </p>
        </div>
     
      </div>

    
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {metrics.map((metric, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-2 rounded-lg ${metric.color} bg-opacity-10`}>
                <div className={metric.color.replace("bg-", "text-")}>{metric.icon}</div>
              </div>
              <div
                className={`flex items-center gap-1 text-sm ${
                  metric.trend === "up" 
                    ? "text-green-600 dark:text-green-400" 
                    : "text-red-600 dark:text-red-400"
                }`}
              >
                {metric.trend === "up" ? <ArrowUp size={16} /> : <ArrowDown size={16} />}
                {metric.change}
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{metric.value}</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">{metric.title}</p>
          </div>
        ))}
      </div>

      
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Growth Overview</h2>
            <p className="text-gray-600 dark:text-gray-400 text-sm">Last 6 months performance</p>
          </div>
          <div className="flex gap-2 mt-2 sm:mt-0">
            <button
              onClick={() => setActiveChart("line")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeChart === "line"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
              }`}
            >
              Line Chart
            </button>
            <button
              onClick={() => setActiveChart("bar")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeChart === "bar"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
              }`}
            >
              Bar Chart
            </button>
          </div>
        </div>

        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            {activeChart === "line" ? (
              <LineChart data={chartData}>
                <CartesianGrid 
                  strokeDasharray="3 3" 
                  stroke={theme === 'dark' ? '#374151' : '#f0f0f0'} 
                />
                <XAxis 
                  dataKey="month" 
                  stroke={theme === 'dark' ? '#9ca3af' : '#666'} 
                />
                <YAxis 
                  stroke={theme === 'dark' ? '#9ca3af' : '#666'} 
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: theme === 'dark' ? '#1f2937' : '#ffffff',
                    borderColor: theme === 'dark' ? '#374151' : '#e5e7eb',
                    color: theme === 'dark' ? '#f9fafb' : '#111827',
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="users" 
                  stroke="#3b82f6" 
                  strokeWidth={2} 
                  dot={{ r: 4 }} 
                />
                <Line 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#10b981" 
                  strokeWidth={2} 
                  dot={{ r: 4 }} 
                />
              </LineChart>
            ) : (
              <BarChart data={chartData}>
                <CartesianGrid 
                  strokeDasharray="3 3" 
                  stroke={theme === 'dark' ? '#374151' : '#f0f0f0'} 
                />
                <XAxis 
                  dataKey="month" 
                  stroke={theme === 'dark' ? '#9ca3af' : '#666'} 
                />
                <YAxis 
                  stroke={theme === 'dark' ? '#9ca3af' : '#666'} 
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: theme === 'dark' ? '#1f2937' : '#ffffff',
                    borderColor: theme === 'dark' ? '#374151' : '#e5e7eb',
                    color: theme === 'dark' ? '#f9fafb' : '#111827',
                  }}
                />
                <Bar dataKey="users" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                <Bar dataKey="revenue" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            )}
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
     
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Recent Users (API Data)</h3>
          <div className="space-y-3">
            {apiUsers.length > 0 ? (
              apiUsers.slice(0, 5).map((user) => (
                <div
                  key={user.id}
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {user.firstName} {user.lastName}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{user.email}</p>
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">Age: {user.age}</div>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <Users className="h-12 w-12 text-gray-300 dark:text-gray-600 mx-auto mb-2" />
                <p className="text-gray-500 dark:text-gray-400">No user data available</p>
              </div>
            )}
          </div>
        </div>

     
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Your Profile</h3>
          {profile ? (
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                  <span className="text-white font-bold text-lg">
                    {profile.name.split(" ").map((n) => n[0]).join("")}
                  </span>
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">{profile.name}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{profile.role || "Member"}</p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-700">
                  <span className="text-gray-600 dark:text-gray-400">Email</span>
                  <span className="font-medium text-gray-900 dark:text-white">{profile.email}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-700">
                  <span className="text-gray-600 dark:text-gray-400">Account Type</span>
                  <span className="font-medium text-blue-600 dark:text-blue-400">Pro</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-gray-600 dark:text-gray-400">Last Updated</span>
                  <span className="font-medium text-gray-900 dark:text-white">Today</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500 dark:text-gray-400 mb-4">No profile data found</p>
              <a
                href="/settings"
                className="inline-block px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                Set up profile
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}