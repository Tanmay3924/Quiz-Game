import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import router from "./Store/routes.jsx";

import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import store from "./Store/Store.js";
import { RouterProvider } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <Provider store={store}>
    <RouterProvider router={router}></RouterProvider>
    <App />
  </Provider>
  // </StrictMode>
);
