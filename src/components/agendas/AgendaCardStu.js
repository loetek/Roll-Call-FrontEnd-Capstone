import React, { Component } from "react";
import { Link } from "react-router-dom"
import { Container, Row, Col,Button } from 'reactstrap';
import { Card, CardImg, CardText, CardBody, CardLink, CardTitle, CardSubtitle } from 'reactstrap';
import './Agenda.css'



export default class AgendaCardStu extends Component {

  render() {
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
      </CardBody>
    </Card>
    </Col>
  </Row>
  </div>


  );
  }
}
        // return (
        // <React.Fragment>
        //   <Container>
        //   <Row>
        //   <Col xs="6">
        //   <div key={this.props.agenda.id} className="card">
        //     <div className="card-body">
        //       <h5 className="card-title">
        //        Topic of Discussion : {this.props.agenda.topic}
        //       </h5>
        //       <p> Chapter: {this.props.agenda.chapter}</p>
        //       <p> Date: {this.props.agenda.date} </p>
        //     </div>
        //   </div>
        //   </Col>
        //   </Row>
        //   </Container>
        // </React.Fragment>
        // );