//This is the displaying of the form data.
import React, { Component } from "react";
import AgendaCard from "./AgendaCard";


export default class AgendaList extends Component {

  render() {
    return (
      <React.Fragment>
        <section className="agendas">
            <AgendaCard key={this.props.agendas.id}
            addAgendas={this.props.addAgendas}
            deleteAgenda={this.props.deleteAgenda}
            agendas={this.props.agendas}
            updateAgenda={this.props.updateAgenda}
            users={this.props.users}
            currentCohortID={this.props.currentCohortID}
            {...this.props} />
        </section>

      </React.Fragment>
    );
  }
}