
import React, { useEffect, useState } from 'react'

const TableRefresher = (props) => {

    const refresh_delay = props.autoDispatchInSeconds || 0

    const [ state, setState ] = useState({
        delay: refresh_delay,
    })

    const runDispatch = () => {

        setState({
            ...state,
            delay: refresh_delay,
        })

        props.dispatch()
    }

    const check_delay = () => {

        if (props.refreshing) {

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
    }, [ refresh_delay, state.delay, props.refreshing ])

    return (
        <>
            <button className={props.classNames}
                onClick={() => runDispatch()}
                disabled={props.refreshing}
            >
                {props.refreshing ? (
                    <>
                        <i className="icon-refresh"></i> Actualizando...
                    </>
                ) : (
                    <>
                        <i className="icon-refresh"></i> Actualizar
                    </>
                )}
            </button>
        </>
    )
}

export default TableRefresher
