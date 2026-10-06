import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";
import StudentCard from "./StudentCard";
import {
  filterTeachers,
  findMatches,
  getExchange,
  getSkillById,
  getSkillCategories,
  getTeachersForSkill,
  searchSkills,
} from "../../utils/skillMatching";

const DEFAULT_FILTERS = {
  minProficiency: "Beginner",
  minRating: 0,
  sortBy: "rating",
  mutualOnly: false,
};

function SkillSearch() {
  const { currentUser, allUsers, allSkills } = useAppContext();
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [filters] = useState(DEFAULT_FILTERS);

  const selectedSkill = getSkillById(Number(searchParams.get("skill")));

  const categories = getSkillCategories(allSkills);
  const matchingSkills = searchSkills(allSkills, query, category);

  const allTeachers = selectedSkill
    ? getTeachersForSkill(allUsers, selectedSkill.id, currentUser?.id)
    : [];

  const teachers = selectedSkill
    ? filterTeachers(allTeachers, selectedSkill.id, filters, currentUser)
    : [];

  const matches = findMatches(currentUser, allUsers);

  // If no skill is selected via URL, show all student teachers who teach any matching skills or all students
  const displayedStudents = selectedSkill
    ? teachers
    : allUsers.filter((u) => {
        if (u.id === currentUser?.id) return false;
        if (u.role !== "student") return false;
        if (category !== "All") {
          return u.skillsTaught.some((st) => {
            const sk = allSkills.find((s) => s.id === st.skillId);
            return sk?.category === category;
          });
        }
        if (query.trim()) {
          const q = query.toLowerCase();
          const matchesName = u.name.toLowerCase().includes(q);
          const matchesBio = u.bio?.toLowerCase().includes(q);
          const matchesSkills = u.skillsTaught.some((st) => {
            const sk = allSkills.find((s) => s.id === st.skillId);
            return sk?.name.toLowerCase().includes(q);
          });
          return matchesName || matchesBio || matchesSkills;
        }
        return true;
      });

  return (
    <div className="space-y-8">
      
      {/* Page Header */}
      <div>
        <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">Catalogue & Matching</span>
        <h1 className="text-3xl font-extrabold text-slate-900 mt-1">Find Skills & Peer Teachers</h1>
        <p className="text-sm text-slate-500 mt-1">
          Search through verified student offerings and discover bilateral skill matches.
        </p>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              🔍
            </span>
            <input
              type="text"
              placeholder="Search by skill name, student name, or keywords..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
            />
          </div>

          <div className="flex gap-2">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-700 outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
            >
              <option value="All">All Categories</option>
              {categories.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Quick Filter Tag Chips */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100 text-xs">
          <span className="font-bold text-slate-400 mr-1">Quick Filter:</span>
          <button
            onClick={() => setCategory("All")}
            className={`px-3 py-1 rounded-full font-semibold transition-all ${
              category === "All"
                ? "bg-indigo-600 text-white shadow-sm"
                : "bg-slate-100 hover:bg-slate-200 text-slate-600"
            }`}
          >
            All Skills ({allSkills.length})
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-3 py-1 rounded-full font-semibold transition-all ${
                category === cat
                  ? "bg-indigo-600 text-white shadow-sm"
                  : "bg-slate-100 hover:bg-slate-200 text-slate-600"
              }`}
            >
              {cat}
            </button>
          ))}
          {selectedSkill && (
            <button
              onClick={() => setSearchParams({})}
              className="px-3 py-1 rounded-full bg-rose-50 text-rose-700 font-semibold border border-rose-200 hover:bg-rose-100 ml-auto"
            >
              ✕ Clear Filter: {selectedSkill.name}
            </button>
          )}
        </div>
      </div>

      {/* Popular Skills Quick Picker */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-bold text-slate-800">Available Skills Catalogue</h2>
          <span className="text-xs text-slate-400">{matchingSkills.length} skills listed</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {matchingSkills.map((sk) => {
            const isSel = selectedSkill?.id === sk.id;
            return (
              <button
                key={sk.id}
                onClick={() => setSearchParams(isSel ? {} : { skill: String(sk.id) })}
                className={`p-3 rounded-xl border text-left transition-all ${
                  isSel
                    ? "bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-100 font-bold"
                    : "bg-white border-slate-200 hover:border-indigo-300 text-slate-700 hover:bg-slate-50"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] uppercase font-bold tracking-wider ${isSel ? "text-indigo-200" : "text-indigo-600"}`}>
                    {sk.category}
                  </span>
                  {isSel && <span className="text-xs">✓</span>}
                </div>
                <p className="text-sm font-extrabold mt-1 truncate">{sk.name}</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Student Cards Section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-extrabold text-slate-900">
              {selectedSkill ? `Students Who Teach ${selectedSkill.name}` : "Available Peer Teachers"}
            </h2>
            <p className="text-xs text-slate-500">
              {displayedStudents.length} {displayedStudents.length === 1 ? "student" : "students"} ready to exchange skills
            </p>
          </div>
        </div>

        {displayedStudents.length === 0 ? (
          <div className="p-12 rounded-2xl bg-white border border-dashed border-slate-300 text-center text-slate-500">
            <span className="text-3xl block mb-2">🔍</span>
            <p className="font-bold">No students found matching this criteria.</p>
            <button
              onClick={() => { setCategory("All"); setQuery(""); setSearchParams({}); }}
              className="mt-3 px-4 py-2 rounded-xl bg-indigo-50 text-indigo-700 font-bold text-xs"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedStudents.map((u) => (
              <StudentCard
                key={u.id}
                user={u}
                skillId={selectedSkill?.id}
                exchange={getExchange(currentUser, u)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Complementary Mutual Matches Section */}
      {matches.length > 0 && (
        <div className="p-6 rounded-3xl bg-indigo-50/60 border border-indigo-200">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-lg">✨</span>
            <div>
              <h2 className="text-base font-extrabold text-indigo-950">Your Direct Skill Exchange Matches</h2>
              <p className="text-xs text-indigo-700">
                These students teach what you want to learn AND want to learn what you teach!
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {matches.map(({ user, exchange }) => (
              <StudentCard key={user.id} user={user} exchange={exchange} />
            ))}
          </div>
        </div>
      )}

    </div>
  );
}

export default SkillSearch;
