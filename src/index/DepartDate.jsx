import React from 'react'
import { h0 } from '../common/fp.js'
import dayjs from 'dayjs'
import './DepartDate.css'
import { useMemo } from 'react'

import PropTypes from 'prop-types'

export default function DepartDate (props) {
    const {
        time,
        onClick,
    } = props

    const h0ofDepart = h0(time);
    const departDate = new Date(h0ofDepart);

    const departDateString  = useMemo( ()=> {
        return  dayjs(h0ofDepart).format('YYYY-MM-DD');
    },[h0ofDepart]);  

    const isToday = h0ofDepart === h0();

    const weekString = '周' + ['日','一','二','三','四','五','六'][departDate.getDay()] + (isToday ? (' 今天') : '');

    return (
        <div className="depart-date" onClick={onClick}>
            <input type="hidden" name="date" value={departDateString}/>
            {departDateString}
            <span className="depart-week">{weekString}</span>
        </div>
    );
}

DepartDate.prooTypes = {
    time: PropTypes.number.isRequired,
    onClick: PropTypes.func.isRequired,
}

