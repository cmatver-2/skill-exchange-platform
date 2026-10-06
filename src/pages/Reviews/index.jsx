import { useState } from "react";
import { Link } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";
import { users } from "../../data/users";
import { skills } from "../../data/skills";

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
      session.learnerId === currentUser?.id &&
      session.status === "completed"
  );

  const receivedReviews = reviews.filter(
    (review) => review.revieweeId === currentUser?.id
  );

  const averageRating =
    receivedReviews.length > 0
      ? (
          receivedReviews.reduce(
            (sum, review) => sum + review.rating,
            0
          ) / receivedReviews.length
        ).toFixed(1)
      : null;

  const getUser = (userId) => {
    return users.find((user) => user.id === userId);
  };

  const getSkillName = (skillId) => {
    const skill = skills.find((item) => item.id === skillId);
    return skill ? skill.name : "Skill Exchange";
  };

  const hasReviewed = (sessionId) => {
    return reviews.some(
      (review) =>
        review.sessionId === sessionId &&
        review.reviewerId === currentUser?.id
    );
  };

  const handleSubmit = (session) => {
    const rating = ratings[session.id];
    const comment = comments[session.id] || "";

    if (!rating) {
      alert("Please select a star rating before submitting.");
      return;
    }

    if (!comment.trim()) {
      alert("Please write a short review sharing your feedback.");
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
    }, 4000);
  };

  const getRatingText = (rating) => {
    if (!rating) return "Click stars to rate";
    if (rating === 1) return "(1.0 - Needs Improvement)";
    if (rating === 2) return "(2.0 - Fair)";
    if (rating === 3) return "(3.0 - Good)";
    if (rating === 4) return "(4.0 - Very Good)";
    if (rating === 5) return "(5.0 - Excellent)";
    return "";
  };

  return (
    <div className="space-y-8">
      {/* Page Header (Demo Style) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">
            Community Trust & Ratings
          </span>
          <h1 className="text-3xl font-extrabold text-slate-900 mt-1">
            Peer Ratings & Reviews
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Provide helpful feedback on completed peer study sessions and see your reputation.
          </p>
        </div>

        {/* Average Rating Box (Demo Style) */}
        <div className="flex items-center gap-3 bg-white px-5 py-3 rounded-2xl border border-slate-200 shadow-sm self-start sm:self-auto">
          <span className="text-3xl font-extrabold text-slate-900">
            {averageRating ? `★ ${averageRating}` : "⭐ New"}
          </span>
          <div className="text-left">
            <span className="text-[10px] font-extrabold uppercase text-slate-400 block tracking-wider">
              Student Rating
            </span>
            <span className="text-xs font-semibold text-slate-600">
              {receivedReviews.length} verified review{receivedReviews.length !== 1 ? "s" : ""}
            </span>
          </div>
        </div>
      </div>

      {/* Success Notification Banner */}
      {submitted && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl text-xs font-semibold flex items-center gap-2 shadow-sm">
          <span className="text-base">🎉</span>
          <span>Thank you! Your feedback has been verified and posted to the student's profile.</span>
        </div>
      )}

      {/* 2-Column Split Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

        {/* Interactive Review Submission Box (Left Column) */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm lg:sticky lg:top-24 space-y-4">
          <h2 className="text-base font-bold text-slate-900 mb-1 flex items-center gap-2">
            <span>✍️</span> Rate a Completed Session
          </h2>
          <p className="text-xs text-slate-500 mb-4">
            Leave honest feedback for students you have learned from.
          </p>

          {completedLearningSessions.length === 0 ? (
            <div className="p-6 rounded-xl bg-slate-50 border border-slate-100 text-center space-y-3">
              <span className="text-2xl block">📚</span>
              <p className="text-xs text-slate-600 font-medium">
                You don't have any completed learning sessions awaiting feedback.
              </p>
              <Link
                to="/sessions"
                className="inline-block px-3.5 py-1.5 rounded-lg bg-indigo-50 text-indigo-700 font-bold text-xs border border-indigo-200 hover:bg-indigo-100 transition-all"
              >
                View Sessions →
              </Link>
            </div>
          ) : (
            <div className="space-y-6">
              {completedLearningSessions.map((session) => {
                const teacher = getUser(session.teacherId);
                const reviewed = hasReviewed(session.id);
                const currentRating = ratings[session.id] || 0;

                return (
                  <div
                    key={session.id}
                    className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="text-xs font-bold text-slate-900">
                        {getSkillName(session.skillId)}
                      </h3>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                        Completed
                      </span>
                    </div>

                    <p className="text-xs text-slate-500">
                      Teacher: <strong className="text-slate-800">{teacher?.name || "Student"}</strong>
                    </p>

                    {reviewed ? (
                      <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-1.5">
                        <span>✓</span> You have already reviewed this session.
                      </div>
                    ) : (
                      <div className="space-y-3 pt-2">
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1.5">
                            Rating
                          </label>
                          <div className="flex items-center gap-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <button
                                type="button"
                                key={star}
                                onClick={() =>
                                  setRatings((prev) => ({
                                    ...prev,
                                    [session.id]: star,
                                  }))
                                }
                                className={`text-2xl transition-transform hover:scale-125 focus:outline-none cursor-pointer ${
                                  currentRating >= star
                                    ? "text-amber-400"
                                    : "text-slate-200"
                                }`}
                                aria-label={`${star} stars`}
                              >
                                ★
                              </button>
                            ))}
                            <span className="text-[11px] text-slate-500 font-semibold ml-2">
                              {getRatingText(currentRating)}
                            </span>
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">
                            Your Detailed Comment
                          </label>
                          <textarea
                            rows={3}
                            placeholder="How was their explanation? What did you accomplish together?"
                            value={comments[session.id] || ""}
                            onChange={(e) =>
                              setComments((prev) => ({
                                ...prev,
                                [session.id]: e.target.value,
                              }))
                            }
                            className="w-full p-3 rounded-xl border border-slate-200 bg-white text-slate-800 outline-none focus:ring-2 focus:ring-indigo-500 resize-none text-xs"
                          />
                        </div>

                        <button
                          type="button"
                          onClick={() => handleSubmit(session)}
                          className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md shadow-indigo-100 transition-all cursor-pointer"
                        >
                          Submit Review →
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Reviews Received Feed (Right 2 Columns) */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <span>⭐</span> Reviews About You ({receivedReviews.length})
          </h2>

          <div className="space-y-4">
            {receivedReviews.length === 0 ? (
              <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center shadow-sm">
                <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center text-xl text-slate-400 mx-auto mb-3">
                  💬
                </div>
                <h3 className="text-sm font-bold text-slate-800">
                  No reviews received yet
                </h3>
                <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                  When you complete sessions teaching your classmates, their honest ratings and comments will appear here.
                </p>
              </div>
            ) : (
              receivedReviews
                .slice()
                .reverse()
                .map((review) => {
                  const reviewer = getUser(review.reviewerId);
                  return (
                    <div
                      key={review.id}
                      className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-3 transition-all hover:border-slate-300"
                    >
                      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                        <div className="flex items-center gap-3">
                          <img
                            src={reviewer?.avatar || "https://i.pravatar.cc/150"}
                            alt={reviewer?.name || "Student"}
                            className="w-10 h-10 rounded-full object-cover border border-slate-200"
                          />
                          <div>
                            <h3 className="text-sm font-bold text-slate-900">
                              {reviewer?.name || "Student Peer"}
                            </h3>
                            <p className="text-[11px] text-slate-500">
                              Verified Learning Partner
                            </p>
                          </div>
                        </div>

                        <div className="text-right">
                          <span className="text-amber-500 font-bold text-sm">
                            {"★".repeat(review.rating)}{"☆".repeat(5 - review.rating)} {review.rating}.0
                          </span>
                          <p className="text-[10px] text-slate-400">
                            {review.createdAt ? new Date(review.createdAt).toLocaleDateString("en-IN", {
                              day: "numeric",
                              month: "short",
                              year: "numeric"
                            }) : "Recent"}
                          </p>
                        </div>
                      </div>

                      <p className="text-xs text-slate-700 leading-relaxed italic">
                        "{review.comment}"
                      </p>

                      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-700 text-[11px] font-bold">
                        <span>✓</span> Verified Student Peer Exchange
                      </div>
                    </div>
                  );
                })
            )}
          </div>
        </div>

      </div>

      {/* Bottom Navigation */}
      <div className="flex items-center gap-3 pt-4 border-t border-slate-200">
        <Link
          to="/dashboard"
          className="px-4 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold transition-all"
        >
          ← Back to Dashboard
        </Link>
        <Link
          to={`/profile/${currentUser.id}`}
          className="px-4 py-2 rounded-xl bg-indigo-50 text-indigo-700 hover:bg-indigo-100 text-xs font-bold transition-all"
        >
          View My Public Profile →
        </Link>
      </div>
    </div>
  );
}

export default Reviews;