import React, { useState, useEffect } from "react";
import DashboardItem from "../components/DashboardItem";
import "./styles/Dashboard.css";

const DashboardPage = () => {
  const [chartrender, setChartRender] = useState([]);

  useEffect(() => {
    fetchMyAPI().then((data) => {
      setChartRender(data);
    });
  }, []);

  async function fetchMyAPI() {
    const requestOptions = {
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    };
    const response = await fetch(
      "http://localhost:8080/api/chart/all",
      requestOptions
    );
    const content = await response.json();
    return content;
  }

  return (
      <DashboardItem chartrender={chartrender}></DashboardItem>
  );
};

export default DashboardPage;
