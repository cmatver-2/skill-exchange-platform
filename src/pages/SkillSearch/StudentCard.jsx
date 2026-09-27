// src/pages/SkillSearch/StudentCard.jsx
// One student in the search results or match list.
// - skillId (optional): the skill being searched, to show their proficiency in it
// - exchange: result of getExchange(currentUser, user)

import { Link } from "react-router-dom";
import { getSkillById, getTeachingProficiency } from "../../utils/skillMatching";

function skillNames(skillIds) {
  return skillIds.map((id) => getSkillById(id)?.name).filter(Boolean).join(", ");
}

function StudentCard({ user, skillId, exchange }) {
  const proficiency = skillId ? getTeachingProficiency(user, skillId) : null;

  return (
    <article className="student-card">
      <header className="student-card__header">
        <img className="student-card__avatar" src={user.avatar} alt="" />
        <div>
          <h3 className="student-card__name">{user.name}</h3>
          <p className="student-card__rating">
            {user.rating != null ? `★ ${user.rating.toFixed(1)}` : "No ratings yet"}
          </p>
        </div>
        {exchange.isMutual && <span className="student-card__badge">Skill match</span>}
      </header>

      {proficiency && (
        <p className="student-card__proficiency">
          Teaches {getSkillById(skillId).name} at <strong>{proficiency}</strong> level
        </p>
      )}

      <p className="student-card__bio">{user.bio}</p>

      <dl className="student-card__skills">
        <dt>Teaches</dt>
        <dd>{skillNames(user.skillsTaught.map((entry) => entry.skillId)) || "—"}</dd>
        <dt>Wants to learn</dt>
        <dd>{skillNames(user.skillsWanted.map((entry) => entry.skillId)) || "—"}</dd>
      </dl>

      {exchange.isMutual && (
        <p className="student-card__exchange">
          You learn <strong>{skillNames(exchange.canLearn)}</strong> · you teach{" "}
          <strong>{skillNames(exchange.canTeach)}</strong>
        </p>
      )}

      <Link className="student-card__link" to={`/profile/${user.id}`}>
        View profile →
      </Link>
    </article>
  );
}

export default StudentCard;
