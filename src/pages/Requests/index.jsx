import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";
import { skills } from "../../data/skills";
import { users } from "../../data/users";

const EMPTY_FORM = {
  toUserId: "",
  skillId: "",
  message: "",
};

function formatDate(dateString) {
  try {
    return new Intl.DateTimeFormat("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }).format(new Date(dateString));
  } catch {
    return dateString;
  }
}

function Requests() {
  const { currentUser, requests, setRequests, sessions } = useAppContext();
  const [activeView, setActiveView] = useState("incoming");
  const [form, setForm] = useState(EMPTY_FORM);
  const [formError, setFormError] = useState("");
  const [notice, setNotice] = useState("");

  const incomingRequests = requests.filter(
    (request) => request.toUserId === currentUser?.id
  );
  const outgoingRequests = requests.filter(
    (request) => request.fromUserId === currentUser?.id
  );

  const availableTeachers = users.filter(
    (user) =>
      user.role === "student" &&
      user.id !== currentUser?.id &&
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
        request.fromUserId === currentUser?.id &&
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
    setNotice("✨ Learning request sent successfully! Track it in Outgoing.");
  }

  function updateRequestStatus(requestId, status) {
    setRequests((previousRequests) =>
      previousRequests.map((request) =>
        request.id === requestId ? { ...request, status } : request
      )
    );

    setNotice(`Request marked as ${status}.`);
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
      <div
        key={request.id}
        className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-3 transition-all hover:border-slate-300"
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <img
              src={otherUser?.avatar || "https://i.pravatar.cc/150"}
              className="w-10 h-10 rounded-full object-cover border border-slate-200"
              alt={otherUser?.name || "avatar"}
            />
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                {direction === "incoming" ? (
                  <>
                    <span className="text-slate-900">{otherUser?.name}</span> wants to learn{" "}
                    <span className="text-indigo-600 font-extrabold">{skill?.name}</span>
                  </>
                ) : (
                  <>
                    You requested to learn{" "}
                    <span className="text-indigo-600 font-extrabold">{skill?.name}</span> from {otherUser?.name}
                  </>
                )}
              </h3>
              <p className="text-[11px] text-slate-500">
                {formatDate(request.createdAt)} • {direction === "incoming" ? "Incoming proposal" : "Outgoing proposal"}
              </p>
            </div>
          </div>

          <span
            className={`px-2.5 py-1 rounded-full text-xs font-bold ${
              request.status === "accepted"
                ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
                : request.status === "rejected"
                ? "bg-rose-100 text-rose-800 border border-rose-200"
                : "bg-amber-100 text-amber-800 border border-amber-200"
            }`}
          >
            {request.status === "pending"
              ? "Pending Action"
              : request.status.charAt(0).toUpperCase() + request.status.slice(1)}
          </span>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-700 leading-relaxed italic">
          "{request.message}"
        </div>

        {/* Actions Area */}
        <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
          {direction === "incoming" && request.status === "pending" && (
            <>
              <button
                type="button"
                onClick={() => updateRequestStatus(request.id, "rejected")}
                className="px-4 py-1.5 rounded-lg border border-rose-200 text-rose-700 hover:bg-rose-50 text-xs font-bold transition-all"
              >
                Decline
              </button>
              <button
                type="button"
                onClick={() => updateRequestStatus(request.id, "accepted")}
                className="px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-sm transition-all"
              >
                Accept Exchange →
              </button>
            </>
          )}

          {request.status === "accepted" && !hasSession && (
            <Link
              to={`/sessions?request=${request.id}`}
              className="px-4 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-sm transition-all"
            >
              📅 Schedule Session →
            </Link>
          )}

          {request.status === "accepted" && hasSession && (
            <Link
              to="/sessions"
              className="px-4 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold transition-all"
            >
              View Session Room ↗
            </Link>
          )}
        </div>
      </div>
    );
  }

  const visibleRequests =
    activeView === "incoming" ? incomingRequests : outgoingRequests;

  return (
    <div className="space-y-8">
      {/* Page Header (Demo Style) */}
      <div>
        <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">
          Exchange Management
        </span>
        <h1 className="text-3xl font-extrabold text-slate-900 mt-1">
          Learning & Teaching Requests
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Accept incoming invitations or propose new peer skill swaps to classmates.
        </p>
      </div>

      {/* 2-Column Split Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

        {/* Send New Request Form (Left Column, Sticky) */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm lg:sticky lg:top-24">
          <h2 className="text-base font-bold text-slate-900 mb-1 flex items-center gap-2">
            <span>✍️</span> Propose Skill Swap
          </h2>
          <p className="text-xs text-slate-500 mb-5">
            Select who you want to learn from and which skill.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4 text-xs font-semibold">
            <div>
              <label className="block text-slate-700 mb-1">Target Student</label>
              <select
                value={form.toUserId}
                onChange={handleTeacherChange}
                required
                className="w-full px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-700 outline-none focus:ring-2 focus:ring-indigo-500 text-xs"
              >
                <option value="">Select a student</option>
                {availableTeachers.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.name} ({user.skillsTaught.length} skills)
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-slate-700 mb-1">Desired Skill</label>
              <select
                value={form.skillId}
                onChange={(event) => {
                  setForm({ ...form, skillId: event.target.value });
                  setFormError("");
                }}
                disabled={!selectedTeacher}
                required
                className="w-full px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-700 outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50 text-xs"
              >
                <option value="">
                  {selectedTeacher ? "Select a skill to learn" : "Select a student first"}
                </option>
                {selectedTeacherSkills.map((skill) => (
                  <option key={skill.id} value={skill.id}>
                    {skill.name} ({skill.category})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-slate-700">Intro Message</label>
                <span className="text-[10px] text-slate-400 font-normal">
                  {form.message.length}/240
                </span>
              </div>
              <textarea
                rows={4}
                maxLength={240}
                placeholder="Hi! I saw you know C++, could we exchange 1 hour of C++ for 1 hour of Photoshop?"
                value={form.message}
                onChange={(event) => {
                  setForm({ ...form, message: event.target.value });
                  setFormError("");
                }}
                className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-700 outline-none focus:ring-2 focus:ring-indigo-500 resize-none text-xs"
                required
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
              Send Learning Request →
            </button>
          </form>
        </div>

        {/* Requests List & Tabs (Right 2 Columns) */}
        <div className="lg:col-span-2 space-y-4">
          {/* Filter Tabs */}
          <div className="flex items-center gap-2 bg-slate-100 p-1.5 rounded-xl border border-slate-200 text-xs font-bold">
            <button
              type="button"
              onClick={() => setActiveView("incoming")}
              className={`px-4 py-2 rounded-lg transition-all ${
                activeView === "incoming"
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              Incoming Requests ({incomingRequests.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveView("outgoing")}
              className={`px-4 py-2 rounded-lg transition-all ${
                activeView === "outgoing"
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              Outgoing Requests ({outgoingRequests.length})
            </button>
          </div>

          {/* Feedback notice if any */}
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

          {/* Request Cards Feed */}
          <div className="space-y-4">
            {visibleRequests.length === 0 ? (
              <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center shadow-sm">
                <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center text-xl text-slate-400 mx-auto mb-3">
                  📬
                </div>
                <h3 className="text-sm font-bold text-slate-800">
                  No {activeView} requests yet
                </h3>
                <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                  {activeView === "incoming"
                    ? "When other students want to learn a skill you teach, their requests will appear here."
                    : "Propose a skill swap using the form on the left or explore skills to connect with peers."}
                </p>
                {activeView === "outgoing" && (
                  <Link
                    to="/search"
                    className="inline-block mt-4 px-4 py-2 rounded-xl bg-indigo-50 text-indigo-700 font-bold text-xs border border-indigo-200 hover:bg-indigo-100 transition-all"
                  >
                    🔍 Find Students & Skills
                  </Link>
                )}
              </div>
            ) : (
              visibleRequests.map((request) =>
                renderRequestCard(request, activeView)
              )
            )}
          </div>
        </div>

      </div>
    </div>
  );
}

export default Requests;
