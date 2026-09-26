// src/components/layout/Navbar.jsx
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/search">Search</Link>
      <Link to="/dashboard">Dashboard</Link>
      <Link to="/requests">Requests</Link>
      <Link to="/sessions">Sessions</Link>
      <Link to="/admin">Admin</Link>
    </nav>
  );
}

export default Navbar;