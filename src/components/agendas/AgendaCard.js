import React, { Component } from "react";
import { Link } from "react-router-dom"
import { Container, Row, Col,Button } from 'reactstrap';
import { Card, CardImg, CardText, CardBody, CardLink,
  CardTitle, CardSubtitle } from 'reactstrap';
import './Agenda.css'


export default class AgendaCard extends Component {
  render() {

    //console.log(this.props.agenda.id)
    return (

        <div>
      <Row>
      <Col sm="6">
      <Card>
        <CardBody className="cardBodyMain">
          <h3>{this.props.agenda.topic}</h3>
          <CardSubtitle>Chapter: {this.props.agenda.chapter}</CardSubtitle>

          <CardText>Chapter Exercise</CardText>
          <CardText>{this.props.agenda.exercise}</CardText>

          <Button id={this.props.agenda.id} outline color="danger" onClick={()=> this.props.deleteAgenda(this.props.agenda.id)}>Delete</Button>
          <Link className="nav-link" to={`/agendas/${this.props.agenda.id}/edit`}>Edit</Link>
        </CardBody>
      </Card>
      </Col>
    </Row>
    </div>


    );
  }
}


