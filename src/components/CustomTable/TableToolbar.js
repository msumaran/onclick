
import React from 'react'
import PropTypes from 'prop-types'

import TableFilter from './TableFilter'
import DropdownDateFilter from 'components/DropdownDateFilter/DropdownDateFilter'
import TableRefresher from './TableRefresher'

const TableToolbar = (props) => {

    const defaultOptions = {
        refreshButton: {
            enabled: false,
            classNames: 'btn btn-custom-default'
        },
        dateFilter: {
            enabled: false,
            classNames: 'btn btn-custom-default'
        },
        leftButtons: [],
        rightButtons: [],
    }

    const options = {
        refreshButton: Object.assign(defaultOptions.refreshButton, props.options.refreshButton),
        dateFilter: Object.assign(defaultOptions.dateFilter, props.options.dateFilter),
        leftButtons: Object.assign(defaultOptions.leftButtons, props.options.leftButtons),
        rightButtons: Object.assign(defaultOptions.rightButtons, props.options.rightButtons),
    }

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
                    <>
                        <TableRefresher
                            classNames={options.refreshButton.classNames}
                            autoDispatchInSeconds={options.refreshButton.autoDispatchInSeconds}
                            dispatch={() => options.refreshButton.dispatch()}
                            refreshing={options.refreshButton.refreshing}
                        />
                    </>
                )}
            </div>
            <div className="table-toolbar-right">
                {!options.rightButtons ? null : (
                    <>
                        {React.Children.map(options.rightButtons, (btn) => (
                            <>
                                {btn}
                            </>
                        ))}
                    </>
                )}
                {!options.dateFilter.enabled ? null : (
                    <DropdownDateFilter
                        periods={options.dateFilter.periods}
                        value={options.dateFilter.value}
                        onChange={options.dateFilter.onChange}
                    />
                )}
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
