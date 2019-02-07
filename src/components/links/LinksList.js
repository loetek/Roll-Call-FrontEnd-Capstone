//This is the displaying of the form data.
import React, { Component } from "react";
import { Link } from "react-router-dom";
import LinksCard from "./LinksCard"
import NavBarStu from "../navbar/NavBarStu"

export default class LinksList extends Component {
  render() {
    return (
      <React.Fragment>
      <NavBarStu {...this.props} agendas={this.props}/>
        <section className="linkslist">
          {this.props.links.map(link => (
            <LinksCard key={link.id} links={this.props.links} users={this.props.users} sortLinks={this.props.sortLinks} {...this.props} />
            ))}
        </section>
      </React.Fragment>
    );
  }
}