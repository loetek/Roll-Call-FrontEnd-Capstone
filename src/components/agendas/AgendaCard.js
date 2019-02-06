
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col } from 'reactstrap';



export default class AgendaCard extends Component {
  render() {
    return (
      <container>
      <Row>
      <Col xs="6">
      <div key={this.props.agenda.id} className="card">
        <div className="card-body">
          <h5 className="card-title">
           Topic of Discussion : {this.props.agenda.topic}
          </h5>
          <p> Chapter: {this.props.agenda.chapter}</p>
          <p> Click here to see more deets! </p>
        </div>
      </div>
      </Col>
      </Row>
      </container>
    );
  }
}