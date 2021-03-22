
import React from 'react'
import PropTypes from 'prop-types'

import TableFilter from './TableFilter'

const TableToolbar = (props) => {

    return (
        <div className="table-toolbar">
            <div className="table-toolbar-left">
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
