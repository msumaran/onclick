import React, { useState, useEffect, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Bar, Pie } from 'react-chartjs-2'
import { Row, Col, Card, CardBody, CardHeader } from 'reactstrap'
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips'
// import { useSelector } from 'react-redux'

// import PermissionHelper from '../../helpers/PermissionHelper'

const Dashboard = () => {

  // const my_permissions = useSelector((state) => state.permissionReducer.permissions)

  // const permission_helper = new PermissionHelper(my_permissions)

  return (
    <div className="animated fadeIn">
      <h1>¡Bienvenido!</h1>
    </div>
  )
}

export default Dashboard
