import React, { Component } from 'react';
import {Navbar, NavbarBrand,NavbarToggler, NavItem, NavLink,Collapse, Nav,  NavbarText} from 'reactstrap'
import CartSummary from '../cart/CartSummary';

export default class Navi extends Component {
  render() {
    return <div>
      <div>
  <Navbar
    color="light"
    expand="md"
    light
  >
    <NavbarBrand href="/">
      reactstrap
    </NavbarBrand>
    <NavbarToggler onClick={function noRefCheck(){}} />
    <Collapse navbar>
      <Nav
        className="me-auto"
        navbar
      >
        <NavItem>
          <NavLink href="/components/">
            Components
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="https://github.com/reactstrap/reactstrap">
            GitHub
          </NavLink>
        </NavItem>
       <CartSummary />{//cartSummary'i navbar kısmına ekledik.
       }
      </Nav>
      <NavbarText>
        Simple Text
      </NavbarText>
    </Collapse>
  </Navbar>
</div>
    </div>;
  }
}
