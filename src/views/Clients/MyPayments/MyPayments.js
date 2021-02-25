
import React, { useEffect, useState } from 'react'
import { Button, Card, CardBody, CardHeader, Col, Row } from 'reactstrap'
import { Formik } from 'formik'
import moment from 'moment'

import { useDispatch, useSelector } from 'react-redux'
import myPaymentsActions from 'redux/actions/myPaymentsActions'
import packAction from '../../../redux/actions/packAction'

import PermissionHelper from 'helpers/PermissionHelper'

import { StripedTable } from '../../../components/CustomTable'

import MyPaymentForm from './MyPaymentForm'

const MyPayments = () => {

    const dispatch = useDispatch()

    const my_permissions = useSelector((state) => state.accountReducer.permissions)
    const permission_helper = new PermissionHelper(my_permissions)

    const payments = useSelector((state) => state.myPaymentsReducer.payments)
    const paymentsLoaded = useSelector((state) => state.myPaymentsReducer.loaded)

    const packs = useSelector((state) => state.packReducer.packs)
    const packsLoaded = useSelector((state) => state.packReducer.loaded)

    const [ state, setState ] = useState({
        showPaymentForm: false,
    })

    const columns = [
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
    ]

    const showPaymentForm = () => {

        setState({
            showPaymentForm: true,
        })
    }

    const dismissPaymentForm = () => {

        setState({
            showPaymentForm: false,
        })
    }

    const onSubmit = (data, methods) => {

        dispatch(myPaymentsActions.create(data)).then(() => {

            methods.setSubmitting(false)
            methods.resetForm()
            dismissPaymentForm()
        })
    }

    useEffect(() => {

        if (!paymentsLoaded) {

            dispatch(myPaymentsActions.findAll())
        }
    }, [ paymentsLoaded ])

    useEffect(() => {

        if (!packsLoaded) {

            dispatch(packAction.findAll())
        }
    }, [ packsLoaded ])

    return (
        <div className="animated fadeIn">
            <Row>
                <Col xs={12}>
                    <Card>
                        <CardHeader>
                            <strong>Mis Pagos</strong>
                        </CardHeader>
                        <CardBody>
                            <div className="rt-wrapper">
                                <div className="rt-buttons">
                                    {!permission_helper.validate('user_payments', 'c') ? null : (
                                        <Button
                                            color="primary"
                                            onClick={() => showPaymentForm()}
                                        >
                                            <i className="icon-plus"></i> Nuevo
                                        </Button>
                                    )}
                                </div>
                                {!permission_helper.validate('user_payments', 'r') ? null : (
                                    <StripedTable
                                        columns={columns}
                                        data={payments}
                                        defaultSorted={[
                                            {
                                              id: 'createdAt',
                                              desc: true
                                            }
                                          ]}
                                        loading={!paymentsLoaded}
                                    />
                                )}
                            </div>
                        </CardBody>
                    </Card>
                </Col>
            </Row>

            <MyPaymentForm
                show={state.showPaymentForm}
                onDismiss={() => dismissPaymentForm()}
                packs={packs}
                onSubmit={(data, methods) => onSubmit(data, methods)}
            />
        </div>
    )
}

export default MyPayments
