import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home/Home";
import Services from "./pages/Services/Services";
import Contact from "./pages/Contact/Contact";

export default function App() {
  return (
    <div className="flex flex-col min-h-screen bg-dark">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services.html" element={<Services />} />
          <Route path="/contact.html" element={<Contact />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
