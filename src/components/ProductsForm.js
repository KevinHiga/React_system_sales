import React from "react";
import { Link } from "react-router-dom";
import "../components/styles/ProductsForm.css";
import "../components/styles/ForgotPasswordForm.css";

class ProductsForm extends React.Component {
  state = {
    producttype: [],
  };
  componentDidMount() {
    const requestOptions = {
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    };
    fetch("http://localhost:8080/api/product/type/all", requestOptions)
      .then((res) => res.json())
      .then((data) => {
          console.log(data);
        this.setState({ producttype: data });
      })
      .catch((error) => {
        this.setState({ error: error });
      });
  }
  handleClick = (e) => {
    console.log("el boton ha sido clickeado");
  };
  render() {
    return (
      <div className="form">
        <form className="product-form-group" onSubmit={this.props.onSubmit}>
          <div>
            <label>Nombre del producto</label>
            <input
              onChange={this.props.onChange}
              placeholder="Nombre del producto"
              type="text"
              name="names"
              value={this.props.formValues.names}
            />
          </div>
          <div>
            <label>Ingresar el precio</label>
            <input
              onChange={this.props.onChange}
              placeholder="Ingresar precio"
              type="number"
              step="0.01"
              min="0"
              name="price"
              value={this.props.formValues.price}
            />
          </div>
          <div>
            <label>Ingresar el stock</label>
            <input
              onChange={this.props.onChange}
              placeholder="Ingresar el stock"
              type="number"
              step="0"
              min="0"
              max="100"
              name="stock"
              value={this.props.formValues.stock}
            />
          </div>
          <div>
            <label>Ingresar el stock</label>
            <select name="producttypeid">
              {this.state.producttype.map((elemento) => (
                <option key={elemento._id} value={this.props.formValues.producttypeid = elemento._id}>
                  {elemento.name}
                </option>
              ))}
            </select>
          </div>
          <button onClick={this.handleClick} className="btn btn-primary">
            Guardar
          </button>
          <Link to="/products" className="btn button_cancel">
            Cancelar
          </Link>
        </form>
      </div>
    );
  }
}

export default ProductsForm;
