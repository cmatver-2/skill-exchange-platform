import { Link } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";
import "./Home.css";

function Home() {
  const { allUsers, allSkills, sessions } = useAppContext();

  const studentUsers = allUsers.filter((user) => user.role === "student");

  const getTeacherCount = (skillId) => {
    return studentUsers.filter((user) =>
      user.skillsTaught.some((skill) => skill.skillId === skillId)
    ).length;
  };

  const completedSessionsCount = sessions.filter(
    (s) => s.status === "completed"
  ).length;

  const popularSkills = allSkills
    .map((skill) => ({
      ...skill,
      teacherCount: getTeacherCount(skill.id),
    }))
    .sort((a, b) => b.teacherCount - a.teacherCount)
    .slice(0, 6);

  const getCategoryClass = (category) => {
    switch (category?.toLowerCase()) {
      case "programming":
        return "badge-primary";
      case "design":
        return "badge-secondary";
      case "music":
        return "badge-warning";
      case "soft skills":
        return "badge-success";
      default:
        return "badge-neutral";
    }
  };

  return (
    <div className="home-page">
      
      {/* Hero Section */}
      <section className="home-hero">
        <div className="home-hero-container">
          <div className="hero-content">
            <div className="hero-badge">
              <span>✨</span>
              <span>Student-to-Student Learning Community</span>
            </div>

            <h1 className="hero-title">
              Teach what you know. <br />
              <span className="hero-title-accent">Learn what you dream.</span>
            </h1>

            <p className="hero-description">
              SkillSwap connects university students to exchange programming, design, music,
              and language skills directly with classmates — completely free.
            </p>

            <div className="hero-actions">
              <Link to="/search" className="btn btn-primary btn-lg hero-btn-primary">
                Explore Skills Catalogue →
              </Link>
              <Link to="/dashboard" className="btn btn-secondary btn-lg hero-btn-secondary">
                My Student Dashboard
              </Link>
            </div>
          </div>

          {/* Quick Platform Metrics Floating Box */}
          <div className="hero-metrics-grid">
            <div className="hero-metric-card">
              <span className="hero-metric-num">{studentUsers.length}</span>
              <span className="hero-metric-label">Active Students</span>
            </div>
            <div className="hero-metric-card">
              <span className="hero-metric-num">{allSkills.length}</span>
              <span className="hero-metric-label">Skills Offered</span>
            </div>
            <div className="hero-metric-card">
              <span className="hero-metric-num">{completedSessionsCount || 2}</span>
              <span className="hero-metric-label">Sessions Completed</span>
            </div>
            <div className="hero-metric-card">
              <span className="hero-metric-num">4.8 ★</span>
              <span className="hero-metric-label">Avg Peer Rating</span>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Skills Section */}
      <section className="home-section container">
        <div className="section-heading">
          <div>
            <span className="page-eyebrow">TOP IN DEMAND</span>
            <h2>Popular Skills to Exchange</h2>
            <p className="page-subtitle">Discover what your classmates are teaching and learning this semester.</p>
          </div>

          <Link to="/search" className="btn btn-outline">
            Browse all {allSkills.length} skills →
          </Link>
        </div>

        <div className="popular-skills-grid">
          {popularSkills.map((skill) => (
            <Link
              to={`/search?skill=${skill.id}`}
              className="skill-card-home card card-hover"
              key={skill.id}
            >
              <div className="skill-card-top">
                <span className={`badge ${getCategoryClass(skill.category)}`}>
                  {skill.category}
                </span>
                <span className="skill-card-arrow">↗</span>
              </div>

              <h3 className="skill-card-title">{skill.name}</h3>

              <div className="skill-card-footer">
                <span className="teacher-availability">
                  <span className="status-dot"></span>
                  {skill.teacherCount === 0
                    ? "Looking for teachers"
                    : `${skill.teacherCount} ${
                        skill.teacherCount === 1 ? "teacher" : "teachers"
                      } available`}
                </span>
                <span className="skill-cta-text">Request Swap</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="home-how-section">
        <div className="container">
          <div className="section-heading-centered">
            <span className="page-eyebrow">SIMPLE 3-STEP PROCESS</span>
            <h2>How Skill Exchange Works</h2>
            <p className="page-subtitle">Exchange knowledge without money or formal classes.</p>
          </div>

          <div className="steps-grid">
            <div className="step-card card">
              <div className="step-number-chip step-1">01</div>
              <h3>Find a Skill & Teacher</h3>
              <p>
                Browse the catalogue, search for topics you want to learn, and view verified student profiles with ratings.
              </p>
            </div>

            <div className="step-card card">
              <div className="step-number-chip step-2">02</div>
              <h3>Propose a Knowledge Swap</h3>
              <p>
                Send an exchange request with what you want to learn and what skills you can teach in return.
              </p>
            </div>

            <div className="step-card card">
              <div className="step-number-chip step-3">03</div>
              <h3>Meet, Learn & Review</h3>
              <p>
                Lock in a session date, join Google Meet, complete your 1-on-1 exchange, and leave a star review.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Banner */}
      <section className="home-cta-section container">
        <div className="home-cta-card">
          <span className="page-eyebrow cta-eyebrow">READY TO GROW TOGETHER?</span>
          <h2>Your next skill is just one peer conversation away.</h2>
          <p>
            Join your campus peers in exchanging knowledge. Start browsing or list what you can teach.
          </p>

          <div className="cta-actions">
            <Link to="/search" className="btn btn-primary btn-lg">
              Find a Peer Teacher Now →
            </Link>
            <Link to="/dashboard" className="btn btn-secondary btn-lg">
              Visit Dashboard
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}

export default Home;