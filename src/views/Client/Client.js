/*eslint no-unused-vars: "off" */

import React, { useState, useEffect, useCallback, useMemo, Fragment } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Row, Col, Card, CardHeader, CardBody, Button, Badge } from 'reactstrap'
import moment from 'moment'

import { StripedTable } from 'components/CustomTable'

import clientAction from 'redux/actions/clientAction'

import ClientCode from './ClientCode'

import PermissionHelper from 'helpers/PermissionHelper'

import userAction from 'redux/actions/userAction'

import { SpinCircle } from 'components/Spin'
import { confirm } from 'components/CustomModal/ModalConfirm'
import { Link } from 'react-router-dom'

const Client = () => {

  const dispatch = useDispatch()

  const my_permissions = useSelector((state) => state.accountReducer.permissions)
  const permission_helper = new PermissionHelper(my_permissions)

  const [openModeModal, setOpenModeModal] = useState(false) //FALSE(NEW) TRUE(EDIT
  const [loading, setLoading] = useState(true)

  const [showClientCode, setClientCode] = useState(false)
  const toggleClientCode = useCallback(() => {
    setOpenModeModal(true)
    setClientCode(!showClientCode)
  }, [showClientCode])

  const columns = useMemo(
    () => [
      {
        Header: 'Nombre',
        accessor: 'name'
      },
      {
        Header: 'Apellidos',
        accessor: 'lastname'
      },
      {
        Header: 'Landing ID',
        accessor: 'nickname',
        Cell: ({ cell }) => (
          <>
            {cell.value} <Link to={`/client-landing/${cell.row.original.id}`} className="btn btn-secondary"><i className="oc oc-edit"></i></Link>
          </>
        )
      },
      {
        Header: 'Correo electrónico',
        accessor: 'email'
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
      },
      {
        Header: 'Actions',
        width: 300,
        Cell: ({ row: { original } }) => {
          const [deleting, setDeleting] = useState({ [`row_id_${original.id}`]: false })
          const [activating, setActivating] = useState({ [`row_id_${original.id}`]: false })

          return (
            <div className="btn-group btn-group-sm">
              {permission_helper.validate('user_password_change', 'u') ? (
                <Button
                  className="btn btn-secondary"
                  disabled={deleting[`row_id_${original.id}`]}
                  onClick={() => {
                    dispatch(clientAction.find(original.id))
                    toggleClientCode()
                  }}
                >
                  <i className="icon-key"></i> Code GA
                </Button>
              ) : null}

              {permission_helper.validate('user', 'd') && original.isActive ? (
                <button
                  className="btn btn-danger"
                  disabled={deleting[`row_id_${original.id}`]}
                  onClick={() =>
                    confirm('Desactivar', '¿Está seguro que deseas desactivar este registro?').then(() => {
                      setDeleting({ [`row_id_${original.id}`]: true })
                      dispatch(clientAction.remove(original.id)).then((status) => {
                        setDeleting({ [`row_id_${original.id}`]: false })
                      })
                    })
                  }
                >
                  {deleting[`row_id_${original.id}`] ? (
                    <Fragment>
                      <SpinCircle /> Desactivando...
                    </Fragment>
                  ) : (
                    <i className="oc oc-trash" style={{
                      fontSize: '1.2rem',
                    }}></i>
                  )}
                </button>
              ) : null}

              {permission_helper.validate('user', 'd') && !original.isActive ? (
                <button
                  className="btn btn-success"
                  disabled={activating[`row_id_${original.id}`]}
                  onClick={() =>
                    confirm('Activar', '¿Está seguro que deseas activar este registro?').then(() => {
                      setActivating({ [`row_id_${original.id}`]: true })
                      dispatch(clientAction.active(original.id)).then((status) => {
                        setActivating({ [`row_id_${original.id}`]: false })
                      })
                    })
                  }
                >
                  {activating[`row_id_${original.id}`] ? (
                    <Fragment>
                      <SpinCircle /> Activando...
                    </Fragment>
                  ) : (
                    <i className="oc oc-edit" style={{
                      fontSize: '1.2rem',
                    }}></i>
                  )}
                </button>
              ) : null}

            </div>
          )
        }
      }
    ],
    [dispatch, toggleClientCode, permission_helper]
  )

  const data = useSelector((store) => store.clientReducer.clients)

  const loaded = useSelector((store) => store.clientReducer.loaded)

  const fetchClients = useCallback(() => {
    dispatch(clientAction.findAll()).then((status) => {
      console.log(status)
    })
  }, [dispatch])

  useEffect(() => {
    if (loaded) {
      setLoading(false)
    } else {
      fetchClients()
    }
  }, [loaded, fetchClients])

  return (
    <div className="animated fadeIn">
      <Row>
        <Col xs={12}>
          <Card>
            <CardHeader>
              <strong>Usuarios</strong>
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

      <ClientCode
        show={showClientCode}
        dismiss={toggleClientCode}
        isEdit={openModeModal}
        />

    </div>
  )
}

export default Client
