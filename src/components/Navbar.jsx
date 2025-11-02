import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/logo.png";

export default function Navbar() {
    // --- UI state ---
    const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
    const [menuOpen, setMenuOpen] = useState(false);
    const { pathname } = useLocation();

    // ref to the header element so we can detect outside clicks
    const headerRef = useRef(null);

    // --- handle window resize to toggle mobile layout and close menu on desktop ---
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 1024);
            if (window.innerWidth >= 1024) setMenuOpen(false);
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    /**
     * Close the mobile menu when:
     *  - user clicks/taps anywhere outside the header/nav area (pointerdown)
     *  - user presses Escape
     *
     * We only attach these listeners when menuOpen === true to avoid unnecessary overhead.
     */
    useEffect(() => {
        if (!menuOpen) return; // no listeners unless menu is open

        // Pointer events cover mouse, touch, and pen input.
        const handlePointerDown = (e) => {
            // If headerRef is set and the event target is not inside it, close the menu.
            if (headerRef.current && !headerRef.current.contains(e.target)) {
                setMenuOpen(false);
            }
        };

        // Close on Escape key for accessibility and convenience.
        const handleKeyDown = (e) => {
            if (e.key === "Escape") setMenuOpen(false);
        };

        document.addEventListener("pointerdown", handlePointerDown);
        document.addEventListener("keydown", handleKeyDown);

        // Cleanup when menu closes or component unmounts.
        return () => {
            document.removeEventListener("pointerdown", handlePointerDown);
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [menuOpen]);

    const navLinks = [
        { to: "/", name: "Home" },
        { to: "/services", name: "Services" },
        { to: "/contact", name: "Contact" },
    ];

    return (
        // attach headerRef so outside clicks can be detected
        <header ref={headerRef} className="sticky top-0 z-50 bg-black/95 backdrop-blur border-b border-gold/30 shadow-lg">
            <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
                {/* === Logo === */}
                <Link to="/" className="flex items-center gap-2">
                    <img src={logo} alt="NYC LUX RIDES" className="h-10 w-auto" />
                    <span className="text-gold font-playfair text-2xl font-bold tracking-wide">
                        NYC LUX RIDES
                    </span>
                </Link>

                {/* === Desktop Navigation === */}
                {!isMobile && (
                    <nav className="flex items-center space-x-10 text-white font-inter text-sm uppercase tracking-wide">
                        {navLinks.map((link) => (
                            <Link
                                key={link.to}
                                to={link.to}
                                className={`${pathname === link.to
                                    ? "text-gold border-b-2 border-gold pb-1"
                                    : "hover:text-gold"
                                    } transition-all duration-300`}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </nav>
                )}

                {/* === Desktop Right Side (Call + Icons) === */}
                {!isMobile && (
                    <div className="flex items-center gap-6">
                        <a
                            href="tel:+19294622366"
                            className="text-gold font-semibold text-sm hover:text-white transition"
                        >
                            +1 (929)-462-2366
                        </a>
                        <div className="flex gap-3 text-gray-300 text-lg">
                            <a
                                href="https://www.instagram.com"
                                target="_blank"
                                rel="noreferrer"
                                className="hover:text-gold transition"
                            >
                                <i className="fab fa-instagram"></i>
                            </a>
                            <a
                                href="https://www.linkedin.com"
                                target="_blank"
                                rel="noreferrer"
                                className="hover:text-gold transition"
                            >
                                <i className="fab fa-linkedin"></i>
                            </a>
                            <a
                                href="https://twitter.com"
                                target="_blank"
                                rel="noreferrer"
                                className="hover:text-gold transition"
                            >
                                <i className="fab fa-twitter"></i>
                            </a>
                            <a
                                href="https://facebook.com"
                                target="_blank"
                                rel="noreferrer"
                                className="hover:text-gold transition"
                            >
                                <i className="fab fa-facebook"></i>
                            </a>
                        </div>
                    </div>
                )}

                {/* === Mobile Burger === */}
                {isMobile && (
                    <button
                        className="text-gold text-3xl focus:outline-none"
                        onClick={() => setMenuOpen(!menuOpen)}
                        aria-expanded={menuOpen}
                        aria-label={menuOpen ? "Close menu" : "Open menu"}
                    >
                        {menuOpen ? "✕" : "☰"}
                    </button>
                )}
            </div>

            {/* === Mobile Dropdown === */}
            {isMobile && menuOpen && (
                <nav className="bg-black/95 border-t border-gold/20 text-center text-white">
                    {navLinks.map((link) => (
                        <Link
                            key={link.to}
                            to={link.to}
                            className={`block py-3 ${pathname === link.to ? "text-gold" : "hover:text-gold"
                                } transition`}
                            onClick={() => setMenuOpen(false)}
                        >
                            {link.name}
                        </Link>
                    ))}
                    <a
                        href="tel:+19294622366"
                        className="block py-3 text-gold font-semibold hover:text-white transition"
                    >
                        +1 (929)-462-2366
                    </a>
                    <div className="flex justify-center gap-5 py-3 text-lg">
                        <a
                            href="https://instagram.com"
                            target="_blank"
                            rel="noreferrer"
                            className="text-gray-300 hover:text-gold transition"
                        >
                            <i className="fab fa-instagram"></i>
                        </a>
                        <a
                            href="https://linkedin.com"
                            target="_blank"
                            rel="noreferrer"
                            className="text-gray-300 hover:text-gold transition"
                        >
                            <i className="fab fa-linkedin"></i>
                        </a>
                        <a
                            href="https://twitter.com"
                            target="_blank"
                            rel="noreferrer"
                            className="text-gray-300 hover:text-gold transition"
                        >
                            <i className="fab fa-twitter"></i>
                        </a>
                        <a
                            href="https://facebook.com"
                            target="_blank"
                            rel="noreferrer"
                            className="text-gray-300 hover:text-gold transition"
                        >
                            <i className="fab fa-facebook"></i>
                        </a>
                    </div>
                </nav>
            )}
        </header>
    );
}
