import React, { Component } from 'react'
import { Route, Redirect } from "react-router-dom"
import LandingPageInst from "./landingPage/LandingPageInst"
import LandingPageStu from "./landingPage/LandingPageStu"
import AgendaList from "./agendas/AgendaList"
import Login from './logins/LoginList'
import Registration from "./logins/Registration"
import LinksList from "./links/LinksList"
import AgendaEditInst from './agendas/AgendaCard'
import DashboardListInst from "./dashboard/DashboardListInst"
import DashboardListStu from "./dashboard/DashboardListStu"
import ProfileList from "./profiles/ProfileList"

import DataManager from "../modules/DataManager"
import LoginManager from "../modules/LoginManager"
import AgendaManager from "../modules/AgendaManager"
import TempCheckManager from '../modules/TempCheckManager'
import AttendanceManager from "../modules/AttendanceManager"

import 'moment-timezone';
import Callback from "../Callback"


export default class AppViews extends Component {
    isAuthenticated = () => sessionStorage.getItem("user") !== null
    state = {
        agendas:[],
        users:[],
        links:[],
        tempChecks:[],
        attendance:[],
        cohorts:[],
        userId: sessionStorage.getItem("user")

    }
    //!! ADD method area !!//
    addUser = newUser =>
    LoginManager.post(newUser)
      .then(() => LoginManager.getAll())
      .then(user =>
        this.setState({
          users: user
        })
      );

    addAttendance = newTime =>
    AttendanceManager.post(newTime)
      .then(() => LoginManager.getAll())
      .then(attendance =>
        this.setState({
          attendance: attendance
        })
      );

    addAgendas = newAgenda =>
    AgendaManager.post(newAgenda)
      .then(() => AgendaManager.getAll())
      .then(agendas =>
        this.setState({
          agendas: agendas
        })
      )
      .then(r => this.sortAgendas());

    addTempChecks = newTempCheck =>
      TempCheckManager.post(newTempCheck)
        .then(() => TempCheckManager.getAll())
        .then(tempCheck =>
          this.setState({
            tempChecks: tempCheck
          })

        );

           //!! DELETE method area !!//
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
            )
            .then(r => this.sortAgendas());
          };


          //!! SORT method area !!//
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

    sortAttendance = () => {
      return fetch(`http://localhost:5002/attendance?_sort=date&_order=desc`, {
        method: "GET"
      })
      .then(response => response.json())
      .then(clockin =>
        this.setState({
          attendance: clockin
        })
        );
      };

      sortTempChecks = () => {
        return fetch(`http://localhost:5002/tempChecks?_sort=date&_order=desc`, {
          method: "GET"
        })
        .then(response => response.json())
        .then(feels =>
          this.setState({
            attendance: feels
          })
          );
      }


        //!! MISC method area !!//
      verifyUser = (username, password) => {
        return LoginManager.getUsernameAndPassword(username, password)
          .then(verifiedUser => this.setState({
            users: verifiedUser
          })
          )
      }

      updateAgenda = (agendaId, editedObj) => {
       // console.log(agendaId, editedObj )
        AgendaManager.put(agendaId, editedObj)
        .then(() => AgendaManager.getAll())
        .then(agendas => {
          this.setState({
            agendas: agendas
          })

        });
        this.sortAgendas();
      }

    //!! Component Did Mount !!////

componentDidMount() {

  this.sortAgendas();
  this.sortLinks();
  this.sortAttendance();
  this.sortTempChecks();

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
    DataManager.DataManager({
      "dataSet" : "cohorts",
      "fetchType" : "GET"
      })
      .then(r => {
          this.setState({
              cohorts: r
          })
      })

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
                users={this.state.users}
                />
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
                LandingPageStu={this.LandingPageStu}
                agendas={this.state.agendas}
                sortLinks={this.sortLinks}
                links={this.state.links}
                users={this.state.users}
                tempChecks={this.state.tempChecks}
                addTempChecks={this.addTempChecks}
                addAttendance={this.addAttendance}
                attendance={this.state.attendance}
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
            {/* <Route
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
            }} */}
        {/* /> */}
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
        <Route
            path="/dashboardListInst" render={props => {
               if (this.isAuthenticated()){
                return <DashboardListInst {...props}
                agendas={this.state.agendas}
                links={this.state.links}
                users={this.state.users}
                tempChecks={this.state.tempChecks}
                attendance={this.state.attendance}
                cohorts={this.state.cohorts}
                />
              }
              else {
              return <Redirect to="/" />;
            }
            }}
        />
        <Route
            path="/dashboardListStu" render={props => {
               if (this.isAuthenticated()){
                return <DashboardListStu {...props}
                agendas={this.state.agendas}
                links={this.state.links}
                users={this.state.users}
                tempChecks={this.state.tempChecks}
                attendance={this.state.attendance}
                cohorts={this.state.cohorts}
                />
              }
              else {
              return <Redirect to="/" />;
            }
            }}
        />
        <Route
            path="/profiles" render={props => {
               if (this.isAuthenticated()){
                return <ProfileList{...props}
                agendas={this.state.agendas}
                links={this.state.links}
                users={this.state.users}
                tempChecks={this.state.tempChecks}
                attendance={this.state.attendance}
                cohorts={this.state.cohorts}
                />
              }
              else {
              return <Redirect to="/" />;
            }
            }}
        />
        <div>
        {/* <!-- ... NavBar and the other two Routes ... --> */}
        <Route exact path='/callback' component={Callback}/>
      </div>

          </React.Fragment>
        );
      }


}

