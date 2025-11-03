import { useEffect } from "react";
import "./Checkout.css";

const SANDBOX_CLIENT_ID =
    import.meta.env.VITE_PAYPAL_CLIENT_ID ||
    "";

export default function Checkout() {
    useEffect(() => {
        const WORKER_URL = "https://paypal-worker.omer-mnsu.workers.dev";

        // Prevent double-loading across route transitions
        if (!window.__PAYPAL_LOADED__) {
            const script = document.createElement("script");
            script.id = "paypal-sdk";
            script.src = `https://www.paypal.com/sdk/js?client-id=${SANDBOX_CLIENT_ID}&currency=USD&intent=capture`;
            script.onload = () => {
                window.__PAYPAL_LOADED__ = true;
                initPayPal();
            };
            script.onerror = () => console.error("⚠️ Failed to load PayPal SDK");
            document.body.appendChild(script);
        } else {
            initPayPal(); // already loaded once
        }

        function initPayPal() {
            // Wait until SDK is ready
            if (!window.paypal) {
                console.warn("⏳ Waiting for PayPal SDK...");
                setTimeout(initPayPal, 250);
                return;
            }

            const container = document.getElementById("paypal-button-container");
            if (!container) return;

            // Clear old buttons before re-rendering
            container.innerHTML = "";

            paypal
                .Buttons({
                    style: {
                        shape: "pill",
                        color: "gold",
                        layout: "vertical",
                        label: "paypal",
                    },
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
                    onApprove: (data) => {
                        console.log("✅ Payment approved:", data);
                        window.location.href = `${WORKER_URL}/paypal-return?token=${data.orderID}&PayerID=${data.payerID}`;
                    },
                    onError: (err) => {
                        console.error("❌ PayPal error:", err);
                    },
                })
                .render(container);
        }

        // 🧹 Cleanup on unmount (leave checkout)
        return () => {
            const container = document.getElementById("paypal-button-container");
            if (container) container.innerHTML = "";
            // Note: We do *not* remove the SDK script now.
            // We mark it as loaded once (window.__PAYPAL_LOADED__) so it won’t reload.
            // This avoids the PayPal "listener already exists" bug.
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
