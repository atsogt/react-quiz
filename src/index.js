import React from "react";
import ReactDOM from "react-dom/client";
// import "./index.css";
// import App from "./components/App";
import BankApp from "./bank/BankApp";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* <App /> */}
    <BankApp />
  </React.StrictMode>
);
