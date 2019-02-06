//!! This is the main landing page for the instructors. It will load the most current agenda item. It will access AgendaList

import React, { Component } from "react"
import AgendaList from "../agendas/AgendaList"
import NavBarInst from "../navbar/NavBarInst";
import Calendar from 'react-calendar'




export default class LandingPageInst extends Component {

        render() {
          console.log(this.props)
          return (
            <React.Fragment>
              <NavBarInst />
              <h2> Current Agendas </h2>
            <section className="LandingPageInst">
              {this.props.agendas.map(agenda => (
                  <AgendaList key={agenda.id} agenda={agenda} {...this.props} />
                ))}
              </section>
              <Calendar />
              {/* <div className="newAgendaButton">
                <button
                  type="button"
                  className="btn btn-success"
                  onClick={() => {
                    this.props.history.push("/agendas/new");
                  }}
                >
                  Create New Agenda
                </button>
              </div> */}

            </React.Fragment>
          );
        }
      }
