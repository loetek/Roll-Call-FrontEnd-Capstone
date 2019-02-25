//This is the displaying of the form data.
import React, { Component } from "react";
import AgendaCard from "./AgendaCard";


export default class AgendaList extends Component {

  render() {
    return (
      <React.Fragment>
        <section className="agendas">
            <AgendaCard key={this.props.agendas.id}
            filterCohorts={this.props.filterCohorts}
            addAgendas={this.props.addAgendas}
            deleteAgenda={this.props.deleteAgenda}
            agenda={this.props.agenda}
            updateAgenda={this.props.updateAgenda}
            users={this.props.users}
            currentCohortID={this.props.currentCohortID}
            {...this.props} />
        </section>

      </React.Fragment>
    );
  }
}