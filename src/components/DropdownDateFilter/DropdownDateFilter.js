
import React, { useState } from 'react'
import { ButtonDropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap'

const DropdownDateFilter = (props) => {

    const [ showing, setShowing ] = useState(false)
    const [ showCustom, setShowCustom ] = useState(false)

    const getPeriodName = (period) => {

        if (period === '') {

            return 'Todos'
        }

        switch (period) {
            case 'custom': return 'Custom'
            case '1d': return 'Hoy'
            case '7d': return 'Esta semana'
            case '30d': return 'Este mes'
            default: return ''
        }
    }

    const changePeriod = (period) => {

        props.onChange(period)
    }

    const getCheckStyle = (selected) => {

        const style = {}

        if (selected === props.value) {

            style.fontWeight = 'bold'
        }

        return style
    }

    return (
        <>
            <ButtonDropdown isOpen={showing} toggle={() => setShowing(!showing)}>
                <DropdownToggle caret>
                    {getPeriodName(props.value)}
                </DropdownToggle>
                <DropdownMenu right>
                    <DropdownItem onClick={() => changePeriod('')} style={getCheckStyle('')}>
                        {getPeriodName('')}
                    </DropdownItem>
                    {props.periods.map((period) => (
                        <DropdownItem
                            style={getCheckStyle(period)}
                            onClick={() => changePeriod(period)}
                        >
                            {getPeriodName(period)}
                        </DropdownItem>
                    ))}
                </DropdownMenu>
            </ButtonDropdown>
        </>
    )
}

export default DropdownDateFilter
