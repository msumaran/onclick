import React, { useState, useEffect, useCallback, useMemo } from 'react'
import { Row, Col, Card, CardHeader, CardBody, Badge } from 'reactstrap'
import { StripedTable } from 'components/CustomTable'
import { useSelector, useDispatch } from 'react-redux'
import moment from 'moment'

import accessAction from 'redux/actions/accessAction'

import PermissionHelper from '../../../helpers/PermissionHelper'

const Access = () => {
  const [loading, setLoading] = useState(true)

  const my_permissions = useSelector((state) => state.accountReducer.permissions)

  const permission_helper = new PermissionHelper(my_permissions)

  const data = useSelector((store) => store.accessReducer.access)
  const loaded = useSelector((store) => store.accessReducer.loaded)
  const dispatch = useDispatch()

  const fetchAccess = useCallback(() => {

    dispatch(accessAction.findAll())
  }, [dispatch])

  const columns = useMemo(
    () => [
      {
        Header: 'Usuario',
        accessor: 'user.name'
      },
      {
        Header: 'IP',
        accessor: 'ip'
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
      fetchAccess()
    }
  }, [loaded, fetchAccess])

  return (
    <div className="animated fadeIn">
      <Row>
        <Col xs={12}>
          <Card>
            <CardHeader>
              <strong>Accesos</strong>
            </CardHeader>
            <CardBody>
              <div className="rt-wrapper">
                {permission_helper.validate('access', 'r') ? (
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

export default Access
