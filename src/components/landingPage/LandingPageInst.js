//!! This is the main landing page for the instructors. It will load the most current agenda item. It also has the create new agenda modal.

import React, { Component } from "react"
import AgendaList from "../agendas/AgendaList"
import NavBarInst from "../navbar/NavBarInst";
import 'react-tiny-fab/dist/styles.min.css';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';


export default class LandingPageInst extends Component {

  constructor(props) {
    super(props);
    this.state = {
    "topic": [],
    "difficulty": null,
    "exercise": [],
    "chapter": null,
    "date": [],
    "announcements": [],
    "QR": [],
    "cohortID": null,
    modal: false,
    nestedModal: false,
    closeAll: false,
    dropdownOpen: false,
    user: sessionStorage.getItem("name"),
    cohortDropDownOpen:false
    };

    this.toggle = this.toggle.bind(this);
    this.toggleNested = this.toggleNested.bind(this);
    this.toggleAll = this.toggleAll.bind(this);
    this.toggleCohortDropDown = this.toggleCohortDropDown.bind(this);
  }


// Update state whenever an input field is edited
handleFieldChange = evt => {
  const stateToChange = {}
  stateToChange[evt.target.id] = evt.target.value
  this.setState(stateToChange)
}

constructNewAgenda = e => {
  e.preventDefault()
      const agenda = {
          topic: this.state.topic,
          difficulty: this.state.difficulty,
          exercise: this.state.exercise,
          chapter: this.state.chapter,
          date: this.state.date,
          announcements: this.state.announcements,
          QR: this.state.QR,
          cohortID: Number(this.state.cohortID)
      }
      this.props.addAgendas(agenda)
      this.setState(prevState => ({
          modal: !prevState.modal,
          }));

  }
// Modal functions.

toggleCohortDropDown() {
  this.setState(prevState => ({
    cohortDropDownOpen: !prevState.cohortDropDownOpen
  }));
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

// {/* terenary statement that will only supply cohorts that match the user. everything before teh question mark needs to be true or else : null */}
        render() {
          // console.log(this.props.users)
          return (

            <React.Fragment>
              <NavBarInst {...this.props} addAgendas={this.props.addAgendas}/>
              <h2> Hello, {this.state.user} ! </h2>

              {this.props.agendas.map(agenda => (
            agenda.cohortID ===Number(sessionStorage.getItem("cohort")) ? <section className="LandingPageInst">
                  <AgendaList key={agenda.id}
                  updateAgenda={this.props.updateAgenda}
                  addAgendas={this.props.addAgendas}
                  deleteAgenda={this.props.deleteAgenda}
                  agenda={agenda} {...this.props} />
              </section>: null
                ))}

                <div>
                    {/* <Button color="" onClick={this.toggle}>Create New</Button>{''} */}

                    <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                      <ModalHeader toggle={this.toggle}>Let's make an agenda...</ModalHeader>
                      <ModalBody>
                      <form className="NewAgenda">
                    <h1>Start a New Agenda</h1>
                    <div className="form-group">
                        <label htmlFor="topic">Topic</label>
                        <input type="text" required
                               className="form-control"
                               onChange={this.handleFieldChange}
                               id="topic"
                               placeholder="Enter the topic of discussion" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="chapter">Chapter</label>
                        <input type="number" required
                               className="form-control"
                               onChange={this.handleFieldChange}
                               id="chapter"
                               placeholder="Enter the corresponding chapter number" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="difficulty">Difficulty</label>
                        <input type="number" required
                               className="form-control"
                               onChange={this.handleFieldChange}
                               id="difficulty"
                               placeholder="Enter the topic difficulty 1-10" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="exercise">Exercise</label>
                        <input type="text" required
                               className="form-control"
                               onChange={this.handleFieldChange}
                               id="exercise"
                               placeholder="Enter the exercise with details and links" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="date">Date</label>
                        <input type="date" required
                               className="form-control"
                               onChange={this.handleFieldChange}
                               id="date"
                               placeholder="Enter today's date" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="announcements">Announcements</label>
                        <input type="text" required
                               className="form-control"
                               onChange={this.handleFieldChange}
                               id="announcements"
                               placeholder="Please enter any outstanding announcements." />
                    </div>
                     <div>
                    <Dropdown isOpen={this.state.cohortDropDownOpen} toggle={this.toggleCohortDropDown}>
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
                    </form>
                        <br />
                        <Button color="success" onClick={this.toggleNested}>Create QR Code</Button>
                        <Modal isOpen={this.state.nestedModal} toggle={this.toggleNested} onClosed={this.state.closeAll ? this.toggle : undefined}>
                          <ModalHeader>QR CODE Title with Date</ModalHeader>
                          <ModalBody>Picture HERE</ModalBody>
                          <ModalFooter>
                            <Button color="primary" onClick={this.toggleNested}>SAVE QR</Button>{' '}
                            <Button color="secondary" onClick={this.toggleAll}>DELETE</Button>
                          </ModalFooter>
                        </Modal>
                      </ModalBody>
                      <ModalFooter>
                      <Button type="submit" onClick={this.constructNewAgenda} className="btn btn-primary">Submit</Button>{' '}
                    <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                      </ModalFooter>
                    </Modal>
                  </div>

              <Button onClick={this.toggle}  addAgendas={this.props.addAgendas} color="primary" size="lg" block> Create New</Button>



            </React.Fragment>
          );
        }
      }
