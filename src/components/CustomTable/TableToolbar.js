
import React from 'react'
import PropTypes from 'prop-types'

import TableFilter from './TableFilter'

const TableToolbar = (props) => {

    const refreshButton = props.options.refreshButton

    return (
        <div className="table-toolbar">
            <div className="table-toolbar-left">
                {!refreshButton ? null : (
                    <button className="btn btn-custom-default" onClick={() => refreshButton.dispatch()}>
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
