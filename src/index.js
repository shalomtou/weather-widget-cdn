import React from "react";
import ReactDOM from "react-dom/client";
import { WeatherWidget } from "./App";
import "bootstrap/dist/css/bootstrap.min.css";

export class AppRenderer {
  constructor(apiKey, divId) {
    this.apiKey = apiKey;
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
