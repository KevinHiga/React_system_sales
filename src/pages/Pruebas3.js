import React from "react";
import ReactDOM from "react-dom";
const DashboardPrueba = () => {
  return (
    <div>
      <iframe
        style={
          ({ background: "#FFFFFF" },
          { border: "none" },
          { borderRadius: "2px" },
          { boxShadow: "0 2px 10px 0 rgba(70, 76, 79, .2)" })
        }
        width="400"
        height="400"
        src="https://charts.mongodb.com/charts-project-0-hvoqv/embed/charts?id=cf5a5758-87da-4faf-a90b-3b544af2f546"
      ></iframe>
    </div>
  );
};
export default DashboardPrueba;
