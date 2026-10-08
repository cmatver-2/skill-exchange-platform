import { createContext, useContext, useState, useEffect } from "react";
import { useUser } from "@clerk/react";

import { users as initialUsers } from "../data/users";
import { requests as initialRequests } from "../data/requests";
import { sessions as initialSessions } from "../data/sessions";
import { reviews as initialReviews } from "../data/reviews";
import { skills as initialSkills } from "../data/skills";

const AppContext = createContext();

export function AppProvider({ children }) {
  const { user, isLoaded } = useUser();

  const [allUsers, setAllUsers] = useState(initialUsers);
  const [currentUser, setCurrentUser] = useState(null);
  const [requests, setRequests] = useState(initialRequests);
  const [sessions, setSessions] = useState(initialSessions);
  const [reviews, setReviews] = useState(initialReviews);
  const [allSkills, setAllSkills] = useState(initialSkills);

  useEffect(() => {
    if (!isLoaded) return;

    if (!user) {
      setCurrentUser(null);
      return;
    }

    // Current authenticated SkillSwap user.
    // Application-specific data will eventually come from the backend.
    setCurrentUser({
      id: user.id,
      clerkId: user.id,
      name: user.fullName || user.firstName || "User",
      email: user.primaryEmailAddress?.emailAddress || "",
      avatar: user.imageUrl,
      role: "student",
      bio: "",
      interests: [],
      skillsTaught: [],
      skillsWanted: [],
      rating: null,
    });
  }, [user, isLoaded]);

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

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}