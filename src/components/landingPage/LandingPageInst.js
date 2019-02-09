//!! This is the main landing page for the instructors. It will load the most current agenda item. It will access AgendaList

import React, { Component } from "react"
import AgendaList from "../agendas/AgendaList"
import NavBarInst from "../navbar/NavBarInst";
import Calendar from 'react-calendar'




export default class LandingPageInst extends Component {

        render() {
          //console.log(this.props)
          return (

            <React.Fragment>
              <NavBarInst {...this.props} addAgendas={this.props.addAgendas}/>
              <h2> Current Agendas </h2>
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
