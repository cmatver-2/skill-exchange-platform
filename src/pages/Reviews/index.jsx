import { useState } from "react";
import { useAppContext } from "../../context/AppContext";
import { users } from "../../data/users";
import { skills } from "../../data/skills";
import "../../styles/reviews.css";

function Reviews() {
  const {
    currentUser,
    sessions,
    reviews,
    setReviews,
  } = useAppContext();

  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const completedSessions = sessions.filter(
    (session) =>
      session.learnerId === currentUser.id &&
      session.status === "completed"
  );

  const getUserName = (userId) => {
    const user = users.find((user) => user.id === userId);
    return user ? user.name : "Unknown User";
  };

  const getSkillName = (skillId) => {
    const skill = skills.find((skill) => skill.id === skillId);
    return skill ? skill.name : "Unknown Skill";
  };

  const hasReviewed = (sessionId) => {
    return reviews.some(
      (review) =>
        review.sessionId === sessionId &&
        review.reviewerId === currentUser.id
    );
  };

  const handleSubmit = (session) => {
    if (!comment.trim()) {
      alert("Please enter a comment.");
      return;
    }

    const newReview = {
      id: Date.now(),
      sessionId: session.id,
      reviewerId: currentUser.id,
      revieweeId: session.teacherId,
      rating: Number(rating),
      comment: comment.trim(),
      createdAt: new Date().toISOString(),
    };

    setReviews([...reviews, newReview]);

    setRating(5);
    setComment("");

    alert("Review submitted successfully!");
  };

  const receivedReviews = reviews.filter(
    (review) => review.revieweeId === currentUser.id
  );

  return (
    <div className="reviews-page">
      <h1>Reviews</h1>

      {/* Give Reviews */}
      <section className="reviews-section">
        <h2>Review Completed Sessions</h2>

        {completedSessions.length === 0 ? (
          <p>You have no completed sessions available for review.</p>
        ) : (
          completedSessions.map((session) => (
            <div className="review-form-card" key={session.id}>
              <h3>{getSkillName(session.skillId)}</h3>

              <p>
                Teacher:{" "}
                <strong>{getUserName(session.teacherId)}</strong>
              </p>

              <p>
                Session Date: {session.date}
              </p>

              {hasReviewed(session.id) ? (
                <p className="already-reviewed">
                  ✓ You have already reviewed this session.
                </p>
              ) : (
                <>
                  <label htmlFor={`rating-${session.id}`}>
                    Rating
                  </label>

                  <select
                    id={`rating-${session.id}`}
                    value={rating}
                    onChange={(event) =>
                      setRating(event.target.value)
                    }
                  >
                    <option value="5">⭐⭐⭐⭐⭐ 5</option>
                    <option value="4">⭐⭐⭐⭐ 4</option>
                    <option value="3">⭐⭐⭐ 3</option>
                    <option value="2">⭐⭐ 2</option>
                    <option value="1">⭐ 1</option>
                  </select>

                  <label htmlFor={`comment-${session.id}`}>
                    Comment
                  </label>

                  <textarea
                    id={`comment-${session.id}`}
                    value={comment}
                    onChange={(event) =>
                      setComment(event.target.value)
                    }
                    placeholder="Write your review..."
                    rows="4"
                  />

                  <button
                    onClick={() => handleSubmit(session)}
                  >
                    Submit Review
                  </button>
                </>
              )}
            </div>
          ))
        )}
      </section>

      {/* Reviews Received */}
      <section className="reviews-section">
        <h2>Reviews About Me</h2>

        {receivedReviews.length === 0 ? (
          <p>You have not received any reviews yet.</p>
        ) : (
          receivedReviews.map((review) => (
            <div className="received-review" key={review.id}>
              <div className="review-header">
                <strong>
                  {getUserName(review.reviewerId)}
                </strong>

                <span>⭐ {review.rating} / 5</span>
              </div>

              <p>{review.comment}</p>

              <small>
                {new Date(review.createdAt).toLocaleDateString()}
              </small>
            </div>
          ))
        )}
      </section>
    </div>
  );
}

export default Reviews;