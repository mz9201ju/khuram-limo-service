import { useEffect } from "react";
import "./Checkout.css";

const SANDBOX_CLIENT_ID =
    import.meta.env.VITE_PAYPAL_CLIENT_ID || "";
const SQUARE_APPLICATION_ID = import.meta.env.VITE_SQUARE_APPLICATION_ID || ""; // Replace with your Square application ID

export default function Checkout() {
    /* useEffect(() => {
        const WORKER_URL = "https://paypal-worker.omer-mnsu.workers.dev";

        // Load PayPal SDK once per session
        if (!window.__PAYPAL_LOADED__) {
            const script = document.createElement("script");
            script.id = "paypal-sdk";
            script.src =
                `https://www.paypal.com/sdk/js?client-id=${SANDBOX_CLIENT_ID}` +
                `&currency=USD&intent=capture&components=buttons,funding-eligibility` +
                `&enable-funding=card,venmo,paylater,applepay&disable-funding=sepa,bancontact`;
            script.onload = () => {
                window.__PAYPAL_LOADED__ = true;
                initPayPal();
            };
            script.onerror = () => console.error("⚠️ Failed to load PayPal SDK");
            document.body.appendChild(script);
        } else {
            initPayPal();
        }

        // Load Square SDK for Square payments
        if (window.Square && SQUARE_APPLICATION_ID) {
            const squareButtonContainer = document.getElementById("square-button-container");
            if (!squareButtonContainer) return;

            const payments = window.Square.payments(SQUARE_APPLICATION_ID);
            payments.requestCardPayment()
                .then((paymentRequest) => {
                    const button = document.createElement("button");
                    button.innerText = "Pay with Square";
                    button.addEventListener("click", () => {
                        paymentRequest.startPayment();
                    });
                    squareButtonContainer.appendChild(button);
                })
                .catch((error) => console.error("Error initializing Square payment:", error));
        }

        async function initPayPal(attempt = 1) {
            if (!window.paypal) {
                if (attempt < 10) setTimeout(() => initPayPal(attempt + 1), 300);
                else console.error("PayPal SDK failed to load");
                return;
            }

            const container = document.getElementById("paypal-button-container");
            if (!container) return;
            container.innerHTML = "";

            paypal
                .Buttons({
                    style: { shape: "pill", color: "gold", layout: "vertical", label: "paypal" },
                    fundingSource: undefined,
                    createOrder: async () => {
                        const res = await fetch(`${WORKER_URL}/create-order`, {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({ amount_cents: 2999, currency: "USD" }),
                        });
                        const data = await res.json();
                        console.log("✅ Order created:", data);
                        return data.order?.id;
                    },
                    onApprove: async (data) => {
                        console.log("✅ Payment approved:", data);
                        const capture = await fetch(`${WORKER_URL}/capture-order`, {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({ orderId: data.orderID }),
                        });
                        const capData = await capture.json();
                        console.log("💰 Capture result:", capData);

                        if (capData.status === "COMPLETED") {
                            console.log("✅ Payment successfully captured.");
                            window.location.href = "https://mz9201ju.github.io/khuram-limo-service/success.html";
                        } else {
                            console.error("❌ Payment failed or pending.");
                            alert("Payment pending or failed. Please try again.");
                        }
                    },
                    onError: (err) => {
                        console.error("❌ PayPal error:", err);
                        alert("There was an issue processing your payment.");
                    },
                })
                .render(container);
        }

        return () => {
            const container = document.getElementById("paypal-button-container");
            if (container) container.innerHTML = "";

            const squareButtonContainer = document.getElementById("square-button-container");
            if (squareButtonContainer) squareButtonContainer.innerHTML = "";
        };
    }, []); */

    return (
        <div className="checkout-page">
            <h1>Complete Your Booking</h1>
            <p>Secure your luxury ride with Moovs App</p>

            <div id="paypal-button-container" className="paypal-container"></div>
            <div id="square-button-container" className="square-container"></div>

            {/* 🚗 Book with Moovs Button */}
            <div className="moovs-container">
                <button
                    className="moovs-button"
                    onClick={() =>
                        window.open("https://customer.moovs.app/nyc-lux-ride/request/new", "_blank")
                    }
                >
                    Book Now!
                </button>
            </div>
        </div>
    );
}
