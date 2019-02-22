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
// import AgendaFormInst from "../agendas/AgendaFormInst"
import auth0Client from "../../Auth";




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

      // signOut = () => {
      //   auth0Client.signOut();
      //   this.props.history.replace('/');
      // };


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
      <React.Fragment>
        <div className="navBarContainer">
          <Navbar  id="navBarActual" style={{backgroundColor: "#44ccc7"}} light>
            <NavbarBrand href="/" className="mr-auto">Adios!</NavbarBrand>
            <NavbarBrand href="/LPInst" className="mr-auto">Home</NavbarBrand>
            <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
            <Collapse isOpen={!this.state.collapsed} navbar>
              <Nav navbar>
                <NavItem>
                {/* <AgendaFormInst {...this.props} addAgendas={this.props.addAgendas}/> */}
                </NavItem>
                <NavItem>
                <NavLink href="/dashboardListInst">Instructor Dashboard</NavLink>
                </NavItem>

{/* // oAuth  */}

{/* {
        !auth0Client.isAuthenticated() &&
        <button className="btn btn-dark" onClick={auth0Client.signIn}>Sign In</button>
      }
      {
        auth0Client.isAuthenticated() &&
        <div>
          <label className="mr-2 text-white">{auth0Client.getProfile().name}</label>
          <button className="btn btn-dark" onClick={() => {this.signOut()}}>Sign Out</button>
        </div>
      } */}
              </Nav>
            </Collapse>
          </Navbar>
        </div>
        </React.Fragment>
      );
}
}