import React, { useState, useEffect, useCallback, useMemo } from 'react'
import { Redirect } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Row, Col, Card, CardHeader, CardBody, Form, FormGroup, Label, Modal, ModalBody, ModalHeader, Table} from 'reactstrap'
import moment from 'moment'

import { StripedTable } from 'components/CustomTable'

import paymentAction from 'redux/actions/paymentAction'

import PermissionHelper from 'helpers/PermissionHelper'

const Payment = () => {

  const dispatch = useDispatch()

  const my_permissions = useSelector((state) => state.accountReducer.permissions)
  const permission_helper = new PermissionHelper(my_permissions)

  const [loading, setLoading] = useState(true)

  const [ rowSelected, setRowSelected ] = useState({})

  const [ showModal, setShowModal ] = useState(false)
  const [ showInfo, setShowInfo ] = useState([])
  const getRowDate = (date) => {
    return moment(date).format('DD/MM/YYYY H:mm a')
  }

  const columns = useMemo(
    () => [
      {
        Header: 'Usuario',
        accessor: 'username'
      },
      {
        Header: 'Pack',
        accessor: 'pack.name'
      },
      {
        Header: 'Inicia',
        accessor: 'startAt',
        Cell: ({ cell: { value } }) => moment(value).format('LLL')
      },
      {
        Header: 'Termina',
        accessor: 'endAt',
        Cell: ({ cell: { value } }) => moment(value).format('LLL')
      },
      { Header: 'Acciones', width: 250, Cell: ({ row: { original } }) => (
        <>
            <button className="btn btn-secondary" onClick={() => selectRow(original)}>
                Ver historial
            </button>
        </>
      )}
    ], []
  )

  const data = useSelector((store) => store.paymentReducer.payments)
  const paymentsinfo = useSelector((store) => store.paymentReducer.paymentsinfo)

  const loaded = useSelector((store) => store.paymentReducer.loaded)

  const fetchPayments = useCallback(() => {
    dispatch(paymentAction.findAll()).then((status) => {
      console.log(status)
    })
  }, [dispatch])

  const selectRow = (row) => {
    setRowSelected(row);
    dispatch(paymentAction.findByUserId(row.username_id)).then((status) => {
      setShowModal(true);
    },[dispatch, paymentsinfo, showInfo])
  }

  useEffect(() => {
      setShowInfo(paymentsinfo)
  }, [paymentsinfo, setShowInfo])

  useEffect(() => {
    if (loaded) {
      setLoading(false)
    } else {
      fetchPayments()
    }
  }, [loaded, fetchPayments])

  if (!permission_helper.validate('payment', 'r')) {

    return <Redirect to='/' />
  }

  return (
    <div className="animated fadeIn">
      <Row>
        <Col xs={12}>
          <Card>
            <CardHeader>
              <strong>Pagos</strong>
            </CardHeader>
            <CardBody>
              <div className="rt-wrapper">
                <StripedTable
                  columns={columns}
                  data={data}
                  defaultSorted={[
                    {
                      id: 'createdAt',
                      desc: true
                    }
                  ]}
                  loading={loading}
                />
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>

      <Modal size="lg" isOpen={showModal} toggle={() => setShowModal(!showModal)}>
          <ModalHeader toggle={() => setShowModal(false)}>{ rowSelected.username } - Historial de pagos</ModalHeader>
          <ModalBody>
              <Form>

                  <Table striped bordered hover size="sm">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Paquete</th>
                        <th>Inicio</th>
                        <th>Fin</th>
                      </tr>
                    </thead>
                    <tbody>

                    {showInfo.map((item, index) => (
                        <tr>
                          <td>{ index + 1 }</td>
                          <td>{ item.pack.name}</td>
                          <td>{ getRowDate(item.startAt) }</td>
                          <td>{ getRowDate(item.endAt) }</td>
                        </tr>
                    ))}

                    </tbody>
                  </Table>

              </Form>
          </ModalBody>
      </Modal>

    </div>
  )
}

export default Payment
