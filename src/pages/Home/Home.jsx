import { useCallback } from "react";
import "./Home.css";

export default function Home() {

    const handleBookNow = useCallback(() => {
        window.open("https://customer.moovs.app/nyc-lux-ride/request/new", "_blank");
    }, []);

    const prefetchContactAssets = () => {
        const img = new Image();
        img.src = "/assets/logo.png";
    };

    return (
        <section className="home-hero" aria-label="Luxury limo service hero">

            {/* 🎥 VIDEO BACKGROUND */}
            <video
                src="https://www.nycluxride.com/video.mp4"
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                className="video-element"
                style={{ background: "black" }}
            />


            {/* overlay */}
            <div className="home-overlay" />

            {/* content */}
            <div className="home-content">
                <h1 className="home-title">Arrive in Style</h1>
                <p className="home-sub">
                    White-glove chauffeurs, immaculate fleet, and tailored hospitality —
                    your luxury journey starts the moment we open the door.
                </p>

                <div className="home-cta-row">
                    <button
                        className="book-btn"
                        onClick={handleBookNow}
                        onMouseEnter={prefetchContactAssets}
                        aria-label="Book luxury car service now"
                    >
                        Book Now
                    </button>

                    <a className="learn-btn" href="/services">See Fleet</a>
                    <a className="learn-btn" href="/contact">Contact Us</a>
                </div>

                <div className="trust-row">
                    <span>⭐ 5/5 Customer Rating</span>
                    <span>•</span>
                    <span>Professional Chauffeurs</span>
                    <span>•</span>
                    <span>Corporate Accounts</span>
                </div>
            </div>
        </section>
    );
}
