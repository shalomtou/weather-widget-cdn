import React from "react";
import ReactDOM from "react-dom/client";
import { WeatherWidget } from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
const { REACT_APP_WEATEHR_KEY } = process.env;

export class AppRenderer {
  constructor(divId) {
    this.apiKey = REACT_APP_WEATEHR_KEY;
    this.divId = divId;
  }

  render() {
    let container = document.getElementById(this.divId);

    if (!container) {
      console.warn(
        `WeatherWidget: div with id "${this.divId}" not found. Appending to document.body.`
      );
      let newContainer;
      newContainer = document.createElement("div");
      newContainer.id = "weatherDiv";
      newContainer.style.position = "relative";
      newContainer.style.zIndex = "999";
      document.body.append(newContainer);
      container = newContainer;
    }

    const root = ReactDOM.createRoot(container);
    root.render(
      <React.StrictMode>
        <WeatherWidget apiKey={this.apiKey} />
      </React.StrictMode>
    );
  }
}

window.AppRenderer = AppRenderer;
