import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.scss";

import { App } from "./components/index";
import { Provider } from "react-redux";
import { store } from "./app/store";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
