import React, { Component } from "react";
import { Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle } from 'reactstrap';




export default class ProfileCard extends Component {

    state = {

        totalStudents:'',
        totalAttendance:'',
        totalAgendas:'',
        totalTempChecks:'',

        students:[],
        times:[],
        temps:[],
        difficulty:[],

        avgAttendance:'',
        avgTempChecks:'',
        avgAgenda:'',
    }



    getTotals = (id) =>
    {   //get the total number of students, checkins, tempchecks, agenda items for a each cohort.
        let attendTimes = [];
        let totAttend = [];
        let toAttend2 = this.props.attendance.filter(attend => attend.cohortID === this.props.cohort.cohortID)

        // .length;

        let totTemp = [];
        let tempCks =[];

        let totAgenda = [];
        let agendaDiff = [];

        let totStu = [];
        let stuName = [];


    fetch(`http://localhost:5002/attendance?cohortID=${this.props.cohort.cohortID}`,{
    method: "GET"
    })
    .then(e => e.json())
    .then (attends => {
        attends.forEach(attend =>{
            attendTimes.push(attend.time)
            totAttend = attendTimes.length +1;
        })
        console.log("totalA - Fetch", totAttend);
        console.log("attends - Fetch", attendTimes);
    })

    console.log("totalA - Not Fetch", toAttend2)
    fetch(`http://localhost:5002/tempChecks?cohortID=31`,{
    method: "GET"
    })
    .then(e => e.json())
    .then (temps => {
        temps.forEach(temp =>{
            tempCks.push(temp.feels)
            totTemp = tempCks.length;
        })
        // console.log("totalT", totTemp);
        // console.log("tChks", tempCks);
    })
    fetch(`http://localhost:5002/agendas?cohortID=31`,{
    method: "GET"
    })
    .then(e => e.json())
    .then (agendas => {
        agendas.forEach(agenda =>{
            agendaDiff.push(agenda.difficulty)
            totAgenda = agendaDiff.length;
        })
        // console.log("totalAgenda", totAgenda);
        // console.log("diff", agendaDiff);
    })
    fetch(`http://localhost:5002/users?cohortID=28&status=false`,{
    method: "GET"
    })
    .then(e => e.json())
    .then (students => {
        students.forEach(student =>{
            stuName.push(student.firstName)
            totStu = stuName.length;
        })
        // console.log("totalStus", totStu);
        // console.log("names", stuName);
    })

    this.setState({

        totalStudents: totStu,
        totalAttendance: totAttend,
        totalAgendas: totAgenda,
        totalTempChecks: totTemp,

        students: stuName,
        times: attendTimes,
        temps: tempCks,
        difficulty: agendaDiff

    })
        //this.getAvg();
    }

    getAvg = () =>
    {
        // let times = this.state.times;
        // let attendAvg= times.reduce((partial_sum, a) => partial_sum + a);

        // console.log(attendAvg);
        let temps = this.state.temps;
        let tempAvg = temps.reduce((partial_sum, a) => partial_sum + a);

        console.log(tempAvg);

        let avgDiff = '';



    }

    // getInstructor = () =>
    // {
    //   fetch(`http://localhost:5002/users?cohortID=31`,{
    //     method: "GET"
    //     })
    //     .then(e => e.json())
    //     .then (agendas => {
    //         agendas.forEach(agenda =>{
    //             agendaDiff.push(agenda.difficulty)
    //             totAgenda = agendaDiff.length;
    //         })
    //         // console.log("totalAgenda", totAgenda);
    //         // console.log("diff", agendaDiff);
    //     })


    // }



    componentDidMount()
    {
        this.getTotals();

    }





  render() {
    console.log(this.props)
    console.log(this.state)

    return (
    <React.Fragment>

    <div>
      <Card key={this.props.cohort.id} id={this.props.cohort.cohortID} className="">

        <CardBody className="profileCardBody" >
          <CardTitle>Cohort {this.props.cohort.cohortID} </CardTitle>
          <CardSubtitle> {this.props.cohort.description} </CardSubtitle>
          <CardText>Instructor: </CardText>
          <CardText>Attendance: {} </CardText>
        </CardBody>
      </Card>
    </div>





      {/* <Container>
      <Row>
      <Col>
      <div key={this.props.cohort.id} className="">
        <div className="linksBody">
          <h5 className="card-title">
            {this.props.link.title}
          </h5>
          <p>{this.props.link.description}</p>
          <a href={this.props.link.url} target="_blank"> {this.props.link.url}</a>
        </div>
      </div>
      </Col>
      </Row>
      </Container> */}
    </React.Fragment>
    );
  }
}

