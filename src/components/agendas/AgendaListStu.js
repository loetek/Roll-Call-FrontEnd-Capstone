//This is the displaying of the form data.
import React, { Component } from "react";
import AgendaCardStu from "./AgendaCardStu";

export default class AgendaListStu extends Component {
  render() {
    return (
      <React.Fragment>
        <section className="agendas">
            <AgendaCardStu key={this.props.agendas.id} singleCard={this.props.singleCard} card={this.props.card} agendas={this.props.agendas} {...this.props} />
        </section>
      </React.Fragment>
    );
  }
}