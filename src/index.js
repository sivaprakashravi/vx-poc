import moment from "moment";
import React from "react";
import ReactDOM from "react-dom";
import Area from "./charts/Area";
import WaterFall from "./charts/WaterFall";
import Tabs from "./components/Tabs";
import "./styles.css";

const data = [{
  d: "2022-05-05",
  v: 10
}, {
  d: "2022-05-06",
  v: 20
}, {
  d: "2022-05-07",
  v: 30
}, {
  d: "2022-05-08",
  v: -50
}, {
  d: "2022-05-09",
  v: 50
}];
const getRandom = (val = 15) => {
  const data1 = [];
  for (let i = 1; i <= val; i++) {
    data1.push({
      d: moment(new Date().setDate(-i)).format('MM/DD/YYYY'),
      v: Math.floor(Math.random() * 100) + 35
    })
  }
  return data1;
}
const rootElement = document.getElementById("root");
ReactDOM.render(
  <React.StrictMode>
    <div>
      <h1>Charts POC</h1>
      <Tabs>
        <div label="Original View">
          <Area data={[getRandom()]} yLabel="Balance" xLabel="Days" threshold={[20, 80]} radial="true" color={[{from:"#348ceb", to:"#8cbef5"}]} />
        </div>
        <div label="Water Fall View">
          <WaterFall data={data} yLabel="Balance" xLabel="Days" />
        </div>
        <div label="Net Debit View">
          <Area data={[getRandom(3), getRandom(3), getRandom(3)]} yLabel="Balance" xLabel="Days" threshold={[55]}
           color={[{from:"#3ea359", to:"#3ea359"}, {from:"#d6d263", to:"#d6d263"}, {from:"#ed925c", to:"#ed925c"}]} />
        </div>
        <div label="Worldmap View">
        </div>
      </Tabs>
    </div>
  </React.StrictMode>,
  rootElement
);
