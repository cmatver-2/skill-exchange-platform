import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";
import { skills } from "../../data/skills";
import { users } from "../../data/users";
import "./Requests.css";

const EMPTY_FORM = {
  toUserId: "",
  skillId: "",
  message: "",
};

function formatDate(dateString) {
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(dateString));
}

function Requests() {
  const { currentUser, requests, setRequests, sessions } = useAppContext();
  const [activeView, setActiveView] = useState("incoming");
  const [form, setForm] = useState(EMPTY_FORM);
  const [formError, setFormError] = useState("");
  const [notice, setNotice] = useState("");

  const incomingRequests = requests.filter(
    (request) => request.toUserId === currentUser.id
  );
  const outgoingRequests = requests.filter(
    (request) => request.fromUserId === currentUser.id
  );

  const availableTeachers = users.filter(
    (user) =>
      user.role === "student" &&
      user.id !== currentUser.id &&
      user.skillsTaught.length > 0
  );

  const selectedTeacher = users.find(
    (user) => user.id === Number(form.toUserId)
  );

  const selectedTeacherSkills = useMemo(() => {
    if (!selectedTeacher) return [];

    return selectedTeacher.skillsTaught
      .map(({ skillId }) => skills.find((skill) => skill.id === skillId))
      .filter(Boolean);
  }, [selectedTeacher]);

  function getUser(userId) {
    return users.find((user) => user.id === userId);
  }

  function getSkill(skillId) {
    return skills.find((skill) => skill.id === skillId);
  }

  function handleTeacherChange(event) {
    setForm({
      ...form,
      toUserId: event.target.value,
      skillId: "",
    });
    setFormError("");
    setNotice("");
  }

  function handleSubmit(event) {
    event.preventDefault();
    setFormError("");
    setNotice("");

    const toUserId = Number(form.toUserId);
    const skillId = Number(form.skillId);
    const message = form.message.trim();

    if (!toUserId || !skillId || !message) {
      setFormError("Please select a student and skill, then add a message.");
      return;
    }

    if (message.length < 10) {
      setFormError("Your message should contain at least 10 characters.");
      return;
    }

    const teacherCanTeachSkill = selectedTeacher?.skillsTaught.some(
      (item) => item.skillId === skillId
    );

    if (!teacherCanTeachSkill) {
      setFormError("The selected student does not teach this skill.");
      return;
    }

    const duplicatePendingRequest = requests.some(
      (request) =>
        request.fromUserId === currentUser.id &&
        request.toUserId === toUserId &&
        request.skillId === skillId &&
        request.status === "pending"
    );

    if (duplicatePendingRequest) {
      setFormError("You already have a pending request for this skill.");
      return;
    }

    const newRequest = {
      id: Math.max(0, ...requests.map((request) => request.id)) + 1,
      fromUserId: currentUser.id,
      toUserId,
      skillId,
      message,
      status: "pending",
      createdAt: new Date().toISOString(),
    };

    setRequests((previousRequests) => [...previousRequests, newRequest]);
    setForm(EMPTY_FORM);
    setActiveView("outgoing");
    setNotice("Learning request sent successfully.");
  }

  function updateRequestStatus(requestId, status) {
    setRequests((previousRequests) =>
      previousRequests.map((request) =>
        request.id === requestId ? { ...request, status } : request
      )
    );

    setNotice(`Request ${status}.`);
    setFormError("");
  }

  function renderRequestCard(request, direction) {
    const otherUserId =
      direction === "incoming" ? request.fromUserId : request.toUserId;
    const otherUser = getUser(otherUserId);
    const skill = getSkill(request.skillId);
    const hasSession = sessions.some(
      (session) => session.requestId === request.id
    );

    return (
      <article className="request-item" key={request.id}>
        <div className="request-item__avatar" aria-hidden="true">
          {otherUser?.name.charAt(0) ?? "?"}
        </div>

        <div className="request-item__content">
          <div className="request-item__heading">
            <div>
              <p className="request-item__direction">
                {direction === "incoming" ? "From" : "To"} {otherUser?.name}
              </p>
              <h3>{skill?.name ?? "Unknown skill"}</h3>
            </div>
            <span className={`request-status request-status--${request.status}`}>
              {request.status}
            </span>
          </div>

          <p className="request-item__message">“{request.message}”</p>
          <p className="request-item__date">Sent {formatDate(request.createdAt)}</p>

          <div className="request-item__actions">
            {direction === "incoming" && request.status === "pending" && (
              <>
                <button
                  type="button"
                  className="request-button request-button--primary"
                  onClick={() => updateRequestStatus(request.id, "accepted")}
                >
                  Accept
                </button>
                <button
                  type="button"
                  className="request-button request-button--danger"
                  onClick={() => updateRequestStatus(request.id, "rejected")}
                >
                  Reject
                </button>
              </>
            )}

            {request.status === "accepted" && !hasSession && (
              <Link
                className="request-button request-button--primary"
                to={`/sessions?request=${request.id}`}
              >
                Schedule session
              </Link>
            )}

            {request.status === "accepted" && hasSession && (
              <Link className="request-button request-button--secondary" to="/sessions">
                View session
              </Link>
            )}
          </div>
        </div>
      </article>
    );
  }

  const visibleRequests =
    activeView === "incoming" ? incomingRequests : outgoingRequests;

  return (
    <main className="requests-page">
      <header className="requests-hero">
        <div>
          <p className="requests-eyebrow">Learn together</p>
          <h1>Learning Requests</h1>
          <p>
            Connect with another student, exchange knowledge, and start learning.
          </p>
        </div>
        <div className="requests-hero__summary" aria-label="Request summary">
          <strong>{requests.filter((request) => request.toUserId === currentUser.id && request.status === "pending").length}</strong>
          <span>awaiting your response</span>
        </div>
      </header>

      <div className="requests-layout">
        <section className="request-panel request-panel--form">
          <div className="request-panel__heading">
            <span className="request-panel__step">1</span>
            <div>
              <h2>Send a request</h2>
              <p>Choose a student and the skill you want to learn.</p>
            </div>
          </div>

          <form className="request-form" onSubmit={handleSubmit} noValidate>
            <label htmlFor="request-student">Student</label>
            <select
              id="request-student"
              value={form.toUserId}
              onChange={handleTeacherChange}
              required
            >
              <option value="">Select a student</option>
              {availableTeachers.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>

            <label htmlFor="request-skill">Skill</label>
            <select
              id="request-skill"
              value={form.skillId}
              onChange={(event) => {
                setForm({ ...form, skillId: event.target.value });
                setFormError("");
              }}
              disabled={!selectedTeacher}
              required
            >
              <option value="">
                {selectedTeacher ? "Select a skill" : "Select a student first"}
              </option>
              {selectedTeacherSkills.map((skill) => (
                <option key={skill.id} value={skill.id}>
                  {skill.name}
                </option>
              ))}
            </select>

            <label htmlFor="request-message">Message</label>
            <textarea
              id="request-message"
              rows="5"
              maxLength="240"
              placeholder="Introduce yourself and explain what you would like to learn."
              value={form.message}
              onChange={(event) => {
                setForm({ ...form, message: event.target.value });
                setFormError("");
              }}
              required
            />
            <span className="request-form__count">{form.message.length}/240</span>

            {formError && <p className="request-feedback request-feedback--error">{formError}</p>}

            <button type="submit" className="request-submit">
              Send learning request
            </button>
          </form>
        </section>

        <section className="request-panel request-panel--list">
          <div className="request-panel__heading">
            <span className="request-panel__step">2</span>
            <div>
              <h2>Manage requests</h2>
              <p>Respond to students or track requests you have sent.</p>
            </div>
          </div>

          <div className="request-tabs" role="tablist" aria-label="Request type">
            <button
              type="button"
              role="tab"
              aria-selected={activeView === "incoming"}
              className={activeView === "incoming" ? "is-active" : ""}
              onClick={() => setActiveView("incoming")}
            >
              Incoming <span>{incomingRequests.length}</span>
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeView === "outgoing"}
              className={activeView === "outgoing" ? "is-active" : ""}
              onClick={() => setActiveView("outgoing")}
            >
              Outgoing <span>{outgoingRequests.length}</span>
            </button>
          </div>

          <div className="request-feedback-wrap" aria-live="polite">
            {notice && <p className="request-feedback request-feedback--success">{notice}</p>}
          </div>

          <div className="request-items">
            {visibleRequests.length === 0 ? (
              <div className="request-empty">
                <span aria-hidden="true">↗</span>
                <h3>No {activeView} requests</h3>
                <p>Your {activeView} learning requests will appear here.</p>
              </div>
            ) : (
              visibleRequests.map((request) =>
                renderRequestCard(request, activeView)
              )
            )}
          </div>
        </section>
      </div>
    </main>
  );
}

export default Requests;
