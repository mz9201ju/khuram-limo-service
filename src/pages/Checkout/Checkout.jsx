import { useEffect } from "react";
import "./Checkout.css";

const SANDBOX_CLIENT_ID =
    import.meta.env.VITE_PAYPAL_CLIENT_ID ||
    "";

export default function Checkout() {
    useEffect(() => {
        const WORKER_URL = "https://paypal-worker.omer-mnsu.workers.dev";

        // Load PayPal SDK once per session
        if (!window.__PAYPAL_LOADED__) {
            const script = document.createElement("script");
            script.id = "paypal-sdk";
            script.src =
                `https://www.paypal.com/sdk/js?client-id=${SANDBOX_CLIENT_ID}` +
                `&currency=USD&intent=capture&components=buttons,funding-eligibility` +
                `&enable-funding=card,venmo,paylater&disable-funding=sepa,bancontact`;
            script.onload = () => {
                window.__PAYPAL_LOADED__ = true;
                initPayPal();
            };
            script.onerror = () => console.error("⚠️ Failed to load PayPal SDK");
            document.body.appendChild(script);
        } else {
            initPayPal();
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
                    fundingSource: undefined, // show all buttons (PayPal, Card, Pay Later)
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
                        // Auto-capture through worker
                        const capture = await fetch(`${WORKER_URL}/capture-order`, {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({ orderId: data.orderID }),
                        });
                        const capData = await capture.json();
                        console.log("💰 Capture result:", capData);

                        if (capData.captured) {
                            window.location.href =
                                "https://mz9201ju.github.io/khuram-limo-service/success.html";
                        } else {
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

        // Cleanup on route change
        return () => {
            const container = document.getElementById("paypal-button-container");
            if (container) container.innerHTML = "";
        };
    }, []);

    return (
        <div className="checkout-page">
            <h1>Complete Your Booking</h1>
            <p>Secure your luxury ride with PayPal below.</p>
            <div id="paypal-button-container" className="paypal-container"></div>
        </div>
    );
}
