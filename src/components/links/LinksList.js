//This is the displaying of the form data.
import React, { Component } from "react";
import LinksCard from "./LinksCard"
import NavBarStu from "../navbar/NavBarStu"

export default class LinksList extends Component {
  render() {
    console.log(this.props.links)
    return (
      <React.Fragment>
      <NavBarStu {...this.props} agendas={this.props}/>
        <section className="linkslist">
          {this.props.links.map(link => (
            <LinksCard key={link.id} link={link} users={this.props.users} sortLinks={this.props.sortLinks} {...this.props} />
            ))}
        </section>
      </React.Fragment>
    );
  }
}