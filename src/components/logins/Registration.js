
import React, { Component } from "react"
import {
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
  } from 'reactstrap';


export default class Registration extends Component {
    // Set initial state
    constructor(props) {
        super(props);
        this.state = {
            firstName:"",
            lastName:"",
            userName: "",
            password: "",
            status: false,
            cohortID: null,

            dropdownOpen:false
        }
    this.toggle = this.toggle.bind(this);

    }


    // Update state whenever an input field is edited
    handleFieldChange = evt => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        console.log(stateToChange)
        this.setState(stateToChange)
    }

    constructNewUser = evt => {
        evt.preventDefault()
        console.log(this.state)
            const User = {

                firstName: this.state.firstName,
                lastName: this.state.lastName,
                userName: this.state.username,
                password: this.state.password,
                status: this.state.status,
                cohortID: parseInt(this.state.cohortID)

            };
            console.log(User.cohortID)

            this.props.addUser(User)
            .then(() => this.props.history.push("/"));
        }

    toggle() {
        this.setState(prevState => ({
            dropdownOpen: !prevState.dropdownOpen
        }));
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
                    <div>
                    <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                        <DropdownToggle caret>
                        Cohort
                        </DropdownToggle>
                        <DropdownMenu onSubmit={this.handleFieldChange} value={this.state.cohortID}>
                        <DropdownItem header>Cohort</DropdownItem>
                        <DropdownItem divider />
                        <DropdownItem id="cohortID" onClick={this.handleFieldChange} value="28">28</DropdownItem>
                        <DropdownItem id="cohortID" onClick={this.handleFieldChange} value="29">29</DropdownItem>
                        <DropdownItem id="cohortID" onClick={this.handleFieldChange} value="30">30</DropdownItem>
                        <DropdownItem id="cohortID" onClick={this.handleFieldChange} value="31">31</DropdownItem>
                        <DropdownItem id="cohortID" onClick={this.handleFieldChange} value="32">32</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                    </div>
                    <br/>
                    <br/>

                    <button type="submit" onClick={this.constructNewUser} className="btn btn-primary">Submit</button>
                </form>
            </React.Fragment>
        )
    }
}