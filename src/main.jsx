import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store, persistor } from "./context/store.js";
import { PersistGate } from "redux-persist/integration/react";
import "./index.css";
import "remixicon/fonts/remixicon.css";

import App from "./App.jsx";
createRoot(document.getElementById("root")).render(
  //<StrictMode>
  <Provider store={store}>
    <PersistGate loading={<div>loading...</div>} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
  //</StrictMode>
);
