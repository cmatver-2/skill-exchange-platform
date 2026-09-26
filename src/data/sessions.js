// src/data/sessions.js
// A session is only created once its related request has status "accepted".
// status: "upcoming" | "completed" | "cancelled"

export const sessions = [
  {
    id: 1,
    requestId: 1,
    teacherId: 2,      // Arjun
    learnerId: 1,      // Rahul
    skillId: 5,          // Photoshop
    date: "2026-10-02",
    time: "17:00",
    duration: 60,          // minutes
    location: "https://meet.google.com/mock-link-1",
    status: "upcoming",
  },
  {
    id: 2,
    requestId: 2,
    teacherId: 1,      // Rahul
    learnerId: 2,      // Arjun
    skillId: 1,          // C++
    date: "2026-09-15",
    time: "18:30",
    duration: 45,
    location: "https://meet.google.com/mock-link-2",
    status: "completed",
  },
];
