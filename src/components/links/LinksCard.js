import React, { Component } from "react";
import { Container, Row, Col } from 'reactstrap';



export default class LinksCard extends Component {
  render() {
    //console.log(this.props.link)
    return (
    <React.Fragment>
      <Container>
      <Row>
      <Col>
      <div key={this.props.link.id} className="card">
        <div className="linksBody">
          <h5 className="card-title">
            {this.props.link.title}
          </h5>
          <p>{this.props.link.description}</p>
          <a href={this.props.link.url} target="_blank"> {this.props.link.url}</a>
        </div>
      </div>
      </Col>
      </Row>
      </Container>
    </React.Fragment>
    );
  }
}