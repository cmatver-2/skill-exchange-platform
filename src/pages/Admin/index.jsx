import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { users } from "../../data/users";
import { skills } from "../../data/skills";
import { useAppContext } from "../../context/AppContext";
import "./Admin.css";

function Admin() {
  const { requests, sessions } = useAppContext();

  const [userSearch, setUserSearch] = useState("");
  const [skillSearch, setSkillSearch] = useState("");

  const studentUsers = useMemo(
    () => users.filter((user) => user.role === "student"),
    []
  );

  const getTeacherCount = (skillId) => {
    return studentUsers.filter((user) =>
      user.skillsTaught.some((skill) => skill.skillId === skillId)
    ).length;
  };

  const getLearnerCount = (skillId) => {
    return studentUsers.filter((user) =>
      user.skillsWanted.some((skill) => skill.skillId === skillId)
    ).length;
  };

  const filteredUsers = useMemo(() => {
    const query = userSearch.toLowerCase().trim();

    if (!query) {
      return studentUsers;
    }

    return studentUsers.filter(
      (user) =>
        user.name.toLowerCase().includes(query) ||
        user.bio.toLowerCase().includes(query)
    );
  }, [userSearch, studentUsers]);

  const filteredSkills = useMemo(() => {
    const query = skillSearch.toLowerCase().trim();

    if (!query) {
      return skills;
    }

    return skills.filter(
      (skill) =>
        skill.name.toLowerCase().includes(query) ||
        skill.category.toLowerCase().includes(query)
    );
  }, [skillSearch]);

  const pendingRequests = requests.filter(
    (request) => request.status === "pending"
  ).length;

  const acceptedRequests = requests.filter(
    (request) => request.status === "accepted"
  ).length;

  const upcomingSessions = sessions.filter(
    (session) => session.status === "upcoming"
  ).length;

  const completedSessions = sessions.filter(
    (session) => session.status === "completed"
  ).length;

  return (
    <div className="admin-page">
      {/* Header */}
      <section className="admin-header">
        <div>
          <p className="admin-eyebrow">ADMIN CONSOLE</p>
          <h1>Platform overview</h1>
          <p>
            Manage users, skills, requests, and learning activity across
            SkillSwap.
          </p>
        </div>
      </section>

      {/* Statistics */}
      <section className="admin-stats">
        <div className="admin-stat-card">
          <span className="stat-label">TOTAL USERS</span>
          <strong>{users.length}</strong>
          <span className="stat-detail">
            {studentUsers.length} students
          </span>
        </div>

        <div className="admin-stat-card">
          <span className="stat-label">SKILLS</span>
          <strong>{skills.length}</strong>
          <span className="stat-detail">In the skill catalogue</span>
        </div>

        <div className="admin-stat-card">
          <span className="stat-label">REQUESTS</span>
          <strong>{requests.length}</strong>
          <span className="stat-detail">
            {pendingRequests} pending · {acceptedRequests} accepted
          </span>
        </div>

        <div className="admin-stat-card">
          <span className="stat-label">SESSIONS</span>
          <strong>{sessions.length}</strong>
          <span className="stat-detail">
            {upcomingSessions} upcoming · {completedSessions} completed
          </span>
        </div>
      </section>

      {/* User Management */}
      <section className="admin-section">
        <div className="admin-section-header">
          <div>
            <p className="admin-eyebrow">MANAGEMENT</p>
            <h2>Users</h2>
            <p>View students and the skills they teach or want to learn.</p>
          </div>

          <input
            type="search"
            placeholder="Search users..."
            value={userSearch}
            onChange={(event) => setUserSearch(event.target.value)}
            className="admin-search"
          />
        </div>

        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>User</th>
                <th>Role</th>
                <th>Skills taught</th>
                <th>Skills wanted</th>
                <th>Rating</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id}>
                  <td>
                    <div className="user-cell">
                      <img src={user.avatar} alt="" />
                      <div>
                        <strong>{user.name}</strong>
                        <span>{user.bio}</span>
                      </div>
                    </div>
                  </td>

                  <td>
                    <span className="role-badge">Student</span>
                  </td>

                  <td>{user.skillsTaught.length}</td>

                  <td>{user.skillsWanted.length}</td>

                  <td>
                    <span className="rating">
                      ★ {user.rating.toFixed(1)}
                    </span>
                  </td>

                  <td>
                    <Link
                      to={`/profile/${user.id}`}
                      className="table-action"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredUsers.length === 0 && (
            <div className="empty-table">No users match your search.</div>
          )}
        </div>
      </section>

      {/* Skill Management */}
      <section className="admin-section">
        <div className="admin-section-header">
          <div>
            <p className="admin-eyebrow">CATALOGUE</p>
            <h2>Skills</h2>
            <p>Monitor the skills available for exchange on the platform.</p>
          </div>

          <input
            type="search"
            placeholder="Search skills..."
            value={skillSearch}
            onChange={(event) => setSkillSearch(event.target.value)}
            className="admin-search"
          />
        </div>

        <div className="admin-table-wrapper">
          <table className="admin-table skill-table">
            <thead>
              <tr>
                <th>Skill</th>
                <th>Category</th>
                <th>Teachers</th>
                <th>Learners</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredSkills.map((skill) => (
                <tr key={skill.id}>
                  <td>
                    <strong>{skill.name}</strong>
                  </td>

                  <td>
                    <span className="category-badge">{skill.category}</span>
                  </td>

                  <td>{getTeacherCount(skill.id)}</td>

                  <td>{getLearnerCount(skill.id)}</td>

                  <td>
                    <Link
                      to={`/search?skill=${skill.id}`}
                      className="table-action"
                    >
                      Explore
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredSkills.length === 0 && (
            <div className="empty-table">No skills match your search.</div>
          )}
        </div>
      </section>

      {/* Request / Session overview */}
      <section className="admin-activity">
        <div className="activity-card">
          <p className="admin-eyebrow">REQUEST ACTIVITY</p>
          <h3>Learning requests</h3>

          <div className="activity-row">
            <span>Pending</span>
            <strong>{pendingRequests}</strong>
          </div>

          <div className="activity-row">
            <span>Accepted</span>
            <strong>{acceptedRequests}</strong>
          </div>

          <div className="activity-row">
            <span>Rejected</span>
            <strong>
              {requests.filter((request) => request.status === "rejected").length}
            </strong>
          </div>
        </div>

        <div className="activity-card">
          <p className="admin-eyebrow">SESSION ACTIVITY</p>
          <h3>Learning sessions</h3>

          <div className="activity-row">
            <span>Upcoming</span>
            <strong>{upcomingSessions}</strong>
          </div>

          <div className="activity-row">
            <span>Completed</span>
            <strong>{completedSessions}</strong>
          </div>

          <div className="activity-row">
            <span>Total</span>
            <strong>{sessions.length}</strong>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Admin;