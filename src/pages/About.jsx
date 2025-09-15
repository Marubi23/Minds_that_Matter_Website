import "./About.css";
import { 
  FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaYoutube,
  FaBullseye, FaStar, FaBriefcase, FaEnvelope
} from "react-icons/fa";

export default function About() {
  return (
    <div className="about-container">
      
      <header className="about-header">
        <h1>Minds That Matter</h1>
        <p>
          Empowering students with learning difficulties through technology,
          inclusivity, and innovation. Every learner deserves to shine.
        </p>
      </header>

   
      <section className="about-mission">
        <h2><FaBullseye style={{ marginRight: "8px" }} />Our Mission</h2>
        <p>
          To make learning easy, engaging, and accessible for students with special needs,
          while supporting parents and professionals with the right tools.
        </p>
      </section>

    
      <section className="about-values">
        <h2><FaStar style={{ marginRight: "8px",marginLeft:"300px" }} />Our Values</h2>
        <div className="values-grid">
          <div className="value-card">
            <h3>Inclusivity</h3>
            <p>We design for all learners and celebrate uniqueness.</p>
          </div>
          <div className="value-card">
            <h3>Innovation</h3>
            <p>We harness technology to create exciting learning journeys.</p>
          </div>
          <div className="value-card">
            <h3>Support</h3>
            <p>We stand with families and professionals to unlock potential.</p>
          </div>
        </div>
      </section>

      {/* Packages */}
      <section className="about-packages">
        <h2><FaBriefcase style={{ marginRight: "8px" }} />Subscription Packages</h2>
        <div className="package-grid">
          <div className="package-card basic">
            <h3>Basic</h3>
            <p>Learning Materials Access</p>
            <p className="price">KES 500 / month</p>
            <button className="btn-outline">Choose Basic</button>
          </div>
          <div className="package-card standard">
            <h3>Standard</h3>
            <p>Materials + Live Sessions</p>
            <p className="price">KES 1000 / month</p>
            <button className="btn-outline">Choose Standard</button>
          </div>
          <div className="package-card premium">
            <h3>Premium</h3>
            <p>All Features + Reports</p>
            <p className="price">KES 1500 / month</p>
            <button className="btn-outline">Choose Premium</button>
          </div>
        </div>
      </section>

      {/* Subscribe Section */}
      <section className="about-subscribe">
        <h2><FaEnvelope style={{ marginRight: "8px" }} />Subscribe for Updates</h2>
        <p>
          Stay in the loop and be the first to access new features, discounts,
          and content made for learners.
        </p>

        <form className="subscribe-form">
          <input
            type="email"
            placeholder="Enter your email"
            className="subscribe-input"
          />
          <button type="submit" className="subscribe-btn">Subscribe Now</button>
        </form>

        {/* Social Media Icons */}
        <div className="social-icons">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <FaFacebookF />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <FaTwitter />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <FaInstagram />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
            <FaLinkedinIn />
          </a>
          <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
            <FaYoutube />
          </a>
        </div>
      </section>

      {/* Footer Links */}
      <footer className="about-footer">
        <a href="/contact" className="footer-link">Contact Us</a>
        <a href="/resources" className="footer-link">Resources</a>
        <a href="/live" className="footer-link">Live Sessions</a>
      </footer>
    </div>
  );
}
