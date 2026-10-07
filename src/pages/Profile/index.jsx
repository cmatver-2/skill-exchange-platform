import { useState } from "react";
import { useAppContext } from "../../context/AppContext";
import { useParams, Link } from "react-router-dom";
import { skills } from "../../data/skills";
import { users } from "../../data/users";

import user1Pic from "../../assets/Profile Pics/user1.jpg";
import user2Pic from "../../assets/Profile Pics/user2.jpg";
import user3Pic from "../../assets/Profile Pics/user3.jpg";
import user4Pic from "../../assets/Profile Pics/user4.jpg";

const AVAILABLE_AVATARS = [
  { id: 1, name: "Student 1", src: user1Pic },
  { id: 2, name: "Student 2", src: user2Pic },
  { id: 3, name: "Student 3", src: user3Pic },
  { id: 4, name: "Student 4", src: user4Pic },
];

function Profile() {
  const { userId } = useParams();
  const { currentUser, setCurrentUser, reviews, allUsers } = useAppContext();

  // Find user by URL id or fallback to currentUser
  const userList = allUsers && allUsers.length > 0 ? allUsers : users;
  const targetId = userId ? Number(userId) : currentUser?.id;
  const selectedUser = userList.find((u) => u.id === targetId);

  const user =
    currentUser && currentUser.id === targetId
      ? currentUser
      : selectedUser;

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [interests, setInterests] = useState("");
  const [avatar, setAvatar] = useState("");

  if (!user) {
    return (
      <div className="max-w-2xl mx-auto p-8 text-center bg-white rounded-3xl border border-slate-200 shadow-sm mt-8">
        <div className="w-16 h-16 bg-rose-50 text-rose-500 rounded-2xl flex items-center justify-center text-2xl mx-auto mb-4">
          ⚠️
        </div>
        <h1 className="text-2xl font-extrabold text-slate-900 mb-2">User Not Found</h1>
        <p className="text-sm text-slate-500 mb-6">
          The profile you are looking for does not exist or has been removed.
        </p>
        <Link
          to="/search"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md shadow-indigo-100 transition-all"
        >
          🔍 Browse All Skills
        </Link>
      </div>
    );
  }

  const userReviews = reviews.filter(
    (review) => review.revieweeId === user.id
  );

  const getSkill = (skillId) => {
    return skills.find((skill) => skill.id === skillId);
  };

  const getSkillName = (skillId) => {
    const skill = getSkill(skillId);
    return skill ? skill.name : "Unknown Skill";
  };

  const getSkillCategory = (skillId) => {
    const skill = getSkill(skillId);
    return skill ? skill.category : "";
  };

  const startEditing = () => {
    setName(user.name);
    setBio(user.bio || "");
    setInterests(user.interests ? user.interests.join(", ") : "");
    setAvatar(user.avatar || user2Pic);
    setIsEditing(true);
  };

  const cancelEditing = () => {
    setIsEditing(false);
  };

  const handleSave = (e) => {
    e.preventDefault();

    const updatedUser = {
      ...currentUser,
      name: name.trim() || currentUser.name,
      bio: bio.trim(),
      avatar: avatar || currentUser.avatar,
      interests: interests
        .split(",")
        .map((item) => item.trim())
        .filter((item) => item !== ""),
    };

    setCurrentUser(updatedUser);
    setIsEditing(false);
  };

  const isOwnProfile = currentUser && currentUser.id === user.id;

  return (
    <div className="space-y-8">

      {/* Profile Header Hero Card (Demo Style) */}
      <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
        {/* Colorful Gradient Banner */}
        <div className="h-36 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 relative"></div>

        {/* Profile Info Row with Overlapping Avatar */}
        <div className="px-6 sm:px-8 pb-6 pt-0 relative flex flex-col sm:flex-row sm:items-end justify-between gap-4 -mt-14">
          <div className="flex flex-col sm:flex-row items-center sm:items-end gap-4 text-center sm:text-left">
            <div className="relative group">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-28 h-28 rounded-2xl object-cover border-4 border-white shadow-lg bg-white"
              />
              <span className="absolute bottom-1 right-1 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full"></span>
              
              {isOwnProfile && (
                <button
                  type="button"
                  onClick={startEditing}
                  title="Change profile picture"
                  className="absolute inset-0 bg-slate-900/50 text-white rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-xs font-bold gap-1 cursor-pointer"
                >
                  <span className="text-base">📷</span>
                  <span className="text-[11px]">Change Pic</span>
                </button>
              )}
            </div>

            <div className="mt-2 sm:mt-0">
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <h1 className="text-2xl font-extrabold text-slate-900">{user.name}</h1>
                <span className="px-2 py-0.5 rounded-md text-[11px] font-extrabold bg-indigo-50 text-indigo-700 border border-indigo-200">
                  {user.role === "admin" ? "Platform Admin" : "Student"}
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-1 max-w-xl">
                {user.bio || "No bio added yet."}
              </p>
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 mt-2 text-xs text-slate-600">
                {user.rating !== null && (
                  <span className="text-amber-500 font-bold">⭐ {user.rating} / 5.0</span>
                )}
                <span>•</span>
                <span>📍 Campus Member</span>
                <span>•</span>
                <span>🎓 {user.skillsTaught?.length || 0} Skills Taught</span>
                <span>•</span>
                <span>🎯 {user.skillsWanted?.length || 0} Skills Wanted</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 self-center sm:self-auto">
            {isOwnProfile && (
              <button
                onClick={startEditing}
                className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md shadow-indigo-100 transition-all flex items-center gap-1.5 cursor-pointer"
              >
                ✏️ Edit Profile
              </button>
            )}
            <Link
              to="/search"
              className="px-4 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs transition-all"
            >
              Browse Skills
            </Link>
          </div>
        </div>
      </div>

      {/* Edit Profile Form (Expanded if editing) */}
      {isEditing && isOwnProfile && (
        <div className="bg-white rounded-2xl border-2 border-indigo-200 p-6 shadow-md transition-all">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center text-lg font-bold">
              ✏️
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">Edit Profile</h3>
              <p className="text-xs text-slate-500">Update your avatar, public bio, and interests</p>
            </div>
          </div>

          <form onSubmit={handleSave} className="space-y-5">
            {/* Choose Profile Picture from assets/Profile Pics */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2">
                Choose Profile Picture (from assets/Profile Pics)
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {AVAILABLE_AVATARS.map((av) => (
                  <button
                    key={av.id}
                    type="button"
                    onClick={() => setAvatar(av.src)}
                    className={`relative rounded-2xl border-2 transition-all p-2 cursor-pointer flex flex-col items-center gap-2 ${
                      avatar === av.src
                        ? "border-indigo-600 bg-indigo-50/60 ring-2 ring-indigo-400 shadow-md"
                        : "border-slate-200 hover:border-slate-300 bg-slate-50/50"
                    }`}
                  >
                    <img
                      src={av.src}
                      alt={av.name}
                      className="w-16 h-16 rounded-xl object-cover shadow-sm border border-white"
                    />
                    <span className="text-xs font-bold text-slate-700">
                      {av.name}
                    </span>
                    {avatar === av.src && (
                      <span className="absolute top-2 right-2 w-5 h-5 bg-indigo-600 text-white rounded-full text-xs font-bold flex items-center justify-center shadow-sm">
                        ✓
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm font-medium text-slate-900 focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Bio & Introduction
              </label>
              <textarea
                rows={3}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Tell classmates about your studies, passions, and background..."
                className="w-full p-3.5 rounded-xl border border-slate-200 bg-slate-50 text-sm font-medium text-slate-900 focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none resize-none transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Interests & Hobbies
              </label>
              <input
                type="text"
                value={interests}
                onChange={(e) => setInterests(e.target.value)}
                placeholder="Coding, Chess, Digital Art, Guitar"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm font-medium text-slate-900 focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
              />
              <p className="text-[11px] text-slate-400 mt-1">
                Separate items with commas (e.g. Python, Photography, Piano)
              </p>
            </div>

            <div className="flex items-center gap-3 pt-3 border-t border-slate-100">
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md shadow-indigo-100 transition-all cursor-pointer"
              >
                Save Changes
              </button>
              <button
                type="button"
                onClick={cancelEditing}
                className="px-4 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs transition-all cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Skills Split Grid (Demo Style) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Skills I Can Teach */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <span>🎓</span> Skills I Can Teach
            </h2>
            <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md">
              {user.skillsTaught?.length || 0} skills
            </span>
          </div>

          <div className="space-y-3">
            {user.skillsTaught && user.skillsTaught.length > 0 ? (
              user.skillsTaught.map((item) => (
                <div
                  key={item.skillId}
                  className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between hover:border-slate-300 transition-all"
                >
                  <div>
                    <p className="text-xs font-bold text-slate-900">
                      {getSkillName(item.skillId)}
                    </p>
                    <p className="text-[10px] text-slate-500">
                      {getSkillCategory(item.skillId) || "General"} Category
                    </p>
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
                    {item.proficiency || "Advanced"}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-xs text-slate-400 py-4 text-center">
                No teaching skills listed yet.
              </p>
            )}
          </div>
        </div>

        {/* Skills I Want to Learn */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <span>🎯</span> Skills I Want to Learn
            </h2>
            <span className="text-xs font-bold text-purple-600 bg-purple-50 px-2 py-0.5 rounded-md">
              {user.skillsWanted?.length || 0} goals
            </span>
          </div>

          <div className="space-y-3">
            {user.skillsWanted && user.skillsWanted.length > 0 ? (
              user.skillsWanted.map((item) => (
                <div
                  key={item.skillId}
                  className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between hover:border-slate-300 transition-all"
                >
                  <div>
                    <p className="text-xs font-bold text-slate-900">
                      {getSkillName(item.skillId)}
                    </p>
                    <p className="text-[10px] text-slate-500">
                      {getSkillCategory(item.skillId) || "General"} Category
                    </p>
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800">
                    {item.proficiency || "Beginner Goal"}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-xs text-slate-400 py-4 text-center">
                No learning goals added yet.
              </p>
            )}
          </div>
        </div>

      </div>

      {/* Interests & Student Reviews Split Grid (Demo Style) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Interests */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <h2 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
            <span>💡</span> Interests & Hobbies
          </h2>
          <div className="flex flex-wrap gap-2">
            {user.interests && user.interests.length > 0 ? (
              user.interests.map((interest, index) => (
                <span
                  key={index}
                  className="px-3 py-1.5 rounded-xl bg-indigo-50 text-indigo-700 font-semibold text-xs border border-indigo-100"
                >
                  {interest}
                </span>
              ))
            ) : (
              <p className="text-xs text-slate-400 py-2">
                No interests added yet.
              </p>
            )}
          </div>
        </div>

        {/* Reviews Received Feed */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <span>⭐</span> Student Reviews ({userReviews.length})
            </h2>
            <Link
              to="/reviews"
              className="text-xs text-indigo-600 font-bold hover:underline"
            >
              View all →
            </Link>
          </div>

          <div className="space-y-3">
            {userReviews.length > 0 ? (
              userReviews.map((review) => {
                const reviewer = userList.find((u) => u.id === review.reviewerId);
                return (
                  <div
                    key={review.id}
                    className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <img
                          src={reviewer?.avatar || user1Pic}
                          alt={reviewer?.name || "Student"}
                          className="w-6 h-6 rounded-full object-cover border border-slate-200"
                        />
                        <span className="text-xs font-bold text-slate-900">
                          {reviewer ? reviewer.name : "Student"}
                        </span>
                      </div>
                      <span className="text-amber-500 font-bold text-xs">
                        {"★".repeat(review.rating)}{"☆".repeat(5 - review.rating)} {review.rating}.0
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 italic">
                      "{review.comment}"
                    </p>
                    <p className="text-[10px] text-slate-400">
                      Verified exchange • {review.createdAt ? new Date(review.createdAt).toLocaleDateString() : "Recent"}
                    </p>
                  </div>
                );
              })
            ) : (
              <p className="text-xs text-slate-400 py-4 text-center">
                No reviews yet. Complete a study session to earn peer endorsements!
              </p>
            )}
          </div>
        </div>

      </div>

      {/* Bottom Back Button */}
      <div className="pt-2">
        <Link
          to="/dashboard"
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-indigo-600 transition-colors"
        >
          ← Back to Student Dashboard
        </Link>
      </div>

    </div>
  );
}

export default Profile;