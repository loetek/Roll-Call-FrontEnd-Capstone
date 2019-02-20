import React, { Component } from "react"
import {Doughnut, Bar, Line, HorizontalBar, Radar, Pie, Scatter, Polar, Bubble} from 'react-chartjs-2';
import NavBarInst from "../navbar/NavBarInst";



export default class DashboardListInst extends Component {
    state = {
            chartData1:{
                labels: [this.props.attendance.date],
                datasets:[
                    {
                        data:[this.props.attendance.time],
                        backgroundColor:[
                            "red",
                            "purple",
                            "lime"
                        ]
                    }
                ]
            },
            chartData2:{
                labels: [this.props.attendance],
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
    this.usersAttendance();
}


render(){
   console.log(this.props.attendance)
    console.log(this.props.attendance[0])
   console.log(this.props.attendance.date)
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