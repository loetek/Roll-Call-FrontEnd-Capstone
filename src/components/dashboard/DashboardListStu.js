import React, { Component } from "react"
import {Doughnut, Bar, Line, HorizontalBar, Radar, Pie, Scatter, Polar, Bubble} from 'react-chartjs-2';
import NavBarStu from "../navbar/NavBarStu";



export default class DashboardListStu extends Component {
    state = {
            chartData1:{
                labels: ["run", "walk", "ride"],
                datasets:[
                    {
                        data:["1:35","9:00","10:00"],
                        backgroundColor:[
                            "red",
                            "purple",
                            "lime"
                        ]
                    }
                ]
            },
            chartData2:{
                labels: ["Monday", "Tuesday", "Wednesday","Thursday","Friday"],
                datasets:[
                    {
                        data: ["9:00am","10:00am","10:00am","10:10am","10:15am"],
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


// usersAttendance = () => {
// return fetch(`http://localhost:5002/attendance?_sort=date&_order=desc&userID=${sessionStorage.getItem("user")}`, {
//     method: "GET"
// })
//     .then(e => e.json())
//     .then(attend => {
//         console.log(attend)
//     this.setState({
//         chartData1:{
//             labels:attend,
//             datasets:[
//               {
//                   label:attend.time

//               }
//             ]
//         }
//     })})
//     }


// componentDidMount(){
//     this.usersAttendance();
// }


render(){
   //  console.log(this.props.attendance)
    return(
 <React.Fragment>
 <NavBarStu {...this.props}/>
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