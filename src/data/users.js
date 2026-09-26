// src/data/users.js
// Mock user accounts.
// - skillsTaught / skillsWanted reference skill IDs from skills.js
// - rating is an aggregate value, calculated from reviews.js (avg of all
//   reviews where this user was the reviewee), stored here for convenience
//   so components don't need to recompute it every render.
// - role is "student" or "admin"

export const users = [
  {
    id: 1,
    name: "Rahul Mehta",
    role: "student",
    avatar: "https://i.pravatar.cc/150?img=1",
    bio: "CS student who loves backend dev. Trying to pick up design skills.",
    interests: ["Coding", "Chess", "Sci-fi movies"],
    skillsTaught: [
      { skillId: 1, proficiency: "Advanced" },   // C++
      { skillId: 2, proficiency: "Intermediate" }, // Python
    ],
    skillsWanted: [
      { skillId: 5, proficiency: "Beginner" },   // Photoshop
    ],
    rating: 4.5,
  },
  {
    id: 2,
    name: "Arjun Nair",
    role: "student",
    avatar: "https://i.pravatar.cc/150?img=2",
    bio: "Design student, freelance illustrator. Want to get into programming.",
    interests: ["Digital art", "Gaming", "Anime"],
    skillsTaught: [
      { skillId: 5, proficiency: "Advanced" },   // Photoshop
      { skillId: 6, proficiency: "Advanced" },   // UI Design
    ],
    skillsWanted: [
      { skillId: 1, proficiency: "Beginner" },   // C++
    ],
    rating: 4.8,
  },
  {
    id: 3,
    name: "Sneha Kapoor",
    role: "student",
    avatar: "https://i.pravatar.cc/150?img=3",
    bio: "Frontend dev, always learning something new on the side.",
    interests: ["Web dev", "Music", "Travel"],
    skillsTaught: [
      { skillId: 3, proficiency: "Advanced" },   // JavaScript
      { skillId: 4, proficiency: "Intermediate" }, // React
    ],
    skillsWanted: [
      { skillId: 9, proficiency: "Beginner" },   // Guitar
    ],
    rating: 4.2,
  },
  {
    id: 4,
    name: "Aditya Rao",
    role: "student",
    avatar: "https://i.pravatar.cc/150?img=4",
    bio: "Musician trying to break into UI design.",
    interests: ["Music production", "Design", "Photography"],
    skillsTaught: [
      { skillId: 9, proficiency: "Advanced" },   // Guitar
    ],
    skillsWanted: [
      { skillId: 7, proficiency: "Beginner" },   // Figma
    ],
    rating: 4.9,
  },
  {
    id: 5,
    name: "Admin User",
    role: "admin",
    avatar: "https://i.pravatar.cc/150?img=5",
    bio: "Platform administrator.",
    interests: [],
    skillsTaught: [],
    skillsWanted: [],
    rating: null,
  },
];
