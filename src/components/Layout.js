import React from 'react';

import NavBar from './Navbar';

function Layout(props) {
  // const children = props.children;

  return (
    <React.Fragment>
      <NavBar name={props.name} setName={props.name} admin={props.admin} setAdmin={props.admin}/>
      {props.children}
    </React.Fragment>
  );
}

export default Layout;
