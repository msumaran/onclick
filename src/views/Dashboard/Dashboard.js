import React, { useState, useEffect, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Bar, Pie } from 'react-chartjs-2'
import { Row, Col, Card, CardBody, CardHeader } from 'reactstrap'
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips'

// import { PermssionHelper } from 'helpers/permission'

const Dashboard = () => {
  // const dispatch = useDispatch()
 
  return (
    <div className="animated fadeIn">
      <h1>¡Bienvenido!</h1> 
    </div>
  )
}

export default Dashboard
