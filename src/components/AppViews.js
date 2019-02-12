import React, { Component } from 'react'
import { Route, Redirect } from "react-router-dom"
import LandingPageInst from "./landingPage/LandingPageInst"
import LandingPageStu from "./landingPage/LandingPageStu"
import AgendaList from "./agendas/AgendaList"
import AgendaDetail from "./agendas/AgendaDetail"
//import AgendaFormInst from "./agendas/AgendaFormInst"
import Login from './logins/LoginList'
import Registration from "./logins/Registration"
import LinksList from "./links/LinksList"
import AgendaEditInst from './agendas/AgendaEditInst'
//import TempChecksFormStu from "./tempChecks/TempChecksFormStu"
import Moment from 'react-moment';
import 'moment-timezone';


import DataManager from "../modules/DataManager"
import LoginManager from "../modules/LoginManager"
import AgendaManager from "../modules/AgendaManager"
import UserManager from '../modules/UserManager'
import TempCheckManager from '../modules/TempCheckManager'


export default class AppViews extends Component {
    isAuthenticated = () => sessionStorage.getItem("user") !== null
    state = {
        agendas:[],
        users:[],
        links:[],
        tempChecks:[],
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

    addTempChecks = newTempCheck =>
      TempCheckManager.post(newTempCheck)
        .then(() => TempCheckManager.getAll())
        .then(tempCheck =>
          this.setState({
            tempChecks: tempCheck
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
          .then(response => response.json())
          .then(links =>
            this.setState({
              links:links
            })
          );
      };

      sortAgendas = () => {
        return fetch(`http://localhost:5002/agendas?_sort=date&_order=desc`, {
          method: "GET"
        })
          .then(response => response.json())
          .then(agendas =>
            this.setState({
              agendas: agendas
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

      // setAttendance = () => {
      //   UserManager.


      // }

    //!! Component Did Mount !!////

componentDidMount() {
  this.sortAgendas();

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
      "dataSet" : "tempChecks",
      "fetchType" : "GET"
      })
      .then(r => {
          this.setState({
              tempChecks: r
          })
      })

    this.sortLinks();

    }

    render() {
      // console.log(this.state.agendas)
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
            {/* Instructor Landing Page */}
            <Route
            exact path="/LPInst" render={props => {
              if (this.isAuthenticated()){
              return <LandingPageInst {...props}
              LandingPageInst={this.state.LandingPageInst}
              deleteAgenda={this.deleteAgenda}
              updateAgenda={this.updateAgenda}
              addAgendas={this.addAgendas}
              agendas={this.state.agendas}
              users={this.state.users}
              tempChecks={this.state.tempChecks}/>
              }else {
              return <Redirect to="/" />;
            }
              }}
            />
            {/* Student Landing Page */}
            <Route
              exact path="/LPStu" render={props => {
                if(this.isAuthenticated()){
                return <LandingPageStu {...props}
                LandingPageStu={this.state.LandingPageStu }
                agendas={this.state.agendas}
                sortLinks={this.state.sortLinks}
                links={this.state.links}
                users={this.state.users}
                tempChecks={this.state.tempChecks}
                addTempChecks={this.addTempChecks}
                />
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

