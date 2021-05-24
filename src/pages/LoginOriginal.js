import React, { Component } from "react";
//import { Link } from 'react-router-dom';

import "./styles/Login.css";
import swal from "sweetalert2";
import LoginForm from "../components/LoginForm";
import Cookies from "universal-cookie";

export default class Login extends Component {
  state = {
    loading: false,
    error: null,
    form: {
      username: "",
      password: "",
    },
  };
  handleChange = (e) => {
    this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      },
    });
  };
  alertData(faltantes) {
    swal.fire({
      title: "Alto ahi!",
      text: `Te faltan campos por rellenar 🧐\n ${faltantes}`,
      icon: "error",
    });
  }

  alertError() {
    swal.fire({
      title: "Opps!",
      text: `Ha ocurrido algo inesperado, vuelve a intentarlo nuevamente`,
      icon: "error",
    });
  }

  alertSuccess() {
    swal
      .fire({
        title: "Se ingreso Exitosamente!",
        text: "Se ha ingresado con exito",
        icon: "success",
      })
      .then((result) => {
        if (result.value || !result.value) {
          this.props.history.push("/bookss");
          window.location.href = window.location.href;
        }
      });
  }
  handleSubmit = async (e) => {
    e.preventDefault();
    console.log(e.target.files);
    const data = [
      {
        username: this.state.form.username,
        password: this.state.form.password,
      },
    ];
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };
    const valuesFilter = Object.keys(this.state.form).filter((value) => {
      return this.state.form[value] === "";
    });
    if (valuesFilter.length !== 0) {
      this.alertData(valuesFilter);
    } else {
      this.setState({ loading: true, error: null });
      fetch("http://localhost:8080/user/login", requestOptions)
        .then((response) => {
          console.log(response);
          if (response.statusText != "OK") {
            this.setState({ loading: false, error: response.statusText });
            this.alertError();
          } else {
            this.setState({ loading: false });
            const cookies = new Cookies();
            cookies.set("username", JSON.stringify(data[0].username), {
              path: "/",
            });
            this.alertSuccess();
            //localStorage.setItem("user-info", JSON.stringify(data))
          }
        })
        .catch((error) => {
          this.setState({ loading: false, error: error });
          console.log(error);
          this.alertError();
        });
    }
  };
  render() {
    return (
      <React.Fragment>
        <div className="back">
          <div className="row">
            <div className="col-6">
              <LoginForm
                onChange={this.handleChange}
                onSubmit={this.handleSubmit}
                formValues={this.state.form}
              />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
