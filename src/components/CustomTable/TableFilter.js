
import React from 'react'
import PropTypes from 'prop-types'

import {
    Input,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    FormGroup,
  } from 'reactstrap'

const TableFilter = (props) => {

    return (
      <div className="rt-filter ml-1">
        <FormGroup>
          <InputGroup>
            <Input
                className="table-filter-input"
              value={props.value}
              onChange={(e) => {
                props.onChange(e.target.value || undefined) // Set undefined to remove the filter entirely
              }}
              placeholder={props.placeholder}
            />
            <InputGroupAddon addonType="append">
              <InputGroupText className="table-filter-btn">
                <i className="icon-magnifier"></i>
              </InputGroupText>
            </InputGroupAddon>
          </InputGroup>
        </FormGroup>
      </div>
    )
}

TableFilter.propTypes = {
    value: PropTypes.string,
    placeholder: PropTypes.string,
    onChange: PropTypes.func.isRequired
}

TableFilter.defaultProps = {
    value: '',
    placeholder: '',
}

export default TableFilter
