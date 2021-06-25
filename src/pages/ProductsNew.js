import React from "react";
import swal from "sweetalert2";
import "./styles/ProductsNew.css";
import ProductsForm from "../components/ProductsForm";

class ProductsNew extends React.Component {
  state = {
    loading: false,
    error: null,
    form: {
      names: "",
      price: 0.00,
      stock: 0,
      producttypeid: "",
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
        onClose: () => {
          this.props.history.push("/products");
        },
      });
  }
  handleSubmit = async (e) => {
    e.preventDefault();
    console.log(e.target.files);
    const data = [
      {
        names: this.state.form.names,
        price: parseFloat(this.state.form.price),
        stock: parseInt(this.state.form.stock),
        producttypeid: this.state.form.producttypeid,
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
      fetch("http://localhost:8080/api/product/create", requestOptions)
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
  handleFile = (event) => {
    this.setState({ selectedFile: event.target.files[0] });
  };

  render() {
    return (
      <React.Fragment>
        <div className="ProductsNew">
          <div className="row">
            <div className="col-lg mt-4">
              <div className="ProductsNew_Form">
                <h1>Productos Nuevos</h1>
                <ProductsForm
                  onChange={this.handleChange}
                  onSubmit={this.handleSubmit}
                  formValues={this.state.form}
                />
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default ProductsNew;
