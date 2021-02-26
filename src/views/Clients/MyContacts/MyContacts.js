
import React from 'react'

import moment from 'moment'

import { useDispatch, useSelector } from 'react-redux'
import myContactsActions from 'redux/actions/myContactsActions'

import PermissionHelper from 'helpers/PermissionHelper'

import { StripedTable } from 'components/CustomTable'
import { useEffect } from 'react'
import { Card, CardBody, CardHeader, Col, Row } from 'reactstrap'

const MyContacts = () => {

    const dispatch = useDispatch()

    const my_permissions = useSelector((state) => state.accountReducer.permissions)
    const permission_helper = new PermissionHelper(my_permissions)

    const contacts = useSelector(state => state.myContactsReducer.contacts)
    const contactsLoaded = useSelector(state => state.myContactsReducer.loaded)

    useEffect(() => {

        if (!contactsLoaded) {

            dispatch(myContactsActions.findAll())
        }

    }, [ contactsLoaded ])

    return (
        <div className="animated fadeIn">
            <Row>
                <Col xs={12}>
                    <Card>
                        <CardHeader>
                            <strong>Mis contactos</strong>
                        </CardHeader>
                        <CardBody>
                            <div className="rt-wrapper">
                                <div className="rt-buttons">

                                </div>
                                {!permission_helper.validate('my_contacts', 'r') ? null : (
                                    <StripedTable
                                        columns={[
                                            {
                                                Header: 'Nombres y apellidos',
                                                accessor: 'fullname'
                                            },
                                            {
                                                Header: 'Email',
                                                accessor: 'email'
                                            },
                                            {
                                                Header: 'Landing',
                                                accessor: 'origin',
                                            },
                                            {
                                                Header: 'Fecha de registro',
                                                accessor: 'startAt',
                                                Cell: ({ cell: { value } }) => moment(value).format('LLL')
                                            },
                                        ]}
                                        data={contacts}
                                        defaultSorted={[
                                            {
                                                id: 'createdAt',
                                                desc: true
                                            }
                                        ]}
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

export default MyContacts
