/*eslint no-unused-vars: "off" */

import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import PermissionHelper from 'helpers/PermissionHelper'

import ActivationActions from 'redux/activations.redux'
import { Row, Col, Card, CardHeader, CardBody, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, ModalFooter } from 'reactstrap'
import { StripedTable } from 'components/CustomTable'

const defRow = {
    pack: '',
    fullname: '',
    email: '',
    phone: '',
    dni: '',
    address: ''
}

const Activations = () => {

    const dispatch = useDispatch()

    const my_permissions = useSelector((state) => state.accountReducer.permissions)
    const permission_helper = new PermissionHelper(my_permissions)

    const activations_result = useSelector(state => state.ActivationsReducer.result)
    const activations_load_status = useSelector(state => state.ActivationsReducer.load_status)

    const [ showModal, setShowModal ] = useState(false)
    const [ selected, setSelected ] = useState(defRow)

    useEffect(() => {

        if (activations_load_status === '') {

            dispatch(ActivationActions.findAll())
        }
    }, [ activations_load_status, dispatch ])

    const selectRow = (row) => {

        const data = {
            activationId: row.id,
            pack: row.pack.name,
            identification: '',
            name: row.fullname,
            lastname: row.fullname,
            address: '',
            phone: row.phone,
            born: '',
            email: row.email,
        }

        setSelected(data)

        setShowModal(true)
    }

    const resetModal = () => {

        setSelected(defRow)

        setShowModal(false)
    }

    const createUser = () => {

        if (selected.dni === '') {

            alert('Ingresa el dni')
            return
        }

        if (selected.address === '') {

            alert('Ingresa la dirección')
            return
        }

        dispatch(ActivationActions.createUser(selected))
    }

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
                                            { Header: 'Estado', accessor: 'isActive', Cell: ({ cell: { value } }) =>  value ? 'Activado' : 'Por activar' },
                                            { Header: 'Acciones', width: 250, Cell: ({ row: { original } }) => (
                                                <>
                                                    <button className="btn btn-secondary" onClick={() => selectRow(original)}>
                                                        {/* <i className="nav-icon oc oc-users"></i>  */}
                                                        Registrar usuario
                                                    </button>
                                                </>
                                            )}
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

            <Modal isOpen={showModal} toggle={() => setShowModal(!showModal)}>
                <ModalHeader toggle={() => setShowModal(false)}>Registrar nuevo usuario</ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup row>
                            <Label sm={4}>Plan</Label>
                            <Col sm={8}>
                                <input
                                    type="text"
                                    className="form-control"
                                    defaultValue={selected.pack}
                                    readOnly
                                />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label sm={4}>Nombres</Label>
                            <Col sm={8}>
                                <input
                                    type="text"
                                    className="form-control"
                                    defaultValue={selected.name}
                                    onChange={(e) => setSelected({ ...selected, name: e.currentTarget.value })}
                                />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label sm={4}>Apellidos</Label>
                            <Col sm={8}>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={selected.lastname}
                                    onChange={(e) => setSelected({ ...selected, lastname: e.currentTarget.value })}
                                />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label sm={4}>Email</Label>
                            <Col sm={8}>
                                <input
                                    type="text"
                                    className="form-control"
                                    defaultValue={selected.email}
                                    readOnly
                                />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label sm={4}>Fecha de nacimiento</Label>
                            <Col sm={4}>
                                <input
                                    type="date"
                                    className="form-control"
                                    value={selected.born}
                                    onChange={(e) => setSelected({ ...selected, born: e.currentTarget.value })}
                                />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label sm={4}>Teléfono</Label>
                            <Col sm={4}>
                                <input
                                    type="text"
                                    className="form-control"
                                    defaultValue={selected.phone}
                                    readOnly
                                />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label sm={4}>DNI</Label>
                            <Col md={4} sm={9}>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={selected.identification}
                                    onChange={(e) => setSelected({ ...selected, identification: e.currentTarget.value })}
                                />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label sm={4}>Dirección</Label>
                            <Col sm={8}>
                                <textarea
                                    type="text"
                                    className="form-control"
                                    value={selected.address}
                                    onChange={(e) => setSelected({ ...selected, address: e.currentTarget.value })}
                                    rows="3"
                                ></textarea>
                            </Col>
                        </FormGroup>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <button className="btn btn-secondary" onClick={() => resetModal()}>
                        Cancelar
                    </button>
                    <button className="btn btn-primary" onClick={() => createUser()}>
                        Crear usuario
                    </button>
                </ModalFooter>
            </Modal>
        </div>
    )
}

export default Activations
