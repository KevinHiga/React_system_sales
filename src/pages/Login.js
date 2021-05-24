import React, { Component } from "react";

import "./styles/Login.css";
import swal from "sweetalert2";
import LoginForm from "../components/LoginForm";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogginActive: true,
      loading: false,
      error: null,
      form: {
        username: "",
        password: "",
      },
      user: "",
    };
  }
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
          this.props.history.push("/products");
          window.location = window.location.href;
        }
      });
  }
  handleSubmit = async (e) => {
    e.preventDefault();
    const data = [
      {
        username: this.state.form.username,
        password: this.state.form.password,
      },
    ];
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
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
          if (response.statusText !== "OK") {
            this.setState({ loading: false, error: response.statusText });
            this.alertError();
          } else {
            this.setState({ loading: false });
            this.alertSuccess();
            return response.json();
          }
        })
        .catch((error) => {
          this.setState({ loading: false, error: error });
          console.log(error);
          this.alertError();
        });
    }
  };

  componentDidMount() {
    //Add .right by default
    this.rightSide.classList.add("right");
  }

  changeState() {
    const { isLogginActive } = this.state;

    if (isLogginActive) {
      this.rightSide.classList.remove("right");
      this.rightSide.classList.add("left");
    } else {
      this.rightSide.classList.remove("left");
      this.rightSide.classList.add("right");
    }
    this.setState((prevState) => ({
      isLogginActive: !prevState.isLogginActive,
    }));
  }

  render() {
    const { isLogginActive } = this.state;
    const current = isLogginActive ? "Sign Up" : "Sign In";
    const currentActive = isLogginActive ? "Sign In" : "Sign Up";
    return (
      <React.Fragment>
        <div className="App">
          <div className="login">
            <div className="container" ref={(ref) => (this.container = ref)}>
              {isLogginActive && (
                <LoginForm
                  containerRef={(ref) => (this.current = ref)}
                  onChange={this.handleChange}
                  onSubmit={this.handleSubmit}
                  formValues={this.state.form}
                />
              )}
            </div>
            <RightSide
              current={current}
              currentActive={currentActive}
              containerRef={(ref) => (this.rightSide = ref)}
              onClick={this.changeState.bind(this)}
            />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const RightSide = (props) => {
  return (
    <div
      className="right-side"
      ref={props.containerRef}
      onClick={props.onClick}
    >
      <div className="inner-container">
        <div className="text">{props.current}</div>
      </div>
    </div>
  );
};
