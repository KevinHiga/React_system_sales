import React, { useState, useEffect } from "react";
import RGL, { WidthProvider } from "react-grid-layout";
import "../../node_modules/react-grid-layout/css/styles.css";
import "regenerator-runtime/runtime";
import $ from "jquery";
import ChartsEmbedSDK from "@mongodb-js/charts-embed-dom";
import jwt from "jsonwebtoken";
import Loader from "../components/Loader";
import "../pages/styles/Dashboard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRetweet } from "@fortawesome/free-solid-svg-icons";
const ReactGridLayout = WidthProvider(RGL);

const DashboardItem = (props) => {
  const [isDragging, setIsDragging] = useState(false);
  const { chartrender } = props;
  let token = jwt.sign({ usename: "kevinhiga" }, "secret", {
    expiresIn: "24h", // expires in 24 hours
  });

  useEffect(() => {
    renderChart();
  }, [chartrender]);

  const renderChart = () => {
    chartrender.forEach((element) => {
      const sdk = new ChartsEmbedSDK({
        baseUrl: element.baseUrl,
        theme: "dark",
        showAttribution: false,
        autoRefresh: false,
        maxDataAge: 300,
        getUserToken: function () {
          return chartrender[0].session.ssid;
        },
      });

      const chart = sdk.createChart({
        chartId: element.chartId,
      });
      chart.render(document.getElementById("chart" + element._id));

      $("#timerefresh" + element._id).on("change", (e) => {
        const timerefresh = Number(e.target.value);
        console.log(timerefresh);
        if (timerefresh === 0) {
          chart.setAutoRefresh(false);
        } else {
          chart.setAutoRefresh(true);
          chart.setMaxDataAge(timerefresh);
        }
      });

      $("#refresh" + element._id).on("click", () => {
        chart.refresh();
      });

      $("#pricetier" + element._id).on("change", (e) => {
        const pricetier = e.target.value;
        pricetier ? chart.setFilter({ _id: pricetier }) : chart.setFilter({});
      });
    });
  };

  const onLayoutChange = (newLayout) => {
    newLayout.forEach((l) => {
      const item = chartrender.find((i) => i._id.toString() === l.i);
      const toUpdate = JSON.stringify({
        _id: l.i,
        x: l.x,
        y: l.y,
        w: l.w,
        h: l.h,
        baseUrl: l.baseUrl,
        chartId: l.chartId,
      });
      if (l.i === item._id) {
        const requestOptions = {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: toUpdate,
        };
        fetch(
          `http://localhost:8080/api/chart/modify/${l.i}`,
          requestOptions
        ).then((res) => res.json());
      }
    });
  };

  const defaultLayout = (i) => ({
    x: i.x || 0,
    y: i.y || 0,
    w: i.w || 12,
    h: i.h || 10,
    minW: 10,
    minH: 10,
  });

  return !chartrender || chartrender.length ? (
    <div className="dashboard">
      <div className="dashboard-nav">
        <h1>Dashboard</h1>
      </div>
      <ReactGridLayout
        margin={[12, 12]}
        containerPadding={[0, 0]}
        width="100%"
        onDragStart={() => setIsDragging(true)}
        onDragStop={() => setIsDragging(false)}
        onResizeStart={() => setIsDragging(true)}
        onResizeStop={() => setIsDragging(false)}
        cols={24}
        rowHeight={40}
        className="dashboard-body"
        onLayoutChange={onLayoutChange}
        layout={chartrender}
        isDragging={isDragging}
      >
        {chartrender &&
          chartrender.map((item, index) => (
            <div
              className="dashboard-item"
              key={item._id}
              data-grid={defaultLayout(item)}
            >
              <div className="dashboard-group">
                <div className="mt-6 dashboard-filters">
                  <label>Filter</label>
                  <select id={"pricetier" + item._id}>
                    <option value="">--All--</option>
                    <option value="range 301$ - 600$">range 301$ - 600$</option>
                  </select>
                </div>
                <div className="mt-6 dashboard-refresh dashboard-refresh-item">
                  <button id={"refresh" + item._id} className="dashboard-icon">
                    <FontAwesomeIcon icon={faRetweet} />
                  </button>
                  <select id={"timerefresh" + item._id}>
                    <option defaultValue value="0">
                      Off
                    </option>
                    <option value="300">5 Minutos</option>
                    <option value="600">10 Minutos</option>
                    <option value="900">15 Minutos</option>
                  </select>
                </div>
              </div>
              <div
                style={{
                  height: "90%",
                  width: "100%",
                }}
                id={"chart" + item._id}
                className="dashboard-chart"
              ></div>
            </div>
          ))}
      </ReactGridLayout>
    </div>
  ) : (
    <Loader />
  );
};

export default DashboardItem;
