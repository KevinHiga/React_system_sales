import React from "react";
import "../components/styles/Navbar.css";
import { NavLink, useHistory } from "react-router-dom";
import { NavDropdown, Nav } from "react-bootstrap";
import MessengerCustomerChat from "react-messenger-customer-chat";
function NavBar(props) {
  const history = useHistory();
  function logout() {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    };
    fetch("http://localhost:8080/user/logout", requestOptions);
    history.push("/");
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
    menu = (
      <>
        <NavLink to="/products" className="nav-link">
          Products
        </NavLink>
        <Nav>
          <NavDropdown title={props.name} className="nav-link">
            <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </>
    );
  }
  return (
    <Nav className="NavbarItem">
      <NavLink to="/" className="nav-link">
        <h1 className="navbar-logo">Yoshi Games Center</h1>
      </NavLink>
      <div className="nav-menu">{menu}</div>
      <footer>
        <MessengerCustomerChat
          pageId="110528561228071"
          appId="1967383460080218"
        />
      </footer>
    </Nav>
  );
}

export default NavBar;
