import React, { useState, useEffect, useRef } from "react";
import RGL, { Responsive, WidthProvider } from "react-grid-layout";
import dragBackground from "../image/drag-background.svg";
import styled from "styled-components";
import "../../node_modules/react-grid-layout/css/styles.css";
import {
  PieChart,
  Pie,
  Tooltip,
  BarChart,
  XAxis,
  Cell,
  YAxis,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
  Bar,
} from "recharts";
import "regenerator-runtime/runtime";
import $ from "jquery";
import ChartsEmbedSDK from "@mongodb-js/charts-embed-dom";

const colors = ["#7DB3FF", "#49457B", "#FF7C78", "#FF5733"];
const ReactGridLayout = WidthProvider(RGL);

const DragField = styled(ReactGridLayout)`
  margin: 16px 28px 50px 28px;
  ${(props) =>
    props.isDragging
      ? `
    //background: url(${dragBackground});
    background-repeat: repeat-y;
    background-position: 0px -4px;
    background-size: 100% 52px;
  `
      : ""};
`;

const DashboardPrueba = () => {
  const [state, setState] = useState([]);
  const [state2, setState2] = useState([]);
  const [chartrender, setChartRender] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const layout = [
    { i: "a", x: 0, y: 0, w: 6, h: 7 },
    { i: "b", x: 6, y: 0, w: 6, h: 7 },
    { i: "c", x: 12, y: 0, w: 1, h: 2 },
  ];

  useEffect(() => {
    (async () => {
      const requestOptions = {
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      };
      fetch("http://localhost:8080/chart", requestOptions)
        .then((res) => res.json())
        .then((data) => {
          setChartRender(data);
        });
      fetch("http://localhost:8080/api/product/ptype/all", requestOptions)
        .then((res) => res.json())
        .then((data) => {
          setState(data);
        });
      fetch("http://localhost:8080/api/product/ptype/pricetier", requestOptions)
        .then((res) => res.json())
        .then((data2) => {
          setState2(data2);
        });
    })();
  });

  const onLayoutChange = (newLayout) => {
    newLayout.forEach((l) => {
      const item = chartrender.find((i) => i._id.toString() === l.i);
      const toUpdate = JSON.stringify({
        _id: l.i,
        x: l.x,
        y: l.y,
        w: l.w,
        h: l.h,
      });
      console.log(toUpdate.x);
      console.log(item._id);
      if (l.i === item._id) {
        const requestOptions = {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: toUpdate,
        };
        fetch(`http://localhost:8080/chart/modify/${l.i}`, requestOptions)
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });
  };
  const handleSubmit = async (e) => {
    console.log("hola");
  };

  const defaultLayout = (i) => ({
    x: i.x || 0,
    y: i.y || 0,
    w: i.w || 6,
    h: i.h || 7,
    minW: 6,
    minH: 7,
  });
  return (
    <ReactGridLayout
      margin={[12, 12]}
      containerPadding={[0, 0]}
      width={1600}
      onDragStart={() => setIsDragging(true)}
      onDragStop={() => setIsDragging(false)}
      onResizeStart={() => setIsDragging(true)}
      onResizeStop={() => setIsDragging(false)}
      cols={24}
      rowHeight={40}
      layout={layout}
      isDragging={isDragging}
    >
    <div className="atras" key="a" >
      <div>
        <button id="refresh">Refresh Chart</button>
        <label>
          Filter by country
          <select id="pricetier">
            <option value="">--All--</option>
            <option value="range 301$ - 600$">range 301$ - 600$</option>
          </select>
        </label>
      </div>
      <div style={{ height: "400px", width: "380px" }} id="chart"></div>
    </div>
    </ReactGridLayout>
  );
};
export default DashboardPrueba;
