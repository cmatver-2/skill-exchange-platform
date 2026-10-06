import { Link } from "react-router-dom";
import { skills } from "../../data/skills";
import { users } from "../../data/users";
import "./Home.css";

function Home() {
  const studentUsers = users.filter((user) => user.role === "student");

  const getTeacherCount = (skillId) => {
    return studentUsers.filter((user) =>
      user.skillsTaught.some((skill) => skill.skillId === skillId)
    ).length;
  };

  const popularSkills = skills
    .map((skill) => ({
      ...skill,
      teacherCount: getTeacherCount(skill.id),
    }))
    .sort((a, b) => b.teacherCount - a.teacherCount)
    .slice(0, 6);

  return (
    <main className="home-page">
      {/* Hero */}
      <section className="home-hero">
        <div className="hero-content">
          <p className="hero-eyebrow">SKILLS ARE BETTER SHARED</p>

          <h1>
            Learn something.
            <br />
            <span>Teach something.</span>
          </h1>

          <p className="hero-description">
            SkillSwap connects students who want to learn with students who
            have something to teach.
          </p>

          <div className="hero-actions">
            <Link to="/search" className="home-button primary">
              Explore Skills
            </Link>

            <Link to="/dashboard" className="home-button secondary">
              Go to Dashboard
            </Link>
          </div>
        </div>
      </section>

      {/* Popular Skills */}
      <section className="home-section">
        <div className="section-heading">
          <div>
            <p className="section-eyebrow">EXPLORE</p>
            <h2>Popular skills</h2>
          </div>

          <Link to="/search" className="section-link">
            View all skills →
          </Link>
        </div>

        <div className="popular-skills-grid">
          {popularSkills.map((skill) => (
            <Link
              to={`/search?skill=${skill.id}`}
              className="skill-card"
              key={skill.id}
            >
              <div className="skill-card-top">
                <span className="skill-category">{skill.category}</span>
                <span className="skill-arrow">↗</span>
              </div>

              <h3>{skill.name}</h3>

              <p>
                {skill.teacherCount === 0
                  ? "No teachers yet"
                  : `${skill.teacherCount} ${
                      skill.teacherCount === 1 ? "teacher" : "teachers"
                    } available`}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="home-section how-section">
        <div className="section-heading centered">
          <p className="section-eyebrow">HOW IT WORKS</p>
          <h2>Exchange skills in three steps</h2>
          <p>
            Find someone, send a request, and start learning together.
          </p>
        </div>

        <div className="steps-grid">
          <div className="step-card">
            <span className="step-number">01</span>
            <h3>Find a skill</h3>
            <p>
              Search the skill catalogue and discover students who can teach
              what you want to learn.
            </p>
          </div>

          <div className="step-card">
            <span className="step-number">02</span>
            <h3>Send a request</h3>
            <p>
              Choose a student, select the skill, and introduce yourself with a
              learning request.
            </p>
          </div>

          <div className="step-card">
            <span className="step-number">03</span>
            <h3>Learn together</h3>
            <p>
              Once your request is accepted, schedule a session and exchange
              knowledge.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="home-cta">
        <p className="section-eyebrow">READY TO START?</p>
        <h2>Your next skill could be one conversation away.</h2>
        <p>
          Explore the skill catalogue and find someone who can teach you.
        </p>

        <Link to="/search" className="home-button primary">
          Find a Skill →
        </Link>
      </section>
    </main>
  );
}

export default Home;