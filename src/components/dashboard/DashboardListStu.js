import React, { Component } from "react"
import {Bar, Line} from 'react-chartjs-2';
import NavBarStu from "../navbar/NavBarStu";
import moment from 'moment'

let remoteURL =  process.env.NODE_ENV === 'production'
? ""
: "http://localhost:5002/";

export default class DashboardListStu extends Component {
    state = {
        currentUser: '',
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

 attendanceSetter = (id) =>{
            let stuTime = [];
            let stuDate = [];
            return fetch(`${remoteURL}/attendance/?userID=${id}`, {
                method: "GET"
            })
            .then(e => e.json())
            .then(attend => {
                console.log(attend)
                attend.forEach(element => {
                    console.log("element", element)
                   let modified = moment(element.time, ['h:mm a']);
                   console.log(modified);
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

         feelsSetter = (id) =>{
            let stuFeels = [];
            let stuDate = [];
            return fetch(`${remoteURL}/tempChecks?userID=${id}`, {
                method: "GET"
            })
            .then(e => e.json())
            .then(feels => {
                feels.forEach(element => {
                    console.log("element", element)
                    stuFeels.push(element.feels);
                    stuDate.push(element.date);
                });

        console.log("time", stuFeels)
        console.log("date", stuDate)

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
            this.attendanceSetter(sessionStorage.getItem("user"));
            this.feelsSetter(sessionStorage.getItem("user"));
        }

render(){
   console.log(this.props)
    return(
 <React.Fragment>
 <div className="stickyNav">
 <NavBarStu {...this.props}/>
</div>
 <div className="chartData1"></div>
    <Bar
    data={this.state.chartData1}
        options={{
            title:{
                display:true,
                text: "Weekly Temperature Checks Breakdown",
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
 <div className="chartData2"></div>
    <Line
    data={this.state.chartData2}
        options={{
            title:{
                display:true,
                text: "Weekly Attendance Breakdown",
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