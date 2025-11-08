import { useState } from "react";
import doger1 from "../../assets/doger1.jpg";
import doger2 from "../../assets/doger2.jpg";
import "./CarGallery.css";

const fallbackImage =
    "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Car_icon.svg/1024px-Car_icon.svg.png";

const cars = [
    {
        name: "",
        img: doger1
    },
    {
        name: "",
        img: doger2
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
