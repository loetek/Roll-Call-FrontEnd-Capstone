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
//import AgendaFormInst from "./agendas/AgendaFormInst"
import Login from './logins/LoginList';
import Registration from "./logins/Registration"
import LinksList from "./links/LinksList"

import DataManager from "../modules/DataManager"
import LoginManager from "../modules/LoginManager";
import AgendaManager from "../modules/AgendaManager";
import AgendaEditInst from './agendas/AgendaEditInst';


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
      sortLinks = () => {
        return fetch(`http://localhost:5002/links?_sort=dateAdded&_order=desc`, {
          method: "GET"
        })
          // .then(response => response.json())
          // .then(() => fetch(`http://localhost:5002/links`))
          .then(response => response.json())
          .then(links =>
            this.setState({
              links:links
            })
          );
      };

      updateAgenda = (agendaId, editedObj) => {
       // console.log(agendaId, editedObj )
        AgendaManager.put(agendaId, editedObj)
        .then(() => AgendaManager.getAll())
        .then(agendas => {
          this.setState({
            agendas: agendas
          })
        });
      }

      // sortAgenda = (itemToSort) => {
      //   return fetch(`http://localhost:5002/${itemToSort}?_sort=id&_order=desc`, {
      //     method: "GET"
      //   })
      //     .then(response => response.json())
      //     .then(() => fetch(`http://localhost:5002/links`))
      //     .then(response => response.json())
      //     .then(links =>
      //       this.setState({
      //         links: links
      //       })
      //     );
      // };




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

    this.sortLinks();


    }

    render() {
      //console.log(this.state.links)
        return (
          <React.Fragment>
            {/* Login page */}
            <Route
              exact path="/" render={props => {
                return <Login {...props}
                handleLogin={this.handleLogin}
                verifyUser={this.verifyUser}
                users={this.state.users} />
              }}
            />
            {/* Registration page */}
            <Route
             exact path="/login/new" render={(props) => {
              return <Registration {...props}
              users={this.state.users}
              addUser={this.addUser}
              userId={this.state.userId} />
            }}
            />
            {/* Inst Landing Page */}
            <Route
            exact path="/LPInst" render={props => {
              if (this.isAuthenticated()){
              return <LandingPageInst {...props}
              LandingPageInst={this.state.agendas}
              deleteAgenda={this.deleteAgenda}
              updateAgenda={this.updateAgenda}
              addAgendas={this.addAgendas}
              agendas={this.state.agendas}
              users={this.state.users}/>
              }else {
              return <Redirect to="/" />;
            }

              }}
            />
            <Route
              exact path="/LPStu" render={props => {
                if(this.isAuthenticated()){
                return <LandingPageStu {...props}
                LandingPageStu={this.state.agendas}
                agendas={this.state.agendas}
                sortLinks={this.state.links}
                links={this.state.links}
                users={this.state.users}/>
                }
              else {
              return <Redirect to="/" />;
            }
            }}
            />
            <Route
            exact path="/agendas" render={props => {
              if(this.isAuthenticated()){
                return <AgendaList {...props}
                deleteAgenda={this.deleteAgenda}
                agendas={this.state.agendas}
                users={this.state.users}
                updateAgenda={this.updateAgenda}/>
              }else {
              return <Redirect to="/" />;
            }
            }}
            />

        {/* this is the detail for individual agenda item */}
            <Route
            path="/agendas/:agendaId(\d+)" render={props => {
              if(this.isAuthenticated()){
                return <AgendaDetail {...props}
                deleteAgenda={this.deleteAgenda}
                agendas={this.state.agendas}
                updateAgenda={this.updateAgenda}
                users={this.state.users}/>
              }
              else {
              return <Redirect to="/" />;
            }
            }}
        />
        <Route
            path="/agendas/:agendaId(\d+)/edit" render={props => {
              if(this.isAuthenticated()){
                return <AgendaEditInst {...props}
                agendas={this.state.agendas}
                updateAgenda={this.updateAgenda}
                users={this.state.users}/>
              }
              else {
              return <Redirect to="/" />;
            }
            }}
        />
        <Route
            path="/linkslist" render={props => {
               if (this.isAuthenticated()){
                return <LinksList {...props}
                sortLinks={this.state.sortLinks}
                links={this.state.links}
                users={this.state.users}/>
              }
              else {
              return <Redirect to="/" />;
            }
            }}
        />
          </React.Fragment>
        );
      }


}

