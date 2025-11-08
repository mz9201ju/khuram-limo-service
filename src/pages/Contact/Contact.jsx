// src/pages/Contact/Contact.jsx
import { useState } from "react";
import "./Contact.css";
import heroImg from "../../assets/logo.png"; // ensure this exists in src/assets

const WORKER_URL =
    import.meta.env.VITE_WHATS_URL ||
    "https://whatsapp-redirect-worker.omer-mnsu.workers.dev";
const SECRET = import.meta.env.VITE_WHATS_SECRET || "";

export default function Contact() {
    const [form, setForm] = useState({ name: "", email: "", message: "" });
    const [loading, setLoading] = useState(false);

    const TARGET_PHONE = "19294622366"; // E.164 digits-only

    const handleChange = (e) =>
        setForm((s) => ({ ...s, [e.target.name]: e.target.value }));

    const buildMessage = ({ name, email, message }) =>
        `New contact from website
Name: ${name}
Email: ${email}
Message: ${message}`;

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.name || !form.email || !form.message) {
            alert("Please complete all fields.");
            return;
        }

        setLoading(true);

        try {
            const payload = { phone: TARGET_PHONE, text: buildMessage(form), redirect: false };

            const res = await fetch(WORKER_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    ...(SECRET ? { "x-worker-token": SECRET } : {}),
                },
                body: JSON.stringify(payload),
            });

            if (!res.ok) {
                const err = await res.json().catch(() => ({ error: "Unknown worker error" }));
                throw new Error(err.error || "Worker error");
            }

            const { waUrl } = await res.json();
            console.log("waUrl ->", waUrl);

            if (!waUrl) throw new Error("No waUrl returned");

            // NAVIGATE IN THE SAME TAB (mobile-friendly)
            // Use assign so back button behavior remains intuitive.
            window.location.assign(waUrl);

            setForm({ name: "", email: "", message: "" });
        } catch (err) {
            console.error("Contact submit error:", err);
            alert("Failed to open WhatsApp: " + (err?.message || "Unknown error"));
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="contact-section">
            <div className="contact-container">
                <img
                    src={heroImg}
                    alt="Logo"
                    style={{
                        maxWidth: "100%",
                        height: "auto",
                        borderRadius: 8,
                        marginBottom: 18,
                    }}
                    onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = "heroImg";
                    }}
                />

                {/* === NEW BUTTONS ABOVE "Get in Touch" === */}
                <div className="external-buttons">
                    <button
                        onClick={() =>
                            window.open(
                                "https://booking.empirecls.com/Webconnect/DefaultV2/Booking",
                                "_blank"
                            )
                        }
                        className="whatsapp-button"
                    >
                        Book a Ride
                    </button>

                    <button
                        onClick={() =>
                            window.open(
                                "https://booking.empirecls.com/Webconnect/DefaultV2/PriceQuote",
                                "_blank"
                            )
                        }
                        className="whatsapp-button"
                    >
                        Get Price Quote
                    </button>
                </div>

                <h2>Get in Touch</h2>
                <p>
                    Have a question or want to make a reservation? Fill out the form and our
                    concierge will assist you right away.
                </p>

                <form onSubmit={handleSubmit}>
                    <input
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Your Name"
                        required
                    />
                    <input
                        name="email"
                        type="email"
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
                    />
                    <button type="submit" disabled={loading}>
                        {loading ? "Opening WhatsApp..." : "Send Message via WhatsApp"}
                    </button>
                </form>
            </div>
        </section>
    );
}
