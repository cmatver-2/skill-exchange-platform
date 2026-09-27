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
    return <h1>User not found</h1>;
  }

  const userReviews = reviews.filter(
    (review) => review.revieweeId === user.id
  );

  const getSkillName = (skillId) => {
    const skill = skills.find((skill) => skill.id === skillId);
    return skill ? skill.name : "Unknown Skill";
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

  return (
    <div className="profile-page">

      {/* Profile Header */}
      <div className="profile-header">
        <img src={user.avatar} alt={user.name} />

        <div className="profile-header-info">
          <h1>{user.name}</h1>
          <p className="profile-bio">{user.bio}</p>

          {user.id === currentUser.id && (
            <button
              className="edit-profile-button"
              onClick={() => setIsEditing(true)}
            >
              Edit Profile
            </button>
          )}
        </div>
      </div>

      {/* Edit Profile Form */}
      {isEditing && user.id === currentUser.id && (
        <div className="profile-section edit-profile-section">
          <h2>Edit Profile</h2>

          <form onSubmit={handleSave}>

            <label htmlFor="profile-name">
              Name
            </label>

            <input
              id="profile-name"
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
            />

            <label htmlFor="profile-bio">
              Bio
            </label>

            <textarea
              id="profile-bio"
              value={bio}
              onChange={(event) => setBio(event.target.value)}
              rows="4"
              required
            />

            <label htmlFor="profile-interests">
              Interests
            </label>

            <input
              id="profile-interests"
              type="text"
              value={interests}
              onChange={(event) => setInterests(event.target.value)}
              placeholder="Example: Coding, Music, Gaming"
            />

            <div className="edit-buttons">
              <button type="submit" className="save-button">
                Save Changes
              </button>

              <button
                type="button"
                className="cancel-button"
                onClick={handleCancel}
              >
                Cancel
              </button>
            </div>

          </form>
        </div>
      )}

      {/* Interests */}
      <div className="profile-section">
        <h2>Interests</h2>

        {user.interests.length === 0 ? (
          <p>No interests added.</p>
        ) : (
          <ul className="interest-list">
            {user.interests.map((interest) => (
              <li key={interest}>{interest}</li>
            ))}
          </ul>
        )}
      </div>

      {/* Skills Taught */}
      <div className="profile-section">
        <h2>Skills I Can Teach</h2>

        <div className="skill-list">
          {user.skillsTaught.map((skill) => (
            <div className="skill-item" key={skill.skillId}>
              <span>{getSkillName(skill.skillId)}</span>

              <span className="proficiency">
                {skill.proficiency}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Skills Wanted */}
      <div className="profile-section">
        <h2>Skills I Want to Learn</h2>

        <div className="skill-list">
          {user.skillsWanted.map((skill) => (
            <div className="skill-item" key={skill.skillId}>
              <span>{getSkillName(skill.skillId)}</span>

              <span className="proficiency">
                {skill.proficiency}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Rating */}
      <div className="profile-section">
        <h2>Rating</h2>

        {user.rating === null ? (
          <p>No rating yet.</p>
        ) : (
          <p className="rating">
            ⭐ {user.rating} / 5
          </p>
        )}
      </div>

      {/* Reviews */}
      <div className="profile-section">
        <h2>Reviews</h2>

        {userReviews.length === 0 ? (
          <p>No reviews yet.</p>
        ) : (
          userReviews.map((review) => (
            <div className="review" key={review.id}>
              <p>
                ⭐ {review.rating} / 5
              </p>

              <p>{review.comment}</p>
            </div>
          ))
        )}
      </div>

      {/* Dashboard */}
      <Link
        className="dashboard-link"
        to="/dashboard"
      >
        Go to Dashboard
      </Link>

    </div>
  );
}

export default Profile;