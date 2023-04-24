import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { StateProvider } from "@/store/store.tsx";

import "bulma/css/bulma.min.css";
import "@creativebulma/bulma-tooltip/dist/bulma-tooltip.min.css";
import "./index.css";
import "@/assets/styles/style.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <StateProvider>
      <App />
    </StateProvider>
  </React.StrictMode>
);
