// src/pages/ContactPage.jsx
import { useState } from 'react';
import './contact.css'; // Your styles

function ContactPage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Construct the mailto link with form data
    const mailtoLink = `mailto:info@txstate.com?subject=Message from ${encodeURIComponent(form.name)}&body=${encodeURIComponent(form.message)}`;
    // Open the mail client
    window.location.href = mailtoLink;
  };

  return (
    <div className="contact-container">
      <h1 className="contact-title">Get in Touch</h1>
      <div className="contact-info">
        <p>Email: info@txstate.com</p>
        <p>Phone: 111-111-1111</p>
        <p>Feel free to reach out to us with any questions or comments!</p>
      </div>
      <form className="contact-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={form.name}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={form.email}
          onChange={handleChange}
        />
        <textarea
          name="message"
          placeholder="Your Message"
          value={form.message}
          onChange={handleChange}
        ></textarea>
        <button type="submit">Send Message</button>
      </form>
    </div>
  );
}

export default ContactPage;
