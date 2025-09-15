import React, { useState } from "react";
import "./OfflinePayment.css";

export default function OfflinePayment({ plan = "" }) {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    plan: plan || "",
    mpesaCode: "",
  });
  const [file, setFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState(null);
  const [message, setMessage] = useState("");

  const PAYPHONE = "0712683708";
  const PAYPAL_LINK = "https://www.paypal.me/your-paypal"; // replace with actual

  const handleChange = (e) => {
    setForm((s) => ({ ...s, [e.target.name]: e.target.value }));
  };

  const handleFile = (e) => {
    setFile(e.target.files[0] || null);
  };

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setMessage("Copied to clipboard!");
      setTimeout(() => setMessage(""), 2000);
    } catch {
      setMessage("Unable to copy. Please copy manually.");
      setTimeout(() => setMessage(""), 2000);
    }
  };

  const validate = () => {
    if (!form.name.trim()) return "Please enter your name.";
    if (!form.phone.trim()) return "Please enter your phone number.";
    if (!form.plan) return "Please choose a plan before submitting.";
    if (!form.mpesaCode && !file) return "Provide M-Pesa code or upload receipt.";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus(null);
    const err = validate();
    if (err) {
      setMessage(err);
      return;
    }

    setSubmitting(true);
    setMessage("");

    const payload = new FormData();
    payload.append("name", form.name);
    payload.append("phone", form.phone);
    payload.append("plan", form.plan);
    payload.append("mpesaCode", form.mpesaCode);
    if (file) payload.append("receipt", file);

    try {
      const res = await fetch("/api/offline-payment", {
        method: "POST",
        body: payload,
      });

      if (!res.ok) throw new Error("Server error");

      setStatus("success");
      setMessage("Payment details received! We'll verify and activate your plan.");
      setForm({ name: "", phone: "", plan: plan || "", mpesaCode: "" });
      setFile(null);
    } catch (err) {
      setStatus("error");
      setMessage("Could not submit right now. Please try again later.");
    } finally {
      setSubmitting(false);
      setTimeout(() => setMessage(""), 6000);
    }
  };

  return (
    <div className="offline-container">
      {/* Hero */}
      <div className="offline-hero">
        <h1>Complete Your Subscription</h1>
        <p>Choose your payment method and submit details securely</p>
      </div>

      {/* Payment Options */}
      <div className="payment-options">
        <div className="pay-card">
          <h3>M-Pesa</h3>
          <p>Send money to:</p>
          <div className="pay-line">
            <strong>{PAYPHONE}</strong>
            <button
              className="copy-btn"
              onClick={() => copyToClipboard(PAYPHONE)}
            >
              Copy
            </button>
          </div>
          <small>After payment, enter transaction code or upload receipt.</small>
        </div>

        <div className="pay-card">
          <h3>PayPal</h3>
          <p>Click below to pay via PayPal:</p>
          <a
            href={PAYPAL_LINK}
            className="paypal-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            {PAYPAL_LINK}
          </a>
          <button
            className="copy-btn"
            onClick={() => copyToClipboard(PAYPAL_LINK)}
          >
            Copy
          </button>
        </div>
      </div>

      {/* Form */}
      <form className="offline-form" onSubmit={handleSubmit}>
        <h2>Submit Payment Details</h2>

        <div className="form-group">
          <label>Full Name</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Jane Doe"
          />
        </div>

        <div className="form-group">
          <label>Phone Number (used for verification)</label>
          <input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="07xxxxxxxx"
          />
        </div>

        <div className="form-group">
          <label>Selected Plan</label>
          <input
            name="plan"
            value={form.plan}
            readOnly
            placeholder="Choose a plan first"
          />
        </div>

        <div className="form-group">
          <label>M-Pesa Transaction Code</label>
          <input
            name="mpesaCode"
            value={form.mpesaCode}
            onChange={handleChange}
            placeholder="e.g. ABC123XYZ"
          />
        </div>

        <div className="form-group file-upload">
          <label>Upload Receipt (photo or PDF)</label>
          <input
            type="file"
            accept="image/*,application/pdf"
            onChange={handleFile}
          />
        </div>

        <div className="form-actions">
          <button type="submit" className="submit-btn" disabled={submitting}>
            {submitting ? "Submitting..." : "Send Details"}
          </button>
          <button
            type="button"
            className="help-btn"
            onClick={() => (window.location.href = "/contact")}
          >
            Need Help?
          </button>
        </div>
      </form>

      {/* Status */}
      {message && <div className={`offline-message ${status || "info"}`}>{message}</div>}
      {status === "success" && (
        <div className="offline-success">
          <strong>Next:</strong> We’ll verify your payment and notify you by SMS or email.
        </div>
      )}
    </div>
  );
}
