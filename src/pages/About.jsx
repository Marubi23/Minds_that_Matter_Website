import "./About.css";
import { 
  FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaYoutube,
  FaBullseye, FaStar, FaBriefcase, FaEnvelope
} from "react-icons/fa";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function About() {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState("");
  const [isExistingCustomer, setIsExistingCustomer] = useState(false);

  // Smooth scroll on hash (#packages)
  useEffect(() => {
    if (location.hash === "#packages") {
      const section = document.querySelector(location.hash);
      section?.scrollIntoView({ behavior: "smooth" });
    }
  }, [location]);

  const handleSubscribe = (e) => {
    e.preventDefault();

    if (isExistingCustomer) {
      // Existing customer → login page
      navigate("/login");
      return;
    }

    if (!selectedPlan) {
      alert("Please choose a subscription plan first.");
      return;
    }

    // Go to payment route with selected plan
    navigate("/payment", { state: { plan: selectedPlan } });
  };

  // Scroll to subscribe section and set plan
  const scrollToSubscribe = (plan) => {
    const subscribeSection = document.querySelector(".about-subscribe");
    subscribeSection?.scrollIntoView({ behavior: "smooth" });
    setSelectedPlan(plan);
  };

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
        <h2><FaStar style={{ marginRight: "8px", marginLeft:"300px" }} />Our Values</h2>
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
      <section id="packages" className="about-packages">
        <h2><FaBriefcase style={{ marginRight: "8px" }} />Subscription Packages</h2>
        <div className="package-grid">
          <div className="package-card basic">
            <h3>Basic</h3>
            <p>Learning Materials Access</p>
            <p className="price">KES 500 / month</p>
            <button className="btn-outline" onClick={() => scrollToSubscribe("Basic")}>
              Choose Basic
            </button>
          </div>
          <div className="package-card standard">
            <h3>Standard</h3>
            <p>Materials + Live Sessions</p>
            <p className="price">KES 1000 / month</p>
            <button className="btn-outline" onClick={() => scrollToSubscribe("Standard")}>
              Choose Standard
            </button>
          </div>
          <div className="package-card premium">
            <h3>Premium</h3>
            <p>All Features + Reports</p>
            <p className="price">KES 1500 / month</p>
            <button className="btn-outline" onClick={() => scrollToSubscribe("Premium")}>
              Choose Premium
            </button>
          </div>
        </div>
      </section>

      {/* Subscribe Section */}
      <section className="about-subscribe">
        <h2><FaEnvelope style={{ marginRight: "8px" }} />Subscribe or Log In</h2>
        <p>
          New customers can subscribe below. If you already have an account, log in to avoid double billing.
        </p>

        {/* Toggle Buttons */}
        <div className="toggle-container">
          <button
            type="button"
            className={`toggle-btn ${!isExistingCustomer ? "active" : ""}`}
            onClick={() => setIsExistingCustomer(false)}
          >
            New Customer
          </button>
          <button
            type="button"
            className={`toggle-btn ${isExistingCustomer ? "active" : ""}`}
            onClick={() => setIsExistingCustomer(true)}
          >
            Existing Customer
          </button>
        </div>

        <form className="subscribe-form" onSubmit={handleSubscribe}>
          <input type="hidden" value={selectedPlan} className="selected-plan" />
          <button type="submit" className="subscribe-btn">
            {isExistingCustomer ? "Go to Login" : "Proceed to Payment"}
          </button>
        </form>

        {/* Social Media Icons */}
        <div className="social-icons">
          <a href="https://www.facebook.com/profile.php?id=61581171981024" target="_blank" rel="noopener noreferrer"><FaFacebookF /></a>
          <a href="https://x.com/Young_fellar" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
          <a href="https://www.instagram.com/marubi___/" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
          <a href="https://www.linkedin.com/in/felix-marubi-763bb7356/" target="_blank" rel="noopener noreferrer"><FaLinkedinIn /></a>
          <a href="https://www.youtube.com/@felix_marubi" target="_blank" rel="noopener noreferrer"><FaYoutube /></a>
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
