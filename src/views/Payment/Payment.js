import React, { useState, useEffect, useCallback, useMemo, Fragment } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Row, Col, Card, CardHeader, CardBody, Button, Badge } from 'reactstrap'
import moment from 'moment'

import { SpinCircle } from 'components/Spin'
import { confirm } from 'components/CustomModal/ModalConfirm'
import { StripedTable } from 'components/CustomTable'

import paymentAction from 'redux/actions/paymentAction'

import PermissionHelper from 'helpers/PermissionHelper'

const Payment = () => {

  const dispatch = useDispatch()

  const my_permissions = useSelector((state) => state.accountReducer.permissions)
  const permission_helper = new PermissionHelper(my_permissions)

  // const [openModeModal, setOpenModeModal] = useState(false) //FALSE(NEW) TRUE(EDIT
  const [loading, setLoading] = useState(true)

  // const [showClientCode, setClientCode] = useState(false)
  // const toggleClientCode = useCallback(() => {
  //   setOpenModeModal(true)
  //   setClientCode(!showClientCode)
  // }, [showClientCode])

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
      }
    ],
    [dispatch]
  )

  const data = useSelector((store) => store.paymentReducer.payments)

  const loaded = useSelector((store) => store.paymentReducer.loaded)

  const fetchPayments = useCallback(() => {
    dispatch(paymentAction.findAll()).then((status) => {
      console.log(status)
    })
  }, [dispatch])

  useEffect(() => {
    if (loaded) {
      setLoading(false)
    } else {
      fetchPayments()
    }
  }, [loaded, fetchPayments])

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

                {permission_helper.validate('user', 'r') ? (
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
                ) : null}
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>

      {/* <ClientCode
        show={showClientCode}
        dismiss={toggleClientCode}
        isEdit={openModeModal}
        /> */}

    </div>
  )
}

export default Payment
