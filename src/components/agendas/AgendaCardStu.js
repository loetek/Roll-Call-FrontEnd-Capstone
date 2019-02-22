import React, { Component } from "react";
import { Card, CardText, CardBody, Row, Col, CardSubtitle } from 'reactstrap';
import './Agenda.css'




export default class AgendaCardStu extends Component {

  render() {
    return (
<React.Fragment>
  <div id="cardContainer">


    <Card id="cardBodyStu" >
      <CardBody className="cardBodyMain">

        <h3 id="cardHeader">{this.props.card.topic}</h3>
        <CardSubtitle>Chapter: {this.props.card.chapter}</CardSubtitle>
        <CardText>Chapter Exercise: {this.props.card.exercise}</CardText>
        <CardText>Date: {this.props.card.date}</CardText>
        <CardText>Announcements: {this.props.card.announcements}</CardText>

      </CardBody>
    </Card>

</div>
</React.Fragment>

  );
  }
}
