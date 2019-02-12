import React, { Component } from "react"
import AgendaListStu from "../agendas/AgendaListStu"
import NavBarStu from "../navbar/NavBarStu";
import Calendar from 'react-calendar'
import TempChecksFormStu from "../tempChecks/TempChecksFormStu"
import Moment from 'react-moment';
import 'moment-timezone';
import { Container } from 'reactstrap';



export default class LandingPageStu extends Component {

  state = {
    user: sessionStorage.getItem("name"),
    cohort:sessionStorage.getItem("cohort"),
    card:
    {
          announcements: "",
          chapter: "",
          date: "",
          difficulty: "",
          exercise: "",
          id: null,
          topic: "",
          cohortID:""
    },
    agendas: []
  }


// This piece is set up in order to take the top item of the sorted agenda array.
  singleCard = () => {
    let topCard =this.state.agendas.shift()
         this.setState({
          card:topCard
         });
   }
// called the sortAgendas method in here due to async problems. it is also called in appviews.
   sortAgendas = () => {
    return fetch(`http://localhost:5002/agendas?_sort=date&_order=desc`, {
      method: "GET"
    })
      .then(e => e.json())
      .then(agendas =>
        this.setState({
          agendas: agendas
        }))
      .then (response => {
          this.singleCard()
        })
      }

componentDidMount(){
  this.sortAgendas();
}


render() {

    // console.log("currenState", this.state)
    // console.log("card", this.state.card)
    // console.log("agendas" , this.state.agendas)

    return (
      <React.Fragment>

        <NavBarStu {...this.props} agendas={this.props.agendas}/>
        <h2> {this.state.user}'s Agenda for Today </h2>
             <section className="LandingPageStu">
        {/* {this.props.agendas.map(agenda => ( */}
            <AgendaListStu key={this.props.agendas.id} agendas={this.props.agendas} singleCard={this.state.singleCard} card={this.state.card}{...this.props} />
            <TempChecksFormStu key={this.props.tempChecks.id} users={this.props.users} tempChecks={this.props.tempChecks}addTempChecks={this.props.addTempChecks}/>
          {/* ))} */}
            </section>
            <Moment interval={1000}>
            </Moment>
        <Container id="calendarContain">
        <Calendar />
        </Container>
      </React.Fragment>
    );
  }
}