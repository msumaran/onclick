
import React, {useState} from 'react'

import moment from 'moment'

import { useDispatch, useSelector } from 'react-redux'
import myContactsActions from 'redux/actions/myContactsActions'

import PermissionHelper from 'helpers/PermissionHelper'

import { StripedTable } from 'components/CustomTable'
import { useEffect } from 'react'
import { Button, Card, CardBody, CardHeader, Col, Row } from 'reactstrap'

import { SpinCircle } from 'components/Spin'
import reportAction from 'redux/actions/reportAction'

const MyContacts = () => {

    const dispatch = useDispatch()

    const my_permissions = useSelector((state) => state.accountReducer.permissions)
    const permission_helper = new PermissionHelper(my_permissions)

    const contacts = useSelector(state => state.myContactsReducer.contacts)
    const contactsLoaded = useSelector(state => state.myContactsReducer.loaded)
    const contactsReloading = useSelector(state => state.myContactsReducer.reloading)

    useEffect(() => {

        if (!contactsLoaded) {

            dispatch(myContactsActions.findAll())
        }

    }, [ contactsLoaded ])

    const [submitting, setSubmitting] = useState(false)

    return (
        <div className="animated fadeIn">
            <Row>
                <Col xs={12}>
                    <Card>
                        <CardHeader>
                            <strong>Gestor de Leads</strong>
                        </CardHeader>
                        <CardBody>
                            <div className="rt-wrapper">
                                <div className="rt-buttons">
                                    
                                </div>
                                {!permission_helper.validate('my_contacts', 'r') ? null : (
                                    <StripedTable
                                        columns={[
                                            {
                                                Header: 'Nombres',
                                                accessor: 'name'
                                            },
                                            {
                                                Header: 'Apellidos',
                                                accessor: 'lastname'
                                            },
                                            {
                                                Header: 'Email',
                                                accessor: 'email'
                                            },
                                            {
                                                Header: 'Estado',
                                                accessor: 'status'
                                            },
                                            // {
                                            //     Header: 'Landing',
                                            //     accessor: 'origin',
                                            //     Cell: ({ cell: { value } }) => (
                                            //         <>
                                            //             {value}
                                            //             &nbsp;
                                            //             <a href={value} target="_blank">
                                            //                 <i className="icons icon-link"></i>
                                            //             </a>
                                            //         </>
                                            //     )
                                            // },
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
                                        options={{
                                            toolbar: {
                                                refreshButton: {
                                                    enabled: true,
                                                    refreshing: contactsReloading,
                                                    autoDispatchInSeconds: 60,
                                                    dispatch: () => dispatch(myContactsActions.findAll(true))
                                                }, 
                                                leftButtons:[
                                                    (
                                                        <>
                                                         
                                                            <Button
                                                                color="primary"
                                                                onClick={() =>{
                                                                    setSubmitting(true)
                                                                    dispatch(reportAction.make('get_contacts')).then((res) => {
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
        </div>
    )
}

export default MyContacts
