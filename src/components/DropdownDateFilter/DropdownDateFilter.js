
import React, { useEffect, useRef, useState } from 'react'
import { ButtonDropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap'

import DatePicker from 'react-day-picker'

import moment from 'moment'

import 'react-day-picker/lib/style.css'
import './DropdownDateFilter.scss'

const DropdownDateFilter = (props) => {

    const dropdownRef = useRef(null)

    const [ showing, setShowing ] = useState(false)
    const [ showingCustom, setShowingCustom ] = useState(false)

    const [ fromDate, setFromDate ] = useState(moment())
    const [ toDate, setToDate ] = useState(moment())

    const todayDate = moment()

    const enableCustom = () => {

        setShowingCustom(true)
    }

    const disableCustom = () => {

        if (props.periods.includes(props.value) || props.value === '') {

            setShowingCustom(false)
        }

        setShowing(false)
    }

    const getPeriodName = (period) => {

        if (period === '') {

            return 'Todos'
        }

        switch (period) {
            case 'custom': return 'Personalizado'
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

    const setCustomPeriod = () => {

        const range = {
            from: fromDate.format('YYYY-MM-DD'),
            to: toDate.format('YYYY-MM-DD')
        }

        props.onChange('custom', range)

        setShowing(false)
    }

    const getActiveClassName = (selected) => {

        let className = 'dropdown-item'

        if (selected === props.value) {

            className += ' active'
        } else if (selected === 'custom' && showingCustom) {

            className += ' opened'
        }

        return className
    }

    const onFromDayClick = (day, { selected }) => {

        const _day = moment(day)

        setFromDate(selected ? undefined : _day)
    }

    const onToDayClick = (day, { selected }) => {

        const _day = moment(day)

        setToDate(selected ? undefined : _day)
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
                <div className="dropdown dropdown-date-filter"
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
                                <div className={`date-range-picker p-3 ${!showingCustom ? '' : 'flex-grow-1'}`}>
                                    <div className="picker-body">
                                        <div className="picker-container">
                                            <DatePicker
                                                initialMonth={todayDate.subtract(1, 'months').toDate()}
                                                selectedDays={[ fromDate.toDate() ]}
                                                onDayClick={onFromDayClick}
                                            />
                                        </div>
                                        <div className="picker-container">
                                            <DatePicker
                                                selectedDays={[ toDate.toDate() ]}
                                                onDayClick={onToDayClick}
                                            />
                                        </div>
                                    </div>
                                    <div className="picker-footer">
                                        <div className="footer-range">
                                            Desde el <strong>{fromDate.format('DD/MM/YYYY')}</strong>&nbsp;
                                            hasta el <strong>{toDate.format('DD/MM/YYYY')}</strong>
                                        </div>
                                        <div className="text-right">
                                            <button
                                                className="btn btn-secondary"
                                                onClick={() => disableCustom()}
                                            >
                                                Cancelar
                                            </button>
                                            <button
                                                className="btn btn-primary"
                                                onClick={() => setCustomPeriod()}
                                            >
                                                Aplicar
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                            <div className={showingCustom ? '' : 'flex-grow-1'}
                                style={{
                                    width: 158
                                }}
                            >
                                <button className={getActiveClassName('')}
                                    style={{
                                        width: 158
                                    }}
                                    onClick={() => changePeriod('')}
                                >
                                    {getPeriodName('')}
                                </button>
                                {props.periods.map((period) => (
                                    <button className={getActiveClassName(period)}
                                        onClick={() => changePeriod(period)}
                                    >
                                        {getPeriodName(period)}
                                    </button>
                                ))}
                                <button className={getActiveClassName('custom')}
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
