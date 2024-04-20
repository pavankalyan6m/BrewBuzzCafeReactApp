import React from 'react';
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { StoreProvider } from "./components/StoreContext/StoreContext";
import { OurBlendsProvider } from "./components/StoreContext/OurBlendsContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <StoreProvider>
        <OurBlendsProvider>
          <App />
        </OurBlendsProvider>
      </StoreProvider>
    </BrowserRouter>
  </React.StrictMode>
);
