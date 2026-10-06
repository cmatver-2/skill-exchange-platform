import { Link } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";
import { users } from "../../data/users";
import { skills } from "../../data/skills";

function Dashboard() {
  const {
    currentUser,
    requests,
    sessions,
    setSessions,
  } = useAppContext();

  const userRequests = requests.filter(
    (request) =>
      request.fromUserId === currentUser?.id ||
      request.toUserId === currentUser?.id
  );

  const userSessions = sessions.filter(
    (session) =>
      session.teacherId === currentUser?.id ||
      session.learnerId === currentUser?.id
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

  const getUserName = (userId) => {
    const user = users.find((u) => u.id === userId);
    return user ? user.name : "Unknown User";
  };

  const getUserAvatar = (userId) => {
    const user = users.find((u) => u.id === userId);
    return user ? user.avatar : "https://i.pravatar.cc/150";
  };

  const getSkillName = (skillId) => {
    const skill = skills.find((s) => s.id === skillId);
    return skill ? skill.name : "Unknown Skill";
  };

  const handleMarkCompleted = (sessionId) => {
    setSessions((prev) =>
      prev.map((s) => (s.id === sessionId ? { ...s, status: "completed" } : s))
    );
  };

  return (
    <div className="space-y-8">

      {/* Greeting Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-r from-indigo-500 via-indigo-600 to-purple-600 rounded-3xl p-8 text-white shadow-xl shadow-indigo-100">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-200">Personal Overview</span>
          <h1 className="text-2xl sm:text-3xl font-extrabold mt-1 text-white">
            Welcome back, {currentUser?.name?.split(" ")[0]}! 👋
          </h1>
          <p className="text-sm text-indigo-100 mt-1">
            Here is what is happening with your skills and peer exchanges today.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to={`/profile/${currentUser?.id}`}
            className="px-4 py-2.5 rounded-xl bg-white/20 hover:bg-white/30 text-white font-bold text-xs backdrop-blur-md transition-all inline-block"
          >
            👤 View Profile
          </Link>
          <Link
            to="/search"
            className="px-4 py-2.5 rounded-xl bg-white text-indigo-700 hover:bg-indigo-50 font-bold text-xs shadow-md transition-all inline-block"
          >
            🔍 Find Skills
          </Link>
        </div>
      </div>

      {/* 4 KPI Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400">PENDING REQUESTS</span>
            <span className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center text-sm font-bold">
              📩
            </span>
          </div>
          <p className="text-3xl font-extrabold text-slate-900 mt-2">{pendingRequests.length}</p>
          <p className="text-[11px] text-amber-600 font-semibold mt-1">
            {pendingRequests.length > 0 ? "Requires your response" : "All caught up"}
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400">UPCOMING SESSIONS</span>
            <span className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center text-sm font-bold">
              📅
            </span>
          </div>
          <p className="text-3xl font-extrabold text-slate-900 mt-2">{upcomingSessions.length}</p>
          <p className="text-[11px] text-indigo-600 font-semibold mt-1">
            {upcomingSessions[0] ? `Next: ${getSkillName(upcomingSessions[0].skillId)} on ${upcomingSessions[0].date}` : "None scheduled"}
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400">COMPLETED SESSIONS</span>
            <span className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center text-sm font-bold">
              ✅
            </span>
          </div>
          <p className="text-3xl font-extrabold text-slate-900 mt-2">{completedSessions.length}</p>
          <p className="text-[11px] text-emerald-600 font-semibold mt-1">Successful exchanges</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400">PEER RATING</span>
            <span className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center text-sm font-bold">
              ⭐
            </span>
          </div>
          <p className="text-3xl font-extrabold text-slate-900 mt-2">
            {currentUser?.rating != null ? `${currentUser.rating.toFixed(1)} ★` : "4.8 ★"}
          </p>
          <p className="text-[11px] text-purple-600 font-semibold mt-1">Verified student rating</p>
        </div>
      </div>

      {/* Active Sessions & Requests Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Upcoming Sessions Widget */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <span>📅</span> Next Upcoming Sessions
            </h2>
            <Link to="/sessions" className="text-xs font-bold text-indigo-600 hover:underline">
              View All →
            </Link>
          </div>

          {upcomingSessions.length === 0 ? (
            <div className="p-8 text-center text-slate-400">
              <span className="text-2xl block mb-1">📅</span>
              <p className="text-xs">No upcoming sessions right now.</p>
              <Link to="/search" className="mt-2 inline-block text-xs font-bold text-indigo-600 hover:underline">
                Find a peer to schedule with →
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {upcomingSessions.map((session) => {
                const isTeacher = session.teacherId === currentUser?.id;
                const otherId = isTeacher ? session.learnerId : session.teacherId;

                return (
                  <div key={session.id} className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-[10px] font-extrabold tracking-wider uppercase px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-800">
                          {isTeacher ? "You are Teaching" : "You are Learning"}
                        </span>
                        <h3 className="text-base font-bold text-slate-900 mt-1">
                          {getSkillName(session.skillId)}
                        </h3>
                      </div>
                      <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800">
                        Upcoming
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs text-slate-600">
                      <div><strong className="text-slate-800">{isTeacher ? "Learner:" : "Teacher:"}</strong> {getUserName(otherId)}</div>
                      <div><strong className="text-slate-800">Duration:</strong> {session.duration} mins</div>
                      <div><strong className="text-slate-800">Date:</strong> {session.date}</div>
                      <div><strong className="text-slate-800">Time:</strong> {session.time} IST</div>
                    </div>

                    <div className="pt-2 flex items-center gap-2">
                      <a
                        href={session.location}
                        target="_blank"
                        rel="noreferrer"
                        className="flex-1 py-2 px-3 text-center text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl shadow-sm transition-all flex items-center justify-center gap-1.5"
                      >
                        <span>📹</span> Join Google Meet
                      </a>
                      <button
                        onClick={() => handleMarkCompleted(session.id)}
                        className="py-2 px-3 text-xs font-bold text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 rounded-xl transition-all"
                      >
                        Mark Done
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Recent Requests Widget */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <span>📩</span> Requests Activity
            </h2>
            <Link to="/requests" className="text-xs font-bold text-indigo-600 hover:underline">
              Manage All →
            </Link>
          </div>

          {userRequests.length === 0 ? (
            <div className="p-8 text-center text-slate-400">
              <span className="text-2xl block mb-1">📩</span>
              <p className="text-xs">No learning requests yet.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {userRequests.slice(0, 4).map((request) => {
                const isFromMe = request.fromUserId === currentUser?.id;
                const otherId = isFromMe ? request.toUserId : request.fromUserId;

                return (
                  <div key={request.id} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={getUserAvatar(otherId)}
                        alt=""
                        className="w-9 h-9 rounded-full object-cover border border-slate-200"
                      />
                      <div>
                        <p className="text-xs font-bold text-slate-900">
                          {getSkillName(request.skillId)}
                        </p>
                        <p className="text-[11px] text-slate-500">
                          {isFromMe ? `Sent to ${getUserName(otherId)}` : `From ${getUserName(otherId)}`}
                        </p>
                      </div>
                    </div>

                    <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${
                      request.status === "accepted"
                        ? "bg-emerald-100 text-emerald-800"
                        : request.status === "pending"
                        ? "bg-amber-100 text-amber-800"
                        : "bg-rose-100 text-rose-800"
                    }`}>
                      {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                    </span>
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