import React from "react";
import PageLoading from "../components/PageLoading";
import PageError from "../components/PageError";
import "./styles/Products.css";
import MiniLoader from "../components/MiniLoader";
import ProductsListContainer from "../components/ProductsListContainer";
class Products extends React.Component {
  state = {
    loading: true,
    error: null,
    data: undefined,
  };

  componentDidMount() {
    this.fetchData();

    this.intevalId = setInterval(this.fetchData, 5000);
  }

  componentWillUnmount() {
    clearInterval(this.intevalId);
  }

  fetchData = async () => {
    const requestOptions = {
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    };
    this.setState({ loading: true, error: null });
    fetch("http://localhost:8080/api/product/all", requestOptions)
      .then((res) => res.json())
      .then((data) => {
        this.setState({ loading: false, error: null, data: data });
      })
      .catch((error) => {
        this.setState({ loading: false, error: error });
      });
  };

  render() {
    if (this.state.loading === true && !this.state.data) {
      return <PageLoading />;
    }

    if (this.state.error != null) {
      return <PageError error={this.state.error} />;
    }
    return (
      <React.Fragment>
        <div>
          <div className="Products">
            <div className="Products__hero">
              <div className="Products__container"></div>
            </div>
          </div>
          <div className="Products__container">
            <ProductsListContainer products={this.state.data} />
            {this.state.loading && <MiniLoader />}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Products;
