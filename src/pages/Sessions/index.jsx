import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";
import { skills } from "../../data/skills";
import { users } from "../../data/users";
import "./Sessions.css";

function getToday() {
  const today = new Date();
  const offset = today.getTimezoneOffset();
  return new Date(today.getTime() - offset * 60 * 1000)
    .toISOString()
    .split("T")[0];
}

function formatSessionDate(date, time) {
  return new Intl.DateTimeFormat("en-IN", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(`${date}T${time}`));
}

function Sessions() {
  const { currentUser, requests, sessions, setSessions } = useAppContext();
  const [searchParams] = useSearchParams();
  const requestedRequestId = searchParams.get("request") ?? "";
  const [activeView, setActiveView] = useState("upcoming");
  const [form, setForm] = useState({
    requestId: requestedRequestId,
    date: "",
    time: "",
    duration: "60",
    location: "",
  });
  const [formError, setFormError] = useState("");
  const [notice, setNotice] = useState("");

  const userSessions = sessions.filter(
    (session) =>
      session.teacherId === currentUser.id ||
      session.learnerId === currentUser.id
  );

  const upcomingSessions = userSessions
    .filter((session) => session.status === "upcoming")
    .sort((a, b) =>
      `${a.date}T${a.time}`.localeCompare(`${b.date}T${b.time}`)
    );

  const completedSessions = userSessions
    .filter((session) => session.status === "completed")
    .sort((a, b) =>
      `${b.date}T${b.time}`.localeCompare(`${a.date}T${a.time}`)
    );

  const acceptedUnscheduledRequests = requests.filter(
    (request) =>
      request.status === "accepted" &&
      (request.fromUserId === currentUser.id ||
        request.toUserId === currentUser.id) &&
      !sessions.some((session) => session.requestId === request.id)
  );

  function getUser(userId) {
    return users.find((user) => user.id === userId);
  }

  function getSkill(skillId) {
    return skills.find((skill) => skill.id === skillId);
  }

  function getRequestLabel(request) {
    const otherUserId =
      request.fromUserId === currentUser.id
        ? request.toUserId
        : request.fromUserId;
    const otherUser = getUser(otherUserId);
    const skill = getSkill(request.skillId);

    return `${skill?.name ?? "Unknown skill"} with ${otherUser?.name ?? "Unknown student"}`;
  }

  function handleInputChange(event) {
    const { name, value } = event.target;
    setForm((previousForm) => ({ ...previousForm, [name]: value }));
    setFormError("");
    setNotice("");
  }

  function handleSchedule(event) {
    event.preventDefault();
    setFormError("");
    setNotice("");

    const requestId = Number(form.requestId);
    const request = acceptedUnscheduledRequests.find(
      (item) => item.id === requestId
    );
    const location = form.location.trim();

    if (!request || !form.date || !form.time || !form.duration || !location) {
      setFormError("Please complete every field before scheduling.");
      return;
    }

    const scheduledDateTime = new Date(`${form.date}T${form.time}`);

    if (Number.isNaN(scheduledDateTime.getTime())) {
      setFormError("Please enter a valid date and time.");
      return;
    }

    if (scheduledDateTime <= new Date()) {
      setFormError("The session must be scheduled for a future date and time.");
      return;
    }

    const duration = Number(form.duration);

    if (duration < 30 || duration > 120) {
      setFormError("Session duration must be between 30 and 120 minutes.");
      return;
    }

    const newSession = {
      id: Math.max(0, ...sessions.map((session) => session.id)) + 1,
      requestId: request.id,
      teacherId: request.toUserId,
      learnerId: request.fromUserId,
      skillId: request.skillId,
      date: form.date,
      time: form.time,
      duration,
      location,
      status: "upcoming",
    };

    setSessions((previousSessions) => [...previousSessions, newSession]);
    setForm({
      requestId: "",
      date: "",
      time: "",
      duration: "60",
      location: "",
    });
    setActiveView("upcoming");
    setNotice("Session scheduled successfully.");
  }

  function markAsCompleted(sessionId) {
    setSessions((previousSessions) =>
      previousSessions.map((session) =>
        session.id === sessionId
          ? { ...session, status: "completed" }
          : session
      )
    );
    setNotice("Session marked as completed.");
  }

  function renderSessionCard(session) {
    const isTeacher = session.teacherId === currentUser.id;
    const otherUser = getUser(
      isTeacher ? session.learnerId : session.teacherId
    );
    const skill = getSkill(session.skillId);
    const isMeetingLink = /^https?:\/\//i.test(session.location);

    return (
      <article className="session-item" key={session.id}>
        <div className="session-item__date" aria-hidden="true">
          <strong>{new Date(`${session.date}T00:00`).getDate()}</strong>
          <span>
            {new Intl.DateTimeFormat("en-IN", { month: "short" }).format(
              new Date(`${session.date}T00:00`)
            )}
          </span>
        </div>

        <div className="session-item__content">
          <div className="session-item__heading">
            <div>
              <span className="session-role">
                You are {isTeacher ? "teaching" : "learning"}
              </span>
              <h3>{skill?.name ?? "Unknown skill"}</h3>
            </div>
            <span className={`session-status session-status--${session.status}`}>
              {session.status}
            </span>
          </div>

          <div className="session-details">
            <p><span>With</span>{otherUser?.name ?? "Unknown student"}</p>
            <p><span>When</span>{formatSessionDate(session.date, session.time)}</p>
            <p><span>Duration</span>{session.duration} minutes</p>
            <p>
              <span>Location</span>
              {isMeetingLink ? (
                <a href={session.location} target="_blank" rel="noreferrer">
                  Online meeting
                </a>
              ) : (
                session.location
              )}
            </p>
          </div>

          {session.status === "upcoming" && (
            <div className="session-item__actions">
              {isMeetingLink && (
                <a
                  className="session-button session-button--secondary"
                  href={session.location}
                  target="_blank"
                  rel="noreferrer"
                >
                  Join session
                </a>
              )}
              <button
                type="button"
                className="session-button session-button--primary"
                onClick={() => markAsCompleted(session.id)}
              >
                Mark as completed
              </button>
            </div>
          )}

          {session.status === "completed" && (
            <div className="session-item__actions">
              <Link className="session-button session-button--secondary" to="/reviews">
                Leave a review
              </Link>
            </div>
          )}
        </div>
      </article>
    );
  }

  const visibleSessions =
    activeView === "upcoming" ? upcomingSessions : completedSessions;

  return (
    <div className="sessions-page">
      <header className="sessions-hero">
        <div>
          <p className="sessions-eyebrow">Share your time</p>
          <h1>Learning Sessions</h1>
          <p>Schedule accepted exchanges and keep track of every lesson.</p>
        </div>

        <div className="sessions-stats" aria-label="Session summary">
          <div>
            <strong>{upcomingSessions.length}</strong>
            <span>Upcoming</span>
          </div>
          <div>
            <strong>{completedSessions.length}</strong>
            <span>Completed</span>
          </div>
        </div>
      </header>

      <div className="sessions-layout">
        <section className="session-panel session-panel--schedule">
          <div className="session-panel__heading">
            <p>Plan the exchange</p>
            <h2>Schedule a session</h2>
          </div>

          {acceptedUnscheduledRequests.length === 0 ? (
            <div className="schedule-empty">
              <span aria-hidden="true">✓</span>
              <h3>Everything is scheduled</h3>
              <p>Accept a new learning request before scheduling another session.</p>
              <Link to="/requests">View requests</Link>
            </div>
          ) : (
            <form className="session-form" onSubmit={handleSchedule} noValidate>
              <label htmlFor="session-request">Accepted request</label>
              <select
                id="session-request"
                name="requestId"
                value={form.requestId}
                onChange={handleInputChange}
                required
              >
                <option value="">Select a request</option>
                {acceptedUnscheduledRequests.map((request) => (
                  <option key={request.id} value={request.id}>
                    {getRequestLabel(request)}
                  </option>
                ))}
              </select>

              <div className="session-form__row">
                <div>
                  <label htmlFor="session-date">Date</label>
                  <input
                    id="session-date"
                    name="date"
                    type="date"
                    min={getToday()}
                    value={form.date}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="session-time">Time</label>
                  <input
                    id="session-time"
                    name="time"
                    type="time"
                    value={form.time}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <label htmlFor="session-duration">Duration</label>
              <select
                id="session-duration"
                name="duration"
                value={form.duration}
                onChange={handleInputChange}
                required
              >
                <option value="30">30 minutes</option>
                <option value="45">45 minutes</option>
                <option value="60">60 minutes</option>
                <option value="90">90 minutes</option>
                <option value="120">120 minutes</option>
              </select>

              <label htmlFor="session-location">Meeting link or location</label>
              <input
                id="session-location"
                name="location"
                type="text"
                placeholder="Online link or Library Room 2"
                value={form.location}
                onChange={handleInputChange}
                required
              />

              {formError && <p className="session-feedback session-feedback--error">{formError}</p>}

              <button type="submit" className="session-submit">
                Schedule session
              </button>
            </form>
          )}
        </section>

        <section className="session-panel session-panel--list">
          <div className="session-list-header">
            <div>
              <p>Your learning calendar</p>
              <h2>My sessions</h2>
            </div>

            <div className="session-tabs" role="tablist" aria-label="Session status">
              <button
                type="button"
                role="tab"
                aria-selected={activeView === "upcoming"}
                className={activeView === "upcoming" ? "is-active" : ""}
                onClick={() => setActiveView("upcoming")}
              >
                Upcoming
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={activeView === "completed"}
                className={activeView === "completed" ? "is-active" : ""}
                onClick={() => setActiveView("completed")}
              >
                Completed
              </button>
            </div>
          </div>

          <div className="session-feedback-wrap" aria-live="polite">
            {notice && <p className="session-feedback session-feedback--success">{notice}</p>}
          </div>

          <div className="session-items">
            {visibleSessions.length === 0 ? (
              <div className="session-empty">
                <span aria-hidden="true">○</span>
                <h3>No {activeView} sessions</h3>
                <p>
                  {activeView === "upcoming"
                    ? "Schedule an accepted request to see it here."
                    : "Completed learning sessions will appear here."}
                </p>
              </div>
            ) : (
              visibleSessions.map(renderSessionCard)
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

export default Sessions;
