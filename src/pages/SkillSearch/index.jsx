// src/pages/SkillSearch/index.jsx
// Skill Search: search skills → pick one → see who teaches it → filter →
// view profile. Also lists the current user's complementary skill matches.
//
// State kept here: the search text, category, and teacher filters.
// The selected skill lives in the URL (?skill=<id>) so other pages can link
// straight to it, e.g. <Link to="/search?skill=5">.
// Everything else (matching skills, teachers, matches) is derived on render.

import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { skills } from "../../data/skills";
import { users } from "../../data/users";
import { useAppContext } from "../../context/AppContext";
import SkillCard from "../../components/SkillCard";
import SearchFilters from "./SearchFilters";
import StudentCard from "./StudentCard";
import {
  filterTeachers,
  findMatches,
  getExchange,
  getSkillById,
  getSkillCategories,
  getTeachersForSkill,
  searchSkills,
  wantsSkill,
} from "../../utils/skillMatching";
import "./SkillSearch.css";

const DEFAULT_FILTERS = {
  minProficiency: "Beginner",
  minRating: 0,
  sortBy: "rating",
  mutualOnly: false,
};

function SkillSearch() {
  const { currentUser } = useAppContext();
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [filters, setFilters] = useState(DEFAULT_FILTERS);

  const selectedSkill = getSkillById(Number(searchParams.get("skill")));

  // Derived data — recalculated every render from state + mock data.
  const categories = getSkillCategories(skills);
  const matchingSkills = searchSkills(skills, query, category);
  const allTeachers = selectedSkill
    ? getTeachersForSkill(users, selectedSkill.id, currentUser.id)
    : [];
  const teachers = selectedSkill
    ? filterTeachers(allTeachers, selectedSkill.id, filters, currentUser)
    : [];
  const matches = findMatches(currentUser, users);

  function handleSelectSkill(skillId) {
    setSearchParams({ skill: String(skillId) });
  }

  function handleClearSkill() {
    setSearchParams({});
  }

  function handleFilterChange(name, value) {
    setFilters((prev) => ({ ...prev, [name]: value }));
  }

  return (
    <div className="skill-search">
      <div className="skill-search-header">
        <span className="page-eyebrow">CATALOGUE & MATCHING</span>
        <h1>Find Skills & Peer Teachers</h1>
        <p className="skill-search__intro">
          Search for something you want to learn, or find students who complement your skills.
        </p>
      </div>

      <div className="skill-search__controls">
        <div className="skill-search__bar">
          <input
            type="search"
            placeholder="Search skills (e.g. Python, Photoshop, Guitar)..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search skills"
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            aria-label="Filter by category"
          >
            <option value="All">All Categories</option>
            {categories.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <section className="skill-search__section">
        <h2>Skills</h2>
        {matchingSkills.length === 0 ? (
          <p className="skill-search__empty">
            No skills match “{query}”{category !== "All" && ` in ${category}`}.
          </p>
        ) : (
          <div className="skill-search__skills">
            {matchingSkills.map((skill) => (
              <SkillCard
                key={skill.id}
                skill={skill}
                teacherCount={getTeachersForSkill(users, skill.id, currentUser.id).length}
                isSelected={selectedSkill?.id === skill.id}
                isWanted={wantsSkill(currentUser, skill.id)}
                onSelect={handleSelectSkill}
              />
            ))}
          </div>
        )}
      </section>

      {selectedSkill && (
        <section className="skill-search__section">
          <div className="skill-search__section-header">
            <h2>Students who teach {selectedSkill.name}</h2>
            <button type="button" className="skill-search__clear" onClick={handleClearSkill}>
              Clear
            </button>
          </div>

          <SearchFilters filters={filters} onChange={handleFilterChange} />

          {allTeachers.length === 0 ? (
            <p className="skill-search__empty">
              Nobody teaches {selectedSkill.name} yet.
            </p>
          ) : teachers.length === 0 ? (
            <p className="skill-search__empty">
              No teachers match these filters.{" "}
              <button
                type="button"
                className="skill-search__clear"
                onClick={() => setFilters(DEFAULT_FILTERS)}
              >
                Reset filters
              </button>
            </p>
          ) : (
            <div className="skill-search__results">
              {teachers.map((user) => (
                <StudentCard
                  key={user.id}
                  user={user}
                  skillId={selectedSkill.id}
                  exchange={getExchange(currentUser, user)}
                />
              ))}
            </div>
          )}
        </section>
      )}

      <section className="skill-search__section">
        <h2>Your skill matches</h2>
        <p className="skill-search__hint">
          Students who teach something you want to learn, and want to learn something you teach.
        </p>
        {matches.length === 0 ? (
          <p className="skill-search__empty">
            No matches yet. Add skills you can teach and want to learn to find exchanges.
          </p>
        ) : (
          <div className="skill-search__results">
            {matches.map(({ user, exchange }) => (
              <StudentCard key={user.id} user={user} exchange={exchange} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default SkillSearch;
