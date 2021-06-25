import React, { useState, useEffect, useRef } from "react";
import "../pages/styles/Dashboard.css";
import { Rnd } from "react-rnd";
import { Grid, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
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

const useStyle = makeStyles((theme) => ({
  grid: {
    width: "100%",
    margin: "0px",
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    background: theme.palette.success.light,
  },
}));

const colors = ["#7DB3FF", "#49457B", "#FF7C78", "#FF5733"];

const DashboardPrueba = () => {
  const [state, setState] = useState([]);
  const [state2, setState2] = useState([]);
  const [charts, setCharts] = useState([]);
  useEffect(() => {
    (async () => {
      const requestOptions = {
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      };
      fetch("http://localhost:8080/api/product/ptype/all", requestOptions)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setState(data);
        });
      fetch("http://localhost:8080/api/product/ptype/pricetier", requestOptions)
        .then((res) => res.json())
        .then((data2) => {
          setState2(data2);
        });
    })();
  }, []);
  const classes = useStyle();
  const ref = useRef(null);
  return (
    <div>
      <h1>Dashboard</h1>
      <Grid container spacing={2} className={classes.grid}>
        <Grid item xs={12} md={6} ref={ref}>
          <Rnd
            default={{
              x: 150,
              y: 0,
              width: 400,
              height: 300,
            }}
            onDragStop={(e, d) => {
              console.log(d.x);
              console.log(d.y);
            }}
            onResizeStop={(e, direction, ref, delta, position) => {
              console.log(ref);
            }}
            minWidth={400}
            minHeight={300}
            bounds="window"
          >
            <Paper className={classes.paper}>5</Paper>
          </Rnd>
        </Grid>
        <Grid item xs={12} md={6} ref={ref}>
          <Rnd
            default={{
              x: 150,
              y: 0,
              width: 400,
              height: 300,
            }}
            onDragStop={(e, d) => {
              console.log(d.x);
              console.log(d.y);
            }}
            minWidth={400}
            minHeight={300}
            bounds="window"
          >
            <Paper className={classes.paper}>5</Paper>
          </Rnd>
        </Grid>
        <Grid item xs={12} md={6}>
          <Rnd
            default={{
              x: 150,
              y: 0,
              width: 400,
              height: 300,
            }}
            onDragStop={(e, d) => {
              console.log(d.x);
              console.log(d.y);
            }}
            minWidth={400}
            minHeight={300}
            bounds="window"
          >
            <Paper className={classes.paper}>
              <PieChart width={400} height={300}>
                <Pie
                  dataKey="stock"
                  nameKey="_id"
                  isAnimationActive={false}
                  data={state2}
                  cx={200}
                  cy={150}
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
            </Paper>
          </Rnd>
        </Grid>
        <Grid item xs={12} md={6}>
          <Rnd
            default={{
              x: -550,
              y: 102,
              width: 400,
              height: 300,
            }}
            onDragStop={(e, d) => {
              console.log(d.x);
              console.log(d.y);
            }}
            minWidth={400}
            minHeight={300}
            bounds="window"
          >
            <Paper className={classes.paper}>
              <BarChart
                width={400}
                height={300}
                data={state}
                margin={{
                  top: 5,
                  right: 80,
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
            </Paper>
          </Rnd>
        </Grid>
      </Grid>
    </div>
  );
};
export default DashboardPrueba;
