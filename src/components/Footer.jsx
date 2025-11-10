import { FaLinkedin, FaGlobe } from "react-icons/fa";

export default function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer className="bg-black/95 text-center py-6 border-t border-gold/30 text-gray-400 mt-auto">
            <div className="flex flex-col items-center gap-3">
                {/* Social / External Links */}
                <div className="flex justify-center gap-4 mb-2">
                    {/* 🌐 Website */}
                    <a
                        href="https://www.omerzahid.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-[#c7a166] transition-all duration-300"
                        aria-label="Website"
                    >
                        <FaGlobe size={28} />
                    </a>

                    {/* 💼 LinkedIn */}
                    <a
                        href="https://www.linkedin.com/in/omer-zahid-developer/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-[#c7a166] transition-all duration-300"
                        aria-label="LinkedIn"
                    >
                        <FaLinkedin size={28} />
                    </a>
                </div>

                {/* Copyright */}
                <p className="text-sm text-gray-400">
                    © {year} NYC LUX RIDE. All rights reserved.
                </p>
            </div>
        </footer>
    );
}
