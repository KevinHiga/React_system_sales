import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { Link } from "react-router-dom";
import "../components/styles/LoginForm.css";
import swal from "sweetalert2";
import { GoogleLogin } from "react-google-login";

class LoginForm extends React.Component {
  handleClick = (e) => {
    //console.log("el boton ha sido clickeado");
  };

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
          window.location = "/products";
          //window.location = window.location.href;
        }
      });
  }

  render() {
    const responseGoogle = (response) => {
      const data = [
        {
          username: response.Ft.xV,
          mail: response.Ft.pu,
          password: response.googleId,
        },
      ];
      console.log(data);
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(data),
      };
      fetch("http://localhost:8080/api/logingoogle", requestOptions)
        .then((response) => {
          console.log(response);
          if (response.status !== 200) {
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
    return (
      <div>
        <form
          onSubmit={this.props.onSubmit}
          className="base-container"
          ref={this.props.containerRef}
        >
          <h2 className="header">Sign In</h2>
          <div className="content">
            <div className="form">
              <div className="form-group">
                <div className="form-group-i">
                  <FontAwesomeIcon icon={faUser} className="i" />
                </div>
                <input
                  onChange={this.props.onChange}
                  placeholder="Username"
                  className="input"
                  type="text"
                  name="username"
                  value={this.props.formValues.username}
                />
              </div>
              <div className="form-group">
                <div className="form-group-i">
                  <FontAwesomeIcon icon={faLock} className="i" />
                </div>
                <input
                  onChange={this.props.onChange}
                  placeholder="Password"
                  className="input"
                  type="password"
                  name="password"
                  value={this.props.formValues.password}
                />
              </div>
              <div>
                <div>
                  <Link className="forgot" to="/forgotpass">
                    Forgot Password?
                  </Link>
                </div>
              </div>
              <GoogleLogin
                clientId="241601653601-5pcig7e7tct43t15eu2vecorla4pqhlc.apps.googleusercontent.com"
                buttonText="Login"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={"single_host_origin"}
              />
            </div>
          </div>
          <div className="footer">
            <button onClick={this.handleClick} className="btn solid">
              Login
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default LoginForm;
