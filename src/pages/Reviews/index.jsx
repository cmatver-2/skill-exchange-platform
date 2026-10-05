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
  const [submittedMessage, setSubmittedMessage] = useState("");

  const completedSessions = sessions.filter(
    (session) =>
      session.learnerId === currentUser.id &&
      session.status === "completed"
  );

  const getUserName = (userId) => {
    const user = users.find((user) => user.id === userId);
    return user ? user.name : "Unknown User";
  };

  const getUserAvatar = (userId) => {
    const user = users.find((user) => user.id === userId);
    return user ? user.avatar : "https://i.pravatar.cc/150";
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
      alert("Please enter a comment before submitting.");
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
    setSubmittedMessage("Review submitted successfully! Thank you for supporting peer learning.");
    setTimeout(() => setSubmittedMessage(""), 4000);
  };

  const receivedReviews = reviews.filter(
    (review) => review.revieweeId === currentUser.id
  );

  const averageRating = receivedReviews.length > 0
    ? (receivedReviews.reduce((acc, r) => acc + r.rating, 0) / receivedReviews.length).toFixed(1)
    : (currentUser.rating ? currentUser.rating.toFixed(1) : null);

  return (
    <div className="reviews-page">
      <div className="reviews-hero">
        <div>
          <span className="page-eyebrow">COMMUNITY TRUST & FEEDBACK</span>
          <h1>Peer Reviews & Ratings</h1>
          <p className="page-subtitle">
            Provide feedback for your classmates and view ratings on completed exchanges.
          </p>
        </div>

        {averageRating && (
          <div className="reviews-avg-box">
            <span className="avg-num">{averageRating} ★</span>
            <span className="avg-label">Overall Rating ({receivedReviews.length} reviews)</span>
          </div>
        )}
      </div>

      {submittedMessage && (
        <div className="feedback-banner fade-in">
          <span>✓</span> {submittedMessage}
        </div>
      )}

      <div className="reviews-layout">
        
        {/* Left Column: Give Reviews */}
        <section className="reviews-section card">
          <div className="panel-header">
            <div>
              <h2>Review Completed Sessions</h2>
              <p>Feedback for sessions where you were the learner.</p>
            </div>
          </div>

          {completedSessions.length === 0 ? (
            <div className="panel-empty-state">
              <span>🎓</span>
              <p>You have no completed learning sessions ready for review.</p>
            </div>
          ) : (
            <div className="review-cards-list">
              {completedSessions.map((session) => (
                <div className="review-form-card" key={session.id}>
                  <div className="review-form-header">
                    <h3>{getSkillName(session.skillId)}</h3>
                    <span className="badge badge-primary">Completed</span>
                  </div>

                  <p className="review-teacher-info">
                    Teacher: <strong>{getUserName(session.teacherId)}</strong> · Date: {session.date}
                  </p>

                  {hasReviewed(session.id) ? (
                    <div className="already-reviewed-badge">
                      ✓ You have already reviewed this session. Thank you!
                    </div>
                  ) : (
                    <div className="review-inputs-wrapper">
                      <div className="form-group">
                        <label className="form-label">Rating</label>
                        <div className="star-rating-selector">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              type="button"
                              key={star}
                              className={`star-btn ${star <= rating ? "active" : ""}`}
                              onClick={() => setRating(star)}
                            >
                              ★
                            </button>
                          ))}
                          <span className="star-text-label">
                            {rating === 5 && "5.0 - Excellent session"}
                            {rating === 4 && "4.0 - Very good"}
                            {rating === 3 && "3.0 - Good"}
                            {rating === 2 && "2.0 - Fair"}
                            {rating === 1 && "1.0 - Needs improvement"}
                          </span>
                        </div>
                      </div>

                      <div className="form-group">
                        <label className="form-label">Your Feedback & Comment</label>
                        <textarea
                          className="form-textarea"
                          value={comment}
                          onChange={(event) => setComment(event.target.value)}
                          placeholder="How did they explain the concepts? What did you build together?"
                          rows="3"
                        />
                      </div>

                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() => handleSubmit(session)}
                      >
                        Submit Review →
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Right Column: Reviews Received */}
        <section className="reviews-section card">
          <div className="panel-header">
            <div>
              <h2>Reviews About Me</h2>
              <p>Testimonials left by peers you have taught.</p>
            </div>
          </div>

          {receivedReviews.length === 0 ? (
            <div className="panel-empty-state">
              <span>⭐</span>
              <p>You have not received any reviews yet. Complete sessions to build your rating!</p>
            </div>
          ) : (
            <div className="received-reviews-feed">
              {receivedReviews.map((review) => (
                <div className="received-review-card" key={review.id}>
                  <div className="review-header-row">
                    <div className="reviewer-info">
                      <img
                        src={getUserAvatar(review.reviewerId)}
                        alt={getUserName(review.reviewerId)}
                        className="reviewer-avatar"
                      />
                      <div>
                        <strong>{getUserName(review.reviewerId)}</strong>
                        <span className="review-date-text">
                          {new Date(review.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>

                    <span className="review-rating-stars">
                      {"★".repeat(review.rating)}{"☆".repeat(5 - review.rating)}
                    </span>
                  </div>

                  <p className="received-comment">“{review.comment}”</p>

                  <div className="verified-badge">
                    <span>✓</span> Verified Student Peer Exchange
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

      </div>
    </div>
  );
}

export default Reviews;