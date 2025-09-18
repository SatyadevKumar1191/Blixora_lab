// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css"; // agar aapka stylesheet alag ho to adjust karo

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter> {/* <-- ONLY place for Router */}
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
