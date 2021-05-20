/*eslint no-unused-vars: "off" */

import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Button, Card, CardBody, CardHeader, Col, Row, Form, FormGroup, Label, Modal, ModalBody, ModalHeader } from 'reactstrap'

import moment from 'moment'

import { useDispatch, useSelector } from 'react-redux'

import { SpinCircle } from 'components/Spin'
import { StripedTable } from 'components/CustomTable'

import { configApp } from 'helpers/config'

import FeedbackActions from 'redux/feedback.redux'
import reportAction from 'redux/actions/reportAction'

import PermissionHelper from 'helpers/PermissionHelper'

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

    const feedback_reloading = useSelector(state => state.FeedbackReducer.reloading)

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

    const [submitting, setSubmitting] = useState(false)

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

                                        options={{
                                            toolbar: {
                                                refreshButton: {
                                                    enabled: true,
                                                    classNames: 'btn btn-secondary',
                                                    refreshing: feedback_reloading,
                                                    autoDispatchInSeconds: 60,
                                                    dispatch: () => dispatch(FeedbackActions.reloadAll())
                                                },
                                                leftButtons:[
                                                    (
                                                        <>

                                                            <Button
                                                                className="ml-1"
                                                                color="primary"
                                                                onClick={() =>{
                                                                    setSubmitting(true)
                                                                    dispatch(reportAction.make('get_feedback')).then((res) => {
                                                                        setSubmitting(false)

                                                                        if (res.path) window.open(res.path)
                                                                        else window.open(res)
                                                                    })
                                                                }}
                                                            >
                                                                {submitting ? (
                                                                <>
                                                                    <SpinCircle /> Procesando...
                                                                </>
                                                                ) : (
                                                                <>
                                                                    <i className="icon-cloud-download"></i> Exportar
                                                                </>
                                                                )}
                                                            </Button>

                                                        </>
                                                    )
                                                ]
                                            }
                                        }}

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
