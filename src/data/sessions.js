// src/data/sessions.js
// A session is only created once its related request has status "accepted".
// status: "upcoming" | "completed" | "cancelled"

export const sessions = [
  {
    id: 1,
    requestId: 1,
    teacherId: 2,      // Arjun
    learnerId: 1,      // Rahul
    skillId: 5,        // Photoshop
    date: "2026-10-12",
    time: "17:00",
    duration: 60,      // minutes
    location: "https://meet.google.com/mock-link-1",
    status: "upcoming",
  },
  {
    id: 2,
    requestId: 2,
    teacherId: 1,      // Rahul
    learnerId: 2,      // Arjun
    skillId: 1,        // C++
    date: "2026-09-15",
    time: "18:30",
    duration: 45,
    location: "https://meet.google.com/mock-link-2",
    status: "completed",
  },
  {
    id: 3,
    requestId: 6,
    teacherId: 2,      // Arjun
    learnerId: 1,      // Rahul
    skillId: 5,        // Photoshop
    date: "2026-09-22",
    time: "18:00",
    duration: 60,
    location: "https://meet.google.com/mock-link-3",
    status: "completed",
  },
  {
    id: 4,
    requestId: 7,
    teacherId: 8,      // Ananya
    learnerId: 7,      // Rohan
    skillId: 7,        // Figma
    date: "2026-09-28",
    time: "16:00",
    duration: 60,
    location: "https://meet.google.com/mock-link-4",
    status: "completed",
  },
  {
    id: 5,
    requestId: 8,
    teacherId: 9,      // Karthik
    learnerId: 11,     // Vikram
    skillId: 11,       // DSA
    date: "2026-10-01",
    time: "15:30",
    duration: 75,
    location: "https://meet.google.com/mock-link-5",
    status: "completed",
  },
  {
    id: 6,
    requestId: 9,
    teacherId: 6,      // Priya
    learnerId: 16,     // Nikhil
    skillId: 12,       // ML
    date: "2026-10-02",
    time: "14:00",
    duration: 60,
    location: "https://meet.google.com/mock-link-6",
    status: "completed",
  },
  {
    id: 7,
    requestId: 10,
    teacherId: 7,      // Rohan
    learnerId: 13,     // Aman
    skillId: 14,       // 3D Modeling
    date: "2026-10-03",
    time: "17:00",
    duration: 60,
    location: "https://meet.google.com/mock-link-7",
    status: "completed",
  },
  {
    id: 8,
    requestId: 11,
    teacherId: 4,      // Aditya
    learnerId: 3,      // Sneha
    skillId: 9,        // Guitar
    date: "2026-10-04",
    time: "18:30",
    duration: 45,
    location: "https://meet.google.com/mock-link-8",
    status: "completed",
  },
  {
    id: 9,
    requestId: 12,
    teacherId: 12,     // Divya
    learnerId: 1,      // Rahul
    skillId: 17,       // French
    date: "2026-10-05",
    time: "16:15",
    duration: 60,
    location: "https://meet.google.com/mock-link-9",
    status: "completed",
  },
  {
    id: 10,
    requestId: 13,
    teacherId: 11,     // Vikram
    learnerId: 9,      // Karthik
    skillId: 19,       // Financial Literacy
    date: "2026-10-05",
    time: "19:00",
    duration: 60,
    location: "https://meet.google.com/mock-link-10",
    status: "completed",
  },
  {
    id: 11,
    requestId: 14,
    teacherId: 13,     // Aman
    learnerId: 21,     // Kavya
    skillId: 4,        // React
    date: "2026-10-06",
    time: "11:00",
    duration: 60,
    location: "https://meet.google.com/mock-link-11",
    status: "completed",
  },
  {
    id: 12,
    requestId: 15,
    teacherId: 6,      // Priya
    learnerId: 2,      // Arjun
    skillId: 2,        // Python
    date: "2026-10-15",
    time: "16:00",
    duration: 60,
    location: "https://meet.google.com/mock-link-12",
    status: "upcoming",
  },
];
