// src/routes/AppRoutes.jsx
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import SkillSearch from "../pages/SkillSearch";
import Profile from "../pages/Profile";
import Dashboard from "../pages/Dashboard";
import Requests from "../pages/Requests";
import Sessions from "../pages/Sessions";
import Reviews from "../pages/Reviews";
import Admin from "../pages/Admin";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/search" element={<SkillSearch />} />
      <Route path="/profile/:userId" element={<Profile />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/requests" element={<Requests />} />
      <Route path="/sessions" element={<Sessions />} />
      <Route path="/reviews" element={<Reviews />} />
      <Route path="/admin" element={<Admin />} />
    </Routes>
  );
}

export default AppRoutes;