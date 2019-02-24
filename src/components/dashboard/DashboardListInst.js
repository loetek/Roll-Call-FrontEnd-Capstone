import React, { Component } from "react"
import {Doughnut, Bar, Line, HorizontalBar, Radar, Pie, Scatter, Polar, Bubble} from 'react-chartjs-2';
import NavBarInst from "../navbar/NavBarInst";
import moment from 'moment'




export default class DashboardListInst extends Component {
    state = {
            feelsUserChoice:'',
            feelsCohortChoice:'',
            attendanceUserChoice:'',
            attendanceCohortChoice:'',

            chartData1:{
                labels: ["Scale","Monday","Tuesday","Wednesday","Thursday","Friday"],
                datasets:[
                    {
                        data:[0,5,6,10,9,4],
                        backgroundColor:[
                            "red",
                            "purple",
                            "lime",
                            "turquoise",
                            "navy",
                            "yellow",
                            "red",
                            "purple",
                            "lime",
                            "turquoise",
                            "navy",
                            "yellow"
                        ]
                    }
                ]
            },
            chartData2:{
                labels: [],
                datasets:[
                    {
                        data: '',
                        options: {
                            scales: {
                                yAxis: [{
                                    type: 'time',
                                    distribution: 'series',
                                    time: {
                                        displayFormats: {
                                            minute: 'h:mm a'
                                        }
                                    }
                                }]
                            }
                        }

                    }
                ]
            }
         }

handleFieldChange = (evt) => {
const stateToChange = {}
stateToChange[evt.target.id] = evt.target.value
console.log(stateToChange);
this.setState(stateToChange)
//This will fire the method whenever the value from the toggle selection is chosen.
if (evt.target.id === "feelsUserChoice"){
    this.getUserFeels();
}else if(evt.target.id === "feelsCohortChoice")
{
    this.getCohortFeels();
}else if(evt.target.id === "attendanceUserChoice")
{
    this.getUserAttendance();
}else if(evt.target.id === "attendanceCohortChoice")
{
    this.getCohortAttendance();
}else(
    alert("Houston we have a problem!!")
)
}


getUserAttendance = () => {
    let attendanceUserArr = [];
    let attendanceUserDateArr = [];
    return fetch(`http://localhost:5002/attendance?userID=${this.state.attendanceUserChoice}`,{
        method: "GET"
    })
    .then(e => e.json())
    .then(attend => {
        attend.forEach(element => {
            console.log("element", element)
           let modified = moment(element.time, ['h:mm a']);
           console.log(modified);
            attendanceUserArr.push(modified);
            attendanceUserDateArr.push(element.date);
        });

        console.log("attendance", attendanceUserArr)
        console.log("dateA", attendanceUserDateArr)

        //set state below
        this.setState({

            chartData2:{
                labels: attendanceUserDateArr,
                datasets:[
                    {
                        type: 'line',
                        data:attendanceUserArr.map(r=>{
                           return r
                        }),
                        options: {
                            scales: {
                                xAxis: [{
                                    type: 'time',
                                    time: {
                                        displayFormats: {
                                            minute: 'h:mm a'
                                        }
                                    }
                                }]
                          }
                        }

                    }
                ]
            }


        })

    })
 }

getCohortAttendance = () => {
    let attendanceCohortArr = [];
    let attendanceCohortDateArr = [];
    return fetch(`http://localhost:5002/attendance?cohortID=${this.state.attendanceCohortChoice}`,{
        method: "GET"
    })
    .then(e => e.json())
    .then(attend => {
        attend.forEach(element => {
            //console.log("element", element)
           let modified = moment(element.time, ['h:mm a']);
           //console.log(modified);
            attendanceCohortArr.push(modified);
            attendanceCohortDateArr.push(element.date);
        });

        //console.log("attendCohort", attendanceCohortArr)
        //console.log("dateCohortA", attendanceCohortDateArr)

        //set state below
        this.setState({

            chartData2:{
                labels: attendanceCohortDateArr,
                datasets:[
                    {
                        type: 'line',
                        data:attendanceCohortArr.map(r=>{
                           return r
                        }),
                        options: {
                            scales: {
                                xAxis: [{
                                    type: 'time',
                                    time: {
                                        displayFormats: {
                                            minute: 'h:mm a'
                                        }
                                    }
                                }]
                          }
                        }

                    }
                ]
            }


        })

    })
 }

getUserFeels = () => {
    let feelsUserArr = [];
    let feelsUserDateArr = [];
    return fetch(`http://localhost:5002/tempChecks?userID=${this.state.feelsUserChoice}`,{
        method: "GET"
    })
    .then(e => e.json())
    .then (feels => {
        feels.forEach(feel =>{
            feelsUserArr.push(feel.feels)
            feelsUserDateArr.push(feel.date)
        })

        //console.log("feels", feelsUserArr)
        //console.log("date", feelsUserDateArr)

        this.setState({

            chartData1:{
                labels: feelsUserDateArr,
                datasets:[
                    {
                        data:feelsUserArr,
                        backgroundColor:[
                            "red",
                            "purple",
                            "lime",
                            "turquoise",
                            "navy",
                            "yellow",
                            "red",
                            "purple",
                            "lime",
                            "turquoise",
                            "navy",
                            "yellow"
                        ]
                    }
                ]
            }
        })
    })


}

getCohortFeels = () => {
    let feelsCohortArr = [];
    let feelsCohortDateArr = [];
    return fetch(`http://localhost:5002/tempChecks?cohortID=${this.state.feelsCohortChoice}`,{
        method: "GET"
    })
    .then(e => e.json())
    .then (feels => {
        feels.forEach(feel =>{
            feelsCohortArr.push(feel.feels)
            feelsCohortDateArr.push(feel.date)
        })

        //console.log("feelsCohort", feelsCohortArr)
        //console.log("dateCohort", feelsCohortDateArr)
        this.setState({

            chartData1:{
                labels: feelsCohortDateArr,
                datasets:[
                    {
                        data:feelsCohortArr,
                        backgroundColor:[
                            "red",
                            "purple",
                            "lime",
                            "turquoise",
                            "navy",
                            "yellow",
                            "red",
                            "purple",
                            "lime",
                            "turquoise",
                            "navy",
                            "yellow"
                        ]
                    }
                ]
            }
        })

    })

}


