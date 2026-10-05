import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer-wrapper">
      <div className="footer-container">
        
        {/* Brand & Mission Column */}
        <div className="footer-brand-col">
          <div className="footer-logo">
            <span className="footer-icon">🎓</span>
            <span className="footer-brand-text">Skill<span>Swap</span></span>
          </div>
          <p className="footer-tagline">
            A peer-to-peer student skill exchange network. Learn programming, design, music, and languages directly from your classmates.
          </p>
          <div className="footer-badges">
            <span className="footer-badge">React 19</span>
            <span className="footer-badge">Vite</span>
            <span className="footer-badge">Frontend Only</span>
          </div>
        </div>

        {/* Quick Links Column */}
        <div className="footer-nav-col">
          <h4 className="footer-heading">Platform</h4>
          <ul className="footer-links">
            <li><Link to="/">Home Overview</Link></li>
            <li><Link to="/search">Explore Skills</Link></li>
            <li><Link to="/dashboard">Student Dashboard</Link></li>
            <li><Link to="/requests">Exchange Requests</Link></li>
            <li><Link to="/sessions">Scheduled Sessions</Link></li>
            <li><Link to="/admin">Admin Console</Link></li>
          </ul>
        </div>

        {/* Team & Project Column */}
        <div className="footer-meta-col">
          <h4 className="footer-heading">Web Programming Project</h4>
          <p className="footer-team-intro">Built with ❤️ by Team 5:</p>
          <div className="footer-team-members">
            <span>• <strong>Chris</strong> (Routing & Integration)</span>
            <span>• <strong>Dane</strong> (Skill Search & Matching)</span>
            <span>• <strong>Derick</strong> (Requests & Sessions)</span>
            <span>• <strong>Govind</strong> (Profile & Reviews)</span>
            <span>• <strong>Daniel</strong> (Admin & Home Page)</span>
          </div>
        </div>

      </div>

      <div className="footer-bottom">
        <p>© 2026 SkillSwap Platform. Open source educational prototype.</p>
        <div className="footer-bottom-links">
          <span>Peer-to-Peer</span>
          <span>•</span>
          <span>Zero Cost Knowledge Sharing</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
