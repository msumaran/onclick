/*eslint no-unused-vars: "off" */

import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import PermissionHelper from 'helpers/PermissionHelper'

import ActivationActions from 'redux/activations.redux'
import { Row, Col, Card, CardHeader, CardBody } from 'reactstrap'
import { StripedTable } from 'components/CustomTable'

const Activations = () => {

    const dispatch = useDispatch()

    const my_permissions = useSelector((state) => state.accountReducer.permissions)
    const permission_helper = new PermissionHelper(my_permissions)

    const activations_result = useSelector(state => state.ActivationsReducer.result)
    const activations_load_status = useSelector(state => state.ActivationsReducer.load_status)

    useEffect(() => {

        if (activations_load_status === '') {

            dispatch(ActivationActions.ActionFindAll())
        }
    }, [ activations_load_status, dispatch ])

    return (
        <div className="animated fadeIn">
            <Row>
                <Col xs={12}>
                    <Card>
                        <CardHeader>
                            <strong>Activaciones</strong>
                        </CardHeader>
                        <CardBody>
                            <div className="rt-wrapper">
                                {!permission_helper.validate('page_activation', 'r') ? null : (
                                    <StripedTable
                                        columns={[
                                            { Header: 'Plan', accessor: 'pack.name' },
                                            { Header: 'Nombres y apellidos', accessor: 'fullname' },
                                            { Header: 'Email', accessor: 'email' },
                                            { Header: 'Teléfono', accessor: 'phone' },
                                            { Header: 'Estado', accessor: 'isActive', Cell: ({ cell: { value } }) =>  value ? 'Activado' : 'Por activar'},
                                        ]}
                                        data={activations_result}
                                        defaultSorted={[
                                            { id: 'pack.name' }
                                        ]}
                                        loading={activations_load_status === 'loading'}
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

export default Activations
