// src/data/reviews.js
// Reviews are left by the learner, about the teacher, after a session
// with status "completed". reviewerId is always the learner,
// revieweeId is always the teacher for that session.

export const reviews = [
  {
    id: 1,
    sessionId: 2,
    reviewerId: 2,     // Arjun
    revieweeId: 1,     // Rahul
    rating: 5,
    comment: "Rahul explained C++ memory allocation and pointers really clearly, great first session!",
    createdAt: "2026-09-15T19:30:00Z",
  },
  {
    id: 2,
    sessionId: 3,
    reviewerId: 1,     // Rahul
    revieweeId: 2,     // Arjun
    rating: 5,
    comment: "Arjun walked me through pen tool and layers in Photoshop with great hands-on examples.",
    createdAt: "2026-09-22T18:00:00Z",
  },
  {
    id: 3,
    sessionId: 4,
    reviewerId: 7,     // Rohan
    revieweeId: 8,     // Ananya
    rating: 5,
    comment: "Ananya is an amazing Figma mentor! Taught me auto-layout and components in under an hour.",
    createdAt: "2026-09-28T16:00:00Z",
  },
  {
    id: 4,
    sessionId: 5,
    reviewerId: 11,    // Vikram
    revieweeId: 9,     // Karthik
    rating: 5,
    comment: "Karthik made binary search trees so simple. Definitely booking another DSA session with him.",
    createdAt: "2026-10-01T15:30:00Z",
  },
  {
    id: 5,
    sessionId: 6,
    reviewerId: 16,    // Nikhil
    revieweeId: 6,     // Priya
    rating: 5,
    comment: "Priya helped debug my gradient descent code and explained backpropagation intuitively.",
    createdAt: "2026-10-02T14:00:00Z",
  },
  {
    id: 6,
    sessionId: 7,
    reviewerId: 13,    // Aman
    revieweeId: 7,     // Rohan
    rating: 5,
    comment: "Rohan demonstrated Blender 3D modeling fundamentals brilliantly. Super patient tutor!",
    createdAt: "2026-10-03T17:00:00Z",
  },
  {
    id: 7,
    sessionId: 8,
    reviewerId: 3,     // Sneha
    revieweeId: 4,     // Aditya
    rating: 5,
    comment: "Aditya broke down guitar fingerings and basic chords step-by-step. Fun session!",
    createdAt: "2026-10-04T18:30:00Z",
  },
  {
    id: 8,
    sessionId: 9,
    reviewerId: 1,     // Rahul
    revieweeId: 12,    // Divya
    rating: 5,
    comment: "Divya's conversational French practice was so encouraging! Her pronunciation tips were gold.",
    createdAt: "2026-10-05T16:15:00Z",
  },
  {
    id: 9,
    sessionId: 10,
    reviewerId: 9,     // Karthik
    revieweeId: 11,    // Vikram
    rating: 5,
    comment: "Vikram broke down personal taxes, mutual funds, and student budgeting so clearly.",
    createdAt: "2026-10-05T19:00:00Z",
  },
  {
    id: 10,
    sessionId: 11,
    reviewerId: 21,    // Kavya
    revieweeId: 13,    // Aman
    rating: 5,
    comment: "Aman is a great React tutor. Explained props, state, and useEffect with visual diagrams.",
    createdAt: "2026-10-06T11:00:00Z",
  },
];
