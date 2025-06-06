import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Contact.css";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message submitted! Thank you.");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="contact-modern-wrapper">
      <div className="contact-card">
        <button onClick={() => navigate("/")} className="back-nav-btn">
          ◀ Home
        </button>
        <h1>Let’s Talk</h1>
        <p>Have a question or feedback? We’re here to help.</p>

        <form onSubmit={handleSubmit} className="contact-form-modern">
          <input
            type="text"
            name="name"
            placeholder="Your Full Name"
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
          <textarea
            name="message"
            placeholder="Write your message here..."
            value={form.message}
            onChange={handleChange}
            rows="5"
            required
          ></textarea>
          <button type="submit">Send Message</button>
        </form>

        <div className="contact-extra-info">
          <p><strong>Email:</strong> felixmarubi2005@gmail.com</p>
          <p><strong>Phone:</strong> 0712683708</p>
          <p><strong>Location:</strong> Nairobi County</p>
        </div>
      </div>
    </div>
  );
};

export default Contact;



