import "./CarGallery.css";
import car1 from "../../assets/car1.jpg";
import car2 from "../../assets/car2.jpg";
import car3 from "../../assets/car3.jpg";
import car4 from "../../assets/car4.jpg";

const fallbackImage =
    "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Car_icon.svg/1024px-Car_icon.svg.png";

const cars = [
    { img: car4 },
    { img: car1 },
    { img: car2 },
    { img: car3 },
];

export default function CarGallery() {
    return (
        <div className="car-gallery">
            <h2 className="section-title">Our Fleet</h2>

            <div className="cg-grid">
                {cars.map((car, index) => (
                    <div className="cg-card" key={index}>
                        <img
                            src={car.img || fallbackImage}
                            alt={`Car ${index + 1}`}
                            onError={(e) => (e.currentTarget.src = fallbackImage)}
                            className="cg-image"
                            loading="lazy"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}
