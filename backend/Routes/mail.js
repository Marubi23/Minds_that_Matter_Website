const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");

router.post("/", async (req, res) => {
  const { name, email, message } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS, // Gmail app password
      },
      tls: {
        rejectUnauthorized: false, // <-- allows self-signed certs
      },
    });

    const mailToAdmin = {
      from: email,
      to: process.env.EMAIL_USER,
      subject: `New Contact Form Message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    };

    const mailToUser = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Thanks for contacting Minds That Matter",
      text: `Hi ${name},\n\nThanks for reaching out to Minds That Matter! We’ve received your message and will get back to you within 24 hours.\n\n— Minds That Matter Team`,
    };

    await transporter.sendMail(mailToAdmin);
    await transporter.sendMail(mailToUser);

    res.json({ success: true, message: "Emails sent successfully" });
  } catch (err) {
    console.error("Mail error:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
