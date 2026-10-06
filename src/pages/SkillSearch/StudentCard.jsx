import { Link } from "react-router-dom";
import { getSkillById, getTeachingProficiency } from "../../utils/skillMatching";

function skillNames(skillIds) {
  return skillIds.map((id) => getSkillById(id)?.name).filter(Boolean).join(", ");
}

function StudentCard({ user, skillId, exchange }) {
  const proficiency = skillId ? getTeachingProficiency(user, skillId) : null;

  return (
    <div className={`bg-white rounded-2xl p-6 shadow-sm flex flex-col justify-between relative overflow-hidden transition-all hover:shadow-md ${
      exchange?.isMutual ? "border-2 border-indigo-300 shadow-indigo-50/50" : "border border-slate-200"
    }`}>
      {exchange?.isMutual && (
        <div className="absolute top-0 right-0 bg-gradient-to-l from-indigo-600 to-purple-600 text-white text-[11px] font-extrabold px-3 py-1 rounded-bl-xl shadow-sm flex items-center gap-1">
          <span>✨</span> Perfect Exchange Match!
        </div>
      )}

      <div>
        <div className="flex items-center gap-3.5 mb-4 mt-1">
          <img
            src={user.avatar}
            className="w-12 h-12 rounded-2xl object-cover border border-slate-200 shadow-sm"
            alt={user.name}
          />
          <div>
            <h3 className="text-base font-bold text-slate-900">{user.name}</h3>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-amber-500 text-xs font-bold">
                ★ {user.rating != null ? user.rating.toFixed(1) : "New"}
              </span>
              <span className="text-slate-400 text-xs">•</span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-600">
                {user.role === "admin" ? "Admin" : "Student"}
              </span>
            </div>
          </div>
        </div>

        <p className="text-xs text-slate-600 line-clamp-2 mb-4 leading-relaxed">
          {user.bio || "Student on campus ready to trade skills."}
        </p>

        {proficiency && (
          <div className="mb-3 p-2 rounded-lg bg-indigo-50 border border-indigo-100 text-xs flex items-center justify-between">
            <span className="text-slate-600 font-semibold">Teaches {getSkillById(skillId)?.name}:</span>
            <span className="font-extrabold text-indigo-700">{proficiency}</span>
          </div>
        )}

        <div className="space-y-2.5 pt-3 border-t border-slate-100 text-xs">
          <div>
            <span className="font-bold text-slate-500 block mb-1">Teaches:</span>
            <div className="flex flex-wrap gap-1.5">
              {user.skillsTaught.map((item) => (
                <span
                  key={item.skillId}
                  className="px-2.5 py-0.8 rounded-lg bg-indigo-50 text-indigo-700 font-bold border border-indigo-200 text-[11px]"
                >
                  {getSkillById(item.skillId)?.name}
                  {item.proficiency && (
                    <span className="text-[10px] text-indigo-500 font-normal ml-1">
                      ({item.proficiency})
                    </span>
                  )}
                </span>
              ))}
            </div>
          </div>

          <div>
            <span className="font-bold text-slate-500 block mb-1">Wants to Learn:</span>
            <div className="flex flex-wrap gap-1.5">
              {user.skillsWanted.map((item) => (
                <span
                  key={item.skillId}
                  className="px-2.5 py-0.8 rounded-lg bg-slate-100 text-slate-700 font-medium text-[11px]"
                >
                  {getSkillById(item.skillId)?.name}
                </span>
              ))}
            </div>
          </div>
        </div>

        {exchange?.isMutual && (
          <div className="mt-3 p-2.5 rounded-xl bg-purple-50 border border-purple-100 text-xs text-purple-900 leading-relaxed">
            You learn <strong>{skillNames(exchange.canLearn)}</strong> · You teach <strong>{skillNames(exchange.canTeach)}</strong>
          </div>
        )}
      </div>

      <div className="flex items-center gap-2 mt-5 pt-4 border-t border-slate-100">
        <Link
          to={`/profile/${user.id}`}
          className="flex-1 py-2 px-3 text-center text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-all"
        >
          View Profile
        </Link>
        <Link
          to="/requests"
          className="flex-1 py-2 px-3 text-center text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl shadow-sm transition-all"
        >
          Send Request →
        </Link>
      </div>
    </div>
  );
}

export default StudentCard;
