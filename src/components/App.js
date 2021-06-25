import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Login from "../pages/Login";
import ForgotPassword from "../pages/ForgotPassword";
import Home from "../pages/Home";
import Layout from "./Layout";
import Products from "../pages/Products";
import ProductsNew from "../pages/ProductsNew";
import DashboardPage from "../pages/DashboardPage";
import swal from "sweetalert2";

function App() {
  const [name, setName] = useState("");
  const [admin, setAdmin] = useState(false);
  useEffect(() => {
    (async () => {
      const requestOptions = {
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      };
      const response = await fetch(
        "http://localhost:8080/api/user/one",
        requestOptions
      );
      if (!response.ok) {
        const isJson = response.headers
          .get("content-type")
          ?.includes("application/json");
        const data = isJson && (await response.json());
        const pathname = window.location.pathname;
        if (
          pathname !== "/login" &&
          pathname !== "/" &&
          pathname !== "/forgotpass"
        ) {
          swal.fire({
            title: `${data.message}`,
            text: `${data.message}`,
            icon: "error",
            onClose: () => {
              window.location = "/login";
            },
          });
        }
      } else {
        const content = await response.json();
        setAdmin(content.admin);
        setName(content.username);
        const timer = setTimeout(() => window.location.reload(), 300000);
        return () => clearTimeout(timer);
      }
    })();
  });
  let ruta;
  if (name === "" || name === undefined) {
    ruta = (
      <>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/forgotpass" component={ForgotPassword} />
      </>
    );
  } else {
    if (!admin) {
    } else {
      ruta = (
        <>
          <Route exact path="/dashboard" component={DashboardPage} >
          </Route>
          <Route exact path="/products" component={Products} />
          <Route exact path="/products/new" component={ProductsNew} />
        </>
      );
    }
  }
  return (
    <BrowserRouter>
      <Layout name={name} setName={setName} admin={admin} setAdmin={setAdmin}>
        <Switch>{ruta}</Switch>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
