// import LoginForm from './components/LoginForm'
// import InventoryAnimation from './components/animation';
// import './App.css';

// export default function App() {
//   return (
//     <div className="flex flex-col lg:flex-row min-h-screen">
//       {/* Login form always visible */}
//       <div className="flex flex-1 items-center justify-center">
//         <LoginForm />
//       </div>

//       {/* Animation only visible on desktop, centered */}
//       <div className="hidden lg:flex flex-1 items-center justify-center">
//         <InventoryAnimation />
//       </div>
//     </div>
//   )
// }

// src/App.js
// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Dashboard from "./pages/Dashboard";   // your dashboard file
// import LandingPage from "./pages/LandingPage"; // your login form

// export default function App() {


//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<LandingPage />} />
//         <Route path="/dashboard" element={<Dashboard />} />
//       </Routes>
//     </Router>
//   );
// }

import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/Dashboard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage/>,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
