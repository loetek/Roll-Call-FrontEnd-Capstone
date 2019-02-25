import React, { Component } from "react";
import ProfileCard from "./ProfileCard";
import NavBarInst from "../navbar/NavBarInst";


export default class ProfileList extends Component {


  render() {
    return (
      <React.Fragment>
      <div className="stickyNav">
              <NavBarInst {...this.props} addAgendas={this.props.addAgendas}/>
              </div>
        <section className="profileList">
            {this.props.cohorts.map(cohort => (
            <ProfileCard key={cohort.id}
            agendas={this.props.agendas}
            users={this.props.users}
            cohort={cohort}
            tempChecks={this.props.tempChecks}
            links={this.props.links}
            attendance={this.props.attendance}
            {...this.props} />
            ))}
        </section>

      </React.Fragment>
    );
  }
}