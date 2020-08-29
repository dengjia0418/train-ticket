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
import DateSelector from '../common/DateSelector.jsx';

import { exchangeFromTo, 
        showCitySelector,
        hidaCitySelector, 
        fetchCityData, 
        setSelectedCity, 
        showDateSelector, 
        hideDateSelector
        } 
        from './actions.js'

function App (props) {
    
    const { 
        from, 
        to, 
        dispatch,
        isCitySelectorVisible,
        cityData,
        isLodaingCityData,
        departDate,
        isDateSelectorVisible,
        
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
            onSelect: setSelectedCity,
        },dispatch)
    },[dispatch])

    const departDateCbs = useMemo(()=> {
        return bindActionCreators({
            onClick: showDateSelector,
        },dispatch)
    },[dispatch])

    const dateSelectorCbs = useMemo(()=> {
        return bindActionCreators({
            onBack: hideDateSelector,
        },dispatch)
    },[dispatch])
    return (
        <div>
            <div className="header-wrapper">
                <Header title="火车票" onBack={onBack} />
            </div>
            <form className="form">
                <Journey from={from} to={to} {...cbs}/>
                <DepartDate 
                    time={departDate}
                    {...departDateCbs}
                />
                <HighSpeed />
                <Submit />
            </form>
            <CitySelector 
                show={isCitySelectorVisible}
                cityData={cityData}
                isLoading={isLodaingCityData}
                {...CitySelectorCbs}
            />
            <DateSelector
                show={isDateSelectorVisible}
                {...dateSelectorCbs}
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