import React, { Component } from "react"
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
} from 'reactstrap';
import AgendaManager from "../../modules/AgendaManager"

export default class AgendaEditInst extends Component {

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
    // "completeObj":[],
    modal: false,
    nestedModal: false,
    closeAll: false,
    dropdownOpen: false
    };

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
      // let completeObj = this.props.agendas.filter( agenda => {
      //    if (agenda.id === this.props.match.params.agendaId)
      //     {
      //         return this.props.agendas.completeObj;
      //     }
      // })
      const editedAgenda = {
        "topic": this.state.topic ,
        "difficulty": this.state.difficulty,
        "exercise": this.state.exercise,
        "chapter": this.state.chapter,
        "date": this.state.date,
        "announcements": this.state.announcements,
        "QR": this.state.QR,
        "cohortID": this.state.cohortID,
        // "completeObj":this.state.completeObj
      }

      // console.log("stat", this.state)
      // console.log("props", this.props)
      this.props.updateAgenda(this.props.match.params.agendaId, editedAgenda)
      this.setState(prevState => ({
        modal: !prevState.modal,
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

  componentDidMount() {
      console.log(this.props.match.params.agendaId)
     AgendaManager.get(this.props.match.params.agendaId)
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
          "complete":agenda.complete
        });
       // console.log(this.state)
      });
    }

  render() {
    //console.log(this.props.agendas)
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
                               placeholder={this.state.date} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="announcements">Announcements</label>
                        <input type="text" required
                               className="form-control"
                               onChange={this.handleFieldChange}
                               id="announcements"
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