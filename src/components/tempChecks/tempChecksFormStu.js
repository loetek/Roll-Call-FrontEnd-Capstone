import React from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

export default class Example extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false,
      tempChecks: [],

    };
  }

  handleFieldChange = (evt) => {
    const stateToChange = {}
    stateToChange[evt.target.id] = evt.target.value
    console.log(this.stateToChange)
    this.setState(stateToChange)
    }

  toggle() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }

  render() {
    return (
      <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
        <DropdownToggle caret>
          What's your Feels?
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem header>How are you feeling today?</DropdownItem>
          <DropdownItem divider />
          <DropdownItem>Some Action</DropdownItem>
          <DropdownItem>1 - I am feeling very very poor.</DropdownItem>
          <DropdownItem>2</DropdownItem>
          <DropdownItem>3</DropdownItem>
          <DropdownItem>4</DropdownItem>
          <DropdownItem>5 - I am feeling neutral not that good or bad.</DropdownItem>
          <DropdownItem>6</DropdownItem>
          <DropdownItem>7</DropdownItem>
          <DropdownItem>8</DropdownItem>
          <DropdownItem>9</DropdownItem>
          <DropdownItem>10 - I am on cloud 9, doing great!!</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    );
  }
}