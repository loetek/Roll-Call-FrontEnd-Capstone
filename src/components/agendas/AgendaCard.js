import React, { Component } from "react";
import { Link } from "react-router-dom"
import { Container, Row, Col,Button } from 'reactstrap';



export default class AgendaCard extends Component {
  render() {

    console.log(this.props.agenda.id)
    return (
    <React.Fragment>
      <Container>
      <Row>
      <Col xs="6">
      <div key={this.props.agenda.id} className="card">
        <div className="card-body">
          <h5 className="card-title">
           Topic of Discussion : {this.props.agenda.topic}
          </h5>
          <p> Chapter: {this.props.agenda.chapter}</p>
          <p> Click here to see more deets! </p>
          <Button id={this.props.agenda.id} color="danger" onClick={()=> this.props.deleteAgenda(this.props.agenda.id)}>Delete</Button>
          <Link className="nav-link" to={`/agendas/${this.props.agenda.id}/edit`}>Edit</Link>
        </div>
      </div>
      </Col>
      </Row>
      </Container>
    </React.Fragment>
    );
  }
}