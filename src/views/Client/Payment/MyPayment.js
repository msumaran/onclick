import React, { useState, useEffect, useCallback, useMemo, Fragment } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Row, Col, Card, CardHeader, CardBody, Button, Badge } from 'reactstrap'
import moment from 'moment'

import { SpinCircle } from 'components/Spin'
import { confirm } from 'components/CustomModal/ModalConfirm'
import { StripedTable } from 'components/CustomTable'

import paymentAction from 'redux/actions/paymentAction' 

// import ClientCode from './ClientCode' 
import MyPaymentForm from './MyPaymentForm' 

import { PermssionHelper } from 'helpers/permission'

const MyPayment = () => {

  const [openModeModal, setOpenModeModal] = useState(false) //FALSE(NEW) TRUE(EDIT 
  const [loading, setLoading] = useState(true)
 
  const [showPaymentForm, setPaymentForm] = useState(false)
  const toggleNewPayment = useCallback(() => {
    setOpenModeModal(false)
    setPaymentForm(!showPaymentForm)
  }, [showPaymentForm])
  
  const dispatch = useDispatch()
  const columns = useMemo(
    () => [ 
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
    // [dispatch, toggleClientCode, PermssionHelper]
    [dispatch, PermssionHelper]
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
                 
              <div className="rt-buttons">
                  {PermssionHelper('user', 'c') ? (
                    <Button
                      color="primary"
                      onClick={() => {
                        toggleNewPayment()
                      }}
                    >
                      <i className="icon-plus"></i> Nuevo
                    </Button>
                  ) : null}
                </div>

                {PermssionHelper('user', 'r') ? (
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

      <MyPaymentForm 
        show={showPaymentForm} 
        dismiss={toggleNewPayment} 
        isEdit={openModeModal} 
        />

    </div>
  )
}

export default MyPayment
