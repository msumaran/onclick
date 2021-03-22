
import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

import TableFilter from './TableFilter'

const TableToolbar = (props) => {

    const refreshButton = props.options.refreshButton

    const refresh_delay = refreshButton.autoDispatchInSeconds || 0

    const [ state, setState ] = useState({
        delay: refresh_delay,
    })

    const runDispatch = () => {

        setState({
            ...state,
            delay: refresh_delay,
        })

        refreshButton.dispatch()
    }

    const check_delay = () => {

        if (refreshButton.refreshing) {

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
    }, [ refresh_delay, state.delay, refreshButton.refreshing ])

    return (
        <div className="table-toolbar">
            <div className="table-toolbar-left">
                {!refreshButton ? null : (
                    <button className="btn btn-custom-default"
                        onClick={() => runDispatch()}
                        disabled={refreshButton.refreshing}
                    >
                        {refreshButton.refreshing ? (
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
                {!props.options.leftButtons ? null : (
                    <>
                        {React.Children.map(props.options.leftButtons, (btn) => (
                            <>
                                {btn}
                            </>
                        ))}
                    </>
                )}
            </div>
            <div className="table-toolbar-right">
                <TableFilter
                    value={props.value}
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
