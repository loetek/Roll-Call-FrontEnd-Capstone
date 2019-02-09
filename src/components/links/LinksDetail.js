import React, { Component } from "react";

export default class LinksDetail extends Component {
  render() {
    //console.log(this.props);
    /*
            Using the route parameter, find the animal that the
            user clicked on by looking at the `this.props.animals`
            collection that was passed down from ApplicationViews
        */
    const link =
      this.props.links.find(
        a => a.id === parseInt(this.props.match.params.linkID)
      ) || {};

    return (
    <React.Fragment>
      <section className="agenda">
        <div key={link.id} className="card">
          <div className="card-body">
            <h4 className="card-title">
              {link.topic}
            </h4>
            <h6 className="card-title">{link.announcements}</h6>

            {/* <a
              href="#"
              onClick={() =>
                this.props
                  .deleteAgenda(agenda.id)
                  .then(() => this.props.history.push("/agendas"))
              }
              className="card-link"
            >
              Delete
            </a> */}
          </div>
        </div>
      </section>
    </React.Fragment>
    );
  }
}