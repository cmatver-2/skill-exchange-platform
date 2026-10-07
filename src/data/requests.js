// src/data/requests.js
// Learning requests sent between users.
// status: "pending" | "accepted" | "rejected"
// A session (see sessions.js) is only created once a request is "accepted".

export const requests = [
  {
    id: 1,
    fromUserId: 1,   // Rahul (learner)
    toUserId: 2,     // Arjun (teacher)
    skillId: 5,      // Photoshop
    message: "Hey! I'd love to learn the basics of Photoshop from you.",
    status: "accepted",
    createdAt: "2026-09-10T09:30:00Z",
  },
  {
    id: 2,
    fromUserId: 2,   // Arjun (learner)
    toUserId: 1,     // Rahul (teacher)
    skillId: 1,      // C++
    message: "Could you help me get started with C++ basics?",
    status: "accepted",
    createdAt: "2026-09-11T14:00:00Z",
  },
  {
    id: 3,
    fromUserId: 3,   // Sneha (learner)
    toUserId: 4,     // Aditya (teacher)
    skillId: 9,      // Guitar
    message: "I've always wanted to learn guitar, mind teaching me?",
    status: "pending",
    createdAt: "2026-09-20T11:15:00Z",
  },
  {
    id: 4,
    fromUserId: 4,   // Aditya (learner)
    toUserId: 3,     // Sneha (teacher)
    skillId: 4,      // React
    message: "Can you teach me some React fundamentals?",
    status: "rejected",
    createdAt: "2026-09-18T16:45:00Z",
  },
  {
    id: 5,
    fromUserId: 3,   // Sneha (learner)
    toUserId: 2,     // Arjun (teacher)
    skillId: 6,      // UI Design
    message: "Could you help me understand the basics of UI design?",
    status: "pending",
    createdAt: "2026-09-24T10:20:00Z",
  },
  {
    id: 6,
    fromUserId: 1,   // Rahul (learner)
    toUserId: 2,     // Arjun (teacher)
    skillId: 5,      // Photoshop
    message: "Follow-up session on photo manipulation and digital layout.",
    status: "accepted",
    createdAt: "2026-09-21T10:00:00Z",
  },
  {
    id: 7,
    fromUserId: 7,   // Rohan (learner)
    toUserId: 8,     // Ananya (teacher)
    skillId: 7,      // Figma
    message: "Hey Ananya! Would love to learn Figma components and design tokens from you.",
    status: "accepted",
    createdAt: "2026-09-26T14:10:00Z",
  },
  {
    id: 8,
    fromUserId: 11,  // Vikram (learner)
    toUserId: 9,     // Karthik (teacher)
    skillId: 11,     // DSA
    message: "Hey Karthik, could we do a session on tree traversals and dynamic programming?",
    status: "accepted",
    createdAt: "2026-09-29T11:30:00Z",
  },
  {
    id: 9,
    fromUserId: 16,  // Nikhil (learner)
    toUserId: 6,     // Priya (teacher)
    skillId: 12,     // ML
    message: "Hi Priya! I need some guidance on neural network loss functions and PyTorch.",
    status: "accepted",
    createdAt: "2026-10-01T10:00:00Z",
  },
  {
    id: 10,
    fromUserId: 13,  // Aman (learner)
    toUserId: 7,     // Rohan (teacher)
    skillId: 14,     // 3D Modeling
    message: "Hey Rohan, love your 3D models! Can you show me the basics in Blender?",
    status: "accepted",
    createdAt: "2026-10-02T09:45:00Z",
  },
  {
    id: 11,
    fromUserId: 3,   // Sneha (learner)
    toUserId: 4,     // Aditya (teacher)
    skillId: 9,      // Guitar
    message: "Let's do our acoustic guitar intro class this week!",
    status: "accepted",
    createdAt: "2026-10-03T12:00:00Z",
  },
  {
    id: 12,
    fromUserId: 1,   // Rahul (learner)
    toUserId: 12,    // Divya (teacher)
    skillId: 17,     // French
    message: "Bonjour Divya! I want to practice basic French phrases for an upcoming exchange program.",
    status: "accepted",
    createdAt: "2026-10-04T15:00:00Z",
  },
  {
    id: 13,
    fromUserId: 9,   // Karthik (learner)
    toUserId: 11,    // Vikram (teacher)
    skillId: 19,     // Financial Literacy
    message: "Hi Vikram, can you teach me about student tax filing and ETF investing?",
    status: "accepted",
    createdAt: "2026-10-04T18:00:00Z",
  },
  {
    id: 14,
    fromUserId: 21,  // Kavya (learner)
    toUserId: 13,    // Aman (teacher)
    skillId: 4,      // React
    message: "Hey Aman, can you help me get started building components with React?",
    status: "accepted",
    createdAt: "2026-10-05T09:30:00Z",
  },
  {
    id: 15,
    fromUserId: 2,   // Arjun (learner)
    toUserId: 6,     // Priya (teacher)
    skillId: 2,      // Python
    message: "Hey Priya, I would love a walkthrough of Python data structures and loops.",
    status: "accepted",
    createdAt: "2026-10-06T10:15:00Z",
  },
  {
    id: 16,
    fromUserId: 10,  // Meera (learner)
    toUserId: 2,     // Arjun (teacher)
    skillId: 6,      // UI Design
    message: "Hi Arjun, could you review some poster designs I made and give UI feedback?",
    status: "pending",
    createdAt: "2026-10-06T14:30:00Z",
  },
  {
    id: 17,
    fromUserId: 14,  // Ishaan (learner)
    toUserId: 8,     // Ananya (teacher)
    skillId: 7,      // Figma
    message: "Hi Ananya! I need help designing an album cover in Figma. Can we exchange?",
    status: "pending",
    createdAt: "2026-10-06T16:00:00Z",
  },
];
