
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


export default class Registration extends Component {
    // Set initial state
    state = {
      firstName:"",
      lastName:"",
      userName: "",
      password: "",
      status: false,
      cohortID: null
    }


    // Update state whenever an input field is edited
    handleFieldChange = evt => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }

    constructNewUser = evt => {
        evt.preventDefault()
            const User = {

                firstName: this.state.firstName,
                lastName: this.state.lastName,
                userName: this.state.username,
                password: this.state.password,
                status: this.state.status,
                cohortID: this.state.cohortID

            };

            this.props.addUser(User)
            .then(() => this.props.history.push("/"));
        }

    render() {
        return (
            <React.Fragment>
                <form className="LoginForm">
                    <h1>Register Here</h1>
                    <div className="form-group">
                        <label htmlFor="firstName">First Name</label>
                        <input type="firstName" required
                               className="form-control"
                               onChange={this.handleFieldChange}
                               id="firstName"
                               placeholder="Please Enter your 1st Name" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="lastName">Last Name</label>
                        <input type="lastName" required
                               className="form-control"
                               onChange={this.handleFieldChange}
                               id="lastName"
                               placeholder="Please Enter your Last Name" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="username">Username: </label>
                        <input type="text" required
                               className="form-control"
                               onChange={this.handleFieldChange}
                               id="username"
                               placeholder="Email is your username" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" required
                               className="form-control"
                               onChange={this.handleFieldChange}
                               id="password"
                               placeholder="Password" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="status">Status</label>
                        <input type="text" required
                               className="form-control"
                               onChange={this.handleFieldChange}
                               id="status"
                               placeholder="Are you a teacher or student" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="cohort">Cohort</label>
                        <input type="text" required
                               className="form-control"
                               onChange={this.handleFieldChange}
                               id="age"
                               placeholder="Please enter your Cohort" />
                    </div>

                    <button type="submit" onClick={this.constructNewUser} className="btn btn-primary">Submit</button>
                </form>
            </React.Fragment>
        )
    }
}