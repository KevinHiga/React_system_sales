import React from "react";
import ForgotPasswordForm from "../components/ForgotPasswordForm";
import swal from "sweetalert2";
import "../pages/styles/ForgotPassword.css";

class ForgotPassword extends React.Component {
  state = {
    loading: false,
    error: null,
    form: {
      username: "",
      newpassword: "",
      confirmpassword: "",
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

  alertError(message) {
    swal.fire({
      title: "Opps!",
      text: `${message}, try again`,
      icon: "error",
    });
  }

  alertErrorPassword() {
    swal.fire({
      title: "Opps!",
      text: `Las contraseñas no coinciden`,
      icon: "error",
    });
  }

  alertSuccess() {
    swal
      .fire({
        title: "Creacion Exitosa!",
        text: "Se ha creado la biblioteca con exito",
        icon: "success",
      })
      .then((result) => {
        if (result.value || !result.value) {
          this.props.history.push("/login");
        }
      });
  }
  handleSubmit = async (e) => {
    e.preventDefault();
    const data = [
      {
        username: this.state.form.username,
        password: this.state.form.confirmpassword,
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
      if (this.state.form.newpassword !== this.state.form.confirmpassword) {
        this.alertErrorPassword();
      }
      else {
        fetch("http://localhost:8080/api/forgot", requestOptions)
          .then(async response => {
            const isJson = response.headers.get('content-type')?.includes('application/json');
            const data = isJson && await response.json();
            if (!response.ok) {
              this.alertError(data.message);
            }
            else{
              this.setState({ loading: false });
              this.alertSuccess();
            }
          })
          .catch((error) => {
            this.setState({ loading: false, error: error });
            this.alertError();
          });
      }
    }
  };

  render() {
    return (
      <React.Fragment>
        <div className="container">
          <div className="row">
            <ForgotPasswordForm
              onChange={this.handleChange}
              onSubmit={this.handleSubmit}
              formValues={this.state.form}
            />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default ForgotPassword;
