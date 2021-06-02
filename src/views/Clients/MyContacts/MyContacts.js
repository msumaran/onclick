
import React, {useState} from 'react'

import moment from 'moment'

import { useDispatch, useSelector } from 'react-redux'
import myContactsActions from 'redux/actions/myContactsActions'

import PermissionHelper from 'helpers/PermissionHelper'

import { StripedTable } from 'components/CustomTable'
import { useEffect } from 'react'
import { Button, Card, CardBody, CardHeader, Col, Modal, ModalBody, ModalHeader, Row } from 'reactstrap'

import { SpinCircle } from 'components/Spin'
import reportAction from 'redux/actions/reportAction'

const MyContacts = () => {

    const dispatch = useDispatch()

    const my_permissions = useSelector((state) => state.accountReducer.permissions)
    const permission_helper = new PermissionHelper(my_permissions)

    const contacts = useSelector(state => state.myContactsReducer.contacts)
    const contactsLoading = useSelector(state => state.myContactsReducer.loading)
    const contactsLoaded = useSelector(state => state.myContactsReducer.loaded)
    const contactsReloading = useSelector(state => state.myContactsReducer.reloading)

    const [ showModal, setShowModal ] = useState(false)
    const [ selected, setSelected ] = useState({})

    useEffect(() => {

        if (!contactsLoaded) {

            dispatch(myContactsActions.findAll())
        }

    }, [ contactsLoaded, dispatch ])

    const [submitting, setSubmitting] = useState(false)

    const selectRow = (row) => {

        setSelected(row)

        setShowModal(true)
    }

    const resetModal = () => {

        setSelected({})

        setShowModal(false)
    }

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
                                            {
                                                Header: 'Fecha de registro',
                                                accessor: 'createdAt',
                                                Cell: ({ cell: { value } }) => moment(value).format('LLL')
                                            },
                                            {
                                                Header: 'Acciones',
                                                accessor: 'origin',
                                                Cell: ({ row: { original } }) => (
                                                    <button className="btn btn-secondary"
                                                        onClick={() => selectRow(original)}
                                                    >
                                                        Abrir
                                                    </button>
                                                )
                                            },
                                        ]}
                                        data={contacts}
                                        defaultSorted={[
                                            {
                                                id: 'createdAt',
                                                desc: true
                                            }
                                        ]}
                                        loading={contactsLoading}
                                        options={{
                                            toolbar: {
                                                refreshButton: {
                                                    enabled: true,
                                                    classNames: 'btn btn-secondary',
                                                    refreshing: contactsReloading,
                                                    autoDispatchInSeconds: 60,
                                                    dispatch: () => dispatch(myContactsActions.findAll(true))
                                                },
                                                leftButtons:[
                                                    (
                                                        <>

                                                            <Button
                                                                className="ml-1"
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

            <Modal isOpen={showModal} toggle={() => resetModal()}>
                <ModalHeader toggle={() => setShowModal(false)}>Información de lead</ModalHeader>
                <ModalBody>
                    <table className="table table-striped">
                        <tbody>
                            <tr>
                                <th>Nombres</th>
                                <td>{selected.name}</td>
                            </tr>
                            <tr>
                                <th>Apellidos</th>
                                <td>{selected.lastname}</td>
                            </tr>
                            <tr>
                                <th>Email</th>
                                <td>{selected.email}</td>
                            </tr>
                            <tr>
                                <th>Estado</th>
                                <td>{selected.status}</td>
                            </tr>
                            <tr>
                                <th>Mensaje</th>
                                <td>{selected.message}</td>
                            </tr>
                        </tbody>
                    </table>
                </ModalBody>
            </Modal>
        </div>
    )
}

export default MyContacts
