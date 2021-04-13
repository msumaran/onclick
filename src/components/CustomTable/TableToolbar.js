
import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

import TableFilter from './TableFilter'

const TableToolbar = (props) => {

    const defaultOptions = {
        refreshButton: {
            enabled: false,
            classNames: 'btn btn-custom-default'
        },
        leftButtons: [],
        rightButtons: [],
    }

    const options = {
        refreshButton: Object.assign(defaultOptions.refreshButton, props.options.refreshButton),
        leftButtons: Object.assign(defaultOptions.leftButtons, props.options.leftButtons),
        rightButtons: Object.assign(defaultOptions.rightButtons, props.options.rightButtons),
    }


    const refresh_delay = options.refreshButton.autoDispatchInSeconds || 0

    const [ state, setState ] = useState({
        delay: refresh_delay,
    })

    const runDispatch = () => {

        setState({
            ...state,
            delay: refresh_delay,
        })

        options.refreshButton.dispatch()
    }

    const check_delay = () => {

        if (options.refreshButton.refreshing) {

            setState({
                ...state,
                delay: refresh_delay,
            })

            return
        }

        setTimeout(() => {

            const delay = state.delay

            if (delay === 0) {

                runDispatch()
            } else {

                setState({
                    ...state,
                    delay: delay - 1
                })
            }
        }, 1000)
    }

    useEffect(() => {

        if (refresh_delay) {

            check_delay()
        }
    }, [ refresh_delay, state.delay, options.refreshButton.refreshing ])

    return (
        <div className="table-toolbar">
            <div className="table-toolbar-left">
                {!options.leftButtons ? null : (
                    <>
                        {React.Children.map(options.leftButtons, (btn) => (
                            <>
                                {btn}
                            </>
                        ))}
                    </>
                )}
                {!options.refreshButton.enabled ? null : (
                    <button className={options.refreshButton.classNames}
                        onClick={() => runDispatch()}
                        disabled={options.refreshButton.refreshing}
                    >
                        {options.refreshButton.refreshing ? (
                            <>
                                <i className="icon-refresh"></i> Actualizando...
                            </>
                        ) : (
                            <>
                                <i className="icon-refresh"></i> Actualizar
                            </>
                        )}
                    </button>
                )}
            </div>
            <div className="table-toolbar-right">
                <TableFilter
                    value={props.filterCriteria}
                    placeholder="Buscar..."
                    onChange={props.onFilter}
                />
            </div>
        </div>
    )
}

TableToolbar.propTypes = {
    onFilter: PropTypes.func.isRequired
}

export default TableToolbar
