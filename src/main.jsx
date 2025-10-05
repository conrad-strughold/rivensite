import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import NeutrlStyleLanding from "./App.jsx";
createRoot(document.getElementById("root")).render(
  React.createElement(React.StrictMode, null, React.createElement(NeutrlStyleLanding))
);
