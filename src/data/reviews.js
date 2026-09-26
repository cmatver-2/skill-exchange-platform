// src/data/reviews.js
// Reviews are left by the learner, about the teacher, after a session
// with status "completed". reviewerId is always the learner,
// revieweeId is always the teacher for that session.

export const reviews = [
  {
    id: 1,
    sessionId: 2,
    reviewerId: 2,     // Arjun (was the learner in session 2)
    revieweeId: 1,     // Rahul (was the teacher in session 2)
    rating: 5,
    comment: "Rahul explained C++ basics really clearly, great first session!",
    createdAt: "2026-09-15T19:30:00Z",
  },
];
