import React, { useState, useEffect, useCallback, useMemo } from 'react'
import { Row, Col, Card, CardHeader, CardBody, Badge, Button } from 'reactstrap'
import { StripedTable } from 'components/CustomTable'
import { useSelector, useDispatch } from 'react-redux'
import moment from 'moment'

import profileAction from 'redux/actions/profileAction'

import ProfileForm from './ProfileForm'

import PermissionHelper from '../../../helpers/PermissionHelper'

const Profile = () => {

  const my_permissions = useSelector((state) => state.permissionReducer.permissions)

  const permission_helper = new PermissionHelper(my_permissions)

  const [loading, setLoading] = useState(true)

  // < profile form
  const [showForm, setShowForm] = useState(false)

  const toggleForm = useCallback(() => setShowForm(!showForm), [showForm])
  // > profile form

  const dispatch = useDispatch()

  const data = useSelector((store) => store.profileReducer.profiles)
  const loaded = useSelector((store) => store.profileReducer.loaded)

  const fetchProfile = useCallback(() => {

    dispatch(profileAction.findAll())
  }, [dispatch])

  const columns = useMemo(
    () => [
      {
        Header: 'Perfil',
        accessor: 'name'
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
        Header: 'Actualización',
        accessor: 'updatedAt',
        Cell: ({ cell: { value } }) => (value ? moment(value).format('LLL') : '-')
      },
      {
        Header: 'Actions',
        width: 300,
        Cell: ({ row: { original } }) => {
          return (
            <div className="btn-group btn-group-sm">
              {permission_helper.validate('profile', 'u') ? (
                <Button
                  outline
                  color="dark"
                  onClick={() => {
                    dispatch(profileAction.find(original.id))
                    toggleForm()
                  }}
                >
                  <i className="cil-task"></i> Permisos
                </Button>
              ) : null}
            </div>
          )
        }
      }
    ], [ dispatch, toggleForm, permission_helper ]
  )

  useEffect(() => {

    if (loaded) {

      setLoading(false)
    } else {

      fetchProfile()
    }
  }, [loaded, fetchProfile])

  return (
    <div className="animated fadeIn">
      <Row>
        <Col xs={12}>
          <Card>
            <CardHeader>
              <strong>Perfiles</strong>
            </CardHeader>
            <CardBody>
              <div className="rt-wrapper">
                {permission_helper.validate('profile', 'r') ? (
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

      <ProfileForm show={showForm} dismiss={toggleForm} />
    </div>
  )
}

export default Profile
