import React from "react";
import "../components/styles/Navbar.css";
import { NavLink, useHistory } from "react-router-dom";
import { NavDropdown, Nav } from "react-bootstrap";
import WhatsAppWidget from "react-whatsapp-widget";
import "react-whatsapp-widget/dist/index.css";
import Cookies from "universal-cookie";
function NavBar(props) {
  const cookies = new Cookies();
  const history = useHistory();
  function logout() {
    cookies.remove("sessionID", { path: "/api" });
    /*
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    };
    fetch("http://localhost:8080/api/user/logout", requestOptions);
    */
    history.push("/login");
    window.location = window.location.href;
  }
  let menu;
  if (props.name === "" || props.name === undefined) {
    menu = (
      <>
        <NavLink to="/login" className="nav-link">
          Sign In
        </NavLink>
      </>
    );
  } else {
    if (!props.admin) {
      menu = (
        <>
          <Nav>
            <NavDropdown title={props.name} className="nav-link">
              <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <footer>
            <WhatsAppWidget phoneNumber="955373581" />
          </footer>
        </>
      );
    }else{
      menu = (
        <>
          <NavLink to="/dashboard" className="nav-link">
            Dashboard
          </NavLink>
          <NavLink to="/products" className="nav-link">
            Products
          </NavLink>
          <Nav>
            <NavDropdown title={props.name} className="nav-link">
              <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <footer>
            <WhatsAppWidget phoneNumber="955373581" />
          </footer>
        </>
      );
    }
  }
  return (
    <Nav className="NavbarItem">
      <NavLink to="/" className="nav-link">
        <h1 className="navbar-logo">Yoshi Games Center</h1>
      </NavLink>
      <div className="nav-menu">{menu}</div>
    </Nav>
  );
}

export default NavBar;
