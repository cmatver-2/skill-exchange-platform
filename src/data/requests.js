// src/data/requests.js
// Learning requests sent between users.
// status: "pending" | "accepted" | "rejected"
// A session (see sessions.js) is only created once a request is "accepted".

export const requests = [
  {
    id: 1,
    fromUserId: 1,   // Rahul (learner)
    toUserId: 2,     // Arjun (teacher)
    skillId: 5,       // Photoshop
    message: "Hey! I'd love to learn the basics of Photoshop from you.",
    status: "accepted",
    createdAt: "2026-09-10T09:30:00Z",
  },
  {
    id: 2,
    fromUserId: 2,   // Arjun (learner)
    toUserId: 1,     // Rahul (teacher)
    skillId: 1,       // C++
    message: "Could you help me get started with C++ basics?",
    status: "accepted",
    createdAt: "2026-09-11T14:00:00Z",
  },
  {
    id: 3,
    fromUserId: 3,   // Sneha (learner)
    toUserId: 4,     // Aditya (teacher)
    skillId: 9,       // Guitar
    message: "I've always wanted to learn guitar, mind teaching me?",
    status: "pending",
    createdAt: "2026-09-20T11:15:00Z",
  },
  {
    id: 4,
    fromUserId: 4,   // Aditya (learner)
    toUserId: 3,     // Sneha (teacher)
    skillId: 4,       // React
    message: "Can you teach me some React fundamentals?",
    status: "rejected",
    createdAt: "2026-09-18T16:45:00Z",
  },
];
