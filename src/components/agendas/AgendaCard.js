//!! Displays the individual items plus the ability to edit.

import React, { Component } from "react";
import { } from 'reactstrap';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Card,
  CardText,
  CardBody,
  CardSubtitle,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem ,
  CardHeader } from 'reactstrap';
import './Agenda.css'
import AgendaManager from "../../modules/AgendaManager"


export default class AgendaCard extends Component {

constructor(props) {
  super(props);
  this.state = {
  "topic": this.props.agendas.topic,
  "difficulty": this.props.agendas.difficulty,
  "exercise": this.props.agendas.exercise,
  "chapter": this.props.agendas.chapter,
  "date": this.props.agendas.date,
  "announcements": this.props.agendas.announcements,
  "QR": this.props.agendas.QR,
  "cohortID": this.props.agendas.cohortID,

  modal: false,
  nestedModal: false,
  closeAll: false,
  dropdownOpen: false,
  cohortDropDownOpen:false
  };
  this.toggleCohortDropDown = this.toggleCohortDropDown.bind(this);
  this.toggle = this.toggle.bind(this);
  this.toggleNested = this.toggleNested.bind(this);
  this.toggleAll = this.toggleAll.bind(this);
}

//Step 1//
//This part takes the individual changes and set state based on input.

handleFieldChange = event => {
    const stateToChange = {};
    stateToChange[event.target.id] = event.target.value;
    this.setState(stateToChange);
}
//Step 2//
//This takes all of those little inputs them and passes them up to the app views.

createEditObject = evt => {
  evt.preventDefault();

    const editedAgenda = {
      "topic": this.state.topic,
      "difficulty": this.state.difficulty,
      "exercise": this.state.exercise,
      "chapter": this.state.chapter,
      "date": this.state.date,
      "announcements": this.state.announcements,
      "QR": this.state.QR,
      "cohortID": this.state.cohortID,

    }
    // console.log("stat", this.state)
    // console.log("props", this.props)
    this.props.updateAgenda(this.props.agenda.id, editedAgenda)
    this.setState(prevState => ({
      modal: !prevState.modal,
      }));
    }

    deleteUpdate = evt =>{
      this.props.deleteAgenda(evt.target.id);
      this.forceUpdate();
      window.location.reload();
    }


  toggle() {
      this.setState(prevState => ({
      modal: !prevState.modal,
      }));
  }
  toggleDropDown() {
      this.setState(prevState => ({
        dropdownOpen: !prevState.dropdownOpen
      }));
    }
  toggleCohortDropDown() {
      this.setState(prevState => ({
        cohortDropDownOpen: !prevState.cohortDropDownOpen
      }));
    }

  toggleNested() {
      this.setState({
      nestedModal: !this.state.nestedModal,
      closeAll: false
      });
  }
  toggleAll() {
          this.setState({
          nestedModal: !this.state.nestedModal,
          closeAll: true
      });
  }

componentDidMount() {
    console.log(this.props.agenda.id)
   AgendaManager.get(this.props.agenda.id)
    .then(agenda => {
      this.setState({
        "topic": agenda.topic,
        "difficulty": agenda.difficulty,
        "exercise": agenda.exercise,
        "chapter": agenda.chapter,
        "date": agenda.date,
        "announcements": agenda.announcements,
        "QR": agenda.QR,
        "cohortID": agenda.cohortID,
      });
     // console.log(this.state)
    });
  }

