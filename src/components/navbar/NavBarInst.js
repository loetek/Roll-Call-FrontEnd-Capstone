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
import {Link}from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"
import AgendaFormInst from "../agendas/AgendaFormInst"


export default class NavBarInst extends Component
{
    constructor(props) {
        super(props);
        this.state ={
        modal: false
        }
        this.toggle = this.toggle.bind(this);
        this.toggleNavbar = this.toggleNavbar.bind(this);
        this.state = {
          collapsed: true
        };
      }

      toggle() {
        this.setState(prevState => ({
        modal: !prevState.modal,
        }));
    }

      toggleNavbar() {
        this.setState({
          collapsed: !this.state.collapsed
        });
      }

render(){
    return (
        <div>
          <Navbar color="faded" light>
            <NavbarBrand href="/" className="mr-auto">Show of Hands</NavbarBrand>
            <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
            <Collapse isOpen={!this.state.collapsed} navbar>
              <Nav navbar>
                <NavItem>
                <AgendaFormInst {...this.props} addAgendas={this.props.addAgendas}/>
                </NavItem>
                <NavItem>
                <NavLink href="/dashboardInst">Dashboard</NavLink>
                </NavItem>
              </Nav>
            </Collapse>
          </Navbar>
        </div>
      );
}
}