import React, { Component } from 'react'
import { Route, Redirect } from "react-router-dom"
import {
  Container,
  Row,
  Col,
  Jumbotron,
  Button
} from 'reactstrap';
import LandingPageInst from "./landingPage/LandingPageInst"
import LandingPageStu from "./landingPage/LandingPageStu"
import AgendaList from "./agendas/AgendaList"
import AgendaDetail from "./agendas/AgendaDetail"
import AgendaFormInst from "./agendas/AgendaFormInst"
import Login from './logins/LoginList';
import Registration from "./logins/Registration"
import LinksList from "./links/LinksList"

import DataManager from "../modules/DataManager"
import LoginManager from "../modules/LoginManager";
import AgendaManager from "../modules/AgendaManager";


export default class AppViews extends Component {
    isAuthenticated = () => sessionStorage.getItem("user") !== null
    state = {
        agendas:[],
        users:[],
        links:[],
        userId: sessionStorage.getItem("user")
    }

    //!! ADD and remove schtuff area !!//
    addUser = newUser =>
    LoginManager.post(newUser)
      .then(() => LoginManager.getAll())
      .then(user =>
        this.setState({
          users: user
        })
      );
    deleteAgenda = id => {

        return fetch(`http://localhost:5002/agendas/${id}`, {
          method: "DELETE"
        })
          .then(response => response.json())
          .then(() => fetch(`http://localhost:5002/agendas`))
          .then(response => response.json())
          .then(agendas =>
            this.setState({
              agendas: agendas
            })
          );
      };

    addAgendas = newAgenda =>
    AgendaManager.post(newAgenda)
      .then(() => AgendaManager.getAll())
      .then(agendas =>
        this.setState({
          agendas: agendas
        })
      );

      verifyUser = (username, password) => {
        LoginManager.getUsernameAndPassword(username, password)
          .then(allUsers => this.setState({
            users: allUsers
          })
          )
      }


    //!! Component Did Mount !!////

componentDidMount() {

    DataManager.DataManager({
    "dataSet" : "agendas",
    "fetchType" : "GET"
    })
    .then(r => {
        this.setState({
            agendas: r
        })
    })
    DataManager.DataManager({
    "dataSet" : "users",
    "fetchType" : "GET"
    })
    .then(r => {
        this.setState({
            users: r
        })
    })
    DataManager.DataManager({
    "dataSet" : "links",
    "fetchType" : "GET"
    })
    .then(r => {
        this.setState({
            links: r
        })
    })

    }

    render() {
        return (
          <React.Fragment>
            <Route
              exact path="/" render={props => {
                return <Login {...props}
                handleLogin={this.handleLogin}
                verifyUser={this.verifyUser}
                users={this.state.users} />
              }}
            />
            <Route
             exact path="/login/new" render={(props) => {
              return <Registration {...props}
              users={this.state.users}
              addUser={this.addUser}
              userId={this.state.userId} />
        }} />
            <Route
            exact path="/LPInst" render={props => {
              return <LandingPageInst {...props}
              LandingPageInst={this.state.agendas}
              deleteAgenda={this.deleteAgenda}
              addAgendas={this.addAgendas}
              agendas={this.state.agendas}
              users={this.state.users}/>
              }}
            />
            <Route
              exact path="/LPStu" render={props => {
                return <LandingPageStu {...props}
                LandingPageStu={this.state.agendas}
                agendas={this.state.agendas}
                sortAgenda={this.state.agendas}
                links={this.state.links}
                users={this.state.users}/>
                }}
            />
            <Route
            exact path="/agendas" render={props => {
                return <AgendaList {...props}
                deleteAgenda={this.deleteAgenda}
                agendas={this.state.agendas}
                users={this.state.users}/>

                }}
             />

        {/* this is the detail for individual agenda item */}
            <Route
            path="/agendas/:agendaId(\d+)" render={props => {
                return <AgendaDetail {...props}
                deleteAgenda={this.deleteAgenda}
                agendas={this.state.agendas}
                users={this.state.users}
              />
          }}
        />

        {/* this is the agendas add form */}
            <Route
            path="/agendas/new" render={props => {
                return <AgendaFormInst {...props}
                addAgendas={this.addAgendasd}
              />
          }}
        />
        <Route
            path="/linkslist" render={props => {
                return <LinksList {...props}
                links={this.state.links}
                users={this.state.users}
              />
          }}
        />
          </React.Fragment>
        );
      }


}

