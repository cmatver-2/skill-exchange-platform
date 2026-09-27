// src/pages/SkillSearch/SearchFilters.jsx
// Controls for narrowing down the teachers of the selected skill.
// The filter values live in the parent (SkillSearch); this component only
// displays them and reports changes through onChange(name, value).

import { PROFICIENCY_LEVELS } from "../../utils/skillMatching";

function SearchFilters({ filters, onChange }) {
  return (
    <div className="search-filters">
      <label>
        Min. proficiency
        <select
          value={filters.minProficiency}
          onChange={(e) => onChange("minProficiency", e.target.value)}
        >
          {PROFICIENCY_LEVELS.map((level) => (
            <option key={level} value={level}>
              {level}
            </option>
          ))}
        </select>
      </label>

      <label>
        Min. rating
        <select
          value={filters.minRating}
          onChange={(e) => onChange("minRating", Number(e.target.value))}
        >
          <option value={0}>Any</option>
          <option value={3}>3★ and up</option>
          <option value={4}>4★ and up</option>
          <option value={4.5}>4.5★ and up</option>
        </select>
      </label>

      <label>
        Sort by
        <select value={filters.sortBy} onChange={(e) => onChange("sortBy", e.target.value)}>
          <option value="rating">Rating</option>
          <option value="proficiency">Proficiency</option>
          <option value="name">Name</option>
        </select>
      </label>

      <label className="search-filters__checkbox">
        <input
          type="checkbox"
          checked={filters.mutualOnly}
          onChange={(e) => onChange("mutualOnly", e.target.checked)}
        />
        Skill matches only
      </label>
    </div>
  );
}

export default SearchFilters;
