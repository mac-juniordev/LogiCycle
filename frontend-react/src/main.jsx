import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import App from "./App.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 4000,
          style: {
            background: "#0b3d2e",
            color: "#f8fafc",
            border: "1px solid #166b4b",
            fontSize: "0.9rem",
            fontWeight: 500,
            borderRadius: "12px",
            padding: "12px 16px",
          },
          success: {
            iconTheme: { primary: "#2ab077", secondary: "#051f15" },
          },
          error: {
            iconTheme: { primary: "#dc2626", secondary: "#f8fafc" },
          },
        }}
      />
    </BrowserRouter>
  </React.StrictMode>
);