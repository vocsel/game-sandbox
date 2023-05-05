/* eslint-env browser */

import React from "react";
import { createRoot } from "react-dom/client";
import App from "containers/App";

import "assets/sass/main.scss";

createRoot(document.querySelector("#root")).render(<App />);
