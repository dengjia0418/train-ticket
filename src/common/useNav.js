import { h0 } from './fp.js'

export default function useNav (departDate, dispatch, prevDate, nextDate) {
    const isPrevDisabled = h0(departDate) <= h0();
    const isNextDisabled = h0(departDate) - h0() > 20 * 86400 * 1000

    const prev = () => {
        if(isPrevDisabled){
            return
        }
        dispatch(prevDate());
    }

    const next = () => {
        if(isNextDisabled){ 
            return
        }
        dispatch(nextDate());
    }

    return {
        isPrevDisabled,
        isNextDisabled,
        prev,
        next,
    }
}