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

export default class Login extends Component {

  state = {
    username: "",
    password: "",
}

handleFieldChange = (evt) => {
const stateToChange = {}
stateToChange[evt.target.id] = evt.target.value
this.setState(stateToChange)
}

handleLogin = (evt) => {
evt.preventDefault();
this.props.verifyUser(this.state.username, this.state.password)
console.log(this.state)
console.log(this.props)
        if(this.props.users.length < 1) {
            alert("You will need to Register first")
        } else {
            this.props.users.forEach(user => {
                console.log(user.status)
                let loggedIn= false;
                if (this.state.username === user.userName && this.state.password === user.password) {
                        loggedIn= true;
                    }
                if (loggedIn === true){
                    sessionStorage.setItem("user", user.id);
                    //TODO the problem right now is that is not checking against the entered user just agains the database all 5 users.
                    //Todo Need to extract the result of the comparison above. Compare username and password return status of that user.
                  if(user.status === true){
                    this.props.history.push("/LPInst")
                  }else{
                    this.props.history.push("/LPStu")
                  }
                }
            })
        }
    }


 render() {
   //console.log(this.props.user)
  return (
    <React.Fragment>
    <div>
      <Jumbotron fluid>
        <Container fluid>
          <h1 className="display-4">Welcome to Show of Hands</h1>
          <p className="lead">It's your time, waste it how you want!</p>
        </Container>
      </Jumbotron>
    </div>
    <Form onSubmit = {this.handleLogin} className="loginForm">
    <FormGroup>
          <Label htmlFor="loginUserName">Username</Label>
          <Input onChange={this.handleFieldChange} type="email" name="username" id="username" placeholder="Use your email" />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="loginPassword">Password</Label>
          <Input onChange={this.handleFieldChange} type="password" name="password" id="password" placeholder="Enter Your Password Here" />
        </FormGroup>
        <Button className="submitBtn" type="submit" color="secondary">Login</Button>
        <Button className="registerButton btn btn-primary" type="button" color="secondary"
                        onClick={()=> this.props.history.push("/login/new")}>
                  Register
                </Button>
      </Form>
      </React.Fragment>
  );
}

}