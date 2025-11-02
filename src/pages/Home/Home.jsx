import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

/**
 * Slide images - replace with your hosted assets for production
 */
const slideImages = [
    "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1600&q=80",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/BMW_7-Series_%28G70%29_750e_1X7A2460.jpg/2560px-BMW_7-Series_%28G70%29_750e_1X7A2460.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/6/69/2023_Cadillac_Lyriq_side.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/3/38/2017_Cadillac_XTS.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/e/ea/Lucid_Air_IMG_2299.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/c/c2/Mercedes-Benz_S_Class_W222.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/3/39/2018_Volvo_S90_R-Design_D4_Automatic_2.0_Front.jpg"
];

const FALLBACK =
    "data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1200' height='800' viewBox='0 0 1200 800'%3E%3Crect width='100%25' height='100%25' fill='%230a0a0a'/%3E%3Ctext x='50%25' y='50%25' dy='.35em' font-family='Arial,Helvetica,sans-serif' font-size='28' fill='%23bdbdbd' text-anchor='middle'%3EImage unavailable%3C/text%3E%3C/svg%3E";

export default function Home() {
    const navigate = useNavigate();

    // slideshow state
    const [index, setIndex] = useState(0);
    const [prevIndex, setPrevIndex] = useState(null);
    const [imgError, setImgError] = useState({}); // track errors per index

    // timing (tweak these)
    const intervalMs = 6000; // duration each slide stays
    const fadeDurationMs = 1400; // crossfade duration (longer = smoother)

    // CTA handler: route to Contact page
    const handleBookNow = useCallback(() => {
        if (typeof navigate === "function") {
            navigate("/contact", { replace: false });
            window.scrollTo({ top: 0, behavior: "smooth" });
        } else {
            window.location.href = "/contact";
        }
    }, [navigate]);

    const prefetchContactAssets = () => {
        const img = new Image();
        img.src = "/assets/contact-hero.jpg"; // swap if you have a real path
    };

    // Advance slideshow every X ms
    useEffect(() => {
        const tick = () => {
            setPrevIndex(index);
            setIndex((i) => (i + 1) % slideImages.length);
            // clear prev after fade completes
            setTimeout(() => setPrevIndex(null), fadeDurationMs);
        };

        const t = setInterval(tick, intervalMs);
        return () => clearInterval(t);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [index]);

    // preload next image
    useEffect(() => {
        const next = (index + 1) % slideImages.length;
        const img = new Image();
        img.src = slideImages[next];
    }, [index]);

    const handleImgError = (i) => {
        setImgError((s) => ({ ...s, [i]: true }));
    };

    return (
        <section className="home-hero" aria-label="Luxury limo service hero">
            {/* BACKGROUND LAYERS - IMG elements so we can detect load errors */}
            <div className="bg-wrap" aria-hidden="true">
                {/* current image */}
                <img
                    className="bg-layer bg-current"
                    src={imgError[index] ? FALLBACK : slideImages[index]}
                    alt=""
                    onError={() => handleImgError(index)}
                    draggable={false}
                    style={{ transitionDuration: `${fadeDurationMs}ms` }}
                />

                {/* previous image (for crossfade) */}
                {prevIndex !== null && (
                    <img
                        className="bg-layer bg-prev"
                        src={imgError[prevIndex] ? FALLBACK : slideImages[prevIndex]}
                        alt=""
                        onError={() => handleImgError(prevIndex)}
                        draggable={false}
                        // pass fadeDuration so CSS animation matches JS timer
                        style={{ animationDuration: `${fadeDurationMs}ms` }}
                    />
                )}
            </div>

            {/* your existing overlay + content */}
            <div className="home-overlay" />

            <div className="home-content">
                <h1 className="home-title">Arrive in Style</h1>
                <p className="home-sub">
                    White-glove chauffeurs, immaculate fleet, and tailored hospitality — your
                    luxury journey starts the moment we open the door.
                </p>

                <div className="home-cta-row">
                    <button
                        className="book-btn"
                        onClick={handleBookNow}
                        onMouseEnter={prefetchContactAssets}
                        onFocus={prefetchContactAssets}
                        aria-label="Book luxury car service now"
                    >
                        Book Now
                    </button>

                    <a className="learn-btn" href="#/services" aria-label="See our fleet">
                        See Fleet
                    </a>
                </div>

                <div className="trust-row" aria-hidden="true">
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
