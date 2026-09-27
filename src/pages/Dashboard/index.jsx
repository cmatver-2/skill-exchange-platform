import { Link } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";
import { users } from "../../data/users";
import { skills } from "../../data/skills";
import "../../styles/dashboard.css";

function Dashboard() {
  const { currentUser, requests, sessions, reviews } = useAppContext();

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

  const getUserName = (userId) => {
    const user = users.find((user) => user.id === userId);
    return user ? user.name : "Unknown User";
  };

  const getSkillName = (skillId) => {
    const skill = skills.find((skill) => skill.id === skillId);
    return skill ? skill.name : "Unknown Skill";
  };

  const getRequestStatus = (status) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <div>
          <h1>Welcome, {currentUser.name}</h1>
          <p>Your Skill Exchange Dashboard</p>
        </div>

        <Link
          className="profile-button"
          to={`/profile/${currentUser.id}`}
        >
          View Profile
        </Link>
      </div>

      {/* Summary Cards */}
      <div className="dashboard-cards">
        <div className="dashboard-card">
          <h3>Requests</h3>
          <p>{userRequests.length}</p>
        </div>

        <div className="dashboard-card">
          <h3>Upcoming Sessions</h3>
          <p>{upcomingSessions.length}</p>
        </div>

        <div className="dashboard-card">
          <h3>Completed Sessions</h3>
          <p>{completedSessions.length}</p>
        </div>

        <div className="dashboard-card">
          <h3>Reviews Received</h3>
          <p>
            {
              reviews.filter(
                (review) => review.revieweeId === currentUser.id
              ).length
            }
          </p>
        </div>
      </div>

      {/* Upcoming Sessions */}
      <section className="dashboard-section">
        <h2>Upcoming Sessions</h2>

        {upcomingSessions.length === 0 ? (
          <p>No upcoming sessions.</p>
        ) : (
          <div className="session-list">
            {upcomingSessions.map((session) => {
              const otherUserId =
                session.teacherId === currentUser.id
                  ? session.learnerId
                  : session.teacherId;

              return (
                <div className="session-card" key={session.id}>
                  <div>
                    <h3>{getSkillName(session.skillId)}</h3>

                    <p>
                      With: <strong>{getUserName(otherUserId)}</strong>
                    </p>

                    <p>
                      Date: {session.date}
                    </p>

                    <p>
                      Time: {session.time}
                    </p>

                    <p>
                      Duration: {session.duration} minutes
                    </p>
                  </div>

                  <a
                    className="join-button"
                    href={session.location}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Join Session
                  </a>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Recent Requests */}
      <section className="dashboard-section">
        <h2>My Requests</h2>

        {userRequests.length === 0 ? (
          <p>No requests found.</p>
        ) : (
          <div className="request-list">
            {userRequests.map((request) => {
              const otherUserId =
                request.fromUserId === currentUser.id
                  ? request.toUserId
                  : request.fromUserId;

              return (
                <div className="request-card" key={request.id}>
                  <div>
                    <h3>{getSkillName(request.skillId)}</h3>

                    <p>
                      With: <strong>{getUserName(otherUserId)}</strong>
                    </p>

                    <p>{request.message}</p>
                  </div>

                  <span
                    className={`request-status ${request.status}`}
                  >
                    {getRequestStatus(request.status)}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Completed Sessions */}
      <section className="dashboard-section">
        <h2>Completed Sessions</h2>

        {completedSessions.length === 0 ? (
          <p>No completed sessions yet.</p>
        ) : (
          <div className="session-list">
            {completedSessions.map((session) => {
              const otherUserId =
                session.teacherId === currentUser.id
                  ? session.learnerId
                  : session.teacherId;

              return (
                <div className="session-card completed" key={session.id}>
                  <div>
                    <h3>{getSkillName(session.skillId)}</h3>

                    <p>
                      With: <strong>{getUserName(otherUserId)}</strong>
                    </p>

                    <p>
                      Date: {session.date}
                    </p>
                  </div>

                  <Link
                    className="review-button"
                    to="/reviews"
                  >
                    Reviews
                  </Link>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}

export default Dashboard;