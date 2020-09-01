import React, { useCallback, useEffect }  from 'react'
import { connect } from 'react-redux';
import './App.css';
import URI from 'urijs'

import Header from '../common/Header.jsx'
import Nav from '../common/Nav.jsx'
import List from './List.jsx'
import Bottom from './Bottom.jsx'

import {
    setFrom,
    setTo,
    setDepartDate,
    setHighSpeed,
} from './actions.js';
import dayjs from 'dayjs';
import { h0 } from '../common/fp.js'

function App(props) {

    const {
        from,
        to
    } = props
    
    useEffect(()=>{
        const queries = URI.parseQuery(window.location.search);
        const {
            from,
            to,
            date,
            highSpeed,
        } = queries;

        dispatch(setFrom(from));
        dispatch(setTo(to));
        dispatch(setDepartDate(h0(dayjs(date).valueOf)));
        dispatch(setHighSpeed(highSpeed === 'true'));
    },[])
    const onBack = useCallback(()=> {
        window.history.back()
    },[])

    return (
        <div>
            <div className="header-wrapper">
                <Header 
                    title={`${from} → ${to}`}
                    onBack={onBack}
                />
            </div>
            <Nav/>
            <List />
            <Bottom />
        </div>
    )
}

export default  connect (
    function mapStateToprops(state) {
        return state
    },
    function mapDispatchToProps(dispatch) {
        return { dispatch }
    }
)(App);