import React from "react";
import { Link } from "react-router-dom";
import "../pages/styles/Bookss.css";

class ForgotPasswordForm extends React.Component {
  handleClick = (e) => {
    console.log("el boton ha sido clickeado");
  };
  render() {
    return (
      <div>
        <form onSubmit={this.props.onSubmit}>
          <div className="form-group">
            <label>Nombre del usuario</label>
            <input
              onChange={this.props.onChange}
              placeholder="Nombre del usuario"
              className="form-control"
              type="text"
              name="username"
              value={this.props.formValues.username}
            />
          </div>
          <div className="form-group">
            <label>Ingresar nueva contraseña</label>
            <input
              onChange={this.props.onChange}
              placeholder="Ingresar nueva contraseña"
              className="form-control"
              type="password"
              name="newpassword"
              value={this.props.formValues.newpassword}
            />
          </div>
          <div className="form-group">
            <label>Confirmar la contraseña</label>
            <input
              onChange={this.props.onChange}
              placeholder="Confirmar la contraseña"
              className="form-control"
              type="password"
              name="confirmpassword"
              value={this.props.formValues.confirmpassword}
            />
          </div>
          <button onClick={this.handleClick} className="btn btn-primary">
            Guardar
          </button>
          <Link to="/login" className="btn btn-danger Bookss__buttons_cancel">
            Cancelar
          </Link>
        </form>
      </div>
    );
  }
}

export default ForgotPasswordForm;
