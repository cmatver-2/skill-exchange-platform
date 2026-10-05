import { useState } from "react";
import { useAppContext } from "../../context/AppContext";
import { useParams, Link } from "react-router-dom";
import { skills } from "../../data/skills";
import { users } from "../../data/users";
import "../../styles/profile.css";

function Profile() {
  const { userId } = useParams();
  const { currentUser, setCurrentUser, reviews } = useAppContext();

  const selectedUser = users.find((u) => u.id === Number(userId));

  const user =
    currentUser && currentUser.id === Number(userId)
      ? currentUser
      : selectedUser;

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [interests, setInterests] = useState("");

  if (!user) {
    return (
      <div className="profile-page">
        <div className="card">
          <h1>User not found</h1>
          <p className="page-subtitle">
            The profile you are looking for does not exist.
          </p>
          <Link to="/search" className="btn btn-primary">
            Back to Search
          </Link>
        </div>
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
    setBio(user.bio);
    setInterests(user.interests ? user.interests.join(", ") : "");
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
      interests: interests
        .split(",")
        .map((item) => item.trim())
        .filter((item) => item !== ""),
    };

    setCurrentUser(updatedUser);
    setIsEditing(false);
  };

  return (
    <div className="profile-page">

      {/* Profile Hero */}
      <div className="profile-hero-card">

        <div className="profile-hero-banner"></div>

        <div className="profile-hero-body">

          <div className="profile-avatar-wrapper">
            <img
              className="profile-avatar"
              src={user.avatar}
              alt={user.name}
            />

            <span className="profile-status-dot"></span>
          </div>

          <div className="profile-hero-info">

            <div className="profile-name-row">
              <h1>{user.name}</h1>

              <span className="badge badge-primary">
                Student
              </span>
            </div>

            <p className="profile-bio-text">
              {user.bio || "No bio added yet."}
            </p>

            <div className="profile-meta-row">

              {user.rating !== null && (
                <span className="profile-rating-pill">
                  ★ {user.rating}
                </span>
              )}

              <span>•</span>

              <span>
                {user.skillsTaught.length} skills taught
              </span>

              <span>•</span>

              <span>
                {user.skillsWanted.length} skills wanted
              </span>

            </div>

          </div>

          <div className="profile-hero-actions">

            {currentUser && currentUser.id === user.id && (
              <button
                className="btn btn-primary"
                onClick={startEditing}
              >
                ✏️ Edit Profile
              </button>
            )}

            <Link
              to="/search"
              className="btn btn-secondary"
            >
              Browse Skills
            </Link>

          </div>

        </div>
      </div>

      {/* Edit Profile */}
      {isEditing && currentUser.id === user.id && (
        <div className="card profile-edit-card">

          <div className="profile-card-header">
            <div className="profile-card-icon bg-indigo">
              ✏️
            </div>

            <div>
              <h3>Edit Profile</h3>
              <p>Update your profile information</p>
            </div>
          </div>

          <form
            className="profile-edit-form"
            onSubmit={handleSave}
          >

            <div className="form-group">
              <label className="form-label">
                Name
              </label>

              <input
                className="form-input"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">
                Bio
              </label>

              <textarea
                className="form-textarea"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Tell others about yourself..."
              />
            </div>

            <div className="form-group">
              <label className="form-label">
                Interests
              </label>

              <input
                className="form-input"
                type="text"
                value={interests}
                onChange={(e) => setInterests(e.target.value)}
                placeholder="Coding, Chess, Music"
              />

              <small className="empty-subtext">
                Separate interests using commas.
              </small>
            </div>

            <div className="edit-buttons">

              <button
                type="submit"
                className="btn btn-primary"
              >
                Save Changes
              </button>

              <button
                type="button"
                className="btn btn-secondary"
                onClick={cancelEditing}
              >
                Cancel
              </button>

            </div>

          </form>
        </div>
      )}

      {/* Skills */}
      <div className="profile-grid-two-cols">

        {/* Skills Taught */}
        <div className="card profile-card">

          <div className="profile-card-header">

            <div className="profile-card-icon bg-indigo">
              🎓
            </div>

            <div>
              <h3>Skills I Teach</h3>
              <p>Knowledge I can share</p>
            </div>

          </div>

          <div className="profile-skills-list">

            {user.skillsTaught.length > 0 ? (
              user.skillsTaught.map((item) => (
                <div
                  className="profile-skill-item"
                  key={item.skillId}
                >
                  <div>
                    <span className="profile-skill-name">
                      {getSkillName(item.skillId)}
                    </span>

                    <span className="profile-skill-cat">
                      {getSkillCategory(item.skillId)}
                    </span>
                  </div>

                  <span className="badge badge-primary">
                    {item.proficiency}
                  </span>
                </div>
              ))
            ) : (
              <p className="empty-subtext">
                No teaching skills added yet.
              </p>
            )}

          </div>

        </div>

        {/* Skills Wanted */}
        <div className="card profile-card">

          <div className="profile-card-header">

            <div className="profile-card-icon bg-purple">
              📚
            </div>

            <div>
              <h3>Skills I Want to Learn</h3>
              <p>Skills I'm interested in</p>
            </div>

          </div>

          <div className="profile-skills-list">

            {user.skillsWanted.length > 0 ? (
              user.skillsWanted.map((item) => (
                <div
                  className="profile-skill-item"
                  key={item.skillId}
                >
                  <div>
                    <span className="profile-skill-name">
                      {getSkillName(item.skillId)}
                    </span>

                    <span className="profile-skill-cat">
                      {getSkillCategory(item.skillId)}
                    </span>
                  </div>

                  <span className="badge badge-secondary">
                    {item.proficiency}
                  </span>
                </div>
              ))
            ) : (
              <p className="empty-subtext">
                No learning goals added yet.
              </p>
            )}

          </div>

        </div>

      </div>

      {/* Interests */}
      <div className="card profile-card">

        <div className="profile-card-header">

          <div className="profile-card-icon bg-amber">
            ⭐
          </div>

          <div>
            <h3>Interests</h3>
            <p>Things I enjoy</p>
          </div>

        </div>

        <div className="profile-interests-cloud">

          {user.interests && user.interests.length > 0 ? (
            user.interests.map((interest, index) => (
              <span
                className="interest-tag"
                key={index}
              >
                {interest}
              </span>
            ))
          ) : (
            <p className="empty-subtext">
              No interests added yet.
            </p>
          )}

        </div>

      </div>

      {/* Reviews */}
      <div className="card profile-card">

        <div className="profile-card-header">

          <div className="profile-card-icon bg-emerald">
            ⭐
          </div>

          <div>
            <h3>Reviews</h3>
            <p>Feedback from other students</p>
          </div>

        </div>

        <div className="profile-reviews-list">

          {userReviews.length > 0 ? (
            userReviews.map((review) => {

              const reviewer = users.find(
                (u) => u.id === review.reviewerId
              );

              return (
                <div
                  className="profile-review-card"
                  key={review.id}
                >

                  <div className="profile-review-header">

                    <strong>
                      {reviewer
                        ? reviewer.name
                        : "Student"}
                    </strong>

                    <span className="review-rating-num">
                      {review.rating}/5
                    </span>

                  </div>

                  <div className="review-stars">
                    {"★".repeat(review.rating)}
                    {"☆".repeat(5 - review.rating)}
                  </div>

                  <p className="review-comment-text">
                    "{review.comment}"
                  </p>

                </div>
              );
            })
          ) : (
            <p className="empty-subtext">
              No reviews yet. Complete a session to receive feedback.
            </p>
          )}

        </div>

      </div>

      {/* Bottom Navigation */}
      <div className="profile-bottom-nav">

        <Link
          to="/dashboard"
          className="btn btn-secondary"
        >
          ← Back to Dashboard
        </Link>

      </div>

    </div>
  );
}

export default Profile;