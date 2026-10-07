import { createContext, useContext, useState } from "react";
import { users as initialUsers } from "../data/users";
import { requests as initialRequests } from "../data/requests";
import { sessions as initialSessions } from "../data/sessions";
import { reviews as initialReviews } from "../data/reviews";
import { skills as initialSkills } from "../data/skills";

const AppContext = createContext();

export function AppProvider({ children }) {
  const [allUsers, setAllUsers] = useState(initialUsers);
  const [currentUser, setCurrentUser] = useState(initialUsers[1]); // default: Arjun Nair
  const [requests, setRequests] = useState(initialRequests);
  const [sessions, setSessions] = useState(initialSessions);
  const [reviews, setReviews] = useState(initialReviews);
  const [allSkills, setAllSkills] = useState(initialSkills);

  const switchUser = (userId) => {
    const found = allUsers.find((u) => u.id === Number(userId));
    if (found) setCurrentUser(found);
  };

  const value = {
    currentUser,
    setCurrentUser,
    switchUser,
    allUsers,
    setAllUsers,
    requests,
    setRequests,
    sessions,
    setSessions,
    reviews,
    setReviews,
    allSkills,
    setAllSkills,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  return useContext(AppContext);
}