  render() {
    //console.log(this.props.agenda.id)
    return (
<React.Fragment>
        <div className="scale-up-ver-bottom">
        <div className="numberBG">
        <p className="idNumbers"> {sessionStorage.getItem("currentCohort")}</p>
        </div>
      <Card id="cardBodyInst" color="">
        <CardHeader id="cardHeader"><h3>{this.props.agenda.topic}</h3></CardHeader>
        <CardBody color="" className="cardBodyMain">
          <CardSubtitle>Chapter: {this.props.agenda.chapter}</CardSubtitle>
          <CardSubtitle>Cohort: {this.props.agenda.cohortID}</CardSubtitle>

          <CardText>Chapter Exercise:</CardText>
          <CardText>{this.props.agenda.exercise}</CardText>

          <CardText>Topic Difficulty: {this.props.agenda.difficulty}</CardText>

          <CardText>Current Announcements:</CardText>
          <CardText>{this.props.agenda.announcements}</CardText>

          <CardText> Date: {this.props.agenda.date}</CardText>

          <Button id={this.props.agenda.id} outline color="danger" onClick={this.deleteUpdate}>Delete</Button>
          {/* <Link className="nav-link" to={`/agendas/${this.props.agenda.id}/edit`}>Edit</Link> */}
          <Button id={this.props.agenda.id} outline color="primary" onClick={this.toggle}> Edit</Button>{''}
        </CardBody>
      </Card>
    </div>
    <div>
          <Modal id="editModal"isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
            <ModalHeader style={{backgroundColor: "#44ccc7"}} toggle={this.toggle}>A little change never hurt anyone</ModalHeader>
            <ModalBody>
            <form className="EditAgenda">
          <h1>Edit Below</h1>
          <div className="form-group">
              <label htmlFor="topic">Topic</label>
              <input type="text" required
                      className="form-control"
                      onChange={this.handleFieldChange}
                      id="topic"
                      value={this.state.topic} />
          </div>
          <div className="form-group">
              <label htmlFor="chapter">Chapter</label>
              <input type="number" required
                      className="form-control"
                      onChange={this.handleFieldChange}
                      id="chapter"
                      value={this.state.chapter} />
          </div>
          <div className="form-group">
              <label htmlFor="difficulty">Difficulty</label>
              <input type="number" required
                      className="form-control"
                      onChange={this.handleFieldChange}
                      id="difficulty"
                      placeholder={this.state.difficulty} />
          </div>
          <div className="form-group">
              <label htmlFor="exercise">Exercise</label>
              <input type="text" required
                      className="form-control"
                      onChange={this.handleFieldChange}
                      id="exercise"
                      placeholder={this.state.exercise}/>
          </div>
          <div className="form-group">
              <label htmlFor="date">Date</label>
              <input type="date" required
                      className="form-control"
                      onChange={this.handleFieldChange}
                      id="date"
                      value={this.state.date} />
          </div>
          <div className="form-group">
              <label htmlFor="announcements">Announcements</label>
              <input type="text" required
                      className="form-control"
                      onChange={this.handleFieldChange}
                      id="announcements"
                      placeholder= {this.state.announcements} />
          </div>
          <div>
          <Dropdown isOpen={this.state.cohortDropDownOpen} toggle={this.toggleCohortDropDown}>
              <DropdownToggle caret>
              {this.state.cohortID}
              </DropdownToggle>
              <DropdownMenu>
              <DropdownItem header>Cohort</DropdownItem>
              <DropdownItem divider />
              <DropdownItem id="cohortID" onClick={this.handleFieldChange} value="28">Cohort 28</DropdownItem>
              <DropdownItem id="cohortID" onClick={this.handleFieldChange} value="29">Cohort 29</DropdownItem>
              <DropdownItem id="cohortID" onClick={this.handleFieldChange} value="30">Cohort 30</DropdownItem>
              <DropdownItem id="cohortID" onClick={this.handleFieldChange} value="31">Cohort 31</DropdownItem>
              <DropdownItem id="cohortID" onClick={this.handleFieldChange} value="32">Cohort 32</DropdownItem>
              </DropdownMenu>
          </Dropdown>
          </div>
          </form>
              <br />
              <Button color="success" onClick={this.toggleNested}>Create QR Code</Button>
              <Modal isOpen={this.state.nestedModal} toggle={this.toggleNested} onClosed={this.state.closeAll ? this.toggle : undefined}>
                <ModalHeader>QR CODE Title with Date</ModalHeader>
                <ModalBody>Fuck</ModalBody>
                <ModalFooter>
                  <Button color="primary" onClick={this.toggleNested}>SAVE QR</Button>{' '}
                  <Button color="secondary" onClick={this.toggleAll}>DELETE</Button>
                </ModalFooter>
              </Modal>
            </ModalBody>
            <ModalFooter>
            <Button type="submit" onClick={this.createEditObject} className="btn btn-primary">Submit</Button>{' '}
          <Button color="secondary" onClick={this.toggle}>Cancel</Button>
            </ModalFooter>
          </Modal>
        </div>
  </React.Fragment>



    );
  }
}


