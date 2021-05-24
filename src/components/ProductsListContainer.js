import React from "react";

import PageLoading from "../components/PageLoading";
import ProductsListItem from "./ProductsList";
import Cookies from "universal-cookie";

class ProductsListContainer extends React.Component {
  state = {
    loading: true,
    error: null,
    data: undefined,
    _id: "",
  };

  componentDidMount() {
    this.fetchData();
  }

  fetchData = async () => {
    this.setState({ loading: true, error: null });
    fetch("http://localhost:8080/products")
      .then((res) => res.json())
      .then((data) => {
        this.setState({ loading: false, data: data, _id: data._id });
      })
      .catch((error) => {
        this.setState({ loading: false, error: error });
      });
  };

  handleOpenModal = (e) => {
    this.setState({ modalIsOpen: true });
  };

  handleCloseModal = (e) => {
    this.setState({ modalIsOpen: false });
  };

  handleDeleteProduct = async (e) => {
    const cookies = new Cookies();
    //this.state._id = localStorage.getItem("_id");
    this.state._id = cookies.get("_id");
    console.log(this.state._id);
    this.setState({ modalIsOpen: false });
    this.setState({ loading: true, error: null });
    const requestOptions = {
      method: "DELETE",
    };
    fetch(
      `http://localhost:8080/product/${this.state._id}`,
      requestOptions
    )
      .then((res) => res.json())
      .then((data) => {
        //localStorage.clear();
        cookies.remove("_id", { path: "/" });
        window.location = window.location.href;
        this.setState({ loading: true, error: null });
        this.props.history.push("/products");
      })
      .catch((error) => {
        this.setState({ loading: false, error: error });
      });
  };

  render() {
    if (this.state.loading) {
      return <PageLoading />;
    }

    return (
      <ProductsListItem
        onCloseModal={this.handleCloseModal}
        onOpenModal={this.handleOpenModal}
        modalIsOpen={this.state.modalIsOpen}
        onDeleteProduct={this.handleDeleteProduct}
        products={this.state.data}
      />
    );
  }
}

export default ProductsListContainer;
