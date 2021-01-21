import React from 'react'
import PropTypes from 'prop-types'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap'
import { confirmable, createConfirmation } from 'react-confirm'

const propTypes = {
  proceedLabel: PropTypes.string,
  cancelLabel: PropTypes.string,
  title: PropTypes.string,
  confirmation: PropTypes.string,
  show: PropTypes.bool,
  proceed: PropTypes.func, // called when ok button is clicked.
  cancel: PropTypes.func, // called when cancel button is clicked.
  dismiss: PropTypes.func, // called when backdrop is clicked or escaped.
  enableEscape: PropTypes.bool
}

const defaultProps = {
  title: 'Confirm'
}

const Confirmation = (props) => {
  const { proceedLabel, cancelLabel, title, confirmation, show, proceed, dismiss, cancel, enableEscape = true } = props

  console.log('props', props)

  return (
    <Modal isOpen={show} toggle={dismiss} backdrop={enableEscape ? true : 'static'} keyboard={enableEscape} centered>
      <ModalHeader toggle={dismiss}>{title}</ModalHeader>
      <ModalBody>{confirmation}</ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={proceed}>
          {proceedLabel}
        </Button>{' '}
        <Button color="secondary" onClick={cancel}>
          {cancelLabel}
        </Button>
      </ModalFooter>
    </Modal>
  )
}

Confirmation.propTypes = propTypes
Confirmation.defaultProps = defaultProps

export function confirm(title, confirmation, proceedLabel = 'OK', cancelLabel = 'Cancel', options = {}) {
  return createConfirmation(confirmable(Confirmation))({
    title,
    confirmation,
    proceedLabel,
    cancelLabel,
    ...options
  })
}
