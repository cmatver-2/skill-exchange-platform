import { useState } from "react";
import { Link } from "react-router-dom";
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

  const [ratings, setRatings] = useState({});
  const [comments, setComments] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const completedLearningSessions = sessions.filter(
    (session) =>
      session.learnerId === currentUser.id &&
      session.status === "completed"
  );

  const receivedReviews = reviews.filter(
    (review) => review.revieweeId === currentUser.id
  );

  const averageRating =
    receivedReviews.length > 0
      ? (
          receivedReviews.reduce(
            (sum, review) => sum + review.rating,
            0
          ) / receivedReviews.length
        ).toFixed(1)
      : "—";

  const getUser = (userId) => {
    return users.find((user) => user.id === userId);
  };

  const getSkillName = (skillId) => {
    const skill = skills.find((item) => item.id === skillId);
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
    const rating = ratings[session.id];
    const comment = comments[session.id] || "";

    if (!rating) {
      alert("Please select a rating before submitting.");
      return;
    }

    if (!comment.trim()) {
      alert("Please write a short review.");
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

    setRatings((prev) => {
      const updated = { ...prev };
      delete updated[session.id];
      return updated;
    });

    setComments((prev) => {
      const updated = { ...prev };
      delete updated[session.id];
      return updated;
    });

    setSubmitted(true);

    setTimeout(() => {
      setSubmitted(false);
    }, 3000);
  };

  const getRatingText = (rating) => {
    if (!rating) return "Select a rating";

    if (rating === 1) return "Poor";
    if (rating === 2) return "Fair";
    if (rating === 3) return "Good";
    if (rating === 4) return "Very Good";
    if (rating === 5) return "Excellent";

    return "";
  };

  return (
    <div className="reviews-page">

      {/* Hero */}
      <div className="reviews-hero">

        <div>
          <span className="page-eyebrow">
            FEEDBACK
          </span>

          <h1>Reviews & Ratings</h1>

          <p className="page-subtitle">
            Share your experience and see what others
            think about your skill exchanges.
          </p>
        </div>

        <div className="reviews-avg-box">

          <span className="avg-num">
            {averageRating}
          </span>

          <span className="avg-label">
            Average Rating
          </span>

        </div>

      </div>

      {/* Success Message */}
      {submitted && (
        <div className="feedback-banner">
          ✓ Your review was submitted successfully!
        </div>
      )}

      {/* Two Columns */}
      <div className="reviews-layout">

        {/* WRITE REVIEWS */}
        <section className="card reviews-section">

          <div className="profile-card-header">

            <div className="profile-card-icon bg-indigo">
              ✍️
            </div>

            <div>
              <h3>Leave a Review</h3>
              <p>
                Rate your completed learning sessions
              </p>
            </div>

          </div>

          {completedLearningSessions.length === 0 ? (
            <div className="panel-empty-state">
              <span>⭐</span>
              <p>
                You don't have any completed learning
                sessions to review yet.
              </p>

              <Link
                to="/sessions"
                className="btn btn-primary btn-sm"
              >
                View Sessions
              </Link>
            </div>
          ) : (
            <div className="review-cards-list">

              {completedLearningSessions.map((session) => {

                const teacher = getUser(session.teacherId);
                const reviewed = hasReviewed(session.id);

                return (
                  <div
                    className="review-form-card"
                    key={session.id}
                  >

                    <div className="review-form-header">

                      <h3>
                        {getSkillName(session.skillId)}
                      </h3>

                      <span className="badge badge-success">
                        Completed
                      </span>

                    </div>

                    <p className="review-teacher-info">
                      Session with{" "}
                      <strong>
                        {teacher
                          ? teacher.name
                          : "your teacher"}
                      </strong>
                    </p>

                    {reviewed ? (
                      <div className="already-reviewed-badge">
                        ✓ You have already reviewed this session.
                      </div>
                    ) : (
                      <>

                        <div className="form-group">

                          <label className="form-label">
                            Your Rating
                          </label>

                          <div className="star-rating-selector">

                            {[1, 2, 3, 4, 5].map(
                              (star) => (
                                <button
                                  type="button"
                                  key={star}
                                  className={
                                    ratings[session.id] >= star
                                      ? "star-btn active"
                                      : "star-btn"
                                  }
                                  onClick={() =>
                                    setRatings((prev) => ({
                                      ...prev,
                                      [session.id]: star,
                                    }))
                                  }
                                  aria-label={`${star} star rating`}
                                >
                                  ★
                                </button>
                              )
                            )}

                            <span className="star-text-label">
                              {getRatingText(
                                ratings[session.id]
                              )}
                            </span>

                          </div>

                        </div>

                        <div className="form-group">

                          <label className="form-label">
                            Your Review
                          </label>

                          <textarea
                            className="form-textarea"
                            placeholder="How was your learning experience?"
                            value={
                              comments[session.id] || ""
                            }
                            onChange={(e) =>
                              setComments((prev) => ({
                                ...prev,
                                [session.id]: e.target.value,
                              }))
                            }
                          />

                        </div>

                        <button
                          type="button"
                          className="btn btn-primary"
                          onClick={() =>
                            handleSubmit(session)
                          }
                        >
                          Submit Review
                        </button>

                      </>
                    )}

                  </div>
                );
              })}

            </div>
          )}

        </section>

        {/* RECEIVED REVIEWS */}
        <section className="card reviews-section">

          <div className="profile-card-header">

            <div className="profile-card-icon bg-amber">
              ⭐
            </div>

            <div>
              <h3>Reviews You Received</h3>
              <p>
                Feedback from students you've taught
              </p>
            </div>

          </div>

          {receivedReviews.length === 0 ? (
            <div className="panel-empty-state">
              <span>💬</span>

              <p>
                No reviews received yet.
              </p>

              <span className="empty-subtext">
                Complete teaching sessions to start
                receiving feedback.
              </span>
            </div>
          ) : (
            <div className="received-reviews-feed">

              {receivedReviews
                .slice()
                .reverse()
                .map((review) => {

                  const reviewer = getUser(
                    review.reviewerId
                  );

                  return (
                    <div
                      className="received-review-card"
                      key={review.id}
                    >

                      <div className="review-header-row">

                        <div className="reviewer-info">

                          <img
                            className="reviewer-avatar"
                            src={
                              reviewer
                                ? reviewer.avatar
                                : "https://i.pravatar.cc/150?img=10"
                            }
                            alt={
                              reviewer
                                ? reviewer.name
                                : "Student"
                            }
                          />

                          <div>

                            <strong>
                              {reviewer
                                ? reviewer.name
                                : "Student"}
                            </strong>

                            <span className="review-date-text">
                              {new Date(
                                review.createdAt
                              ).toLocaleDateString(
                                "en-IN",
                                {
                                  day: "numeric",
                                  month: "short",
                                  year: "numeric",
                                }
                              )}
                            </span>

                          </div>

                        </div>

                        <div className="review-rating-stars">
                          {"★".repeat(review.rating)}
                          {"☆".repeat(5 - review.rating)}
                        </div>

                      </div>

                      <p className="received-comment">
                        "{review.comment}"
                      </p>

                      <span className="verified-badge">
                        ✓ Completed Session
                      </span>

                    </div>
                  );
                })}

            </div>
          )}

        </section>

      </div>

      {/* Bottom Navigation */}
      <div
        style={{
          marginTop: "2rem",
          display: "flex",
          gap: "0.75rem",
          flexWrap: "wrap",
        }}
      >

        <Link
          to="/dashboard"
          className="btn btn-secondary"
        >
          ← Dashboard
        </Link>

        <Link
          to={`/profile/${currentUser.id}`}
          className="btn btn-primary"
        >
          View My Profile
        </Link>

      </div>

    </div>
  );
}

export default Reviews;