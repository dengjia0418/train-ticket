import React, { useCallback, useMemo } from 'react'
import { connect } from 'react-redux';
import './App.css';

import Header from '../common/Header.jsx';
import DepartDate from './DepartDate.jsx';
import HighSpeed from './HighSpeed.jsx';
import Journey from './Journey.jsx';
import Submit from './Submit.jsx';
import { bindActionCreators } from 'redux';

import { exchangeFromTo, showCitySelector} from './actions.js'

function App (props) {
    
    const { from, to, dispatch} = props

    const onBack = useCallback(()=>{
        window.history.back();
    }, [])

    const cbs = useMemo( () => {
        return bindActionCreators({
            exchangeFromTo,
            showCitySelector,
        }, dispatch)
    },[dispatch])
    
    return (
        <div>
            <div className="header-wrapper">
                <Header title="火车票" onBack={onBack} />
            </div>
            <form className="form">
                <Journey from={from} to={to} {...cbs}/>
                <DepartDate />
                <HighSpeed />
                <Submit />
            </form>
        </div>
    );
}

export default  connect (
    function mapStateToprops(state) {
        return state;
    },
    function mapDispatchToProps(dispatch) {
        return { dispatch };
    }
)(App);