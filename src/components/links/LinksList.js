//This is the displaying of the form data.
import React, { Component } from "react";
import { Link } from "react-router-dom";
import LinksCard from "./LinksCard"

export default class LinksList extends Component {
  render() {
    return (
      <React.Fragment>

        <section className="links">
            <LinksCard key={this.props.links.id} links={this.props.links} {...this.props} />
        </section>
      </React.Fragment>
    );
  }
}