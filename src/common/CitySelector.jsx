import React , { useState, useMemo, useEffect, memo, useCallback }from 'react';
import classnames from 'classnames';
import PropType from 'prop-types'

import './CitySelector.css';
//className={['city-selector,(!show) && 'hidden'].filter(Boolean).join(' ')}
const AlphaIndex = memo(function AlphaIndex (props) {
    const {
        alpha,
        onClick,
    } =props

    return (
        <i className="city-index-item" onClick={() => onClick(alpha)}>
            {alpha}
        </i>
    )
});

AlphaIndex.propType = {
    alpha: PropType.string.isRequired,
    toAlpha: PropType.func.isRequired,
}

const alphabat = Array.from(new Array(26), (ele, index)=>{
    return String.fromCharCode(65 + index);
});

const CityItem = memo(function CityItem (props) {
    const {
        name,
        onSelect
    } = props
    return (
        <li className="city-li" onClick={ () => onSelect(name)}> 
            {name}
        </li>
    )
});

CityItem.propType = {
    name: PropType.string.isRequired,
    onSelect: PropType.func.isRequired,
}

const CitySection =  memo(function CitySection (props) {
    const {
        title,
        cities = [],
        onSelect,
    } = props

    return (
        <ul className="city-ul">
            <li className="city-li" key="title" data-cate={title}>
                {title}
            </li>
            {
                cities.map(city => {
                    return (
                        <CityItem 
                            key={city.name} 
                            name={city.name} 
                            onSelect={onSelect}
                        />
                    );
                })
            }
        </ul>
    )
}) 

CitySection.propType = {
    title: PropType.string.isRequired,
    cities: PropType.array,
    onSelect: PropType.func.isRequired,
}

const CityList = memo(function CityList (props) {
    const {
        sections,
        onSelect,
        toAlpha,
    } = props

    return (
        <div className="city-list">
            <div className="city-cate">
                {
                    sections.map( section => {
                        return (
                            <CitySection 
                                key={section.title}
                                title={section.title}
                                cities={section.citys}
                                onSelect={onSelect}
                            />
                        )
                    })
                }
            </div>
            <div className="city-index">
                {
                    alphabat.map( alpha => {
                        return <AlphaIndex key={alpha} alpha={alpha} onClick={toAlpha}/>
                    })
                }
            </div>
        </div>
    );
})

CityList.propType = {
    sections: PropType.array.isRequired,
    onSelect: PropType.func.isRequired,
    toAlpha: PropType.func.isRequired,
}

const CitySelector = memo(function CitySelector (props) {
    const {
        show,
        cityData,
        isLoading,
        onBack,
        fetchCityData,
        onSelect,
    } = props;
    const [searchKey, setSearchKey] = useState('');
    const key =useMemo(()=> searchKey.trim(),[searchKey]);

    useEffect(() => {
        if(!show || cityData || isLoading) {
            return
        }
        fetchCityData();
    },[show, cityData, isLoading])

    const toAlpha = useCallback(alpha => {
        document.querySelector(`[data-cate='${alpha}']`).scrollIntoView();
    },[]);

    const outputCitySections = () => {
        if(isLoading) {
            return <div>loading</div>
        }
        if(cityData) {
            return (
                <CityList 
                    sections={cityData.cityList}
                    onSelect={onSelect}
                    toAlpha={toAlpha}
                />
            )
        }
        return <div>error</div>
    }

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
            { outputCitySections() }
        </div>
    );
})

export default CitySelector

CitySelector.propType = {
    show: PropType.bool.isRequired,
    cityData: PropType.object,
    isLoadingm: PropType.bool.isRequired,
    onBack: PropType.func.isRequired,
    fetchCityData: PropType.func.isRequired,
    onSelect: PropType.func.isRequired,
}