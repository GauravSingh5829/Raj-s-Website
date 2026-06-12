import React, { useState } from "react";
import "./Contact.css";
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [status, setStatus] = useState({
    submitting: false,
    success: false,
    error: null
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ submitting: true, success: false, error: null });

    const key = import.meta.env.VITE_WEB3FORMS_KEY;

    if (!key || key === "YOUR_ACCESS_KEY_HERE") {
      setStatus({
        submitting: false,
        success: false,
        error: "Web3Forms Access Key is missing. Please add it to your .env file."
      });
      return;
    }

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          access_key: key,
          name: formData.name,
          email: formData.email,
          message: formData.message,
          subject: "New Message from " + formData.name + " (Portfolio)"
        })
      });

      const result = await response.json();
      if (response.ok && result.success) {
        setStatus({ submitting: false, success: true, error: null });
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus({ submitting: false, success: false, error: result.message || "Failed to send message." });
      }
    } catch (err) {
      setStatus({ submitting: false, success: false, error: "An error occurred. Please check your connection and try again." });
    }
  };

  return (
    <div className="contact" id="contact">

      <div className="title">
        <h2>Contact Me</h2>
      </div>

      <div className="contact-container">

        {/* LEFT INFO */}

        <div className="contact-info">

          <h3>Let's Bulid Something Crazyyy...</h3>

          <p>
            Drop a message or reach out directly.
          </p>

          <div className="info-item">
            <FaEnvelope className="contact-icon"/>
            <a href="mailto:rajsingh5829@gmail.com">rajsingh5829@gmail.com</a>
          </div>

          <div className="info-item">
            <FaPhone className="contact-icon"/>
            <a href="tel:+91-xxxxxxxxxx">+91-xxxxxxxxxx</a>
          </div>

          <div className="info-item">
            <FaMapMarkerAlt className="contact-icon"/>
            <span>India</span>
          </div>

        </div>

        {/* RIGHT FORM */}

        <form onSubmit={handleSubmit} className="contact-form">

          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your Name"
            required
          />

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Your Email"
            required
          />

          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Your Message"
            rows="6"
            required
          ></textarea>

          <button type="submit" disabled={status.submitting}>
            {status.submitting ? "Sending..." : "Send Message"}
          </button>

          {status.success && (
            <p className="form-status success">✓ Message sent successfully! I'll get back to you soon.</p>
          )}
          {status.error && (
            <p className="form-status error">✗ {status.error}</p>
          )}

        </form>

      </div>

    </div>
  );

}

export default Contact;
