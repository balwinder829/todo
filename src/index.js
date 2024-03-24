import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "App";

// Material Dashboard 2 React Context Provider
import { MaterialUIControllerProvider } from "context";
import { store } from "qpp/stor";
import { Provider } from "react-redux";
import "./app.css"
import { persistor } from "qpp/stor";
import { PersistGate } from "redux-persist/integration/react";
const container = document.getElementById("app");
const root = createRoot(container);

root.render(
  <BrowserRouter>
    <MaterialUIControllerProvider>
    <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
      </PersistGate>
      </Provider>
    </MaterialUIControllerProvider>
  </BrowserRouter>
);
