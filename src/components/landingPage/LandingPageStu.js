import React, { Component } from "react"
import AgendaListStu from "../agendas/AgendaListStu"
import NavBarStu from "../navbar/NavBarStu";
import Calendar from 'react-calendar'
import TempChecksFormStu from "../tempChecks/TempChecksFormStu"


export default class LandingPageStu extends Component {

  state = {
    user: sessionStorage.getItem("name"),
    card: ""
  }

  //!! Cannot seem to pop off the array piece to populate

  singleCard = () => {
    this.props.agendas.shift(card => {
        this.setState({
          card:card
        })
    });
  }


  render() {
    console.log(this.props.agendas)
    console.log(this.state)
    console.log(this.state.card)
    return (
      <React.Fragment>
        <NavBarStu {...this.props} agendas={this.props}/>
        <h2> {this.state.user}'s Agenda for Today </h2>
      <section className="LandingPageStu">
        {/* {this.props.agendas.map(agenda => ( */}
            <AgendaListStu key={this.props.agendas.id} agenda={this.props.agendas} singleCard={this.state.singleCard} card={this.state.card}{...this.props} />
            <TempChecksFormStu key={this.props.tempChecks.id} users={this.props.users} tempChecks={this.props.tempChecks}/>
          {/* ))} */}
        </section>
        <Calendar />
      </React.Fragment>
    );
  }
      }