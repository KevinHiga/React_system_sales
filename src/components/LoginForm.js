import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { Link } from "react-router-dom";
import "../components/styles/LoginForm.css";

class LoginForm extends React.Component {
  handleClick = (e) => {
    //console.log("el boton ha sido clickeado");
  };
  render() {
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
                  <Link className="forgot" to="/products/new">
                    Forgot Password?
                  </Link>
                </div>
              </div>
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
