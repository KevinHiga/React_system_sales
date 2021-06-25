import React from "react";
import { Link } from "react-router-dom";

class BooksForm extends React.Component {
  handleClick = (e) => {
    console.log("el boton ha sido clickeado");
  };
  /*
    handleSubmit = (e) => {
        e.preventDefault();
        console.log("el form ha sido enviado");
        console.log(this.state);
    };
    */
  onFileChange = (event) => {
    // Update the state
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      //body: JSON.stringify(data),
    };
    const file = event.target.files[0];
    this.setState({ selectedFile: event.target.files[0] });
    this.props.formValues.avatarUrl = file;
    console.log(this.props.formValues.avatarUrl);
    fetch("https://localhost:3030/library", requestOptions)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  render() {
    return (
      <div>
        <form onSubmit={this.props.onSubmit}>
          <div className="form-group">
            <label>Nombre de la biblioteca</label>
            <input
              onChange={this.props.onChange}
              placeholder="Ingrese el nombre del libro"
              className="form-control"
              type="text"
              name="name"
              value={this.props.formValues.name}
            />
          </div>
          <div className="form-group">
            <label>Direccion de la biblioteca</label>
            <input
              onChange={this.props.onChange}
              placeholder="Ingrese el anio del libro"
              className="form-control"
              type="text"
              name="direction"
              value={this.props.formValues.direction}
            />
          </div>
          <div className="form-group">
            <label>Fecha de inauguracion de la biblioteca</label>
            <input
              onChange={this.props.onChange}
              placeholder="Ingrese el autor del libro"
              className="form-control"
              type="text"
              name="year"
              value={this.props.formValues.year}
            />
          </div>
          <div className="form-group">
            <input type="file" onChange={this.onFileChange} />
          </div>
          <button onClick={this.handleClick} className="btn btn-primary">
            Guardar
          </button>
          <Link to="/bookss" className="btn btn-danger Bookss__buttons_cancel">
            Cancelar
          </Link>
        </form>
      </div>
    );
  }
}

export default BooksForm;
