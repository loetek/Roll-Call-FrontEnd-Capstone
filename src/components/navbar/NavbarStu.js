import React, { Component } from "react"
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Container,
    Row,
    Col,
    Jumbotron,
    Button
  } from 'reactstrap';
import { Link } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"


export default class NavBar extends Component
{
render(){
return(
<div>
    <Navbar color="inverse" light expand="md">
        <NavbarBrand href="/">reactstrap</NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <NavLink href="/components/">Components</NavLink>
                                </NavItem>
                        <NavItem>
                    <NavLink href="https://github.com/reactstrap/reactstrap">Github</NavLink>
                </NavItem>
            </Nav>
        </Collapse>
    </Navbar>
    </div>
)
}
}