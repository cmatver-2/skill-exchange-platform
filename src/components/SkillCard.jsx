// src/components/SkillCard.jsx
// A clickable card for one skill. Used by the Skill Search page; kept in
// components/ so other pages (e.g. Profile) can reuse it.

import "./SkillCard.css";

function SkillCard({ skill, teacherCount, isSelected, isWanted, onSelect }) {
  return (
    <button
      type="button"
      className={isSelected ? "skill-card skill-card--selected" : "skill-card"}
      onClick={() => onSelect(skill.id)}
      aria-pressed={isSelected}
    >
      <span className="skill-card__name">{skill.name}</span>
      <span className="skill-card__category">{skill.category}</span>
      <span className="skill-card__meta">
        {teacherCount === 1 ? "1 teacher" : `${teacherCount} teachers`}
        {isWanted && <span className="skill-card__wanted"> · On your wishlist</span>}
      </span>
    </button>
  );
}

export default SkillCard;
