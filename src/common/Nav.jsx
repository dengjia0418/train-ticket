import React, { useMemo }  from 'react';
import classnames from 'classnames'
import './Nav.css';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn'

export default function  Nav (props) {
    const {
        date,
        prev,
        next,
        isPrevDisabled,
        isNextDisabled,
    } =props;

    const currenString = useMemo(()=> {
        const d = dayjs(date);
        return d.format('M月D日 ') + d.locale('zh-cn').format('ddd');
    },[date])
    return (
        <div className="nav">
            <span
                onClick={prev}
                className={classnames('nav-prev',{
                    'nav-disabled':isPrevDisabled
                })}
            >
                前一天
            </span>
            <span className="nav-current">
                { currenString }
            </span>
            <span
                onClick={next}
                className={classnames('nav-next',{
                    'nav-disabled':isNextDisabled
                })}
            >
                后一天
            </span>
        </div>
    );
}