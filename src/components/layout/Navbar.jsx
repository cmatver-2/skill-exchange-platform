import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";
import "./Navbar.css";

function Navbar() {
  const { currentUser, switchUser, allUsers, requests } = useAppContext();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Pending requests for current user
  const pendingCount = requests.filter(
    (r) => r.toUserId === currentUser.id && r.status === "pending"
  ).length;

  const navItems = [
    { label: "Home", to: "/" },
    { label: "Find Skills", to: "/search" },
    { label: "Dashboard", to: "/dashboard" },
    { label: "Requests", to: "/requests", badge: pendingCount > 0 ? pendingCount : null },
    { label: "Sessions", to: "/sessions" },
    { label: "Reviews", to: "/reviews" },
    { label: "Admin", to: "/admin" },
  ];

  const handleUserChange = (e) => {
    switchUser(Number(e.target.value));
  };

  return (
    <header className="navbar-wrapper">
      <div className="navbar-container">
        
        {/* Brand */}
        <div className="navbar-brand">
          <Link to="/" className="brand-link">
            <span className="brand-icon">🎓</span>
            <span className="brand-text">
              Skill<span className="brand-accent">Swap</span>
            </span>
          </Link>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="navbar-links">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `nav-link ${isActive ? "active" : ""}`
              }
            >
              <span>{item.label}</span>
              {item.badge && <span className="nav-badge">{item.badge}</span>}
            </NavLink>
          ))}
        </nav>

        {/* User Switcher Pill & Profile */}
        <div className="navbar-actions">
          <div className="user-switcher-pill" title="Switch active simulated user">
            <Link to={`/profile/${currentUser.id}`} className="user-avatar-link">
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="user-avatar-img"
              />
            </Link>
            
            <div className="user-info-text">
              <Link to={`/profile/${currentUser.id}`} className="user-name-link">
                {currentUser.name}
              </Link>
              <span className="user-role-label">
                {currentUser.role === "admin" ? "Platform Admin" : "Active Student"}
              </span>
            </div>

            <div className="user-select-wrapper">
              <select
                aria-label="Switch logged-in user"
                value={currentUser.id}
                onChange={handleUserChange}
                className="user-select"
              >
                {allUsers.map((u) => (
                  <option key={u.id} value={u.id}>
                    {u.name} ({u.role})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Mobile Hamburger Toggle */}
          <button
            className="mobile-toggle"
            aria-label="Toggle navigation menu"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span className={`hamburger-bar ${mobileMenuOpen ? "open" : ""}`}></span>
            <span className={`hamburger-bar ${mobileMenuOpen ? "open" : ""}`}></span>
            <span className={`hamburger-bar ${mobileMenuOpen ? "open" : ""}`}></span>
          </button>
        </div>

      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="mobile-menu">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) =>
                `mobile-nav-link ${isActive ? "active" : ""}`
              }
            >
              <span>{item.label}</span>
              {item.badge && <span className="nav-badge">{item.badge}</span>}
            </NavLink>
          ))}

          <div className="mobile-user-row">
            <Link
              to={`/profile/${currentUser.id}`}
              onClick={() => setMobileMenuOpen(false)}
              className="mobile-profile-btn"
            >
              👤 View My Profile
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;