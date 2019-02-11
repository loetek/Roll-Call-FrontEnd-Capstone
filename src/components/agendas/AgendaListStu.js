//This is the displaying of the form data.
import React, { Component } from "react";
import AgendaCard from "./AgendaCardStu";
import AgendaCardStu from "./AgendaCardStu";

export default class AgendaListStu extends Component {
  render() {
    return (
      <React.Fragment>
        <section className="agendas">
            <AgendaCardStu key={this.props.agendas.id} agendas={this.props.agendas} {...this.props} />
        </section>
      </React.Fragment>
    );
  }
}