import React, { Component } from 'react'
import { Route, Redirect } from "react-router-dom"
import {
  Container,
  Row,
  Col,
  Jumbotron,
  Button
} from 'reactstrap';
import LandingPageInst from "./landingPage/LandingPageInst"
import getData from "../modules/DataManager"





export default class AppViews extends Component {


    state = {
        agendas:"",
        users:"",
        links:""
    }

    //!! Data Fetch Calls !!///////



    //!! Component Did Mount !!////

componentDidMount() {

    getData.DataManager({
                "dataSet" : "agendas",
                "fetchType" : "GET"
            })
            .then(r => {console.log(r)})

    }




    render() {
        return (
          <React.Fragment>

            <Route
              exact path="/" render={props => {
                return <LandingPageInst {...props} LandingPageAgenda={this.state.agendas} />

              }}
            />

          </React.Fragment>
        );
      }


}

