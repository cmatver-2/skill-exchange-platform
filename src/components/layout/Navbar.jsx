import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";

function Navbar() {
  const { currentUser, switchUser, allUsers, requests } = useAppContext();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const pendingCount = requests.filter(
    (r) => r.toUserId === currentUser?.id && r.status === "pending"
  ).length;

  const navItems = [
    { label: "Home", to: "/" },
    { label: "Search Skills", to: "/search" },
    { label: "Dashboard", to: "/dashboard" },
    { label: "Requests", to: "/requests", badge: pendingCount > 0 ? pendingCount : null },
    { label: "Sessions", to: "/sessions" },
    { label: "Profile", to: `/profile/${currentUser?.id || 1}` },
    { label: "Reviews", to: "/reviews" },
    { label: "Admin", to: "/admin" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-sm transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        
        {/* Brand Logo */}
        <div className="flex items-center gap-3">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 via-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-md shadow-indigo-200 font-bold text-lg">
              🎓
            </div>
            <div>
              <span className="text-xl font-extrabold tracking-tight text-slate-900">
                Skill<span className="text-indigo-600">Swap</span>
              </span>
              <span className="hidden sm:inline-block ml-2 text-xs font-semibold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
                Peer Exchange
              </span>
            </div>
          </Link>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-100/80 p-1 rounded-xl border border-slate-200 overflow-x-auto text-sm font-semibold">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                  isActive
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/20 font-bold"
                    : "text-slate-600 hover:text-slate-900 hover:bg-white/60"
                }`
              }
            >
              <span>{item.label}</span>
              {item.badge && (
                <span className="px-1.5 py-0.2 text-[10px] bg-amber-400 text-slate-950 rounded-full font-bold">
                  {item.badge}
                </span>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Active User Role Switcher */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200">
            <Link to={`/profile/${currentUser?.id}`}>
              <img
                src={currentUser?.avatar}
                alt={currentUser?.name}
                className="w-7 h-7 rounded-full object-cover border border-white shadow-sm"
              />
            </Link>
            <div className="text-left hidden lg:block">
              <Link to={`/profile/${currentUser?.id}`} className="text-xs font-bold text-slate-900 leading-tight block hover:text-indigo-600">
                {currentUser?.name}
              </Link>
              <p className="text-[10px] text-slate-500 font-medium">
                {currentUser?.role === "admin" ? "Platform Admin" : "Active Student"}
              </p>
            </div>
            <select
              aria-label="Switch active user"
              value={currentUser?.id}
              onChange={(e) => switchUser(Number(e.target.value))}
              className="text-xs bg-white font-medium border border-slate-300 rounded-lg px-2 py-1 text-slate-700 outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
            >
              {allUsers.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.role === "admin" ? "🛡️" : "👤"} {u.name.split(" ")[0]} ({u.role})
                </option>
              ))}
            </select>
          </div>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200"
            aria-label="Toggle menu"
          >
            ☰
          </button>
        </div>

      </div>

      {/* Mobile Sub-Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden flex flex-wrap items-center gap-1.5 px-4 py-3 bg-white border-t border-slate-200 text-xs font-semibold">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) =>
                `px-3 py-1.5 rounded-md transition-all ${
                  isActive
                    ? "bg-indigo-600 text-white font-bold"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`
              }
            >
              {item.label}
              {item.badge && <span className="ml-1 px-1 bg-amber-400 text-slate-900 rounded-full">{item.badge}</span>}
            </NavLink>
          ))}
        </div>
      )}
    </header>
  );
}

export default Navbar;