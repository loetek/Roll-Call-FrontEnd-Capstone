import React, { Component } from "react"
import AgendaList from "../agendas/AgendaList"
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
            <AgendaList key={agenda.id} addAgendas={this.props.addAgendas}deleteAgenda={this.props.deleteAgenda} agenda={agenda} {...this.props} />
          ))}
        </section>
        <Calendar />
      </React.Fragment>
    );
  }
      }