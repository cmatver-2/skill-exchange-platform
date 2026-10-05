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

  const getProficiencyBadgeClass = (prof) => {
    switch (prof?.toLowerCase()) {
      case "advanced":
        return "badge-success";
      case "intermediate":
        return "badge-primary";
      case "beginner":
        return "badge-warning";
      default:
        return "badge-neutral";
    }
  };

  return (
    <article className={`student-card card card-hover ${exchange?.isMutual ? "student-card--mutual" : ""}`}>
      {exchange?.isMutual && (
        <div className="student-card__mutual-ribbon">
          <span>✨</span> Perfect Exchange Match!
        </div>
      )}

      <header className="student-card__header">
        <img className="student-card__avatar" src={user.avatar} alt={user.name} />
        <div className="student-card__title-group">
          <h3 className="student-card__name">{user.name}</h3>
          <div className="student-card__meta-row">
            <span className="student-card__rating">
              {user.rating != null ? `★ ${user.rating.toFixed(1)}` : "★ New"}
            </span>
            <span className="badge badge-neutral student-card__role">Student</span>
          </div>
        </div>
      </header>

      {proficiency && (
        <div className="student-card__proficiency-banner">
          <span>Teaches {getSkillById(skillId)?.name}:</span>
          <span className={`badge ${getProficiencyBadgeClass(proficiency)}`}>
            {proficiency}
          </span>
        </div>
      )}

      <p className="student-card__bio">{user.bio}</p>

      <div className="student-card__skills-section">
        <div className="skill-group">
          <span className="skill-label">Teaches</span>
          <span className="skill-values">
            {skillNames(user.skillsTaught.map((entry) => entry.skillId)) || "—"}
          </span>
        </div>
        <div className="skill-group">
          <span className="skill-label">Wants to learn</span>
          <span className="skill-values">
            {skillNames(user.skillsWanted.map((entry) => entry.skillId)) || "—"}
          </span>
        </div>
      </div>

      {exchange?.isMutual && (
        <div className="student-card__exchange-banner">
          <p>
            You learn <strong>{skillNames(exchange.canLearn)}</strong> · You teach{" "}
            <strong>{skillNames(exchange.canTeach)}</strong>
          </p>
        </div>
      )}

      <footer className="student-card__footer">
        <Link className="btn btn-secondary btn-sm" to={`/profile/${user.id}`}>
          View Profile
        </Link>
        <Link className="btn btn-primary btn-sm" to="/requests">
          Send Request →
        </Link>
      </footer>
    </article>
  );
}

export default StudentCard;
