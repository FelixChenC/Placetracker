import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import PlacesContextProvicer from "./contexts/PlacesContext";

ReactDOM.render(
  <React.StrictMode>
    <PlacesContextProvicer>
      <App />
    </PlacesContextProvicer>
  </React.StrictMode>,
  document.getElementById("root")
);
