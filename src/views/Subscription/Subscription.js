import React, { useState, useEffect, useCallback, useMemo } from 'react'
import { Row, Col, Card, CardHeader, CardBody, Button, Badge } from 'reactstrap'
import { StripedTable } from 'components/CustomTable'
import { useSelector, useDispatch } from 'react-redux'
import moment from 'moment'

import ReactExport from 'react-export-excel'

import subscriptionAction from 'redux/actions/subscriptionAction'

import { PermssionHelper } from 'helpers/permission'

const Subscription = () => {
  const ExcelFile = ReactExport.ExcelFile
  const ExcelSheet = ReactExport.ExcelFile.ExcelSheet
  const ExcelColumn = ReactExport.ExcelFile.ExcelColumn

  const [loading, setLoading] = useState(true)

  const data = useSelector((store) => store.subscriptionReducer.subscriptions)
  const loaded = useSelector((store) => store.subscriptionReducer.loaded)
  const dispatch = useDispatch()

  const fetchSubscription = useCallback(() => {
    dispatch(subscriptionAction.findAll()).then((status) => {
      console.log(status)
    })
  }, [dispatch])

  const columns = useMemo(
    () => [
      {
        Header: 'Nombre completo',
        accessor: 'fullname'
      },
      {
        Header: 'Correo electrónico',
        accessor: 'email'
      },
      {
        Header: 'Teléfono',
        accessor: 'phone'
      },
      {
        Header: 'Status',
        accessor: 'isActive',
        Cell: ({ cell: { value } }) =>
          value ? <Badge color="success">Activo</Badge> : <Badge color="danger">Inactivo</Badge>
      },
      {
        Header: 'Registro',
        accessor: 'createdAt',
        Cell: ({ cell: { value } }) => moment(value).format('LLL')
      }
    ],
    []
  )

  useEffect(() => {
    if (loaded) {
      setLoading(false)
    } else {
      fetchSubscription()
    }
  }, [loaded, fetchSubscription])

  return (
    <div className="animated fadeIn">
      <Row>
        <Col xs={12}>
          <Card>
            <CardHeader>
              <strong>Suscripciones</strong>
            </CardHeader>
            <CardBody>
              <div className="rt-wrapper">
                <div className="rt-buttons">
                  {PermssionHelper('subscription', 'r') ? (
                    <ExcelFile
                      element={
                        <Button color="success">
                          <i className="icon-plus"></i> Exportar
                        </Button>
                      }
                      filename={`${moment().format('DD-MM-YYYY--h-mm')}-Contastos`}
                    >
                      <ExcelSheet data={data} name="Contactos">
                        <ExcelColumn label="Nombre completo" value="fullname" />
                        <ExcelColumn label="Correo electrónico" value="email" />
                        <ExcelColumn label="Teléfono" value="phone" />
                        <ExcelColumn label="Registro" value="createdAt" />
                      </ExcelSheet>
                    </ExcelFile>
                  ) : null}
                </div>
                {PermssionHelper('subscription', 'r') ? (
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
    </div>
  )
}

export default Subscription
