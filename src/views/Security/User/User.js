import React, { useState, useEffect, useCallback, useMemo, Fragment } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Row, Col, Card, CardHeader, CardBody, Button } from 'reactstrap'
import moment from 'moment'

import { SpinCircle } from 'components/Spin'
import { confirm } from 'components/CustomModal/ModalConfirm'
import { StripedTable } from 'components/CustomTable'

import userAction from 'redux/actions/userAction'

import ChangePasswordForm from './ChangePasswordForm'
import UserForm from './UserForm'

import PermissionHelper from '../../../helpers/PermissionHelper'

const User = () => {
  const [loading, setLoading] = useState(true)

  const my_permissions = useSelector((state) => state.accountReducer.permissions)

  const permission_helper = new PermissionHelper(my_permissions)

  // < change password form
  const [showChangePassword, setShowChangePassword] = useState(false)

  const toggleChangePassword = useCallback(() => {

    setShowChangePassword(!showChangePassword)
  }, [showChangePassword])
  // > change password form

  // < NEWFORM
  const [modeNewForm, setModeNewForm] = useState(false)
  const [showNewForm, setShowNewForm] = useState(false)

  const toggleNewForm = useCallback(() => {

    setModeNewForm(false)
    setShowNewForm(!showNewForm)
  }, [showNewForm])

  const toggleEditForm = useCallback(() => {

    setModeNewForm(true)
    setShowNewForm(!showNewForm)
  }, [showNewForm])

  // > NEWFORM

  const dispatch = useDispatch()

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
        accessor: 'nickname'
      },
      {
        Header: 'Correo electrónico',
        accessor: 'email'
      },
      {
        Header: 'Perfil',
        accessor: 'profile.name'
      },
      {
        Header: 'Status',
        accessor: 'isActive',
        Cell: ({ cell: { value } }) => (
          <>
            {value ? (
              <div className="status-badge badge-success">Activo</div>
            ) : (
              <div className="status-badge badge-danger">Inactivo</div>
            )}
          </>
        )
      },
      {
        Header: 'Registro',
        accessor: 'createdAt',
        Cell: ({ cell: { value } }) => moment(value).format('LLL')
      },
      {
        Header: 'Actualización',
        accessor: 'updatedAt',
        Cell: ({ cell: { value } }) => (value ? moment(value).format('LLL') : '-')
      },
      {
        Header: 'Actions',
        width: 250,
        Cell: ({ row: { original } }) => {
          const [deleting, setDeleting] = useState({ [`row_id_${original.id}`]: false })

          return (
            <div className="">
              {permission_helper.validate('user', 'u') ? (
                <button
                  className="btn btn-primary"
                  disabled={deleting[`row_id_${original.id}`]}
                  onClick={() => {
                    dispatch(userAction.find(original.id))
                    toggleEditForm()
                  }}
                >
                  <i className="oc oc-edit"></i>
                </button>
              ) : null}
              {permission_helper.validate('user_password_change', 'u') ? (
                <button
                  className="btn btn-secondary"
                  disabled={deleting[`row_id_${original.id}`]}
                  onClick={() => {
                    dispatch(userAction.find(original.id))
                    toggleChangePassword()
                  }}
                >
                  <i className="oc oc-password mr-1" style={{
                    fontSize: '1.4rem',
                    verticalAlign: -6
                  }}></i> Cambiar contraseña
                </button>
              ) : null}
              {permission_helper.validate('user', 'd') ? (
                <button
                  className="btn btn-danger"
                  disabled={deleting[`row_id_${original.id}`]}
                  onClick={() =>
                    confirm('Eliminar', '¿Está seguro que deseas eliminar este registro?').then(() => {
                      setDeleting({ [`row_id_${original.id}`]: true })
                      dispatch(userAction.remove(original.id))
                    })
                  }
                >
                  {deleting[`row_id_${original.id}`] ? (
                    <Fragment>
                      <SpinCircle /> Eliminando...
                    </Fragment>
                  ) : (
                    <i className="oc oc-trash" style={{
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
    [dispatch, toggleEditForm, toggleChangePassword, permission_helper]
  )

  const data = useSelector((store) => store.userReducer.users)

  const loaded = useSelector((store) => store.userReducer.loaded)

  const fetchUsers = useCallback(() => {

    dispatch(userAction.findAll())
  }, [dispatch])

  useEffect(() => {
    if (loaded) {
      setLoading(false)
    } else {
      fetchUsers()
    }
  }, [loaded, fetchUsers])

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
                <div className="rt-buttons">
                  {permission_helper.validate('user', 'c') ? (
                    <Button
                      color="primary"
                      onClick={() => {
                        toggleNewForm()
                      }}
                    >
                      <i className="icon-plus"></i> Nuevo
                    </Button>
                  ) : null}
                </div>
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

      <ChangePasswordForm show={showChangePassword} dismiss={toggleChangePassword} />

      <UserForm show={showNewForm} dismiss={toggleNewForm} isEdit={modeNewForm} />
    </div>
  )
}

export default User
