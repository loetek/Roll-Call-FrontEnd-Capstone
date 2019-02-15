import React, { Component } from "react"
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
} from 'reactstrap';


export default class AgendaFormInst extends Component {
    // Set initial state


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
        dropdownOpen: false
        };

        this.toggle = this.toggle.bind(this);
        this.toggleNested = this.toggleNested.bind(this);
        this.toggleAll = this.toggleAll.bind(this);
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
                cohortID: this.state.cohortID
            }
            this.props.addAgendas(agenda)
            this.setState(prevState => ({
                modal: !prevState.modal,
                }));

        }
    // Modal functions.

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

              render() {

                return (
                    <React.Fragment>
                  <div>
                    <Button color="" onClick={this.toggle}>Create New</Button>{''}

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
                    {/* <div className="div">
                    <Dropdown isOpen={this.state.dropdownOpen} toggleDropDown={this.toggleDropDown}>
                        <DropdownToggle caret>
                        Dropdown
                        </DropdownToggle>
                        <DropdownMenu>
                        <DropdownItem header>Header</DropdownItem>
                        <DropdownItem>Some Action</DropdownItem>
                        <DropdownItem disabled>Action (disabled)</DropdownItem>
                        <DropdownItem divider />
                        <DropdownItem>Foo Action</DropdownItem>
                        <DropdownItem>Bar Action</DropdownItem>
                        <DropdownItem>Quo Action</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>

                    </div> */}
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
                  </React.Fragment>
                );
              }
            }




















