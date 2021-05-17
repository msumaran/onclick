
import React, { useEffect, useState } from 'react'

import moment from 'moment'

const YearMonthForm = (props) => {

    const years_limit = props.years_limit ?? 5

    const [ years, setYears ] = useState([])
    const [ months, setMonths ] = useState([])
    const [ selectedYear, setSelectedYear ] = useState(moment().year())
    const [ selectedMonth, setSelectedMonth ] = useState(moment().format('YYYY-MM'))

    const onChange = (month) => {

        const date = moment(month, 'YYYY-MM')

        props.onChange(date.toDate())
    }

    const updateYear = (year) => {

        setSelectedYear(year)

        onChange(year + '-12')
    }

    const updateMonth = (month) => {

        setSelectedMonth(month)

        onChange(month)
    }

    useEffect(() => {

        const date = moment(props.date)

        setSelectedYear(date.year())
        setSelectedMonth(date.format('YYYY-MM'))

        const getYears = () => {

            const years = []

            for (let i = 0; i < years_limit; i += 1) {

                years.push(moment().subtract(i, 'years'))
            }

            return years
        }

        const getYearMonths = () => {

            const this_year = date.year() === moment().year()

            let month = moment()

            if (!this_year) {

                month = moment().year(date.year()).month(11)
            }

            const months = []

            while(month.year() === date.year()) {

                months.push(month.clone())

                month.subtract(1, 'month')
            }

            return months
        }

        setYears(getYears())
        setMonths(getYearMonths())

    }, [ props.date ])

    return (
        <>
            <div className="DayPicker-Caption">
                <select
                    value={selectedYear}
                    onChange={(e) => updateYear(e.currentTarget.value)}
                >
                    {years.map((year) => (
                        <option key={year.format('YYYY')} value={year.format('YYYY')}>
                            {year.format('YYYY')}
                        </option>
                    ))}
                </select>
                <select
                    value={selectedMonth}
                    onChange={(e) => updateMonth(e.currentTarget.value)}
                >
                    {months.map((month) => (
                        <option key={month.format('YYYY-MM')}
                            value={month.format('YYYY-MM')}
                        >
                            {month.format('MMMM')}
                        </option>
                    ))}
                </select>
            </div>
        </>
    )
}

export default YearMonthForm
