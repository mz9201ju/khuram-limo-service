import CarGallery from "./CarGallery";
import "./Services.css";

const serviceData = [
    {
        title: "Airport Transfers",
        desc: "Luxury airport pickups and drop-offs ensuring your comfort and punctuality.",
    },
    {
        title: "Corporate Travel",
        desc: "Professional, discreet, and dependable transportation for business executives.",
    },
    {
        title: "Weddings & Events",
        desc: "Arrive in elegance — luxury vehicles for weddings, galas, and private events.",
    },
    {
        title: "Hourly Chauffeur",
        desc: "Your personal driver, on your schedule, for meetings or city tours.",
    },
    {
        title: "VIP Meet & Greet",
        desc: "Personalized airport meet & greet with priority baggage assistance and fast-track service — ideal for executives and high-profile guests.",
    },
    {
        title: "Custom Fleet Solutions",
        desc: "Coordinated multi-vehicle logistics for events, corporate roadshows, and group transfers — dedicated planning & on-site management.",
    },
];

export default function Services() {
    return (
        <section className="services-section">
            <CarGallery />
            <h2 className="section-title">Our Luxury Services</h2>
            <div className="service-grid">
                {serviceData.map((service, i) => (
                    <div key={i} className="service-card">
                        <h3>{service.title}</h3>
                        <p>{service.desc}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}
