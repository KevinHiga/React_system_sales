import React from "react";
import { Link } from "react-router-dom";
import "../components/styles/LoginForm.css";

class LoginForm extends React.Component {
  handleClick = (e) => {
    console.log("el boton ha sido clickeado");
  };
  render() {
    return (
      <div className="body">
        <form onSubmit={this.props.onSubmit} className="box">
          <h1>LOGIN</h1>
          <div className="form-group">
            <input
              onChange={this.props.onChange}
              placeholder="Username"
              className="form-control"
              type="text"
              name="username"
              value={this.props.formValues.username}
            />
          </div>
          <div className="form-group">
            <input
              onChange={this.props.onChange}
              placeholder="Password"
              className="form-control"
              type="password"
              name="password"
              value={this.props.formValues.password}
            />
          </div>
          <button onClick={this.handleClick} className="btn btn-primary">
            Login
          </button>
        </form>
      </div>
    );
  }
}

export default LoginForm;
