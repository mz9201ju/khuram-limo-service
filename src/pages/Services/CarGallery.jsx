import { useState } from "react";
import "./CarGallery.css";

const fallbackImage =
    "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Car_icon.svg/1024px-Car_icon.svg.png";

const cars = [
    {
        name: "BMW 760i",
        img: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/BMW_7-Series_%28G70%29_750e_1X7A2460.jpg/2560px-BMW_7-Series_%28G70%29_750e_1X7A2460.jpg" // 7-Series (G70)
    },
    {
        name: "Cadillac Lyriq",
        img: "https://upload.wikimedia.org/wikipedia/commons/6/69/2023_Cadillac_Lyriq_side.jpg"
    },
    {
        name: "Cadillac XTS",
        img: "https://upload.wikimedia.org/wikipedia/commons/3/38/2017_Cadillac_XTS.jpg"
    },
    {
        name: "Lucid Air",
        img: "https://upload.wikimedia.org/wikipedia/commons/e/ea/Lucid_Air_IMG_2299.jpg"
    },
    {
        name: "Mercedes-Benz S550",
        img: "https://upload.wikimedia.org/wikipedia/commons/c/c2/Mercedes-Benz_S_Class_W222.jpg" // W222 S-Class
    },
    {
        name: "Volvo S90",
        img: "https://upload.wikimedia.org/wikipedia/commons/3/39/2018_Volvo_S90_R-Design_D4_Automatic_2.0_Front.jpg"
    },
    {
        name: "Cadillac Escalade",
        img: "https://upload.wikimedia.org/wikipedia/commons/5/54/Cadillac_Escalade_GMTT1XX.jpg"
    },
    {
        name: "Ground Force 1",
        img: "https://images.pexels.com/photos/19871522/pexels-photo-19871522.jpeg?cs=srgb&dl=pexels-eddievaldes155-19871522.jpg&fm=jpg"
        // ✅ Using Sprinter-style black executive van works as “Ground Force 1” / presidential-style shuttle.
        // Source: Pexels (free to use). :contentReference[oaicite:2]{index=2}
    },
    {
        name: "Mercedes-Benz Sprinter",
        img: "https://images.pexels.com/photos/19871522/pexels-photo-19871522.jpeg?cs=srgb&dl=pexels-eddievaldes155-19871522.jpg&fm=jpg"
        // ✅ Verified working. Black Mercedes-Benz Sprinter in front of building.
        // Source: Pexels (free to use). :contentReference[oaicite:3]{index=3}
    },
    {
        name: "Mini Coach",
        img: "https://images.pexels.com/photos/29586609/pexels-photo-29586609.jpeg"
        // 🔄 Placeholder: this should be a smaller luxury coach / shuttle bus image from Pexels.
        // You can grab one like “luxury-seabird-coach-bus-for-comfortable-travel” which Pexels hosts. :contentReference[oaicite:4]{index=4}
    },
    {
        name: "Full-Size Bus",
        img: "https://images.pexels.com/photos/18029614/pexels-photo-18029614.jpeg"
        // 🔄 Placeholder: modern white coach / tour bus. Pexels lists this as free use. :contentReference[oaicite:5]{index=5}
    },
];

export default function CarGallery() {
    const [selectedCar, setSelectedCar] = useState(null);
    const [modalSrc, setModalSrc] = useState("");

    function openModal(car) {
        setModalSrc(car.img || fallbackImage);
        setSelectedCar(car);
    }

    function closeModal() {
        setSelectedCar(null);
        setModalSrc("");
    }

    function handleImgError(e) {
        e.currentTarget.src = fallbackImage;
    }

    return (
        <div className="car-gallery">
            <h2 className="section-title">Our Fleet</h2>

            <div className="cg-grid">
                {cars.map((car) => (
                    <button
                        className="cg-card"
                        key={car.name}
                        onClick={() => openModal(car)}
                        style={{
                            backgroundImage: `linear-gradient(rgba(0,0,0,0.45), rgba(0,0,0,0.45)), url("${car.img}")`
                        }}
                        aria-label={`View ${car.name}`}
                    >
                        <span className="cg-card-name">{car.name}</span>
                    </button>
                ))}
            </div>

            {selectedCar && (
                <div className="cg-modal" onClick={closeModal} role="dialog" aria-modal="true">
                    <div className="cg-modal-body" onClick={(e) => e.stopPropagation()}>
                        <img
                            src={modalSrc}
                            alt={selectedCar.name}
                            className="cg-modal-image"
                            onError={handleImgError}
                            loading="lazy"
                        />
                        <figcaption className="cg-caption">{selectedCar.name}</figcaption>
                    </div>
                </div>
            )}
        </div>
    );
}
