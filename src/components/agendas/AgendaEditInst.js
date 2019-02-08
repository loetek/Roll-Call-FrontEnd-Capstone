import React, { Component } from "react"
import {
    Container,
    Jumbotron,
    Button,
    Form,
    FormGroup,
    Label,
    Input,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from 'reactstrap';
import AgendaManager from "../../modules/AgendaManager"

export default class AgendaEditInst extends Component {

  constructor(props) {
    super(props);
    this.state = {
    "topic": this.props.agendas.topic,
    "difficulty": null,
    "exercise": [],
    "chapter": null,
    "date": [],
    "announcements": [],
    "QR": [],
    "cohortID": null,
    "completeObj":[],
    modal: false,
    nestedModal: false,
    closeAll: false,
    dropdownOpen: false
    };

    this.toggle = this.toggle.bind(this);
    this.toggleNested = this.toggleNested.bind(this);
    this.toggleAll = this.toggleAll.bind(this);
  }

  //This part takes the individual changes and set state based on input.

  handleFieldChange = event => {
      const stateToChange = {};
      stateToChange[event.target.id] = event.target.value;
      this.setState(stateToChange);
  }
  //This takes all of those little inputs them and passes them up to the app views.

  createEditObject = evt => {
      let completeObj = this.props.agendas.filter( agenda => {
         if (agenda.id === this.props.match.params.agendaId)
          {
              return this.props.agendas.completeObj;
          }
      })
      const editedAgenda = {
        "topic": this.state.editAgendaTopic ,
        "difficulty": this.state.editAgendaDifficulty,
        "exercise": this.state.editAgendaExercise,
        "chapter": this.state.editAgendaChapter,
        "date": this.state.editAgendaDate,
        "announcements": this.state.editAgendaAnnouncements,
        "QR": this.state.editAgendaQR,
        "cohortID": this.state.editAgendaCohortID,
        "completeObj":this.state.completeObj
      }
      // console.log(editedTasks);
      // console.log(this.state)
      // console.log("props", this.props)
      this.props
      .updateAgenda(this.props.match.params.id, editedAgenda)
      .then(() => this.props.history.push("/LPInst"))
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

  componentDidMount() {
      console.log(this.props)
     AgendaManager.get(this.props.match.params.agendaId)
      .then(agenda => {
        this.setState({
          "topic": agenda.editAgendaTopic ,
          "difficulty": agenda.editAgendaDifficulty,
          "exercise": agenda.editAgendaExercise,
          "chapter": agenda.editAgendaChapter,
          "date": agenda.editAgendaDate,
          "announcements": agenda.editAgendaAnnouncements,
          "QR": agenda.editAgendaQR,
          "cohortID": agenda.editAgendaCohortID,
          "complete":agenda.completeObj
        });
       // console.log(this.state)
      });
    }

  render() {
    console.log(this.props.agendas)
          return (

            <React.Fragment>
            <div>
                    <Button color="primary" onClick={this.toggle}>{this.props.buttonLabel}</Button>{''}
                    <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                      <ModalHeader toggle={this.toggle}>A little change never hurt anyone</ModalHeader>
                      <ModalBody>
                      <form className="EditAgenda">
                    <h1>Edit Below</h1>
                    <div className="form-group">
                        <label htmlFor="editAgendaTopic">Topic</label>
                        <input type="text" required
                               className="form-control"
                               onChange={this.handleFieldChange}
                               id="editAgendaTopic"
                               value={this.props.agendas.topic} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="editAgendaChapter">Chapter</label>
                        <input type="number" required
                               className="form-control"
                               onChange={this.handleFieldChange}
                               id="editAgendaChapter"
                               placeholder={this.state.chapter} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="editAgendaDifficulty">Difficulty</label>
                        <input type="number" required
                               className="form-control"
                               onChange={this.handleFieldChange}
                               id="editAgendaDifficulty"
                               placeholder={this.state.difficulty} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="editAgendaExercise">Exercise</label>
                        <input type="text" required
                               className="form-control"
                               onChange={this.handleFieldChange}
                               id="editAgendaExercise"
                               placeholder={this.state.exercise}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="editAgendaDate">Date</label>
                        <input type="date" required
                               className="form-control"
                               onChange={this.handleFieldChange}
                               id="editAgendaDate"
                               placeholder={this.state.date} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="editAgendaAnnouncements">Announcements</label>
                        <input type="text" required
                               className="form-control"
                               onChange={this.handleFieldChange}
                               id="editAgendaAnnouncements"
                               placeholder= {this.state.announcements} />
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
                      <Button type="submit" onClick={this.createEditObject} className="btn btn-primary">Submit</Button>{' '}
                    <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                      </ModalFooter>
                    </Modal>
                  </div>
            </React.Fragment>
          );
        }
      }