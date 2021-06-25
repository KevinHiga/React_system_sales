import React from "react";
import "./styles/Home.css";
import banner1 from "../image/home.jpg";
import banner2 from "../image/banner2.jpg";
import banner3 from "../image/banner3.jpg";
class Products extends React.Component {
  render() {
    return (
      <React.Fragment>
        <div className="Home">
          <div className="row">
            <div className="col-lg-8 mt-4">
              <div className="imagen">
                <img src={banner1} alt="Logo" />
              </div>
            </div>
            <div className="col-lg-4 mt-4">
              <div className="banner">
                <img src={banner2} alt="Logo" />
              </div>
              <div className="banner mt-4">
                <img src={banner3} alt="Logo" />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg mt-4">
              <div className="info">
                <h1>Sobre nosotros</h1>
                <p>
                Yoshi Games Center somos una empresa dedicada a la venta de equipos de cómputo, así como accesorios, 
                complementos y reparación de los mismos. Actualmente somos una de las empresas más consultadas a la hora de adquirir 
                un equipo de cómputo para la oficina y/o el hogar. En Computadoras Garco nos preocupamos por cubrir perfectamente tus 
                necesidades por lo que ofrecemos un valor agregado, excelente servicio y los productos de mejor calidad en el mercado. El 
                éxito de nuestra empresa se debe a la comunicación de nuestros clientes y amigos, puesto que son ellos nuestra mejor 
                recomendación y es por eso que nos ponemos a sus órdenes para brindarle el producto que usted necesita.
                </p>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Products;
