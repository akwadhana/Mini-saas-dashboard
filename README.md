# Mini SaaS Dashboard

A simple mini SaaS dashboard built with **Next.js**, **React**, **Zustand**, and **Tailwind CSS**.  
The project demonstrates authentication, profile management, dashboard metrics, charts, and theme toggling.


Decisions & Trade-offs

State Management:
Used Zustand instead of Redux for simplicity, minimal boilerplate, and easier state sharing across pages.

Authentication:
Authentication is mocked using localStorage and Zustand persistence to simulate real-world login behavior without a backend.

Profile Updates:
Profile data is stored globally in Zustand so changes in Settings immediately reflect on the Dashboard and Profile pages.

Theme Handling:
Implemented light/dark mode using a global theme store and localStorage for persistence across refreshes.

Charts & Metrics:
Metrics and charts use mock + API data (DummyJSON) to demonstrate data visualization without overengineering.

Validation:
Client-side form validation was added to improve UX while keeping the implementation simple and readable.

https://mini-saas-dashboard-beta.vercel.app
