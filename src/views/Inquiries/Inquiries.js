/*eslint no-unused-vars: "off" */

import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import PermissionHelper from 'helpers/PermissionHelper'

import InquiryActions from 'redux/inquiries.redux'
import { Row, Col, Card, CardHeader, CardBody } from 'reactstrap'
import { StripedTable } from 'components/CustomTable'

const Inquiries = () => {

    const dispatch = useDispatch()

    const my_permissions = useSelector((state) => state.accountReducer.permissions)
    const permission_helper = new PermissionHelper(my_permissions)

    const inquiries_result = useSelector(state => state.InquiriesReducer.result)
    const inquiries_load_status = useSelector(state => state.InquiriesReducer.load_status)

    useEffect(() => {

        if (inquiries_load_status === '') {

            dispatch(InquiryActions.ActionFindAll())
        }
    }, [ inquiries_load_status, dispatch ])

    return (
        <div className="animated fadeIn">
            <Row>
                <Col xs={12}>
                    <Card>
                        <CardHeader>
                            <strong>Consultas</strong>
                        </CardHeader>
                        <CardBody>
                            <div className="rt-wrapper">
                                {!permission_helper.validate('page_contact', 'r') ? null : (
                                    <StripedTable
                                        columns={[
                                            { Header: 'Nombre', accessor: 'name' },
                                            { Header: 'Apellidos', accessor: 'lastname' },
                                            { Header: 'Email', accessor: 'email' },
                                            { Header: 'Teléfono', accessor: 'phone' },
                                            { Header: 'Actividad', accessor: 'activity' },
                                            { Header: 'Mensaje', accessor: 'message' },
                                            { Header: 'Estado', accessor: 'isActive', Cell: ({ cell: { value } }) =>  value ? 'Activado' : 'Por activar'},
                                        ]}
                                        data={inquiries_result}
                                        defaultSorted={[
                                            { id: 'name' }
                                        ]}
                                        loading={inquiries_load_status === 'loading'}
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

export default Inquiries
