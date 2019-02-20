import React, { Component } from "react"
import {Doughnut, Bar, Line, HorizontalBar, Radar, Pie, Scatter, Polar, Bubble} from 'react-chartjs-2';
import NavBarInst from "../navbar/NavBarInst";




export default class DashboardListInst extends Component {
    state = {
            chartData1:{
                labels: [],
                datasets:[
                    {
                        data:[],
                        backgroundColor:[
                            "red",
                            "purple",
                            "lime"
                        ]
                    }
                ]
            },
            chartData2:{
                labels: [],
                datasets:[
                    {
                        data: [],
                        options: {
                            scales: {
                                xAxes: [{
                                    type: 'time',
                                    time: {
                                        displayFormats: {
                                            minute: ["9:00a","10:00a"]
                                        }
                                    }
                                }]
                            }
                        }
                    }

                ]
            }


         }



 stateSetter = () =>{
    let stuTime = [];
    let stuDate = [];
    return fetch(`http://localhost:5002/attendance`, {
        method: "GET"
    })
    .then(e => e.json())
    .then(attend => {
        attend.forEach(element => {
            console.log("element", element)
            stuTime.push(element.time);
            stuDate.push(element.date);
        });

console.log("time", stuTime)
console.log("date", stuDate)


        this.setState({

            chartData2:{
                labels: [this.stuDate],
                datasets:[
                    {
                        data: [this.stuTime],
                        options: {
                            scales: {
                                xAxes: [{
                                    type: 'time',
                                    time: {
                                        displayFormats: {
                                            minute: [this.stuTime]
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


usersAttendance = () => {
return fetch(`http://localhost:5002/attendance?_userID=${sessionStorage.getItem("user")}`, {
    method: "GET"
})
    .then(e => e.json())
    .then(attend => {
        console.log(attend)
        let reverseAttend = attend.reverse();
        console.log(reverseAttend);
    })

}
    // this.setState({
    //     chartData1:{
    //         labels:attend,
    //         datasets:[
    //           {
    //               label:attend.time

    //           }
    //         ]
    //     }
    // })})
    // }


componentDidMount(){
    this.stateSetter();
}


render(){
// console.log(this.props.attendance)
// console.log(this.props.attendance.time)
// console.log(this.props.attendance.date)
console.log("attendance",this.props.attendance);
   console.log("state", this.state)
   console.log("time", this.stuTime)
   console.log("date", this.stuDate)


return(
 <React.Fragment>
 <NavBarInst {...this.props}/>
 <div className="chartData1"></div>
    <Bar
        data={this.state.chartData1}
        options={{

        }}
    />
<div/>
 <div className="chartData2"></div>
    <Line
        data={this.state.chartData2}
        options={{

        }}
    />
<div/>
</React.Fragment>
    )
}
}