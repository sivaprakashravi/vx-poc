import React from "react";
import ReactDOM from "react-dom";
import LineChart from "./lineChart";
import letterFrequency from '@vx/mock-data/lib/mocks/letterFrequency';
import "./styles.css";

const data = letterFrequency.slice(5);
const rootElement = document.getElementById("root");
ReactDOM.render(
  <React.StrictMode>
    <div className="App">
      <div style={{ width: "500px", height: "500px" }}>
        <LineChart data={data} />
      </div>
    </div>
  </React.StrictMode>,
  rootElement
);
