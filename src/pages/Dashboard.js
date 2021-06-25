import React, { useState, useEffect } from "react";
import "../pages/styles/Dashboard.css";
import {
  PieChart,
  Pie,
  Tooltip,
  BarChart,
  XAxis,
  Cell,
  YAxis,
  Legend,
  CartesianGrid,
  Bar,
} from "recharts";

const colors = ["#7DB3FF", "#49457B", "#FF7C78", "#FF5733"];
const Dashboard = () => {
  const [state, setState] = useState([]);
  const [state2, setState2] = useState([]);
  useEffect(() => {
    (async () => {
      const requestOptions = {
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      };
      fetch(
        "http://localhost:8080/api/product/ptype/all",
        requestOptions
      )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setState(data);
      });
      fetch(
        "http://localhost:8080/api/product/ptype/pricetier",
        requestOptions
      )
        .then((res) => res.json())
        .then((data2) => {
          setState2(data2);
        });
    })();
  }, []);

  return (
    <React.Fragment>
      <div className="dashboard">
        <div className="row">
          <div className="col-lg mt-4">
            <div className="dashboard-graph">
              <div className="dashboard">
                <div className="dashboard-graph-group">
                  <h1>Dashboard</h1>
                  <div className="App">
                    <PieChart width={400} height={400}>
                      <Pie
                        dataKey="stock"
                        nameKey="_id"
                        isAnimationActive={false}
                        data={state2}
                        cx={200}
                        cy={200}
                        outerRadius={80}
                        //fill="#8884d8"
                        label
                      >
                      {state2.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={colors[index]} />
                      ))}
                      </Pie>
                      <Tooltip />
                      <Legend nameKey="_id" name="_id" />
                    </PieChart>
                    <BarChart
                      width={500}
                      height={300}
                      data={state}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 80,
                        bottom: 5,
                      }}
                      barSize={20}
                    >
                      <XAxis
                        scale="point"
                        dataKey="_id"
                        padding={{ left: 10, right: 10 }}
                      />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <CartesianGrid strokeDasharray="3 3" />
                      <Bar
                        key="stock"
                        dataKey="stock"
                        name="stock"
                        fill="#8884d8"
                        background={{ fill: "#eee" }}
                      />
                    </BarChart>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Dashboard;
