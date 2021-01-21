import React from 'react'
import PropTypes from 'prop-types'

const propTypes = {
  children: PropTypes.node
}

const defaultProps = {}

const Footer = () => {
  return (
    <React.Fragment>
      <span>&copy; 2021 OnClick.</span>
      <span className="ml-auto">Version 1.0.0</span>
    </React.Fragment>
  )
}

Footer.propTypes = propTypes
Footer.defaultProps = defaultProps

export default Footer
