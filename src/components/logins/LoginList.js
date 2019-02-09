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
    status:false,
    cohortID: 20
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
                console.log(user)
                let loggedIn= false;
                if (this.state.username === user.userName && this.state.password === user.password) {
                        loggedIn= true;
                    }
                // if (loggedIn === true){
                //     sessionStorage.setItem("user", user.id);
                  if(loggedIn ===true ){

                    if(user.status === true){
                    sessionStorage.setItem("user", user.id);
                    sessionStorage.setItem(
                          "credentials",
                          JSON.stringify({
                              username: this.state.username,
                              password: this.state.password,
                              status:true,
                              cohortID: this.state.cohortID
                          })
                      )
                    this.props.history.push("/LPInst")
                  } else{
                    sessionStorage.setItem("user", user.id);
                    sessionStorage.setItem(
                          "credentials",
                          JSON.stringify({
                              username: this.state.userName,
                              password: this.state.password,
                              status:false,
                              cohortID: this.state.cohortID
                          })
                      )
                    this.props.history.push("/LPStu")
                    }
                  }else{

                    this.props.history.push("/")

                  }

                  }

            )
        }
    }
    componentDidMount(){

      if (sessionStorage.getItem("user") !== null){
        sessionStorage.removeItem("user")
        sessionStorage.removeItem("credentials")
      }
    }


 render() {
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