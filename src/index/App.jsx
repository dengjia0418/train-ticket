import React, { useCallback, useMemo } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import './App.css';

import Header from '../common/Header.jsx';
import DepartDate from './DepartDate.jsx';
import HighSpeed from './HighSpeed.jsx';
import Journey from './Journey.jsx';
import Submit from './Submit.jsx';

import CitySelector from '../common/CitySelector.jsx';

import { exchangeFromTo, showCitySelector ,hidaCitySelector, fetchCityData} from './actions.js'

function App (props) {
    
    const { 
        from, 
        to, 
        dispatch,
        isCitySelectorVisible,
        CityData,
        isLodaingCityData,
    } = props

    const onBack = useCallback(()=>{
        window.history.back();
    }, [])

    const cbs = useMemo( () => {
        return bindActionCreators({
            exchangeFromTo,
            showCitySelector,
        }, dispatch)
    },[dispatch])
    
    const CitySelectorCbs = useMemo( ()=> {
        return bindActionCreators({
            onBack: hidaCitySelector,
            fetchCityData,
        },dispatch)
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
            <CitySelector 
                show={isCitySelectorVisible}
                cityData={CityData}
                isLoading={isLodaingCityData}
                {...CitySelectorCbs}
            />
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