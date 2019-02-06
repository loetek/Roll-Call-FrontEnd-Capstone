import React, { Component } from "react"
import AgendaList from "../agendas/AgendaList"
import NavBarStu from "../navbar/NavBarStu";
import Calendar from 'react-calendar'




export default class LandingPageStu extends Component {

        render() {
          return (
            <React.Fragment>
              <NavBarStu />
              <h2> Current Agendas </h2>
            <section className="LandingPageAgenda">
                {/* {this.props.agendas.map(agenda => (
                  <AgendaList key={agenda.id} agenda={agenda} {...this.props} />
                ))} */}
              </section>
              <Calendar />

            </React.Fragment>
          );
        }
      }