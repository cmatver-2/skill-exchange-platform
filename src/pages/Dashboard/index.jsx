import { Link } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";
import { users } from "../../data/users";
import { skills } from "../../data/skills";
import "../../styles/dashboard.css";

function Dashboard() {
  const {
    currentUser,
    requests,
    sessions,
  } = useAppContext();

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

  const pendingRequests = userRequests.filter(
    (request) => request.status === "pending"
  );

  const acceptedRequests = userRequests.filter(
    (request) => request.status === "accepted"
  );

  const getUserName = (userId) => {
    const user = users.find((u) => u.id === userId);
    return user ? user.name : "Unknown User";
  };

  const getUserAvatar = (userId) => {
    const user = users.find((u) => u.id === userId);
    return user
      ? user.avatar
      : "https://i.pravatar.cc/150?img=10";
  };

  const getSkillName = (skillId) => {
    const skill = skills.find((s) => s.id === skillId);
    return skill ? skill.name : "Unknown Skill";
  };

  const formatDate = (date) => {
    return new Date(`${date}T00:00:00`).toLocaleDateString(
      "en-IN",
      {
        day: "numeric",
        month: "short",
        year: "numeric",
      }
    );
  };

  const getRequestPerson = (request) => {
    return request.fromUserId === currentUser.id
      ? request.toUserId
      : request.fromUserId;
  };

  const getRequestDirection = (request) => {
    return request.fromUserId === currentUser.id
      ? "You requested"
      : "Requested from you";
  };

  return (
    <div className="dashboard-page">

      {/* Welcome Banner */}
      <section className="dashboard-welcome-banner">

        <div className="welcome-content">

          <div className="welcome-eyebrow">
            SKILLSWAP DASHBOARD
          </div>

          <h1>
            Welcome back, {currentUser.name.split(" ")[0]}! 👋
          </h1>

          <p>
            Manage your learning journey, upcoming sessions,
            requests and skill exchanges all in one place.
          </p>

        </div>

        <div className="welcome-actions">

          <Link
            to={`/profile/${currentUser.id}`}
            className="welcome-btn-profile"
          >
            View Profile
          </Link>

          <Link
            to="/search"
            className="welcome-btn-search"
          >
            Find Skills
          </Link>

        </div>

      </section>

      {/* Metrics */}
      <section className="dashboard-metrics-grid">

        <div className="metric-box">

          <div className="metric-box-header">
            <span className="metric-label">
              Upcoming Sessions
            </span>

            <span className="metric-icon bg-indigo">
              📅
            </span>
          </div>

          <div className="metric-value">
            {upcomingSessions.length}
          </div>

          <div className="metric-subtext">
            Scheduled learning sessions
          </div>

        </div>

        <div className="metric-box">

          <div className="metric-box-header">
            <span className="metric-label">
              Pending Requests
            </span>

            <span className="metric-icon bg-amber">
              ⏳
            </span>
          </div>

          <div className="metric-value">
            {pendingRequests.length}
          </div>

          <div className="metric-subtext">
            Waiting for a response
          </div>

        </div>

        <div className="metric-box">

          <div className="metric-box-header">
            <span className="metric-label">
              Completed Sessions
            </span>

            <span className="metric-icon bg-emerald">
              ✓
            </span>
          </div>

          <div className="metric-value">
            {completedSessions.length}
          </div>

          <div className="metric-subtext">
            Sessions successfully completed
          </div>

        </div>

        <div className="metric-box">

          <div className="metric-box-header">
            <span className="metric-label">
              Accepted Requests
            </span>

            <span className="metric-icon bg-purple">
              🤝
            </span>
          </div>

          <div className="metric-value">
            {acceptedRequests.length}
          </div>

          <div className="metric-subtext">
            Active skill exchanges
          </div>

        </div>

      </section>

      {/* Main Dashboard */}
      <div className="dashboard-main-grid">

        {/* LEFT COLUMN */}
        <div className="dashboard-col-left">

          {/* Upcoming Sessions */}
          <section className="dashboard-panel">

            <div className="panel-header">

              <div>
                <h2>Upcoming Sessions</h2>
                <p>
                  Your next scheduled skill exchanges
                </p>
              </div>

              <Link
                to="/sessions"
                className="panel-link"
              >
                View all →
              </Link>

            </div>

            {upcomingSessions.length === 0 ? (
              <div className="panel-empty-state">
                <span>📅</span>
                <p>No upcoming sessions.</p>
                <Link
                  to="/search"
                  className="btn btn-primary btn-sm"
                >
                  Find a Skill
                </Link>
              </div>
            ) : (
              <div className="session-cards-list">

                {upcomingSessions.map((session) => {

                  const isTeacher =
                    session.teacherId === currentUser.id;

                  const participantId = isTeacher
                    ? session.learnerId
                    : session.teacherId;

                  return (
                    <div
                      className="session-item-card"
                      key={session.id}
                    >

                      <div className="session-role-badge-row">

                        <span
                          className={
                            isTeacher
                              ? "badge badge-primary"
                              : "badge badge-secondary"
                          }
                        >
                          {isTeacher
                            ? "Teaching"
                            : "Learning"}
                        </span>

                        <span className="session-participant-row">
                          {getSkillName(session.skillId)}
                        </span>

                      </div>

                      <div className="session-item-header">

                        <h3>
                          {getSkillName(session.skillId)}
                        </h3>

                      </div>

                      <div className="session-participant-row">

                        <img
                          className="participant-avatar"
                          src={getUserAvatar(participantId)}
                          alt={getUserName(participantId)}
                        />

                        <span className="participant-name">
                          {isTeacher
                            ? `Teaching ${getUserName(participantId)}`
                            : `Learning from ${getUserName(participantId)}`}
                        </span>

                      </div>

                      <div className="participant-time">
                        📅 {formatDate(session.date)}
                        &nbsp; • &nbsp;
                        🕐 {session.time}
                        &nbsp; • &nbsp;
                        {session.duration} min
                      </div>

                      <div className="session-action-row">

                        <a
                          href={session.location}
                          target="_blank"
                          rel="noreferrer"
                          className="btn btn-primary join-btn"
                        >
                          Join Session
                        </a>

                        <Link
                          to="/sessions"
                          className="btn btn-secondary"
                        >
                          Details
                        </Link>

                      </div>

                    </div>
                  );
                })}

              </div>
            )}

          </section>

          {/* Completed Sessions */}
          <section className="dashboard-panel">

            <div className="panel-header">

              <div>
                <h2>Completed Sessions</h2>
                <p>
                  Your recently completed exchanges
                </p>
              </div>

              <Link
                to="/sessions"
                className="panel-link"
              >
                View all →
              </Link>

            </div>

            {completedSessions.length === 0 ? (
              <div className="panel-empty-state">
                <span>✓</span>
                <p>No completed sessions yet.</p>
              </div>
            ) : (
              <div className="session-cards-list">

                {completedSessions.map((session) => {

                  const isTeacher =
                    session.teacherId === currentUser.id;

                  const participantId = isTeacher
                    ? session.learnerId
                    : session.teacherId;

                  return (
                    <div
                      className="session-item-card completed"
                      key={session.id}
                    >

                      <div className="session-role-badge-row">

                        <span className="badge badge-success">
                          Completed
                        </span>

                        <span className="session-participant-row">
                          {getSkillName(session.skillId)}
                        </span>

                      </div>

                      <div className="session-item-header">

                        <h3>
                          {getSkillName(session.skillId)}
                        </h3>

                      </div>

                      <div className="session-participant-row">

                        <img
                          className="participant-avatar"
                          src={getUserAvatar(participantId)}
                          alt={getUserName(participantId)}
                        />

                        <span className="participant-name">
                          {getUserName(participantId)}
                        </span>

                      </div>

                      <div className="participant-time">
                        📅 {formatDate(session.date)}
                        &nbsp; • &nbsp;
                        🕐 {session.time}
                      </div>

                      <div className="session-action-row">

                        <Link
                          to="/reviews"
                          className="btn btn-primary join-btn"
                        >
                          ⭐ Leave a Review
                        </Link>

                        <Link
                          to="/sessions"
                          className="btn btn-secondary"
                        >
                          Details
                        </Link>

                      </div>

                    </div>
                  );
                })}

              </div>
            )}

          </section>

        </div>

        {/* RIGHT COLUMN */}
        <div className="dashboard-panel">

          <div className="panel-header">

            <div>
              <h2>Recent Requests</h2>
              <p>
                Latest skill exchange activity
              </p>
            </div>

            <Link
              to="/requests"
              className="panel-link"
            >
              View all →
            </Link>

          </div>

          {userRequests.length === 0 ? (
            <div className="panel-empty-state">
              <span>🤝</span>
              <p>No requests yet.</p>
            </div>
          ) : (
            <div className="requests-feed">

              {userRequests
                .slice()
                .reverse()
                .slice(0, 6)
                .map((request) => {

                  const personId =
                    getRequestPerson(request);

                  return (
                    <div
                      className="request-feed-item"
                      key={request.id}
                    >

                      <div className="request-feed-top">

                        <div className="request-user-info">

                          <img
                            className="participant-avatar sm"
                            src={getUserAvatar(personId)}
                            alt={getUserName(personId)}
                          />

                          <div>
                            <span className="request-direction-label">
                              {getRequestDirection(request)}
                            </span>

                            <span className="request-user-name">
                              {getUserName(personId)}
                            </span>
                          </div>

                        </div>

                        <span
                          className={
                            request.status === "accepted"
                              ? "badge badge-success"
                              : request.status === "pending"
                              ? "badge badge-warning"
                              : "badge badge-danger"
                          }
                        >
                          {request.status}
                        </span>

                      </div>

                      <span className="request-skill-pill">
                        {getSkillName(request.skillId)}
                      </span>

                      <p className="request-feed-message">
                        {request.message}
                      </p>

                    </div>
                  );
                })}

            </div>
          )}

        </div>

      </div>

    </div>
  );
}

export default Dashboard;