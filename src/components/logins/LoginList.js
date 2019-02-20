import React, { Component, Link } from "react"
import {
  Container,
  Jumbotron,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
} from 'reactstrap';
import auth0Client from "../../Auth";
import "./Login.css"

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
  // console.log(this.state)
  // console.log(this.props)
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
                      sessionStorage.setItem("name", user.firstName)
                      sessionStorage.setItem("cohort", user.cohortID)
                      sessionStorage.setItem("username", user.userName)
                      sessionStorage.setItem(
                        "credentials",
                        JSON.stringify({
                          username: this.state.username,
                          password: this.state.password,
                          status:true,
                        })
                        )
                        this.props.history.push("/LPInst")
                      } else{
                        sessionStorage.setItem("user", user.id);
                        sessionStorage.setItem("name", user.firstName)
                        sessionStorage.setItem("cohort", user.cohortID)
                        sessionStorage.setItem("username", user.userName)
                        sessionStorage.setItem(
                            "credentials",
                            JSON.stringify({
                                username: this.state.userName,
                                password: this.state.password,
                                status:false,
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
        sessionStorage.removeItem("name")
        sessionStorage.removeItem("cohort")
        sessionStorage.removeItem("username")
      }
    }


 render() {
  return (
    <React.Fragment>
    <div className="loginBigger">
    <div  className="loginBig">

        <Container fluid  >
          <h1 className="display-4">Welcome to Show of Hands</h1>
          <p className="lead">It's your time, waste it how you want!</p>
        </Container>

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
      }
        </div> */}
        </div>
    <Form onSubmit = {this.handleLogin}>
    <div className="loginForms">
    <FormGroup>
          <Label htmlFor="loginUserName">Username</Label>
          <Input onChange={this.handleFieldChange} type="email" name="username" id="username" placeholder="Use your email" />
        </FormGroup>
        <br/>
        <FormGroup>
          <Label htmlFor="loginPassword">Password</Label>
          <Input onChange={this.handleFieldChange} type="password" name="password" id="password" placeholder="Password" />
        </FormGroup>
        </div>
        <div className="loginBtns">
        <Button className="submitBtn" type="submit" color="">  Login  </Button>
        </div>
        <div className="regBtns">
        First time?  <a href="#" onClick={() => this.props.history.push("/login/new")} className="links">   Click here to sign up!</a>
        <div/>
    </div>
      </Form>
      </div>
      </React.Fragment>
  );
}

}