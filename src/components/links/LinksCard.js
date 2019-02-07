import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col } from 'reactstrap';



export default class LinksCard extends Component {
  render() {
    console.log(this.props.link)
    return (
    <React.Fragment>
      <Container>
      <Row>
      <Col xs="6">
      <div key={this.props.links.id} className="card">
        <div className="card-body">
          <h5 className="card-title">
           Title {this.props.links.title}
          </h5>
          <p> desc {this.props.links.description}</p>
        </div>
      </div>
      </Col>
      </Row>
      </Container>
    </React.Fragment>
    );
  }
}