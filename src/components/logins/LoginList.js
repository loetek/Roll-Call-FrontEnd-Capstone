import React, { Component } from "react"
import {
  Container,
  Jumbotron,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
} from 'reactstrap';
import Connection from "../Connection"
//import DataManager from ".../modules/DataManager"





export default class Login extends Component {

    state = {
      email: "",
      password: ""
    };

    handleFieldChange = evt => {
      const stateToChange = {};
      stateToChange[evt.target.id] = evt.target.value;
      console.log(stateToChange);
      this.setState(stateToChange);
    };

     handleLogin = e => {
      e.preventDefault();
       console.log("set", this.state.email, this.state.password);
         let loginData = {
           email: this.state.email,
           password: this.state.password
         };
        this.props
        .isClear(loginData);
        };


 render() {
  return (
    <React.Fragment>
    <div>
      <Jumbotron fluid>
        <Container fluid>
          <h1 className="display-4">Welcome to Show of Hands</h1>
          <p className="lead">A Better use of Time</p>
        </Container>
      </Jumbotron>
    </div>
    <Form onSubmit = {this.handleLogin}>
    <FormGroup>
          <Label htmlFor="loginEmail">Email</Label>
          <Input onChange={this.handleFieldChange} type="email" name="email" id="email" placeholder="Enter Your Email Here" />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="loginPassword">Password</Label>
          <Input onChange={this.handleFieldChange} type="password" name="password" id="password" placeholder="Enter Your Password Here" />
        </FormGroup>
        <Button className="submitButton" color="secondary">Login</Button>{' '}
      </Form>
      </React.Fragment>
  );
}

}