import React from "react";
import "./styles/BooksNew.css";
import "./styles/Bookss.css";
import ForgotPasswordForm from "../components/ForgotPasswordForm";
import swal from "sweetalert2";

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
        title: "Creacion Exitosa!",
        text: "Se ha creado la biblioteca con exito",
        icon: "success",
      })
      .then((result) => {
        if (result.value || !result.value) {
          this.props.history.push("/");
        }
      });
  }
  handleSubmit = async (e) => {
    e.preventDefault();
    const data = [
      {
        username: this.state.form.username,
        newpassword: this.state.form.newpassword,
        confirmpassword: this.state.form.confirmpassword,
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
      fetch("https://localhost:3030/library", requestOptions)
        .then((response) => {
          console.log(response.json());
          this.setState({ loading: false });
          console.log(this.state.form);
          this.alertSuccess();
        })
        .catch((error) => {
          this.setState({ loading: false, error: error });
          this.alertError();
        });
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
