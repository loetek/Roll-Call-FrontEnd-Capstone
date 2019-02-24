import React, { Component } from "react"
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink
  } from 'reactstrap';
import "bootstrap/dist/css/bootstrap.min.css"


export default class NavBarStu extends Component
{
    constructor(props) {
        super(props);

        this.toggleNavbar = this.toggleNavbar.bind(this);
        this.state = {
          collapsed: true
        };
      }

      toggleNavbar() {
        this.setState({
          collapsed: !this.state.collapsed
        });
      }
render(){
    return (
      <React.Fragment>
        <div className="navBarContainer">
          <Navbar id="navBarActual" style={{backgroundColor: "#44ccc7"}} light >
            <NavbarBrand href="/" className="mr-auto">Adios!</NavbarBrand>
            <NavbarBrand href="/LPStu" className="mr-auto">Home</NavbarBrand>
            <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
            <Collapse isOpen={!this.state.collapsed} navbar>
              <Nav navbar>
                <NavItem>
                  <NavLink href="/linkslist">Useful Links</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="/dashboardListStu">Dashboard</NavLink>
                </NavItem>
              </Nav>
            </Collapse>
          </Navbar>
        </div>
        </React.Fragment>
      );
}
}