//!! This is the main landing page for the instructors. It will load the most current agenda item. It will access AgendaList

import React, { Component } from "react"
import AgendaList from "../agendas/AgendaList"
import NavBarInst from "../navbar/NavBarInst";
import Calendar from 'react-calendar'
import { Container, Row, Col,Button } from 'reactstrap';




export default class LandingPageInst extends Component {

        state = {

              user: sessionStorage.getItem("name")
        }

        render() {
          // console.log(this.props.users)
          return (

            <React.Fragment>
              <NavBarInst {...this.props} addAgendas={this.props.addAgendas}/>
              <h2> Hello, {this.state.user} ! </h2>
            <section className="LandingPageInst">
              {this.props.agendas.map(agenda => (
                  <AgendaList key={agenda.id}
                  updateAgenda={this.props.updateAgenda}
                   addAgendas={this.props.addAgendas}
                   deleteAgenda={this.props.deleteAgenda}
                   agenda={agenda} {...this.props} />
                ))}
              </section>
              <Container>
              <Row>
              <Col sm="">
              <Calendar />
              </Col>
              </Row>
              </Container>
            </React.Fragment>
          );
        }
      }
