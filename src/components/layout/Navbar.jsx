import { NavLink } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const navItems = [
    { label: "Home", to: "/" },
    { label: "Search", to: "/search" },
    { label: "Dashboard", to: "/dashboard" },
    { label: "Requests", to: "/requests" },
    { label: "Sessions", to: "/sessions" },
    { label: "Admin", to: "/admin" },
  ];

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <NavLink to="/" className="brand-link">
          Skill<span>Swap</span>
        </NavLink>
      </div>

      <div className="navbar-links">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `nav-link ${isActive ? "active" : ""}`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}

export default Navbar;