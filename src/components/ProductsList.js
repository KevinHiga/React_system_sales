import React from "react";
import { Link } from "react-router-dom";
import "./styles/ProductsList.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlusCircle,
  faEdit,
  faMinusSquare,
} from "@fortawesome/free-solid-svg-icons";
import DeleteProductModal from "../components/DeleteProductModal";
import Cookies from "universal-cookie";

function ProductsListItem (props) {
  const product = props.product;
  const cookies = new Cookies();
  cookies.set("_id", product._id, {
    path: "/",
  });
  //localStorage.setItem("_id", product._id)
    return (
      <div className="ProductsListItem">
        <img
          className="ProductsListItem__img"
          src="http://imagenes.deltron.com.pe/images/productos/on-line/items/large/cp/il/cpili39100.jpg"
          alt=""
        />
        <div className="ProductsListItem__details">
          <div>
            <Link
              className="btn btn-primary mb-4"
              to={`/bookss/${product._id}/edit`}
            >
              <FontAwesomeIcon icon={faEdit} className="i" />
            </Link>
            <button
              onClick={props.onOpenModal}
              className="btn btn-danger mb-4 btnsepare"
            >
              <FontAwesomeIcon icon={faMinusSquare} className="i" />
            </button>
            <DeleteProductModal
              isOpen={props.modalIsOpen}
              onClose={props.onClose}
              onDeleteProduct={props.onDeleteProduct}
            />
          </div>
          <p className="ProductsListItem__details--title">
            <strong>{product.name}</strong>
          </p>
          <p className="ProductsListItem__details--subtitle">
            {product.price}
            <br></br>
            {product.stock}
            <br></br>
            {product.producttypeid}
          </p>
        </div>
      </div>
    );
  
}

function useSearchProducts(products) {
  const [query, setQuery] = React.useState("");
  const [filteredProducts, setFilteredProducts] = React.useState(products);

  React.useMemo(() => {
    const result = products.filter((product) => {
      return `${product.name}`.toLowerCase().includes(query.toLowerCase());
    });

    setFilteredProducts(result);
  }, [products, query]);

  return { query, setQuery, filteredProducts };
}

function ProductsList(props) {
  const products = props.products;
  const { query, setQuery, filteredProducts } = useSearchProducts(products);
  if (filteredProducts.length === 0) {
    return (
      <div>
        <div className="form-group-filter">
          <label>Filter Products</label>
          <input
            type="text"
            className="form-control"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
            }}
          />
        </div>
        <h3>No librarys were found</h3>
        <Link className="btn btn-primary" to="/products/new">
          <FontAwesomeIcon icon={faPlusCircle} className="i" />
        </Link>
      </div>
    );
  }
  return (
    <div className="ProductsList Products__container-tamanio">
      <div className="filter-group">
        <label>Filter Product</label>
        <input
          type="text"
          className="form-control"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
          }}
        />
        <div className="Products__buttons">
          <Link to="/products/new" className="btn btn-primary">
            <FontAwesomeIcon icon={faPlusCircle} className="i" />
          </Link>
        </div>
      </div>
      <ul className="list-unstyled ProductsList">
        {filteredProducts.map((product) => {
          return (
            <li key={product._id}>
              <ProductsListItem 
              onClose={props.onCloseModal}
              onOpenModal={props.onOpenModal}
              modalIsOpen={props.modalIsOpen}
              onDeleteProduct={props.onDeleteProduct}
              product={product} />
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default ProductsList;
