/*eslint no-unused-vars: "off" */

import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Card, CardBody, CardHeader, Col, Row } from 'reactstrap'

import PermissionHelper from 'helpers/PermissionHelper'
import { StripedTable } from 'components/CustomTable'

import FeedbackActions from 'redux/feedback.redux'

const Feedback = () => {

    const dispatch = useDispatch()

    const my_permissions = useSelector((state) => state.accountReducer.permissions)
    const permission_helper = new PermissionHelper(my_permissions)

    const feedback_result = useSelector(state => state.FeedbackReducer.result)
    const feedback_load_status = useSelector(state => state.FeedbackReducer.load_status)

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
                                            { Header: 'Tipo', accessor: 'type' },
                                            { Header: 'Usuario', accessor: 'user.fullname' },
                                            { Header: 'Acciones', width: 250, Cell: ({ row: { original } }) => (
                                                <>
                                                </>
                                            )}
                                        ]}
                                        data={feedback_result}
                                        defaultSorted={[
                                            { id: 'type' }
                                        ]}
                                        loading={feedback_load_status === 'loading'}
                                    />
                                )}
                            </div>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default Feedback
