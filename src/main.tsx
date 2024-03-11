import "@fontsource-variable/inter";
import React from "react";
import ReactDOM from "react-dom/client";
import Routes from "@/routes";
import "@/index.css";

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Routes />
  </React.StrictMode>
);
