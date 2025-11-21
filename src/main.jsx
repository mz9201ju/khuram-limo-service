import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import "./index.css";

const page = window.__PAGE__ || "home";

const basenames = {
  home: "/",
  services: "/services.html",
  contact: "/contact.html",
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter basename={basenames[page] || "/"}>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
