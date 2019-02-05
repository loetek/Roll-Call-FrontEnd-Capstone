import React, { Component } from "react"
//import NavBar from "./nav/NavBar"
//import AppViews from "./AppViews"
import Login from "./logins/LoginList"
import DataManager from "../modules/DataManager"
import "./Connection.css"
import "bootstrap/dist/css/bootstrap.min.css"
import AppViews from "./AppViews";
import NavBarStu from "./navbar/NavbarStu"
import NavBarInst from "./navbar/NavBarInst"




export default class Connection extends Component {

    state = {
        userData:""
    }

    isClear = (loginData) => {
        // return DataManager.getData({
        //         "dataSet" : "users",
        //         "fetchType" : "GET"
        //     })
        //     .then(r => {console.log(r)})
       return console.log("hello")
    }

    render() {
        return (
            <React.Fragment>
            {/* <Login /> */}
            <AppViews />
            {/* <NavBarInst /> */}
             {/* if(isAuthenticated === t  && this.state.userData.status === t){
                <NavBarInst />
                <AppViews />
             } else if (isAuthenticated === t){
                <NavBarStu />
                <AppViews />
             } else
             {  } */}
            </React.Fragment>
        )
    }
}

