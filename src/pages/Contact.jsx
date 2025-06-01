import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './Contact.css'

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message submitted! Thank you.");
    setForm({ name: "", email: "", message: "" });
  };
  const navigate =useNavigate();

  return (
    <div className="contact-background">
      <div style={{ padding: "2rem", maxWidth: "600px", margin: "0 auto", fontFamily: "sans-serif",paddingTop:'150px' }}>
      <button onClick={()=>{
        navigate('/');

      }} className="contact-page-button">◀</button>
      <h1 style={{ textAlign: "center", color: "white",fontSize:'2.5rem',fontWeight:'bold' }}>Chat with Us</h1>
      <p style={{ textAlign: "center", color: "pink", fontSize: "1.5rem",fontWeight:'bold' }}>
        We’d love to hear from you. Send us a message using the form below.
      </p>

      <form onSubmit={handleSubmit} style={{ marginTop: "2rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          required
          style={{ padding: "10px", fontSize: "1rem", borderRadius: "5px", border: "1px solid #ccc" }}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
          style={{ padding: "10px", fontSize: "1rem", borderRadius: "5px", border: "1px solid #ccc" }}
        />
        <textarea
          name="message"
          placeholder="Your Message"
          value={form.message}
          onChange={handleChange}
          required
          rows="5"
          style={{ padding: "10px", fontSize: "1rem", borderRadius: "5px", border: "1px solid #ccc" }}
        ></textarea>
        <button
          type="submit"
          style={{ backgroundColor: "#007BFF", color: "white", padding: "10px", border: "none", borderRadius: "5px", cursor: "pointer" }}
        >
          Send Message
        </button>
      </form>

      <div style={{ marginTop: "2rem", textAlign: "center", color: "yellow",fontSize:'20px' }}>
        <p><strong>Email:</strong> felixmarubi2005@gmail.com</p>
        <p><strong>Phone:</strong> 0712683708</p>
        <p><strong>Location:</strong> Nairobi County</p>
      </div>
    </div>
    </div>
    
  );
};

export default Contact;
