import React from "react";
import { Link } from "react-router-dom";
import "../components/styles/ForgotPasswordForm.css";

class ForgotPasswordForm extends React.Component {
  handleClick = (e) => {
    console.log("el boton ha sido clickeado");
  };
  render() {
    return (
      <div className="form">
        <form className="form-group-p" onSubmit={this.props.onSubmit}>
          <div>
            <label>Nombre del usuario</label>
            <input
              onChange={this.props.onChange}
              placeholder="Nombre del usuario"
              type="text"
              name="username"
              value={this.props.formValues.username}
            />
          </div>
          <div>
            <label>Ingresar nueva contraseña</label>
            <input
              onChange={this.props.onChange}
              placeholder="Ingresar nueva contraseña"
              type="password"
              name="newpassword"
              value={this.props.formValues.newpassword}
            />
          </div>
          <div>
            <label>Confirmar la contraseña</label>
            <input
              onChange={this.props.onChange}
              placeholder="Confirmar la contraseña"
              type="password"
              name="confirmpassword"
              value={this.props.formValues.confirmpassword}
            />
          </div>
          <button onClick={this.handleClick} className="btn btn-primary">
            Guardar
          </button>
          <Link to="/login" className="btn button_cancel">
            Cancelar
          </Link>
        </form>
      </div>
    );
  }
}

export default ForgotPasswordForm;
