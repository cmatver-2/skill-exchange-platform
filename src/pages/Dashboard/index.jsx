import { Link } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";
import { users } from "../../data/users";
import { skills } from "../../data/skills";
import "../../styles/dashboard.css";

function Dashboard() {
  const { currentUser, requests, sessions, reviews, setSessions } = useAppContext();

  const userRequests = requests.filter(
    (request) =>
      request.fromUserId === currentUser.id ||
      request.toUserId === currentUser.id
  );

  const userSessions = sessions.filter(
    (session) =>
      session.teacherId === currentUser.id ||
      session.learnerId === currentUser.id
  );

  const upcomingSessions = userSessions.filter(
    (session) => session.status === "upcoming"
  );

  const completedSessions = userSessions.filter(
    (session) => session.status === "completed"
  );

  const getUser = (userId) => {
    return users.find((user) => user.id === userId);
  };

  const getUserName = (userId) => {
    const user = getUser(userId);
    return user ? user.name : "Unknown User";
  };

  const getSkillName = (skillId) => {
    const skill = skills.find((skill) => skill.id === skillId);
    return skill ? skill.name : "Unknown Skill";
  };

  const handleMarkCompleted = (sessionId) => {
    setSessions((prev) =>
      prev.map((s) => (s.id === sessionId ? { ...s, status: "completed" } : s))
    );
  };

  const userReviews = reviews.filter(
    (review) => review.revieweeId === currentUser.id
  );

  return (
    <div className="dashboard-page">
      
      {/* Welcome Banner */}
      <div className="dashboard-welcome-banner">
        <div className="welcome-content">
          <span className="welcome-eyebrow">STUDENT PORTAL</span>
          <h1>Welcome back, {currentUser.name} 👋</h1>
          <p>
            Track your ongoing learning exchanges, manage scheduled sessions, and explore new skills.
          </p>
        </div>

        <div className="welcome-actions">
          <Link
            className="btn btn-secondary welcome-btn-profile"
            to={`/profile/${currentUser.id}`}
          >
            👤 View Profile
          </Link>
          <Link className="btn btn-primary welcome-btn-search" to="/search">
            🔍 Find Skills
          </Link>
        </div>
      </div>

      {/* 4 Summary Metric Cards */}
      <div className="dashboard-metrics-grid">
        <div className="metric-box">
          <div className="metric-box-header">
            <span className="metric-label">ALL REQUESTS</span>
            <span className="metric-icon bg-amber">📩</span>
          </div>
          <p className="metric-value">{userRequests.length}</p>
          <p className="metric-subtext">
            {userRequests.filter((r) => r.status === "pending").length} awaiting action
          </p>
        </div>

        <div className="metric-box">
          <div className="metric-box-header">
            <span className="metric-label">UPCOMING SESSIONS</span>
            <span className="metric-icon bg-indigo">📅</span>
          </div>
          <p className="metric-value">{upcomingSessions.length}</p>
          <p className="metric-subtext">
            {upcomingSessions.length > 0 ? "Scheduled on calendar" : "None scheduled"}
          </p>
        </div>

        <div className="metric-box">
          <div className="metric-box-header">
            <span className="metric-label">COMPLETED SWAPS</span>
            <span className="metric-icon bg-emerald">✅</span>
          </div>
          <p className="metric-value">{completedSessions.length}</p>
          <p className="metric-subtext">Successful exchanges</p>
        </div>

        <div className="metric-box">
          <div className="metric-box-header">
            <span className="metric-label">PEER RATING</span>
            <span className="metric-icon bg-purple">⭐</span>
          </div>
          <p className="metric-value">
            {currentUser.rating ? `${currentUser.rating.toFixed(1)} ★` : "New"}
          </p>
          <p className="metric-subtext">{userReviews.length} reviews received</p>
        </div>
      </div>

      <div className="dashboard-main-grid">

        {/* Left Column: Upcoming & Completed Sessions */}
        <div className="dashboard-col-left">
          
          {/* Upcoming Sessions Section */}
          <section className="dashboard-panel card">
            <div className="panel-header">
              <div>
                <h2>Upcoming Sessions</h2>
                <p>Your upcoming one-on-one study rooms.</p>
              </div>
              <Link to="/sessions" className="panel-link">
                Manage All →
              </Link>
            </div>

            {upcomingSessions.length === 0 ? (
              <div className="panel-empty-state">
                <span>📅</span>
                <p>No upcoming sessions scheduled right now.</p>
                <Link to="/requests" className="btn btn-outline btn-sm">
                  Check Accepted Requests
                </Link>
              </div>
            ) : (
              <div className="session-cards-list">
                {upcomingSessions.map((session) => {
                  const isTeaching = session.teacherId === currentUser.id;
                  const otherUserId = isTeaching ? session.learnerId : session.teacherId;
                  const otherUser = getUser(otherUserId);

                  return (
                    <div className="session-item-card" key={session.id}>
                      <div className="session-item-header">
                        <div className="session-role-badge-row">
                          <span className={`badge ${isTeaching ? "badge-primary" : "badge-secondary"}`}>
                            {isTeaching ? "You are Teaching" : "You are Learning"}
                          </span>
                          <span className="badge badge-warning">Upcoming</span>
                        </div>
                        <h3>{getSkillName(session.skillId)}</h3>
                      </div>

                      <div className="session-participant-row">
                        <img
                          src={otherUser?.avatar || "https://i.pravatar.cc/150"}
                          alt={getUserName(otherUserId)}
                          className="participant-avatar"
                        />
                        <div>
                          <p className="participant-name">
                            With <strong>{getUserName(otherUserId)}</strong>
                          </p>
                          <p className="participant-time">
                            📅 {session.date} at {session.time} ({session.duration} mins)
                          </p>
                        </div>
                      </div>

                      <div className="session-action-row">
                        <a
                          className="btn btn-primary btn-sm join-btn"
                          href={session.location}
                          target="_blank"
                          rel="noreferrer"
                        >
                          📹 Join Google Meet
                        </a>
                        <button
                          type="button"
                          className="btn btn-secondary btn-sm"
                          onClick={() => handleMarkCompleted(session.id)}
                        >
                          ✓ Mark Done
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </section>

          {/* Completed Sessions Section */}
          <section className="dashboard-panel card">
            <div className="panel-header">
              <div>
                <h2>Completed Sessions</h2>
                <p>Past study exchanges ready for feedback.</p>
              </div>
              <Link to="/reviews" className="panel-link">
                All Reviews →
              </Link>
            </div>

            {completedSessions.length === 0 ? (
              <div className="panel-empty-state">
                <span>🎓</span>
                <p>No completed sessions yet.</p>
              </div>
            ) : (
              <div className="session-cards-list">
                {completedSessions.map((session) => {
                  const otherUserId =
                    session.teacherId === currentUser.id
                      ? session.learnerId
                      : session.teacherId;
                  const otherUser = getUser(otherUserId);

                  return (
                    <div className="session-item-card completed" key={session.id}>
                      <div className="session-participant-row">
                        <img
                          src={otherUser?.avatar || "https://i.pravatar.cc/150"}
                          alt={getUserName(otherUserId)}
                          className="participant-avatar"
                        />
                        <div>
                          <h3>{getSkillName(session.skillId)}</h3>
                          <p className="participant-name">
                            With <strong>{getUserName(otherUserId)}</strong> · {session.date}
                          </p>
                        </div>
                      </div>

                      <div className="session-action-row">
                        <Link className="btn btn-success btn-sm" to="/reviews">
                          ⭐ Leave Review
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </section>

        </div>

        {/* Right Column: Requests Overview */}
        <div className="dashboard-col-right">
          <section className="dashboard-panel card">
            <div className="panel-header">
              <div>
                <h2>My Requests</h2>
                <p>Incoming & outgoing proposals.</p>
              </div>
              <Link to="/requests" className="panel-link">
                View All →
              </Link>
            </div>

            {userRequests.length === 0 ? (
              <div className="panel-empty-state">
                <span>📩</span>
                <p>No requests found.</p>
                <Link to="/search" className="btn btn-primary btn-sm">
                  Find Someone to Request
                </Link>
              </div>
            ) : (
              <div className="requests-feed">
                {userRequests.map((request) => {
                  const isIncoming = request.toUserId === currentUser.id;
                  const otherUserId = isIncoming ? request.fromUserId : request.toUserId;
                  const otherUser = getUser(otherUserId);

                  const getStatusBadge = (status) => {
                    switch (status) {
                      case "accepted":
                        return "badge-success";
                      case "rejected":
                        return "badge-danger";
                      default:
                        return "badge-warning";
                    }
                  };

                  return (
                    <div className="request-feed-item" key={request.id}>
                      <div className="request-feed-top">
                        <div className="request-user-info">
                          <img
                            src={otherUser?.avatar || "https://i.pravatar.cc/150"}
                            alt=""
                            className="participant-avatar sm"
                          />
                          <div>
                            <span className="request-direction-label">
                              {isIncoming ? "Incoming from" : "Sent to"}
                            </span>
                            <strong className="request-user-name">
                              {getUserName(otherUserId)}
                            </strong>
                          </div>
                        </div>

                        <span className={`badge ${getStatusBadge(request.status)}`}>
                          {request.status}
                        </span>
                      </div>

                      <div className="request-skill-pill">
                        Topic: <strong>{getSkillName(request.skillId)}</strong>
                      </div>

                      <p className="request-feed-message">“{request.message}”</p>
                    </div>
                  );
                })}
              </div>
            )}
          </section>
        </div>

      </div>
    </div>
  );
}

export default Dashboard;