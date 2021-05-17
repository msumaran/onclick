
import React, { useEffect, useRef, useState } from 'react'

import moment from 'moment'
import MomentLocaleUtils from 'react-day-picker/moment'
import 'moment/locale/es'

import DayPicker from 'react-day-picker'
import YearMonthForm from '../DropdownDateFilter/YearMonthForm'

import 'react-day-picker/lib/style.css'

const InputDatePicker = (props) => {

    const ddRef = useRef(null)

    const [ showMenu, setShowMenu ] = useState(false)

    const [ month, setMonth ] = useState(moment())
    const [ day, setDay ] = useState(moment())

    const getDate = () => {

        if (!day.isValid()) {

            return 'dd/mm/aaaa'
        }

        return day.format('DD/MM/YYYY')
    }

    const onDayClick = (day) => {

        setDay(moment(day))
        setShowMenu(false)
        props.onChange(moment(day).format('YYYY-MM-DD'))
    }

    const onYearMonthChange = (date) => {

        setMonth(moment(date))
    }

    useEffect(() => {

        setDay(moment(props.value, 'YYYY-MM-DD'))
    }, [ props.value ])

    useEffect(() => {

        const handleClickOutside = (e) => {

            if (ddRef.current &&!ddRef.current.contains(e.target)) {

                setShowMenu(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)

        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [ ddRef ])

    return (
        <>
            <div className="dropdown"
                ref={ddRef}
            >
                <button className={props.className}
                    style={{
                        position: 'relative',
                        textAlign: 'left',
                    }}
                    onClick={(e) => {
                        e.preventDefault()

                        setShowMenu(!showMenu)
                    }}
                >
                    {getDate()}
                    <div style={{
                        position: 'absolute',
                        top: 6,
                        right: 16,
                        bottom: 0,
                        color: 'black'
                    }}>
                        <i className="oc oc-calendar"></i>
                    </div>
                </button>
                <div className={`dropdown-menu ${showMenu && 'show'}`}>
                    <DayPicker
                        month={month.toDate()}
                        selectedDays={[ day.toDate() ]}
                        onDayClick={onDayClick}
                        localeUtils={MomentLocaleUtils}
                        locale='es'
                        captionElement={({ date, localeUtils }) => (
                            <YearMonthForm
                                years_limit={100}
                                date={date}
                                localeUtils={localeUtils}
                                onChange={(date) => onYearMonthChange(date)}
                            />
                        )}
                    />
                </div>
            </div>
        </>
    )
}

export default InputDatePicker
