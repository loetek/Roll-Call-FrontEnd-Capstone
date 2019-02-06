//This is the displaying of the form data.
import React, { Component } from "react";
import { Link } from "react-router-dom";
import AgendaCard from "./AgendaCard";

export default class AgendaList extends Component {
  render() {
    return (
      <React.Fragment>
        {/* <div className="agendaButton">
          <button
            type="button"
            className="btn btn-success"
            onClick={() => {
              this.props.history.push("/agendas/new");
            }}
          >
          New Agenda
          </button>
        </div> */}
        <section className="agendas">
            <AgendaCard key={this.props.agendas.id} agenda={this.props.agendas} {...this.props} />
        </section>
      </React.Fragment>
    );
  }
}