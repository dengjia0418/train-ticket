import React from 'react'
import { connect } from 'react-redux';
import './App.css';

import Header from '../common/Header.jsx';
import DepartDate from './DepartDate.jsx';
import HighSpeed from './HighSpeed.jsx';
import Journey from './Journey.jsx';
import Submit from './Submit.jsx';

function App(props) {
    return (
        <div>
            <Header/>
            <Journey/>
            <DepartDate/>
            <HighSpeed/>
            <Submit/>
        </div>
    )
}

export default  connect (
    function mapStateToprops(state) {},
    function mapDispatchToProps(dispatch) {}
)(App);