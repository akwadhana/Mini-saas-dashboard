// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // This enables class-based dark mode
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Add dark mode colors
        background: {
          light: '#ffffff',
          dark: '#0f172a',
        },
        foreground: {
          light: '#1f2937',
          dark: '#f8fafc',
        },
      },
    },
  },
  plugins: [],
}