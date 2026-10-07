// src/data/users.js
import user1Pic from "../assets/Profile Pics/user1.jpg";
import user2Pic from "../assets/Profile Pics/user2.jpg";
import user3Pic from "../assets/Profile Pics/user3.jpg";
import user4Pic from "../assets/Profile Pics/user4.jpg";

export const users = [
  {
    id: 1,
    name: "Rahul Mehta",
    role: "student",
    avatar: user1Pic,
    bio: "CS student passionate about systems programming and backend engineering. Looking to pick up visual design.",
    interests: ["Coding", "Chess", "Open Source"],
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
    avatar: user2Pic,
    bio: "Design student and freelance illustrator. Passionate about typography and UI, eager to learn software dev.",
    interests: ["Digital Art", "Gaming", "Animation"],
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
    avatar: user3Pic,
    bio: "Frontend engineer building React applications. Looking to take up acoustic guitar this semester.",
    interests: ["Web Dev", "Music", "Travel"],
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
    avatar: user4Pic,
    bio: "Fingerstyle guitarist and audio enthusiast trying to break into modern UI and product design.",
    interests: ["Music Production", "Design", "Photography"],
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
    avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=admin",
    bio: "Platform administrator governing student safety and skill catalogue quality.",
    interests: ["Governance", "Campus Life"],
    skillsTaught: [],
    skillsWanted: [],
    rating: null,
  },
  {
    id: 6,
    name: "Priya Sharma",
    role: "student",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    bio: "Final year AI research fellow. Love making machine learning math intuitive. Want to master public speaking.",
    interests: ["Deep Learning", "Robotics", "Debating"],
    skillsTaught: [
      { skillId: 12, proficiency: "Advanced" },   // Machine Learning
      { skillId: 2, proficiency: "Advanced" },    // Python
    ],
    skillsWanted: [
      { skillId: 8, proficiency: "Beginner" },    // Public Speaking
    ],
    rating: 4.9,
  },
  {
    id: 7,
    name: "Rohan Verma",
    role: "student",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    bio: "Mechanical engineering student into 3D CAD modeling and rapid prototyping. Interested in learning UI design.",
    interests: ["3D Printing", "Formula Student", "CAD"],
    skillsTaught: [
      { skillId: 14, proficiency: "Advanced" },   // 3D Modeling
      { skillId: 1, proficiency: "Intermediate" }, // C++
    ],
    skillsWanted: [
      { skillId: 6, proficiency: "Beginner" },    // UI Design
    ],
    rating: 4.7,
  },
  {
    id: 8,
    name: "Ananya Iyer",
    role: "student",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80",
    bio: "HCI researcher and Figma advocate. I can teach you auto-layout and design systems. Looking to build React apps.",
    interests: ["Design Systems", "Usability Testing", "Coffee"],
    skillsTaught: [
      { skillId: 7, proficiency: "Advanced" },    // Figma
      { skillId: 6, proficiency: "Advanced" },    // UI Design
    ],
    skillsWanted: [
      { skillId: 4, proficiency: "Intermediate" }, // React
    ],
    rating: 5.0,
  },
  {
    id: 9,
    name: "Karthik Nair",
    role: "student",
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80",
    bio: "Competitive programmer with 1800+ rating on Codeforces. Happy to teach algorithms and interview prep.",
    interests: ["Algorithms", "Competitive Programming", "Chess"],
    skillsTaught: [
      { skillId: 11, proficiency: "Advanced" },   // DSA
      { skillId: 1, proficiency: "Advanced" },    // C++
    ],
    skillsWanted: [
      { skillId: 9, proficiency: "Beginner" },    // Guitar
    ],
    rating: 4.8,
  },
  {
    id: 10,
    name: "Meera Sen",
    role: "student",
    avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&auto=format&fit=crop&q=80",
    bio: "Campus film club secretary. Video editing, color grading, and portrait photography specialist.",
    interests: ["Filmmaking", "Storytelling", "Street Photography"],
    skillsTaught: [
      { skillId: 13, proficiency: "Advanced" },   // Video Editing
      { skillId: 20, proficiency: "Advanced" },   // Photography
    ],
    skillsWanted: [
      { skillId: 2, proficiency: "Beginner" },    // Python
    ],
    rating: 4.6,
  },
  {
    id: 11,
    name: "Vikram Patel",
    role: "student",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    bio: "Finance and economics enthusiast. I teach budgeting, stock markets, and Excel modeling. Seeking DSA lessons.",
    interests: ["Markets", "Economics", "Podcasts"],
    skillsTaught: [
      { skillId: 19, proficiency: "Advanced" },   // Financial Literacy
      { skillId: 8, proficiency: "Intermediate" }, // Public Speaking
    ],
    skillsWanted: [
      { skillId: 11, proficiency: "Beginner" },   // DSA
    ],
    rating: 4.9,
  },
  {
    id: 12,
    name: "Divya Menon",
    role: "student",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
    bio: "Bilingual student fluent in French and German. Passionate about language exchange and intercultural communication.",
    interests: ["Languages", "European History", "Baking"],
    skillsTaught: [
      { skillId: 17, proficiency: "Advanced" },   // French
      { skillId: 18, proficiency: "Intermediate" }, // German
    ],
    skillsWanted: [
      { skillId: 5, proficiency: "Beginner" },    // Photoshop
    ],
    rating: 4.8,
  },
  {
    id: 13,
    name: "Aman Gupta",
    role: "student",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80",
    bio: "Full-stack web developer. Built 4 production React apps. Want to learn 3D modeling for WebGL games.",
    interests: ["Next.js", "Hackathons", "WebGL"],
    skillsTaught: [
      { skillId: 4, proficiency: "Advanced" },    // React
      { skillId: 3, proficiency: "Advanced" },    // JavaScript
    ],
    skillsWanted: [
      { skillId: 14, proficiency: "Beginner" },   // 3D Modeling
    ],
    rating: 4.7,
  },
  {
    id: 14,
    name: "Ishaan Malhotra",
    role: "student",
    avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80",
    bio: "Music producer working with Ableton and classical piano. Looking to learn Figma for personal branding.",
    interests: ["Beatmaking", "Sound Synthesis", "Synthesizers"],
    skillsTaught: [
      { skillId: 16, proficiency: "Advanced" },   // Music Production
      { skillId: 15, proficiency: "Advanced" },   // Keyboard & Piano
    ],
    skillsWanted: [
      { skillId: 7, proficiency: "Beginner" },    // Figma
    ],
    rating: 4.9,
  },
  {
    id: 15,
    name: "Tanvi Joshi",
    role: "student",
    avatar: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=150&auto=format&fit=crop&q=80",
    bio: "Campus editorial head. Experienced in copywriting, essay structuring, and TEDx speaking coach.",
    interests: ["Journalism", "Debating", "Creative Nonfiction"],
    skillsTaught: [
      { skillId: 19, proficiency: "Advanced" },   // Content Writing
      { skillId: 8, proficiency: "Advanced" },    // Public Speaking
    ],
    skillsWanted: [
      { skillId: 13, proficiency: "Beginner" },   // Video Editing
    ],
    rating: 4.8,
  },
  {
    id: 16,
    name: "Nikhil Deshmukh",
    role: "student",
    avatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150&auto=format&fit=crop&q=80",
    bio: "Data science student doing research on NLP. Can teach Python from scratch. Want to learn conversational French.",
    interests: ["NLP", "Data Visualization", "Cycling"],
    skillsTaught: [
      { skillId: 2, proficiency: "Advanced" },    // Python
      { skillId: 12, proficiency: "Intermediate" }, // Machine Learning
    ],
    skillsWanted: [
      { skillId: 17, proficiency: "Beginner" },   // French
    ],
    rating: 4.5,
  },
  {
    id: 17,
    name: "Pooja Reddy",
    role: "student",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80",
    bio: "Architecture undergraduate. Love Blender rendering and architectural photography. Planning an exchange to Spain.",
    interests: ["Parametric Design", "Architecture", "Sketching"],
    skillsTaught: [
      { skillId: 14, proficiency: "Advanced" },   // 3D Modeling
      { skillId: 20, proficiency: "Intermediate" }, // Photography
    ],
    skillsWanted: [
      { skillId: 10, proficiency: "Beginner" },   // Spanish
    ],
    rating: 4.9,
  },
  {
    id: 18,
    name: "Farhan Ali",
    role: "student",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80",
    bio: "Passionate about computer algorithms, tree traversal, and dynamic programming. Want to learn electronic music.",
    interests: ["Graph Algorithms", "Competitive Coding", "Synthesizers"],
    skillsTaught: [
      { skillId: 11, proficiency: "Advanced" },   // DSA
      { skillId: 2, proficiency: "Advanced" },    // Python
    ],
    skillsWanted: [
      { skillId: 16, proficiency: "Beginner" },   // Music Production
    ],
    rating: 4.8,
  },
  {
    id: 19,
    name: "Rhea Chakraborty",
    role: "student",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
    bio: "Digital artist and visual designer. Teach Photoshop tricks and digital brushes. Want to understand ML algorithms.",
    interests: ["Digital Painting", "Concept Art", "Anime"],
    skillsTaught: [
      { skillId: 5, proficiency: "Advanced" },    // Photoshop
      { skillId: 6, proficiency: "Intermediate" }, // UI Design
    ],
    skillsWanted: [
      { skillId: 12, proficiency: "Beginner" },   // Machine Learning
    ],
    rating: 4.6,
  },
  {
    id: 20,
    name: "Siddharth Das",
    role: "student",
    avatar: "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=150&auto=format&fit=crop&q=80",
    bio: "Classical pianist and acoustic guitarist. Love jamming and teaching chord progressions. Want personal finance tips.",
    interests: ["Classical Music", "Jazz", "Jam Sessions"],
    skillsTaught: [
      { skillId: 15, proficiency: "Advanced" },   // Keyboard & Piano
      { skillId: 9, proficiency: "Intermediate" }, // Guitar
    ],
    skillsWanted: [
      { skillId: 19, proficiency: "Beginner" },   // Financial Literacy
    ],
    rating: 4.7,
  },
  {
    id: 21,
    name: "Kavya Nambiar",
    role: "student",
    avatar: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=150&auto=format&fit=crop&q=80",
    bio: "Spanish language certified (DELE C1) and French intermediate. Looking to learn modern frontend web development.",
    interests: ["Linguistics", "World Cinema", "Traveling"],
    skillsTaught: [
      { skillId: 10, proficiency: "Advanced" },   // Spanish
      { skillId: 17, proficiency: "Intermediate" }, // French
    ],
    skillsWanted: [
      { skillId: 4, proficiency: "Beginner" },    // React
    ],
    rating: 5.0,
  },
];
