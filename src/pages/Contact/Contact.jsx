import { useState } from "react";
import "./Contact.css";
import heroImg from "../../assets/logo.png";

const WORKER_URL =
    import.meta.env.VITE_WHATS_URL ||
    "https://whatsapp-redirect-worker.omer-mnsu.workers.dev";
const SECRET = import.meta.env.VITE_WHATS_SECRET || "";
const TARGET_PHONE = "19294622366";

export default function Contact() {
    const [form, setForm] = useState({
        pickupDate: "",
        pickupTime: "",
        pickup: "",
        dropoff: "",
        travellers: 1,
        kids: 0,
        bags: 0,
        message: "",
    });
    const [loading, setLoading] = useState(false);
    const [pickupSuggestions, setPickupSuggestions] = useState([]);
    const [dropoffSuggestions, setDropoffSuggestions] = useState([]);

    // 🆓 OpenStreetMap Autocomplete (no keys)
    const fetchSuggestions = async (query, setter) => {
        if (query.length < 3) return setter([]);
        try {
            const res = await fetch(
                `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
                    query
                )}&addressdetails=1&limit=5`
            );
            const data = await res.json();
            setter(
                data.map((item) => ({
                    id: item.place_id,
                    name: item.display_name,
                }))
            );
        } catch (e) {
            console.error("Nominatim error:", e);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((s) => ({ ...s, [name]: value }));

        if (name === "pickup") fetchSuggestions(value, setPickupSuggestions);
        if (name === "dropoff") fetchSuggestions(value, setDropoffSuggestions);
    };

    const selectSuggestion = (text, field) => {
        setForm((s) => ({ ...s, [field]: text }));
        if (field === "pickup") setPickupSuggestions([]);
        if (field === "dropoff") setDropoffSuggestions([]);
    };

    const adjustCount = (field, delta) =>
        setForm((s) => ({ ...s, [field]: Math.max(0, s[field] + delta) }));

    const buildMessage = (d) => `
🚖 Ride Request
📅 ${d.pickupDate} ⏰ ${d.pickupTime}
📍 From: ${d.pickup}
🏁 To: ${d.dropoff}
👤 Travellers: ${d.travellers} | 👶 Kids: ${d.kids} | 🧳 Bags: ${d.bags}
🗒 ${d.message || "N/A"}
    `.trim();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.pickup || !form.dropoff) {
            alert("Please enter pickup and dropoff.");
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
            const { waUrl } = await res.json();
            window.location.assign(waUrl);
        } catch (err) {
            alert("Failed to open WhatsApp.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="contact-section">
            <div className="contact-container">
                <img src={heroImg} alt="Logo" className="contact-logo" />
                <h2 className="form-title">Where & When</h2>
                <p className="form-subtitle">
                    Plan your ride — enter details below and send via WhatsApp.
                </p>

                <form onSubmit={handleSubmit} className="ride-form">
                    <div className="ride-row">
                        <label>
                            Pickup Date
                            <input
                                type="date"
                                name="pickupDate"
                                value={form.pickupDate}
                                onChange={handleChange}
                                required
                            />
                        </label>
                        <label>
                            Pickup Time
                            <input
                                type="time"
                                name="pickupTime"
                                value={form.pickupTime}
                                onChange={handleChange}
                                required
                            />
                        </label>
                    </div>

                    <div className="ride-row autocomplete">
                        <label>
                            Pickup Location
                            <input
                                type="text"
                                name="pickup"
                                placeholder="Enter pickup address or airport"
                                value={form.pickup}
                                onChange={handleChange}
                                required
                            />
                            {pickupSuggestions.length > 0 && (
                                <ul className="suggestions">
                                    {pickupSuggestions.map((s) => (
                                        <li
                                            key={s.id}
                                            onClick={() =>
                                                selectSuggestion(s.name, "pickup")
                                            }
                                        >
                                            {s.name}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </label>
                    </div>

                    <div className="ride-row autocomplete">
                        <label>
                            Dropoff Location
                            <input
                                type="text"
                                name="dropoff"
                                placeholder="Enter dropoff address or airport"
                                value={form.dropoff}
                                onChange={handleChange}
                                required
                            />
                            {dropoffSuggestions.length > 0 && (
                                <ul className="suggestions">
                                    {dropoffSuggestions.map((s) => (
                                        <li
                                            key={s.id}
                                            onClick={() =>
                                                selectSuggestion(s.name, "dropoff")
                                            }
                                        >
                                            {s.name}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </label>
                    </div>

                    <div className="ride-row counts">
                        {["travellers", "kids", "bags"].map((field, i) => (
                            <div key={i} className="count-box">
                                <span>{field.charAt(0).toUpperCase() + field.slice(1)}</span>
                                <div className="counter">
                                    <button
                                        type="button"
                                        onClick={() => adjustCount(field, -1)}
                                    >
                                        -
                                    </button>
                                    <span>{form[field]}</span>
                                    <button
                                        type="button"
                                        onClick={() => adjustCount(field, 1)}
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <textarea
                        name="message"
                        placeholder="Special instructions (optional)"
                        value={form.message}
                        onChange={handleChange}
                        rows="3"
                    />

                    <button type="submit" disabled={loading}>
                        {loading ? "Opening WhatsApp..." : "Send via WhatsApp"}
                    </button>
                </form>
            </div>
        </section>
    );
}
