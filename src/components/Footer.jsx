export default function Footer() {
    return (
        <footer className="bg-black/95 text-center py-6 border-t border-gold/30 text-gray-400 mt-auto">
            <p>
                © {new Date().getFullYear()} Khuram LuxRide. All rights reserved.
            </p>
        </footer>
    );
}
