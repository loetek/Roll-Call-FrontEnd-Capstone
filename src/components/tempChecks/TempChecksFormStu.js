import React from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import './TempChecks.css'

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
    alert("Congratulations you are very self aware!!")


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
      <div id="tempCheckContainer">
      <Dropdown direction="right" isOpen={this.state.dropdownOpen} toggle={this.toggle}>
        <DropdownToggle id="tempCheckToggle" style={{backgroundColor: "#44ccc7"}}caret>
        {sessionStorage.getItem("name")} how are you feeling this today?
        </DropdownToggle>
        <DropdownMenu onSubmit={this.handleFieldChange} value={this.state.tempChecks}>
          <DropdownItem header>How are you feeling today?</DropdownItem>
          <DropdownItem onClick={this.handleFieldChange} value="1">1 - I am feeling very very poor.</DropdownItem>
          <DropdownItem onClick={this.handleFieldChange} value="2">2 - Maybe not the worst.</DropdownItem>
          <DropdownItem onClick={this.handleFieldChange} value="3">3 - There are a couple things going right.</DropdownItem>
          <DropdownItem onClick={this.handleFieldChange} value="4">4 - But everything is still so hard.</DropdownItem>
          <DropdownItem onClick={this.handleFieldChange} value="5">5 - I am feeling neutral not that good or bad.</DropdownItem>
          <DropdownItem onClick={this.handleFieldChange} value="6">6 - Maybe it's not so bad.</DropdownItem>
          <DropdownItem onClick={this.handleFieldChange} value="7">7 - I think I may be getting this.</DropdownItem>
          <DropdownItem onClick={this.handleFieldChange} value="8">8 - Wow! Not as many errors today, FTW!</DropdownItem>
          <DropdownItem onClick={this.handleFieldChange} value="9">9 - Bring it on I eat "undefined" for breakfast!</DropdownItem>
          <DropdownItem onClick={this.handleFieldChange} value="10">10 - I am on cloud 9, doing great!!</DropdownItem>
        </DropdownMenu>
      </Dropdown>
      </div>
      </React.Fragment>
    );
  }
}