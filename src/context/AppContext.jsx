import { createContext, useContext, useState } from "react";
import { users } from "../data/users";
import { requests as initialRequests } from "../data/requests";
import { sessions as initialSessions } from "../data/sessions";
import { reviews as initialReviews } from "../data/reviews";

const AppContext = createContext();

export function AppProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(users[0]); // mock logged-in user
  const [requests, setRequests] = useState(initialRequests);
  const [sessions, setSessions] = useState(initialSessions);
  const [reviews, setReviews] = useState(initialReviews);

  const value = {
    currentUser, setCurrentUser,
    requests, setRequests,
    sessions, setSessions,
    reviews, setReviews,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  return useContext(AppContext);
}