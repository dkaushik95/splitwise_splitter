import React from 'react'
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Content from "./pages/Home/Content";


function AppRouter() {
    return (
        <Router>
            <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
            <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500" />
            <Route path='/' exact component={Home} />
            <Route path='/content' exact component={Content} />
        </Router>
    )
}

export default AppRouter