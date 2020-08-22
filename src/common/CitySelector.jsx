import React , { useState, useMemo }from 'react';
import classnames from 'classnames';
import PropType from 'prop-types'

import './CitySelector.css';
//className={['city-selector,(!show) && 'hidden'].filter(Boolean).join(' ')}

export default function CitySelector (props) {
    const {
        show,
        cityData,
        isLoadingm,
        onBack,
    } = props;
    const [searchKey, setSearchKey] = useState('');
    const key =useMemo(()=> searchKey.trim(),[searchKey]);

    return (
        <div className={classnames('city-selector', { hidden:!show,})}>
            <div className="city-search">
                <div className="search-back" onClick={()=> onBack()}> 
                    <svg width="42" height="42">
                        <polyline 
                            points="25,13 16,21 25,29"
                            stroke="#fff"
                            strokeWidth="2"
                            fill="none"
                        />
                    </svg>
                </div>
                <div className="search-input-wrapper">
                    <input 
                        type="text"
                        value={searchKey}
                        className="search-input"
                        placeholder="城市，车站的中文或拼音"
                        onChange={ e => setSearchKey(e.target.value)}
                    />
                </div>
                <i className={classnames('search-clean', { hidden : key.length ===0 })} onClick={ ()=> setSearchKey('')}>
                    &#xf063;
                </i>
            </div>
        </div>
    );
}


CitySelector.propType = {
    show: PropType.bool.isRequired,
    cityData: PropType.object,
    isLoadingm: PropType.bool.isRequired,
    onBack: PropType.func.isRequired,
}