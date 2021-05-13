
import React, { useEffect, useRef, useState } from 'react'
import { ButtonDropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap'

import DatePicker from '@trendmicro/react-datepicker'

import moment from 'moment'

const DropdownDateFilter = (props) => {

    const dropdownRef = useRef(null)

    const [ showing, setShowing ] = useState(false)
    const [ showingCustom, setShowingCustom ] = useState(false)

    const [ fromDate, setFromDate ] = useState(moment().format('YYYY-MM-DD'))
    const [ toDate, setToDate ] = useState(moment().format('YYYY-MM-DD'))

    const today = moment().format('YYYY-MM-DD')

    const getCustomRange = () => {

    }

    const enableCustom = () => {

        setShowingCustom(true)
    }

    const getPeriodName = (period) => {

        if (period === '') {

            return 'Todos'
        }

        switch (period) {
            case 'custom': return 'Custom'
            case 'today': return 'Hoy'
            case 'this-week': return 'Esta semana'
            case 'this-month': return 'Este mes'
            case 'this-year': return 'Este año'
            default: return ''
        }
    }

    const changePeriod = (period) => {

        props.onChange(period)

        setShowingCustom(false)

        setShowing(false)
    }

    const getCheckStyle = (selected) => {

        const style = {}

        if (selected === props.value) {

            style.fontWeight = 'bold'
        }

        return style
    }

    useEffect(() => {

        const handleClickOutside = (e) => {

            if (dropdownRef.current &&!dropdownRef.current.contains(e.target)) {

                setShowing(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)

        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [ dropdownRef ])

    return (
        <>
            <div className="btn-group">
                <div className="dropdown"
                    ref={dropdownRef}
                >
                    <button className="btn btn-secondary dropdown-toggle"
                        onClick={() => setShowing(true)}
                    >
                        {getPeriodName(props.value)}
                    </button>
                    <div className={`dropdown-menu dropdown-menu-right ${!showing ? '' : 'show'}`}>
                        <div className="d-flex flex-row justify-content-start">
                            {!showingCustom ? null : (
                                <div className={!showingCustom ? '' : 'flex-grow-1'}>
                                    <div>
                                        <DatePicker
                                            date={today}
                                            maxDate={today}
                                            onSelect={() => null}
                                        />
                                    </div>
                                    <div>
                                        <DatePicker
                                            date={today}
                                            maxDate={today}
                                            onSelect={() => null}
                                        />
                                    </div>
                                </div>
                            )}
                            <div className={showingCustom ? '' : 'flex-grow-1'}
                                style={{
                                    width: 158
                                }}
                            >
                                <button className="dropdown-item"
                                    style={{
                                        width: 158
                                    }}
                                    onClick={() => changePeriod('')}
                                >
                                    {getPeriodName('')}
                                </button>
                                {props.periods.map((period) => (
                                    <button className="dropdown-item"
                                        style={getCheckStyle(period)}
                                        onClick={() => changePeriod(period)}
                                    >
                                        {getPeriodName(period)}
                                    </button>
                                ))}
                                <button className="dropdown-item"
                                    onClick={() => enableCustom()}
                                >
                                    {getPeriodName('custom')}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DropdownDateFilter
