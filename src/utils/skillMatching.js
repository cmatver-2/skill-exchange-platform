// src/utils/skillMatching.js
// Pure helper functions for skill search, filtering and matching.
// Everything here is derived from the data passed in — nothing is
// hardcoded per user, so the results stay correct if the mock data changes.

import { skills } from "../data/skills";

// Ordered lowest → highest, so the index can be used to compare levels.
export const PROFICIENCY_LEVELS = ["Beginner", "Intermediate", "Advanced"];

export function getSkillById(skillId) {
  return skills.find((skill) => skill.id === skillId);
}

// Unique category names, in the order they first appear.
export function getSkillCategories(skillList) {
  return [...new Set(skillList.map((skill) => skill.category))];
}

// Skills whose name (or category) contains the query, limited to one category
// unless category is "All". An empty query matches every skill.
export function searchSkills(skillList, query, category) {
  const text = query.trim().toLowerCase();

  return skillList.filter((skill) => {
    const matchesText =
      text === "" ||
      skill.name.toLowerCase().includes(text) ||
      skill.category.toLowerCase().includes(text);
    const matchesCategory = category === "All" || skill.category === category;
    return matchesText && matchesCategory;
  });
}

export function teachesSkill(user, skillId) {
  return user.skillsTaught.some((entry) => entry.skillId === skillId);
}

export function wantsSkill(user, skillId) {
  return user.skillsWanted.some((entry) => entry.skillId === skillId);
}

// The proficiency a user teaches a skill at, or undefined if they don't teach it.
export function getTeachingProficiency(user, skillId) {
  return user.skillsTaught.find((entry) => entry.skillId === skillId)?.proficiency;
}

export function meetsMinProficiency(level, minLevel) {
  return PROFICIENCY_LEVELS.indexOf(level) >= PROFICIENCY_LEVELS.indexOf(minLevel);
}

// Students (never admins, never the current user) who teach the given skill.
export function getTeachersForSkill(userList, skillId, currentUserId) {
  return userList.filter(
    (user) =>
      user.role === "student" &&
      user.id !== currentUserId &&
      teachesSkill(user, skillId)
  );
}

// What two users could exchange:
// - canLearn: skill IDs currentUser wants and otherUser teaches
// - canTeach: skill IDs otherUser wants and currentUser teaches
// It's a mutual (complementary) match when both lists are non-empty.
export function getExchange(currentUser, otherUser) {
  const canLearn = otherUser.skillsTaught
    .filter((entry) => wantsSkill(currentUser, entry.skillId))
    .map((entry) => entry.skillId);

  const canTeach = currentUser.skillsTaught
    .filter((entry) => wantsSkill(otherUser, entry.skillId))
    .map((entry) => entry.skillId);

  return {
    canLearn,
    canTeach,
    isMutual: canLearn.length > 0 && canTeach.length > 0,
  };
}

// Every student who forms a mutual match with currentUser, best rated first.
export function findMatches(currentUser, userList) {
  return userList
    .filter((user) => user.role === "student" && user.id !== currentUser.id)
    .map((user) => ({ user, exchange: getExchange(currentUser, user) }))
    .filter((match) => match.exchange.isMutual)
    .sort((a, b) => (b.user.rating ?? 0) - (a.user.rating ?? 0));
}

// Applies the search-page filters to a list of teachers for one skill.
// filters: { minProficiency, minRating, mutualOnly, sortBy }
export function filterTeachers(teachers, skillId, filters, currentUser) {
  const filtered = teachers.filter((user) => {
    const level = getTeachingProficiency(user, skillId);
    if (!meetsMinProficiency(level, filters.minProficiency)) return false;
    if ((user.rating ?? 0) < filters.minRating) return false;
    if (filters.mutualOnly && !getExchange(currentUser, user).isMutual) return false;
    return true;
  });

  // filter() already returned a new array, so sorting it in place
  // doesn't mutate the caller's list.
  return filtered.sort((a, b) => {
    if (filters.sortBy === "proficiency") {
      return (
        PROFICIENCY_LEVELS.indexOf(getTeachingProficiency(b, skillId)) -
        PROFICIENCY_LEVELS.indexOf(getTeachingProficiency(a, skillId))
      );
    }
    if (filters.sortBy === "name") {
      return a.name.localeCompare(b.name);
    }
    return (b.rating ?? 0) - (a.rating ?? 0);
  });
}
