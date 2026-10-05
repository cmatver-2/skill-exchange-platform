import { useState } from "react";
import { useAppContext } from "../../context/AppContext";
import { useParams, Link } from "react-router-dom";
import { skills } from "../../data/skills";
import { users } from "../../data/users";
import "../../styles/profile.css";

function Profile() {
  const { userId } = useParams();

  const {
    currentUser,
    setCurrentUser,
    reviews,
  } = useAppContext();

  const user = Number(userId) === currentUser.id
    ? currentUser
    : users.find((u) => u.id === Number(userId));

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user?.name || "");
  const [bio, setBio] = useState(user?.bio || "");
  const [interests, setInterests] = useState(
    user?.interests?.join(", ") || ""
  );

  if (!user) {
    return (
      <div className="profile-page">
        <div className="card text-center py-12">
          <h2>User not found</h2>
          <p className="text-muted">The student profile you are looking for does not exist.</p>
          <Link to="/" className="btn btn-primary mt-4">Return Home</Link>
        </div>
      </div>
    );
  }

  const userReviews = reviews.filter(
    (review) => review.revieweeId === user.id
  );

  const getSkillName = (skillId) => {
    const skill = skills.find((skill) => skill.id === skillId);
    return skill ? skill.name : "Unknown Skill";
  };

  const getSkillCategory = (skillId) => {
    const skill = skills.find((skill) => skill.id === skillId);
    return skill ? skill.category : "General";
  };

  const getProficiencyClass = (level) => {
    switch (level?.toLowerCase()) {
      case "advanced":
        return "badge-success";
      case "intermediate":
        return "badge-primary";
      case "beginner":
        return "badge-warning";
      default:
        return "badge-neutral";
    }
  };

  const handleSave = (event) => {
    event.preventDefault();

    const updatedUser = {
      ...currentUser,
      name: name.trim(),
      bio: bio.trim(),
      interests: interests
        .split(",")
        .map((interest) => interest.trim())
        .filter((interest) => interest !== ""),
    };

    setCurrentUser(updatedUser);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setName(user.name);
    setBio(user.bio);
    setInterests(user.interests.join(", "));
    setIsEditing(false);
  };

  const isSelf = user.id === currentUser.id;

  return (
    <div className="profile-page">

      {/* Profile Header Hero Card */}
      <div className="profile-hero-card">
        <div className="profile-hero-banner"></div>

        <div className="profile-hero-body">
          <div className="profile-avatar-wrapper">
            <img src={user.avatar} alt={user.name} className="profile-avatar" />
            <span className="profile-status-dot" title="Active on campus"></span>
          </div>

          <div className="profile-hero-info">
            <div className="profile-name-row">
              <h1>{user.name}</h1>
              <span className="badge badge-primary">{user.role}</span>
            </div>

            <p className="profile-bio-text">{user.bio}</p>

            <div className="profile-meta-row">
              <span className="profile-rating-pill">
                ⭐ {user.rating ? `${user.rating.toFixed(1)} / 5.0` : "No ratings"}
              </span>
              <span>•</span>
              <span className="profile-meta-text">
                {user.skillsTaught.length} skills teaching · {user.skillsWanted.length} skills learning
              </span>
            </div>
          </div>

          <div className="profile-hero-actions">
            {isSelf ? (
              <button
                type="button"
                className="btn btn-outline"
                onClick={() => setIsEditing(true)}
              >
                ✏️ Edit Profile
              </button>
            ) : (
              <Link to="/requests" className="btn btn-primary">
                📩 Propose Skill Swap
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Edit Profile Form Modal/Section */}
      {isEditing && isSelf && (
        <div className="card profile-edit-card fade-in">
          <div className="panel-header">
            <div>
              <h2>Edit Profile Information</h2>
              <p>Update your display name, bio, and topics of interest.</p>
            </div>
          </div>

          <form onSubmit={handleSave} className="profile-edit-form">
            <div className="form-group">
              <label htmlFor="profile-name" className="form-label">
                Full Name
              </label>
              <input
                id="profile-name"
                type="text"
                className="form-input"
                value={name}
                onChange={(event) => setName(event.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="profile-bio" className="form-label">
                Short Bio
              </label>
              <textarea
                id="profile-bio"
                className="form-textarea"
                value={bio}
                onChange={(event) => setBio(event.target.value)}
                rows="3"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="profile-interests" className="form-label">
                Interests (comma separated)
              </label>
              <input
                id="profile-interests"
                type="text"
                className="form-input"
                value={interests}
                onChange={(event) => setInterests(event.target.value)}
                placeholder="Example: Coding, Design, Chess, Music"
              />
            </div>

            <div className="edit-buttons">
              <button type="submit" className="btn btn-primary">
                Save Changes
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleCancel}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Skills Split Row */}
      <div className="profile-grid-two-cols">
        
        {/* Skills I Can Teach */}
        <div className="card profile-card">
          <div className="profile-card-header">
            <span className="profile-card-icon bg-indigo">🎓</span>
            <div>
              <h3>Skills I Can Teach</h3>
              <p>Offerings available for peer sessions.</p>
            </div>
          </div>

          <div className="profile-skills-list">
            {user.skillsTaught.length === 0 ? (
              <p className="empty-subtext">No teaching skills listed yet.</p>
            ) : (
              user.skillsTaught.map((skill) => (
                <div className="profile-skill-item" key={skill.skillId}>
                  <div>
                    <span className="profile-skill-name">{getSkillName(skill.skillId)}</span>
                    <span className="profile-skill-cat">{getSkillCategory(skill.skillId)}</span>
                  </div>
                  <span className={`badge ${getProficiencyClass(skill.proficiency)}`}>
                    {skill.proficiency}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Skills I Want to Learn */}
        <div className="card profile-card">
          <div className="profile-card-header">
            <span className="profile-card-icon bg-purple">🎯</span>
            <div>
              <h3>Skills I Want to Learn</h3>
              <p>Topics looking for peer mentorship.</p>
            </div>
          </div>

          <div className="profile-skills-list">
            {user.skillsWanted.length === 0 ? (
              <p className="empty-subtext">No wanted skills listed yet.</p>
            ) : (
              user.skillsWanted.map((skill) => (
                <div className="profile-skill-item" key={skill.skillId}>
                  <div>
                    <span className="profile-skill-name">{getSkillName(skill.skillId)}</span>
                    <span className="profile-skill-cat">{getSkillCategory(skill.skillId)}</span>
                  </div>
                  <span className={`badge ${getProficiencyClass(skill.proficiency)}`}>
                    {skill.proficiency} Goal
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

      </div>

      {/* Interests & Reviews Grid */}
      <div className="profile-grid-two-cols">
        
        {/* Interests */}
        <div className="card profile-card">
          <div className="profile-card-header">
            <span className="profile-card-icon bg-amber">💡</span>
            <div>
              <h3>Interests & Passions</h3>
              <p>Topics for casual icebreaking and networking.</p>
            </div>
          </div>

          {user.interests.length === 0 ? (
            <p className="empty-subtext">No interests added yet.</p>
          ) : (
            <div className="profile-interests-cloud">
              {user.interests.map((interest) => (
                <span key={interest} className="interest-tag">
                  {interest}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Student Reviews */}
        <div className="card profile-card">
          <div className="profile-card-header">
            <span className="profile-card-icon bg-emerald">⭐</span>
            <div>
              <h3>Peer Reviews ({userReviews.length})</h3>
              <p>Feedback from completed learning sessions.</p>
            </div>
          </div>

          <div className="profile-reviews-list">
            {userReviews.length === 0 ? (
              <p className="empty-subtext">No peer reviews received yet.</p>
            ) : (
              userReviews.map((review) => (
                <div className="profile-review-card" key={review.id}>
                  <div className="profile-review-header">
                    <span className="review-stars">
                      {"★".repeat(review.rating)}{"☆".repeat(5 - review.rating)}
                    </span>
                    <span className="review-rating-num">{review.rating} / 5</span>
                  </div>
                  <p className="review-comment-text">“{review.comment}”</p>
                </div>
              ))
            )}
          </div>
        </div>

      </div>

      <div className="profile-bottom-nav">
        <Link className="btn btn-secondary" to="/dashboard">
          ← Return to Dashboard
        </Link>
      </div>

    </div>
  );
}

export default Profile;