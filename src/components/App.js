import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Login from "../pages/Login";
import Layout from "./Layout";
import Products from "../pages/Products";
import swal from "sweetalert2";

function App() {
  const [name, setName] = useState("");
  useEffect(() => {
    (async () => {
      const requestOptions = {
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      };
      const response = await fetch(
        "http://localhost:8080/user",
        requestOptions
      );
      if (response.status === 401) {
        const pathname = window.location.pathname;
        if (pathname !== "/login" && pathname !== "/") {
          swal
            .fire({
              title: "Su session expiro!",
              text: "Su session expiro",
              icon: "error",
              onClose: () => {
                window.location = "/login";
              }
            });
        }
      } else {
        const content = await response.json();
        setName(content.username);
        const timer = setTimeout(() => window.location.reload(), 30000);
        return () => clearTimeout(timer);
      }
    })();
  });
  let ruta;
  if (name === "" || name === undefined) {
    ruta = (
      <>
        <Route exact path="/login" component={Login} />
      </>
    );
  } else {
    ruta = <Route exact path="/products" component={Products} />;
  }
  return (
    <BrowserRouter>
      <Layout name={name} setName={setName}>
        <Switch>{ruta}</Switch>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
