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
                                yAxes: [{
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
this.setState({feelsUserChoice:'',feelsCohortChoice:'',attendanceUserChoice:'',attendanceCohortChoice:''}, ()=> null)
const stateToChange = {}
stateToChange[evt.target.id] = evt.target.value
console.log(stateToChange);
this.setState({[evt.target.id]: evt.target.value}, ()=> this.setChoice())

}

setChoice () {

    if (this.state.feelsUserChoice !== ""){
            this.getUserFeels();
        }else if(this.state.feelsCohortChoice !== "")
        {
            this.getCohortFeels();
        }else if(this.state.attendanceUserChoice !== "")
        {
            this.getUserAttendance();
        }else if(this.state.attendanceCohortChoice !== "")
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
                            console.log(r._i)
                           return r
                        }),
                        backgroundColor:["lightblue"],
                        options: {
                            scales: {
                                yAxes: [{
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
                        backgroundColor:["pink"],
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
    console.log(this.state.feelsUserChoice)
    fetch(`http://localhost:5002/tempChecks?userID=${this.state.feelsUserChoice}`,{
        method: "GET"
    })
    .then(e => e.json())
    .then (feels => {
        feels.forEach(feel =>{
            console.log(feel);
            feelsUserArr.push(feel.feels)
            feelsUserDateArr.push(feel.date)
        })

        console.log("feels", feelsUserArr)
        console.log("date", feelsUserDateArr)

        this.setState({

            chartData1:{
                labels: feelsUserDateArr,
                datasets:[
                    {
                        data:feelsUserArr,
                        backgroundColor:[
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
                            "yellow",
                            "red","yellow",
                            "red",
                            "purple",
                            "lime",
                            "turquoise",
                            "navy",
                            "white",
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
        }, () => null)
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
                            "gold",
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
                            "yellow",
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
                            "yellow",
                            "red","yellow",
                            "red",
                            "purple",
                            "lime",
                            "turquoise",
                            "navy",
                        ]
                    }
                ]
            }
        }, () => null)

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
                        backgroundColor:["lightgreen"],
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
                            "yellow",
                            "red",
                            "yellow",
                            "red",
                            "purple",
                            "lime",
                            "turquoise",
                            "navy",
                            "gold",
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
                            "yellow",
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
                            "yellow",
                            "red","yellow",
                            "red",
                            "purple",
                            "lime",
                            "turquoise",
                            "navy",
                            "lime",
                            "turquoise",
                            "navy",
                            "yellow",
                            "red",
                            "yellow",
                            "red",
                            "purple",
                            "lime",
                            "turquoise",
                            "navy",

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

// componentWillReceiveProps(){
//     this.getCohortFeels();
// }


render(){

// console.log("attendance",this.props.attendance);
//console.log("state", this.state)
// console.log("time", this.stuTime)
// console.log("date", this.stuDate)
console.log("props", this.props.users)
return(
 <React.Fragment>
 <div className="stickyNav">
 <NavBarInst {...this.props}/>
 </div>

 <select className="form-control"
            id="feelsUserChoice"
            onChange={this.handleFieldChange}>

            <option> Select a Candidate </option>
        {
            this.props.users.map(user => {
                return (
                    <option key={`feels-${user.id}`} id="feelsUserChoice" value={user.id}>
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
                    <option key={`feelsCo-${cohort.id}`} id="feelsCohortChoice" value={cohort.cohortID}>
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
                    <option key={`attendance-${user.id}`} id="attendanceUserChoice" value={user.id}>
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
                    <option key={`attendanceCo-${cohort.id}`} id="attendanceCohortChoice" value={cohort.cohortID}>
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

</React.Fragment>
    )
}
}