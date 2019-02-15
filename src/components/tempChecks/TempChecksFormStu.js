import React from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

export default class TempChecksFormStu extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false,
      tempChecks: "",
      userID: sessionStorage.getItem("user"),
      cohortID: sessionStorage.getItem("cohort")
    };
  }

  handleFieldChange = (evt) => {
    const stateToChange = {}
    stateToChange.feels = parseInt(evt.target.value)
    console.log('stateChange', stateToChange)
    console.log('evt', evt)
    this.setState(stateToChange, () => this.constructTempCheck())
    }

  constructTempCheck = e => {

   let t = new Date().toLocaleTimeString();
   let d = new Date().toLocaleDateString();
   console.log(this.state)

    let tempCheck = {
      "time": t,
      "date": d,
      "feels": this.state.feels,
      "userID": parseInt(this.state.userID),
      "cohortID": parseInt(this.state.cohortID)
    }
    console.log(tempCheck)
    this.props.addTempChecks(tempCheck)
    alert("Congatulations you are very self aware!!")


      }
  toggle() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }

  render() {
   //console.log (this.props.tempChecks)
    return (
      <React.Fragment>
      <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
        <DropdownToggle caret>
          What's your Feels?
        </DropdownToggle>
        <DropdownMenu onSubmit={this.handleFieldChange} value={this.state.tempChecks}>
          <DropdownItem header>How are you feeling today?</DropdownItem>
          <DropdownItem divider />
          <DropdownItem>Some Action</DropdownItem>
          <DropdownItem onClick={this.handleFieldChange} value="1">1 - I am feeling very very poor.</DropdownItem>
          <DropdownItem onClick={this.handleFieldChange} value="2">2</DropdownItem>
          <DropdownItem onClick={this.handleFieldChange} value="3">3</DropdownItem>
          <DropdownItem onClick={this.handleFieldChange} value="4">4</DropdownItem>
          <DropdownItem onClick={this.handleFieldChange} value="5">5 - I am feeling neutral not that good or bad.</DropdownItem>
          <DropdownItem onClick={this.handleFieldChange} value="6">6</DropdownItem>
          <DropdownItem onClick={this.handleFieldChange} value="7">7</DropdownItem>
          <DropdownItem onClick={this.handleFieldChange} value="8">8</DropdownItem>
          <DropdownItem onClick={this.handleFieldChange} value="9">9</DropdownItem>
          <DropdownItem onClick={this.handleFieldChange} value="10">10 - I am on cloud 9, doing great!!</DropdownItem>
        </DropdownMenu>
      </Dropdown>
      </React.Fragment>
    );
  }
}