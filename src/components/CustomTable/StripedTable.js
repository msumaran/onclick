import React from 'react'
import PropTypes from 'prop-types'
import { useTable, useSortBy, usePagination, useGlobalFilter } from 'react-table'

import TableFilter from './TableFilter'

import {
  Table,
  Button,
  CustomInput,
  FormGroup,
  Label
} from 'reactstrap'

const propTypes = {
  columns: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  loading: PropTypes.bool,
  defaultPageSize: PropTypes.number,
  defaultSorted: PropTypes.array
}

const defaultProps = {
  defaultPageSize: 10,
  defaultSorted: []
}

const StripedTable = ({ columns, data, loading, defaultPageSize, defaultSorted }) => {

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    setGlobalFilter,
    state: { pageIndex, pageSize, globalFilter }
  } = useTable(
    {
      columns,
      data,
      initialState: {
        pageSize: defaultPageSize,
        sortBy: defaultSorted
      }
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  )
  return (
    <React.Fragment>
      <TableFilter
        value={globalFilter}
        placeholder="Buscar..."
        onChange={setGlobalFilter}
      />
      <Table striped hover responsive {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                // Add the sorting props to control sorting. For this example
                // we can add them into the header props
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render('Header')}
                  {/* Add a sort direction indicator */}
                  <span>
                    {column.isSorted ? (
                      column.isSortedDesc ? (
                        <i className="cil-arrow-bottom"></i>
                      ) : (
                        <i className="cil-arrow-top"></i>
                      )
                    ) : null}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {!loading ? (
            data.length > 0 ? (
              page.map((row) => {
                prepareRow(row)
                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map((cell) => {
                      return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                    })}
                  </tr>
                )
              })
            ) : (
              <tr>
                <td align="center" colSpan="1000">
                  No se encontraron registros
                </td>
              </tr>
            )
          ) : (
            <tr>
              <td align="center" colSpan="1000">
                Cargando...
              </td>
            </tr>
          )}
        </tbody>
        <tfoot>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                // Add the sorting props to control sorting. For this example
                // we can add them into the header props
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render('Header')}
                  {/* Add a sort direction indicator */}
                  <span>
                    {column.isSorted ? (
                      column.isSortedDesc ? (
                        <i className="cil-arrow-bottom"></i>
                      ) : (
                        <i className="cil-arrow-top"></i>
                      )
                    ) : null}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </tfoot>
      </Table>
      <div className="rt-info">
        <FormGroup>
          <CustomInput
            id="pageSize"
            type="select"
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value))
            }}
          >
            {[10, 20, 30, 40, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Mostrar {pageSize}
              </option>
            ))}
          </CustomInput>
          <Label className="ml-2">
            Página {pageIndex + 1} al {pageOptions.length}
          </Label>
        </FormGroup>
      </div>
      <div className="rt-pagination btn-group">
        <Button color="primary" onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          <i className="icon-arrow-left"></i>
          <i className="icon-arrow-left"></i>
        </Button>
        <Button color="primary" onClick={() => previousPage()} disabled={!canPreviousPage}>
          <i className="icon-arrow-left"></i>
        </Button>
        <Button color="primary" onClick={() => nextPage()} disabled={!canNextPage}>
          <i className="icon-arrow-right"></i>
        </Button>
        <Button color="primary" onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          <i className="icon-arrow-right"></i>
          <i className="icon-arrow-right"></i>
        </Button>
      </div>
    </React.Fragment>
  )
}

StripedTable.propTypes = propTypes
StripedTable.defaultProps = defaultProps

export { StripedTable }
