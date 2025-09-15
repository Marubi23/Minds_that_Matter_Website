import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Contact.css";
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 3));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setForm({ name: "", email: "", message: "" });
    setStep(1);
  };

  return (
    <div className="contact-page-wrapper">
      <div className="hero-section">
        <h1>We’re Here For You</h1>
        <p>Have a question or feedback? Reach out anytime, we’ll respond fast.</p>
      </div>

      {/* Contact Info Cards */}
      <div className="contact-info-section">
        <div className="info-card">
          <FaEnvelope className="info-icon" />
          <h3>Email</h3>
          <p>felixmarubi2005@gmail.com</p>
        </div>
        <div className="info-card">
          <FaPhone className="info-icon" />
          <h3>Phone</h3>
          <p>0712683708</p>
        </div>
        <div className="info-card">
          <FaMapMarkerAlt className="info-icon" />
          <h3>Location</h3>
          <p>Nairobi County</p>
        </div>
      </div>

      {/* Multi-step Contact Form */}
      <div className="contact-form-section">
        <h2>Send Us A Message</h2>
        <form onSubmit={handleSubmit} className="multi-step-form">
          {step === 1 && (
            <div className="form-step">
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={form.name}
                onChange={handleChange}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={form.email}
                onChange={handleChange}
                required
              />
              <button type="button" onClick={nextStep} className="next-btn">
                Next →
              </button>
            </div>
          )}
          {step === 2 && (
            <div className="form-step">
              <textarea
                name="message"
                placeholder="Write your message..."
                rows="5"
                value={form.message}
                onChange={handleChange}
                required
              />
              <div className="step-buttons">
                <button type="button" onClick={prevStep} className="prev-btn">
                  ← Back
                </button>
                <button type="button" onClick={nextStep} className="next-btn">
                  Next →
                </button>
              </div>
            </div>
          )}
          {step === 3 && (
            <div className="form-step">
              <h3>Confirm & Send</h3>
              <p>
                Name: <strong>{form.name}</strong>
              </p>
              <p>
                Email: <strong>{form.email}</strong>
              </p>
              <p>
                Message: <strong>{form.message}</strong>
              </p>
              <div className="step-buttons">
                <button type="button" onClick={prevStep} className="prev-btn">
                  ← Back
                </button>
                <button type="submit" className="send-btn">
                  {submitted ? "Sent ✅" : "Send Message"}
                </button>
              </div>
            </div>
          )}
        </form>
      </div>

      {/* Social Section */}
      <div className="social-section">
        <h2>Follow Us</h2>
        <div className="social-icons">
          <a href="#"><FaFacebookF /></a>
          <a href="#"><FaTwitter /></a>
          <a href="#"><FaInstagram /></a>
        </div>
      </div>

      {/* Optional Map */}
      <div className="map-section">
        <iframe
          title="Our Location"
          src="https://maps.google.com/maps?q=Nairobi&t=&z=13&ie=UTF8&iwloc=&output=embed"
          width="100%"
          height="300"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </div>

      {/* FAQ Section */}
    {/* FAQ Section */}
<div className="faq-section">
  <h2>FAQs</h2>

  <div className="faq-item">
    <div className="faq-question">
      <img src="/profiles/user1.jpg" alt="User" className="faq-avatar" />
      <div>
        <p className="faq-name">Alice K.</p>
        <p className="faq-text"><strong>Q:</strong> How long will it take to get a response?</p>
      </div>
    </div>
    <div className="faq-answer">
      <img src="/profiles/org-logo.png" alt="Org" className="faq-avatar" />
      <div>
        <p className="faq-name">Minds that matter</p>
        <p className="faq-text"><strong>A:</strong> We usually respond within 24 hours.</p>
      </div>
    </div>
  </div>

  <div className="faq-item">
    <div className="faq-question">
      <img src="/profiles/user2.jpg" alt="User" className="faq-avatar" />
      <div>
        <p className="faq-name">John M.</p>
        <p className="faq-text"><strong>Q:</strong> Can I contact you for partnerships?</p>
      </div>
    </div>
    <div className="faq-answer">
      <img src="/profiles/org-logo.png" alt="Org" className="faq-avatar" />
      <div>
        <p className="faq-name">Minds that matter</p>
        <p className="faq-text"><strong>A:</strong> Absolutely! Use the form above or email us directly.</p>
      </div>
    </div>
  </div>
</div>

    </div>
  );
};

export default Contact;
