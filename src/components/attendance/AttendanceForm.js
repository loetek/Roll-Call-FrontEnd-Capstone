import React, { Component } from "react"
// import AgendaListStu from "../agendas/AgendaListStu"
// import NavBarStu from "../navbar/NavBarStu";
// import Calendar from 'react-calendar'
// import TempChecksFormStu from "../tempChecks/TempChecksFormStu"
import Moment from 'react-moment';
import 'moment-timezone';
import {

  Button,
  CardTitle,
  Card,
  CardText,
  CardBody,
  CardSubtitle } from 'reactstrap';
  import "./Attendance.css"



export default class AttendanceForm extends Component {


    state = {

        "time": "",
        "date": "",
        userID: sessionStorage.getItem("user"),
        cohortID: sessionStorage.getItem("cohort"),
        toggle: true

      }

      // clearButton = (evt) => {

      //   if (this.toggle){


      //   }


      // }

      clockIn = (evt) => {

        let t = new Date().toLocaleTimeString();
        let d = new Date().toLocaleDateString();

        let punchIn = {

          "time": t,
          "date": d,
          "userID": parseInt(sessionStorage.getItem("user")),
          "cohortID": parseInt(sessionStorage.getItem("cohort"))

        }
        //console.log("punchin", punchIn)
        this.setState(punchIn, () => this.props.addAttendance(punchIn))
        alert (`Way to go you clockedin at ${punchIn.time} on ${punchIn.date}`)
        this.setState(prevState => ({
          toggle: false,
          }));
      }

      render() {
        console.log(this.state)
        return (
          <React.Fragment>
            <div id="timeCard">
                <Card color= ''>
              <div id="innerCard">
                <CardBody color= ''>
                <CardText>Get your Clock in!!</CardText>
                <CardTitle>
                <Moment interval={1000}>
                </Moment>
                <br/>
                <br/>
                <CardSubtitle>
                  {this.state.toggle ?
                <Button id="clockinButton" onClick={this.clockIn} color="primary">Clock In</Button>
                : <Button color="primary" disabled> Already Clocked </Button>}
                </CardSubtitle>
                </CardTitle>
                </CardBody>
                </div>
                </Card>
            </div>
          </React.Fragment>
        );
      }








}