 attendanceSetter = () =>{
    let stuTime = [];
    let stuDate = [];
    return fetch(`http://localhost:5002/attendance`, {
        method: "GET"
    })
    .then(e => e.json())
    .then(attend => {
        attend.forEach(element => {
            //console.log("element", element)
           let modified = moment(element.time, ['h:mm a']);
           //console.log(modified);
            stuTime.push(modified);
            stuDate.push(element.date);
        });


console.log("time", stuTime)
console.log("date", stuDate)


        this.setState({

            chartData2:{
                labels: stuDate,
                datasets:[
                    {
                        type: 'line',
                        data:stuTime.map(r=>{
                           return r
                           //convert all numbers into a decimal and then map through them.
                        }),
                        options: {
                            scales: {
                                xAxis: [{
                                    type: 'time',
                                    time: {
                                        displayFormats: {
                                            minute: 'h:mm a'
                                        }
                                    }
                                }]
                          }
                        }

                    }
                ]
            }


        })

    })
 }

feelsSetter = () =>{
    let stuFeels = [];
    let stuDate = [];
    return fetch(`http://localhost:5002/tempChecks`, {
        method: "GET"
    })
    .then(e => e.json())
    .then(feels => {
        feels.forEach(element => {
            //console.log("element", element)
            stuFeels.push(element.feels);
            stuDate.push(element.date);
        });

//console.log("time", stuFeels)
//console.log("date", stuDate)

        this.setState({

            chartData1:{
                labels: stuDate,
                datasets:[
                    {
                        data:stuFeels,
                        backgroundColor:[
                            "red",
                            "purple",
                            "lime",
                            "turquoise",
                            "navy",
                            "yellow",
                            "red",
                            "purple",
                            "lime",
                            "turquoise",
                            "navy",
                            "yellow"
                        ]
                    }
                ]
            }
        })

    })
 }


componentDidMount(){
    this.attendanceSetter();
    this.feelsSetter();
}


render(){

// console.log("attendance",this.props.attendance);
//console.log("state", this.state)
// console.log("time", this.stuTime)
// console.log("date", this.stuDate)
//console.log("props", this.props.users)
return(
 <React.Fragment>
 <div className="stickyNav">
 <NavBarInst {...this.props}/>
 </div>
<div className="chartsContainer">
 <select className="form-control"
            id="feelsUserChoice"
            value={this.state.value}
            onChange={this.handleFieldChange}>

            <option> Select a Candidate </option>
        {
            this.props.users.map(user => {
                return (
                    <option key={user.id} id="feelsUserChoice" value={user.id}>
                        {user.firstName} {user.lastName}
                    </option>
                )
            })
        }
    </select>
    <select className="form-control"
            id="feelsCohortChoice"
            value={this.state.value}
            onChange={this.handleFieldChange}>
            <option> Select a Cohort </option>
        {
            this.props.cohorts.map(cohort => {
                return (
                    <option key={cohort.cohortID} id="feelsCohortChoice" value={cohort.cohortID}>
                        {cohort.cohortID}
                    </option>
                )
            })
        }
    </select>

 <div className="chartData1"></div>
    <Bar
        data={this.state.chartData1}
        options={{
            title:{
                display:true,
                text: "Weekly Feels Breakdown for Selection",
                fontSize:15
            },
            legend:{
                display:false,
                position:"right",
                text: "Feels"
            }

        }}
    />
<div/>
<select className="form-control"
            value={this.state.value}
            id="attendanceUserChoice"
            onChange={this.handleFieldChange}>
            <option> Select a Candidate </option>
        {
            this.props.users.map(user => {
                return (
                    <option key={user.id} id="attendanceUserChoice" value={user.id}>
                        {user.firstName} {user.lastName}
                    </option>
                )
            })
        }
    </select>
<select className="form-control"
            value={this.state.value}
            id="attendanceCohortChoice"
            onChange={this.handleFieldChange}>
            <option> Select a Cohort </option>
        {
            this.props.cohorts.map(cohort => {
                return (
                    <option key={cohort.cohortID} id="attendanceCohortChoice" value={cohort.cohortID}>
                        {cohort.cohortID}
                    </option>
                )
            })
        }
    </select>
 <div className="chartData2"></div>
    <Line
        data={this.state.chartData2}
        options={{
            title:{
                display:true,
                text: "Weekly Attendance Breakdown for Selection",
                fontSize:15
            },
            legend:{
                display:false,
                position:"right",
                text: "Feels"
            }

        }}
    />
<div/>
</div>
</React.Fragment>
    )
}
}