import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";
import { skills } from "../../data/skills";
import { users } from "../../data/users";

function getToday() {
  const today = new Date();
  const offset = today.getTimezoneOffset();
  return new Date(today.getTime() - offset * 60 * 1000)
    .toISOString()
    .split("T")[0];
}

function formatSessionDate(date, time) {
  try {
    return new Intl.DateTimeFormat("en-IN", {
      weekday: "short",
      day: "numeric",
      month: "short",
      hour: "numeric",
      minute: "2-digit",
    }).format(new Date(`${date}T${time}`));
  } catch {
    return `${date} at ${time}`;
  }
}

function Sessions() {
  const { currentUser, requests, sessions, setSessions } = useAppContext();
  const [searchParams] = useSearchParams();

  const requestedRequestId = searchParams.get("request") ?? "";
  const [activeView, setActiveView] = useState("upcoming");

  const [form, setForm] = useState({
    requestId: requestedRequestId,
    date: "",
    time: "16:00",
    duration: "60",
    location: "https://meet.google.com/new",
  });

  const [formError, setFormError] = useState("");
  const [notice, setNotice] = useState("");

  const userSessions = sessions.filter(
    (session) =>
      session.teacherId === currentUser?.id ||
      session.learnerId === currentUser?.id
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
      (request.fromUserId === currentUser?.id ||
        request.toUserId === currentUser?.id) &&
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
      request.fromUserId === currentUser?.id
        ? request.toUserId
        : request.fromUserId;

    const otherUser = getUser(otherUserId);
    const skill = getSkill(request.skillId);

    return `${skill?.name ?? "Skill"} with ${
      otherUser?.name ?? "Student"
    }`;
  }

  function handleInputChange(event) {
    const { name, value } = event.target;
    setForm((previousForm) => ({
      ...previousForm,
      [name]: value,
    }));
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
      setFormError("Please fill out all fields before scheduling.");
      return;
    }

    const scheduledDateTime = new Date(`${form.date}T${form.time}`);

    if (Number.isNaN(scheduledDateTime.getTime())) {
      setFormError("Please enter a valid date and time.");
      return;
    }

    const duration = Number(form.duration);
    if (duration < 15 || duration > 180) {
      setFormError("Session duration must be between 15 and 180 minutes.");
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
      time: "16:00",
      duration: "60",
      location: "https://meet.google.com/new",
    });

    setActiveView("upcoming");
    setNotice("🎉 Study session scheduled successfully!");
  }

  function markAsCompleted(sessionId) {
    setSessions((previousSessions) =>
      previousSessions.map((session) =>
        session.id === sessionId
          ? { ...session, status: "completed" }
          : session
      )
    );
    setNotice("✅ Session marked completed! You can now rate this session in Reviews.");
  }

  function renderSessionCard(session) {
    const isTeacher = session.teacherId === currentUser?.id;
    const otherUser = getUser(
      isTeacher ? session.learnerId : session.teacherId
    );
    const skill = getSkill(session.skillId);
    const isMeetingLink = /^https?:\/\//i.test(session.location);

    const parsedDate = new Date(`${session.date}T00:00:00`);
    const month = isNaN(parsedDate.getTime())
      ? "OCT"
      : parsedDate.toLocaleDateString("en-US", { month: "short" }).toUpperCase();
    const day = isNaN(parsedDate.getTime()) ? "01" : parsedDate.getDate();

    const isUpcoming = session.status === "upcoming";

    return (
      <div
        key={session.id}
        className={`bg-white rounded-2xl p-6 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-all ${
          isUpcoming
            ? "border-2 border-indigo-200"
            : "border border-slate-200 opacity-90"
        }`}
      >
        <div className="flex items-center gap-4">
          {/* Calendar Date Badge (Demo Style) */}
          <div
            className={`w-16 h-16 rounded-2xl border flex flex-col items-center justify-center font-bold flex-shrink-0 ${
              isUpcoming
                ? "bg-indigo-50 border-indigo-200 text-indigo-700"
                : "bg-emerald-50 border-emerald-200 text-emerald-700"
            }`}
          >
            <span className="text-xs uppercase tracking-wider">{month}</span>
            <span className="text-xl leading-none">{day}</span>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span
                className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                  isUpcoming
                    ? "bg-amber-100 text-amber-800"
                    : "bg-emerald-100 text-emerald-800"
                }`}
              >
                {isUpcoming ? "Upcoming" : "Completed"}
              </span>
              <span className="text-xs text-slate-400">
                {session.time} IST ({session.duration} mins)
              </span>
            </div>

            <h3 className="text-lg font-bold text-slate-900 mt-1">
              {skill?.name ?? "Skill Session"}
            </h3>

            <p className="text-xs text-slate-500">
              {isTeacher ? "Learner: " : "Teacher: "}
              <strong className="text-slate-700">
                {otherUser?.name ?? "Student Partner"}
              </strong>
              {" • "}
              <span className="italic">{formatSessionDate(session.date, session.time)}</span>
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 w-full sm:w-auto">
          {isUpcoming && isMeetingLink && (
            <a
              href={session.location}
              target="_blank"
              rel="noreferrer"
              className="flex-1 sm:flex-initial px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold text-center shadow-sm transition-all"
            >
              📹 Join Meet ↗
            </a>
          )}

          {isUpcoming && (
            <button
              type="button"
              onClick={() => markAsCompleted(session.id)}
              className="px-3 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold transition-all cursor-pointer"
            >
              ✓ Mark Done
            </button>
          )}

          {!isUpcoming && (
            <Link
              to="/reviews"
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-sm transition-all"
            >
              ⭐ Leave Review
            </Link>
          )}
        </div>
      </div>
    );
  }

  const visibleSessions =
    activeView === "upcoming" ? upcomingSessions : completedSessions;

  return (
    <div className="space-y-8">
      {/* Page Header (Demo Style) */}
      <div>
        <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">
          Schedule & Learning Rooms
        </span>
        <h1 className="text-3xl font-extrabold text-slate-900 mt-1">
          Study Sessions
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Manage scheduled 1-on-1 tutoring appointments and video call meeting rooms.
        </p>
      </div>

      {/* 2-Column Split Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

        {/* Schedule Form (Left Column) */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <h2 className="text-base font-bold text-slate-900 mb-1 flex items-center gap-2">
            <span>📅</span> Schedule a New Session
          </h2>
          <p className="text-xs text-slate-500 mb-5">
            Book a date and meeting link for accepted requests.
          </p>

          {acceptedUnscheduledRequests.length === 0 ? (
            <div className="p-6 rounded-xl bg-slate-50 border border-slate-100 text-center">
              <span className="text-2xl block mb-2">🎉</span>
              <h4 className="text-xs font-bold text-slate-800 mb-1">
                All Accepted Requests Are Scheduled
              </h4>
              <p className="text-[11px] text-slate-500 mb-4">
                Accept a new learning exchange proposal first to schedule your next session.
              </p>
              <Link
                to="/requests"
                className="inline-block px-3.5 py-1.5 rounded-lg bg-indigo-50 text-indigo-700 font-bold text-xs border border-indigo-200 hover:bg-indigo-100 transition-all"
              >
                Go to Requests →
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSchedule} className="space-y-4 text-xs font-semibold">
              <div>
                <label className="block text-slate-700 mb-1">
                  Accepted Exchange
                </label>
                <select
                  name="requestId"
                  value={form.requestId}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-slate-700 outline-none focus:ring-2 focus:ring-indigo-500 text-xs"
                >
                  <option value="">Select accepted exchange</option>
                  {acceptedUnscheduledRequests.map((request) => (
                    <option key={request.id} value={request.id}>
                      {getRequestLabel(request)}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-slate-700 mb-1">Date</label>
                  <input
                    type="date"
                    name="date"
                    min={getToday()}
                    value={form.date}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-slate-700 outline-none focus:ring-2 focus:ring-indigo-500 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 mb-1">Time</label>
                  <input
                    type="time"
                    name="time"
                    value={form.time}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-slate-700 outline-none focus:ring-2 focus:ring-indigo-500 text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 mb-1">Duration (Minutes)</label>
                <select
                  name="duration"
                  value={form.duration}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-slate-700 outline-none focus:ring-2 focus:ring-indigo-500 text-xs"
                >
                  <option value="30">30 minutes</option>
                  <option value="45">45 minutes</option>
                  <option value="60">60 minutes</option>
                  <option value="90">90 minutes</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-700 mb-1">Meeting Link / Location</label>
                <input
                  type="text"
                  name="location"
                  placeholder="https://meet.google.com/skillswap-room"
                  value={form.location}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-slate-700 outline-none focus:ring-2 focus:ring-indigo-500 text-xs"
                />
              </div>

              {formError && (
                <p className="p-2.5 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold">
                  {formError}
                </p>
              )}

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold shadow-md shadow-indigo-100 transition-all cursor-pointer"
              >
                Lock in Session →
              </button>
            </form>
          )}
        </div>

        {/* Sessions Feed & Tabs (Right 2 Columns) */}
        <div className="lg:col-span-2 space-y-4">
          {/* Tabs */}
          <div className="flex items-center gap-2 bg-slate-100 p-1.5 rounded-xl border border-slate-200 text-xs font-bold">
            <button
              type="button"
              onClick={() => setActiveView("upcoming")}
              className={`px-4 py-2 rounded-lg transition-all ${
                activeView === "upcoming"
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              Upcoming Sessions ({upcomingSessions.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveView("completed")}
              className={`px-4 py-2 rounded-lg transition-all ${
                activeView === "completed"
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              Completed Sessions ({completedSessions.length})
            </button>
          </div>

          {/* Feedback Notice */}
          {notice && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-semibold flex items-center justify-between">
              <span>{notice}</span>
              <button
                onClick={() => setNotice("")}
                className="text-emerald-700 hover:text-emerald-950 font-bold ml-2 text-sm"
              >
                ✕
              </button>
            </div>
          )}

          {/* List of Sessions */}
          <div className="space-y-4">
            {visibleSessions.length === 0 ? (
              <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center shadow-sm">
                <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center text-xl text-slate-400 mx-auto mb-3">
                  🗓️
                </div>
                <h3 className="text-sm font-bold text-slate-800">
                  No {activeView} sessions
                </h3>
                <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                  {activeView === "upcoming"
                    ? "Book an accepted request using the form on the left to schedule your next tutoring session."
                    : "Completed study sessions will be logged here for your records and review submissions."}
                </p>
              </div>
            ) : (
              visibleSessions.map((session) => renderSessionCard(session))
            )}
          </div>
        </div>

      </div>
    </div>
  );
}

export default Sessions;
