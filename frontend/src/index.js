import React from "react";
import ReactDOM from "react-dom/client";
import "./assets/styles.css";  // Global styles
import App from "./App";

const rootElement = document.getElementById("root");
const root = ReactDOM.createRoot(rootElement);

root.render(<App />);
