//Top level head of the application all rendered from here. //#endregion

import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from "react-router-dom"
import Connection from './components/Connection'

import './index.css'

ReactDOM.render(
    <Router>
        <Connection />
    </Router>
    , document.getElementById('root'))
