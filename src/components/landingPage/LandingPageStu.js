import React, { Component } from "react"
import AgendaList from "../agendas/AgendaList"
import NavBarStu from "../navbar/NavBarStu";
import Calendar from 'react-calendar'





export default class LandingPageStu extends Component {


  sortAgenda = () => {
    let recentItem = [];
    console.log(this.props)
    this.props.agendas.sort(function (a, b){
      return  b - a;
    })
  }



  render() {
    console.log(this.sortAgenda())
    return (

      <React.Fragment>
        <NavBarStu {...this.props} agendas={this.props}/>
        <h2> Students Agenda </h2>
      <section className="LandingPageInst">
        {this.props.agendas.map(agenda => (
            <AgendaList key={agenda.id} addAgendas={this.props.addAgendas}deleteAgenda={this.props.deleteAgenda} agenda={agenda} {...this.props} />
          ))}
        </section>
        <Calendar />
      </React.Fragment>
    );
  }
      }