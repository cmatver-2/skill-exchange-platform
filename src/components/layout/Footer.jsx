import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="mt-20 bg-white border-t border-slate-200 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-8 border-b border-slate-100 text-xs text-slate-500">
          {/* Brand info */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm shadow-sm">
                🎓
              </div>
              <span className="font-extrabold text-slate-900 text-base">
                Skill<span className="text-indigo-600">Swap</span>
              </span>
            </div>
            <p className="text-slate-500 leading-relaxed max-w-sm">
              A peer-to-peer student skill exchange network. Learn programming, design, music, and soft skills directly from your campus peers.
            </p>
            <div className="flex items-center gap-2 text-[11px] font-semibold text-slate-400">
              <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-600">React 19</span>
              <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-600">Vite</span>
              <span className="px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700">Tailwind v4</span>
            </div>
          </div>

          {/* Quick links */}
          <div className="space-y-3">
            <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">
              Platform Navigation
            </h4>
            <div className="grid grid-cols-2 gap-2 font-medium">
              <Link to="/" className="hover:text-indigo-600 transition-colors">Home Overview</Link>
              <Link to="/search" className="hover:text-indigo-600 transition-colors">Explore Skills</Link>
              <Link to="/dashboard" className="hover:text-indigo-600 transition-colors">Dashboard</Link>
              <Link to="/requests" className="hover:text-indigo-600 transition-colors">Exchange Requests</Link>
              <Link to="/sessions" className="hover:text-indigo-600 transition-colors">Study Sessions</Link>
              <Link to="/reviews" className="hover:text-indigo-600 transition-colors">Peer Reviews</Link>
              <Link to="/admin" className="hover:text-indigo-600 transition-colors">Admin Console</Link>
            </div>
          </div>

          {/* Team credits */}
          <div className="space-y-3">
            <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">
              Web Programming Project
            </h4>
            <p className="text-slate-600 font-semibold">
              Built with ❤️ by Team of 7:
            </p>
            <ul className="space-y-1 text-slate-500">
              <li>• <strong className="text-slate-700">Chris</strong> — Routing & Architecture</li>
              <li>• <strong className="text-slate-700">Dane</strong> — Skill Search & Discovery</li>
              <li>• <strong className="text-slate-700">Derick</strong> — Requests & Sessions</li>
              <li>• <strong className="text-slate-700">Govind</strong> — Profile & Reviews</li>
              <li>• <strong className="text-slate-700">Daniel</strong> — Admin & Dashboard</li>
              <li>• <strong className="text-slate-700">Fahad</strong> — QA & Evaluation</li>
              <li>• <strong className="text-slate-700">Goutham</strong> — Documentation & Testing</li>
            </ul>
          </div>
        </div>

        {/* Copyright sub-row */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400 font-medium">
          <p>© 2026 SkillSwap Platform. Open source educational prototype.</p>
          <div className="flex items-center gap-3 text-slate-500">
            <span>Peer-to-Peer</span>
            <span>•</span>
            <span>100% Free Knowledge Sharing</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
