import React , { memo, useState, useCallback } from 'react';
import './Bottom.css';
import { ORDER_DEPART } from './constant';
import classnames from 'classnames'


const Filter = memo( function Filter (props) {
    const {
        name,
        checked,
        value,
        toggle
    } = props
    return (
        <li className={classnames({checked})} onClick={()=> toggle(value)}>
            {name}
        </li>
    )
});

const Option = memo(function Option (props) {
    const {
        title,
        options,
        checkedMap,
        update,
    } = props;

    const toggle = useCallback((value)=> {
        const newCheckedMap = {...checkedMap};
        if(value in checkedMap){
            delete newCheckedMap[value];
        }else{
            newCheckedMap[value] = true;
        }
        update(newCheckedMap); 
    },[checkedMap, update])

    return (
        <div className="option">
            <h3>{title}</h3>
            <ul>
                {
                    options.map(option => 
                        <Filter 
                            key={option.value}
                            {...option}
                            checked={option.value in checkedMap}
                            toggle={toggle}
                        />
                    )
                }
            </ul>
        </div>
    )
});

const BottomModal = memo( function BottomModal (props) {
    const {
        ticketTypes,
        trainTypes,
        departStations,
        arriveStations,
        checkedTicketTypes,
        checkedTrainTypes,
        checkedDepartStations,
        checkedArriveStations,
        departTimeStart,
        departTimeEnd,
        arriveTimeStart,
        arriveTimeEnd,
        setCheckedTicketTypes,
        setCheckedTrainTypes,
        setCheckedDepartStations,
        setCheckedArriveStations,
        setDepartTimeEnd,
        setDepartTimeStart,
        setArriveTimeStart,
        setArriveTimeEnd,
    } =props;

    const [localCheckedTicketTypes, setLocalCheckedTicketTypes ] = useState(()=> {
        return {
            ...checkedTicketTypes
        }
    })

    const [localCheckedTrainTypes, setLocalCheckedTrainTypes] =useState(()=> {
        return {
            ...checkedTrainTypes
        }
    })

    const [localCheckedDepartStations, setLocalCheckedDepartStations] = useState(()=> {
        return {
            ...checkedDepartStations
        }
    })

    const [localCheckedArriveStations, setLocalCheckedArriveStations] = useState(()=> {
        return {
            ...checkedArriveStations
        }
    })
    const optionGroup = [
        {
            title:'坐席类型',
            options: ticketTypes,
            checkedMap: localCheckedTicketTypes,
            update: setLocalCheckedTicketTypes,
        },
        {
            title: '车次类型',
            options: trainTypes,
            checkedMap: localCheckedTrainTypes,
            update: setLocalCheckedTrainTypes,
        },
        {
            title:'出发车站',
            options: departStations,
            checkedMap: localCheckedDepartStations,
            update: setLocalCheckedDepartStations,
        },
        {
            title:'到达车站',
            options: arriveStations,
            checkedMap: localCheckedArriveStations,
            update: setLocalCheckedArriveStations,
        }
    ]

    return (
        <div className="bottom-modal">
            <div className="bottom-dialog">
                <div className="bottom-dialog-content">
                    <div className="title">
                        <span className="reset">
                            重置
                        </span>
                        <span className="ok">
                            确定
                        </span>
                    </div>
                    <div className="options">
                        {
                            optionGroup.map( group => 
                                <Option {...group} key={group.title}/>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    )
});

export default function  Bottom (props) {
    const {
        toggleHighSpeed,
        toggleIsFiltersVisible,
        toggleOnlyTickets,
        toggleOrderType,
        orderType,
        onlyTickets,
        isFiltersVisible,
        highSpeed,
        ticketTypes,
        trainTypes,
        departStations,
        arriveStations,
        checkedTicketTypes,
        checkedTrainTypes,
        checkedDepartStations,
        checkedArriveStations,
        departTimeStart,
        departTimeEnd,
        arriveTimeStart,
        arriveTimeEnd,
        setCheckedTicketTypes,
        setCheckedTrainTypes,
        setCheckedDepartStations,
        setCheckedArriveStations,
        setDepartTimeEnd,
        setDepartTimeStart,
        setArriveTimeStart,
        setArriveTimeEnd,
    } = props;

    return (
        <div className="bottom">
            <div className="bottom-filters">
                <span className="item" onClick={toggleOrderType}>
                    <i className="icon">&#xf065;</i>
                    {orderType === ORDER_DEPART ? '出发 早→晚': '耗时 短→长'}
                </span>
                <span className={classnames('item',{'item-on': highSpeed})} onClick={toggleHighSpeed}>
                    <i className="icon"> { highSpeed ? '\uf43f' : '\uf43e'} </i>
                    只看高铁动车
                </span>
                <span className={classnames('item',{'item-on': onlyTickets})} onClick={toggleOnlyTickets}>
                    <i className="icon"> { onlyTickets ? '\uf43d' : '\uf43c'} </i>
                    只看有票
                </span>
                <span className={classnames('item',{'item-on': isFiltersVisible})} onClick={toggleIsFiltersVisible}>
                    <i className="icon"> {'\uf0f7' } </i>
                    综合筛选
                </span>
            </div>
            {
                isFiltersVisible && (
                    <BottomModal  
                        ticketTypes={ticketTypes}
                        trainTypes={trainTypes}
                        departStations={departStations}
                        arriveStations={arriveStations}
                        checkedTicketTypes={checkedTicketTypes}
                        checkedTrainTypes={checkedTrainTypes}
                        checkedDepartStations={checkedDepartStations}
                        checkedArriveStations={checkedArriveStations}
                        departTimeStart={departTimeStart}
                        departTimeEnd={departTimeEnd}
                        arriveTimeStart={arriveTimeStart}
                        arriveTimeEnd={arriveTimeEnd}
                        setCheckedTicketTypes={setCheckedTicketTypes}
                        setCheckedTrainTypes={setCheckedTrainTypes}
                        setCheckedDepartStations={setCheckedDepartStations}
                        setCheckedArriveStations={setCheckedArriveStations}
                        setDepartTimeEnd={setDepartTimeEnd}
                        setDepartTimeStart={setDepartTimeStart}
                        setArriveTimeStart={setArriveTimeStart}
                        setArriveTimeEnd={setArriveTimeEnd}
                        toggleIsFiltersVisible={toggleIsFiltersVisible}
                    />
                )
            }
        </div>
    );
}