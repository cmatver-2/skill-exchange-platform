import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { users } from "../../data/users";
import { skills } from "../../data/skills";
import { useAppContext } from "../../context/AppContext";

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
    if (!query) return studentUsers;

    return studentUsers.filter(
      (user) =>
        user.name.toLowerCase().includes(query) ||
        user.bio?.toLowerCase().includes(query)
    );
  }, [userSearch, studentUsers]);

  const filteredSkills = useMemo(() => {
    const query = skillSearch.toLowerCase().trim();
    if (!query) return skills;

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

  const rejectedRequests = requests.filter(
    (request) => request.status === "rejected"
  ).length;

  const upcomingSessions = sessions.filter(
    (session) => session.status === "upcoming"
  ).length;

  const completedSessions = sessions.filter(
    (session) => session.status === "completed"
  ).length;

  return (
    <div className="space-y-8">
      {/* Header (Demo Style) */}
      <div>
        <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">
          Management & Governance
        </span>
        <h1 className="text-3xl font-extrabold text-slate-900 mt-1">
          Platform Admin Console
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          System monitoring, user oversight, and skill catalogue management.
        </p>
      </div>

      {/* Admin Overview Stats (Demo Style) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-xs font-bold text-slate-400">REGISTERED STUDENTS</span>
          <p className="text-3xl font-extrabold text-slate-900 mt-2">{studentUsers.length}</p>
          <p className="text-[11px] text-indigo-600 font-semibold mt-1">All verified active</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-xs font-bold text-slate-400">SKILLS CATALOGUE</span>
          <p className="text-3xl font-extrabold text-slate-900 mt-2">{skills.length}</p>
          <p className="text-[11px] text-indigo-600 font-semibold mt-1">Across 5 disciplines</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-xs font-bold text-slate-400">TOTAL REQUESTS</span>
          <p className="text-3xl font-extrabold text-slate-900 mt-2">{requests.length}</p>
          <p className="text-[11px] text-emerald-600 font-semibold mt-1">
            {acceptedRequests} accepted, {pendingRequests} pending
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-xs font-bold text-slate-400">LEARNING SESSIONS</span>
          <p className="text-3xl font-extrabold text-slate-900 mt-2">{sessions.length}</p>
          <p className="text-[11px] text-indigo-600 font-semibold mt-1">
            {upcomingSessions} upcoming, {completedSessions} done
          </p>
        </div>
      </div>

      {/* Users Management Table (Demo Style) */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-base font-bold text-slate-900">Registered Students</h2>
            <p className="text-xs text-slate-500">Monitor peer profiles and role access.</p>
          </div>
          <input
            type="text"
            placeholder="Filter users..."
            value={userSearch}
            onChange={(e) => setUserSearch(e.target.value)}
            className="px-3.5 py-2 rounded-xl border border-slate-200 text-xs bg-slate-50 w-full sm:w-64 outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 border-b border-slate-100 uppercase tracking-wider font-bold">
              <tr>
                <th className="py-3 px-6">Student</th>
                <th className="py-3 px-6">Role</th>
                <th className="py-3 px-6">Skills Teaching</th>
                <th className="py-3 px-6">Skills Wanted</th>
                <th className="py-3 px-6">Rating</th>
                <th className="py-3 px-6 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-slate-50/60 transition-colors">
                  <td className="py-3.5 px-6 flex items-center gap-3">
                    <img
                      src={user.avatar}
                      className="w-8 h-8 rounded-full object-cover border border-slate-200"
                      alt={user.name}
                    />
                    <div>
                      <span className="font-bold text-slate-900 block">{user.name}</span>
                      <span className="text-[10px] text-slate-400 line-clamp-1">{user.bio || "Student"}</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-6">
                    <span className="px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700 font-bold text-[10px] border border-indigo-100">
                      Student
                    </span>
                  </td>
                  <td className="py-3.5 px-6 text-slate-600">
                    {user.skillsTaught.length} skill{user.skillsTaught.length !== 1 ? "s" : ""}
                  </td>
                  <td className="py-3.5 px-6 text-slate-600">
                    {user.skillsWanted.length} goal{user.skillsWanted.length !== 1 ? "s" : ""}
                  </td>
                  <td className="py-3.5 px-6 text-amber-500 font-bold">
                    ★ {user.rating !== null ? user.rating.toFixed(1) : "New"}
                  </td>
                  <td className="py-3.5 px-6 text-right">
                    <Link
                      to={`/profile/${user.id}`}
                      className="text-indigo-600 hover:text-indigo-800 font-bold hover:underline"
                    >
                      Inspect Profile →
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredUsers.length === 0 && (
            <div className="p-8 text-center text-xs text-slate-400">
              No students match your search criteria.
            </div>
          )}
        </div>
      </div>

      {/* Skills Catalog Table */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-base font-bold text-slate-900">Skills Catalogue</h2>
            <p className="text-xs text-slate-500">Monitor all knowledge topics available for exchange.</p>
          </div>
          <input
            type="text"
            placeholder="Search skills..."
            value={skillSearch}
            onChange={(e) => setSkillSearch(e.target.value)}
            className="px-3.5 py-2 rounded-xl border border-slate-200 text-xs bg-slate-50 w-full sm:w-64 outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 border-b border-slate-100 uppercase tracking-wider font-bold">
              <tr>
                <th className="py-3 px-6">Skill Name</th>
                <th className="py-3 px-6">Category</th>
                <th className="py-3 px-6">Active Teachers</th>
                <th className="py-3 px-6">Active Learners</th>
                <th className="py-3 px-6 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {filteredSkills.map((skill) => (
                <tr key={skill.id} className="hover:bg-slate-50/60 transition-colors">
                  <td className="py-3.5 px-6 font-bold text-slate-900">
                    {skill.name}
                  </td>
                  <td className="py-3.5 px-6">
                    <span className="px-2 py-0.5 rounded-md bg-purple-50 text-purple-700 font-bold text-[10px] border border-purple-100">
                      {skill.category}
                    </span>
                  </td>
                  <td className="py-3.5 px-6 text-slate-600 font-semibold">
                    {getTeacherCount(skill.id)} tutors
                  </td>
                  <td className="py-3.5 px-6 text-slate-600 font-semibold">
                    {getLearnerCount(skill.id)} students
                  </td>
                  <td className="py-3.5 px-6 text-right">
                    <Link
                      to={`/search`}
                      className="text-indigo-600 hover:text-indigo-800 font-bold hover:underline"
                    >
                      Find Peers →
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredSkills.length === 0 && (
            <div className="p-8 text-center text-xs text-slate-400">
              No skills match your search criteria.
            </div>
          )}
        </div>
      </div>

      {/* Activity Breakdown Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900">Request Pipeline Breakdown</h3>
            <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md">
              {requests.length} total
            </span>
          </div>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-slate-600 font-medium">Pending Review</span>
              <strong className="text-amber-600">{pendingRequests}</strong>
            </div>
            <div className="flex justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-slate-600 font-medium">Accepted Exchanges</span>
              <strong className="text-emerald-600">{acceptedRequests}</strong>
            </div>
            <div className="flex justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-slate-600 font-medium">Declined</span>
              <strong className="text-rose-600">{rejectedRequests}</strong>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900">Tutoring Sessions Breakdown</h3>
            <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md">
              {sessions.length} total
            </span>
          </div>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-slate-600 font-medium">Upcoming Sessions</span>
              <strong className="text-indigo-600">{upcomingSessions}</strong>
            </div>
            <div className="flex justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-slate-600 font-medium">Completed Successfully</span>
              <strong className="text-emerald-600">{completedSessions}</strong>
            </div>
            <div className="flex justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-slate-600 font-medium">Completion Rate</span>
              <strong className="text-slate-800">
                {sessions.length > 0 ? Math.round((completedSessions / sessions.length) * 100) : 0}%
              </strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Admin;