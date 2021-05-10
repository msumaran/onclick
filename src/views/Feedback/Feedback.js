/*eslint no-unused-vars: "off" */

import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Card, CardBody, CardHeader, Col, Row, Form, FormGroup, Label, Modal, ModalBody, ModalHeader } from 'reactstrap'

import PermissionHelper from 'helpers/PermissionHelper'
import { StripedTable } from 'components/CustomTable'

import FeedbackActions from 'redux/feedback.redux'

import { configApp } from 'helpers/config'
import { Link } from 'react-router-dom'

const moment = require('moment')

const Feedback = () => {

    const dispatch = useDispatch()

    const my_permissions = useSelector((state) => state.accountReducer.permissions)
    const permission_helper = new PermissionHelper(my_permissions)

    const feedback_result = useSelector(state => state.FeedbackReducer.result)
    const feedback_load_status = useSelector(state => state.FeedbackReducer.load_status)

    const [ showModal, setShowModal ] = useState(false)
    const [ feedbackRow, setFeedbackRow ] = useState({
        user: {}
    })

    const selectRow = (row) => {

        setFeedbackRow(row)

        setShowModal(true)
    }

    const getRowType = (row) => {

        switch (row.type) {
            case 'sugerencia': return 'Sugerencia'
            case 'problema': return 'Queja o problema'
            default: return ''
        }
    }

    const getRowDate = (date) => {

        return moment(date).format('DD/MM/YYYY H:mm a')
    }

    useEffect(() => {

        if (feedback_load_status === '') {

            dispatch(FeedbackActions.findAll())
        }
    }, [ feedback_load_status, dispatch ])

    return (
        <div className="animated fadeIn">
            <Row>
                <Col xs={12}>
                    <Card>
                        <CardHeader>
                            <strong>Feedback</strong>
                        </CardHeader>
                        <CardBody>
                            <div className="rt-wrapper">
                                {!permission_helper.validate('feedback', 'r') ? null : (
                                    <StripedTable
                                        columns={[
                                            { Header: 'Tipo', accessor: 'type', Cell: ({ row: { original } }) => getRowType(original) },
                                            { Header: 'Usuario', accessor: 'user.name' },
                                            { Header: 'Fecha de solicitud', accessor: 'createdAt', Cell: ({ cell: { value } }) =>  moment(value).format('DD/MM/YYYY h:mm a') },
                                            { Header: 'Acciones', width: 250, Cell: ({ row: { original } }) => (
                                                <>
                                                    <button className="btn btn-secondary" onClick={() => selectRow(original)}>
                                                        Leer
                                                    </button>
                                                </>
                                            )}
                                        ]}
                                        data={feedback_result}
                                        loading={feedback_load_status === 'loading'}
                                    />
                                )}
                            </div>
                        </CardBody>
                    </Card>
                </Col>
            </Row>

            <Modal size="lg" isOpen={showModal} toggle={() => setShowModal(!showModal)}>
                <ModalHeader toggle={() => setShowModal(false)}>Mensaje de feedback</ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup row>
                            <Label sm={3}>Fecha de mensaje</Label>
                            <Col sm={9}>
                                <input
                                    type="text"
                                    className="form-control-plaintext"
                                    defaultValue={getRowDate(feedbackRow.createdAt)}
                                    readOnly
                                />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label sm={3}>Url</Label>
                            <Col sm={9} style={{
                                paddingTop: 7
                            }}>
                                <Link to={feedbackRow.url} target="_blank">
                                    {configApp.websiteUrl + '/admin/#' + feedbackRow.url}
                                </Link>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label sm={3}>Usuario</Label>
                            <Col sm={9}>
                                <input
                                    type="text"
                                    className="form-control-plaintext"
                                    defaultValue={feedbackRow.user.name}
                                    readOnly
                                />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label sm={3}>Tipo de feedback</Label>
                            <Col sm={9}>
                                <input
                                    type="text"
                                    className="form-control-plaintext"
                                    defaultValue={getRowType(feedbackRow)}
                                    readOnly
                                />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label sm={3}>Mensaje</Label>
                            <Col sm={9}>
                                <textarea
                                    type="text"
                                    className="form-control-plaintext"
                                    defaultValue={feedbackRow.message}
                                    readOnly
                                    style={{
                                        resize: 'none'
                                    }}
                                ></textarea>
                            </Col>
                        </FormGroup>
                    </Form>
                </ModalBody>
            </Modal>
        </div>
    )
}

export default Feedback
