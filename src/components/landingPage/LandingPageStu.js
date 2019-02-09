import React, { Component } from "react"
import AgendaListStu from "../agendas/AgendaListStu"
import NavBarStu from "../navbar/NavBarStu";
import Calendar from 'react-calendar'


export default class LandingPageStu extends Component {


  render() {
    return (

      <React.Fragment>
        <NavBarStu {...this.props} agendas={this.props}/>
        <h2> Students Agenda </h2>
      <section className="LandingPageStu">
        {this.props.agendas.map(agenda => (
            <AgendaListStu key={agenda.id} agenda={agenda} {...this.props} />
          ))}
        </section>
        <Calendar />
      </React.Fragment>
    );
  }
      }