import { useState } from "react";
import "./Contact.css";

export default function Contact() {
    const [form, setForm] = useState({ name: "", email: "", message: "" });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert("✅ Thank you for contacting NYC LUX RIDES! We'll reach out shortly.");
        setForm({ name: "", email: "", message: "" });
    };

    return (
        <section className="contact-section">
            <div className="contact-container">
                <h2>Get in Touch</h2>
                <p>
                    Have a question or want to make a reservation? Fill out the form and our concierge will
                    assist you right away.
                </p>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Your Name"
                        required
                    />
                    <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="Email Address"
                        required
                    />
                    <textarea
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        placeholder="Your Message"
                        rows="4"
                        required
                    ></textarea>
                    <button type="submit">Send Message</button>
                </form>
            </div>
        </section>
    );
}
