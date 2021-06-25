import React, { Component } from "react";
import PageLoading from "../components/PageLoading";
import "./styles/Login.css";
import UAParser from "../../node_modules/ua-parser-js";
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

  alertError(message) {
    swal.fire({
      title: "Opps!",
      text: `${message}`,
      icon: "error",
    });
  }

  alertSuccess() {
    swal
      .fire({
        title: "Se ingreso Exitosamente!",
        text: "Se ha ingresado con exito",
        icon: "success",
        onClose: () => {
          this.props.history.push("/dashboard");
          window.location = window.location.href;
        },
      });
  }
  handleSubmit = async (e) => {
    e.preventDefault();
    var parser = new UAParser();
    var result = parser.getResult();
    var name = result.browser.name;
    var version = result.os.name;
    const data = [
      {
        username: this.state.form.username,
        password: this.state.form.password,
        session: {
          browser: name,
          os: version
        }
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
      fetch("http://localhost:8080/api/login", requestOptions)
        .then(async response => {
          const isJson = response.headers.get('content-type')?.includes('application/json');
          const data = isJson && await response.json();
          if (!response.ok) {
            this.alertError(data.message);
          } else {
            this.setState({ loading: false });
            this.alertSuccess();
            return data;
          }
        })
    }
  };

  componentDidMount() {
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
    if (this.state.loading === true && !this.state.data) {
      return <PageLoading />;
    }
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
