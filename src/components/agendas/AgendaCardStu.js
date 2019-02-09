import React, { Component } from "react";
import { Container, Row, Col,Button } from 'reactstrap';



export default class AgendaCardStu extends Component {
  render() {

    //console.log(this.props.agenda)
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
          <p> Date: {this.props.agenda.date} </p>
        </div>
      </div>
      </Col>
      </Row>
      </Container>
    </React.Fragment>
    );
  }
}