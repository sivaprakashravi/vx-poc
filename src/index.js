import React from "react";
import ReactDOM from "react-dom";
import WaterFall from "./charts/WaterFall";
import Tabs from "./components/Tabs";
import "./styles.css";

const data = [{
  d: "2022-05-05",
  v: 50
},{
  d: "2022-05-06",
  v: 50
},{
  d: "2022-05-07",
  v: 50
},{
  d: "2022-05-08",
  v: -50
},{
  d: "2022-05-09",
  v: 50
}];
const rootElement = document.getElementById("root");
ReactDOM.render(
  <React.StrictMode>
    <div>
      <h1>Charts POC</h1>
      <Tabs>
        <div label="Water Fall View">
          <WaterFall data={data} yLabel="Balance" xLabel="Days" />
        </div>
        <div label="Original View">
        </div>
        <div label="Net Debit View">
        </div>
        <div label="Worldmap View">
        </div>
      </Tabs>
    </div>
  </React.StrictMode>,
  rootElement
);
