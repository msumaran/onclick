import React, { useState, Fragment } from 'react'
import { useDispatch } from 'react-redux'
import {
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Form,
  FormGroup,
  FormFeedback,
  Label,
  Input,
  InputGroup,
  InputGroupAddon,
  Button
} from 'reactstrap'
import { Formik } from 'formik'

import { SpinCircle } from 'components/Spin'

import schema from 'views/Security/schema'

import accountAction from 'redux/actions/accountAction'

import history from 'helpers/history'

import { toastDefaults } from 'helpers/config'

const ChangePassword = () => {
  const [isPassword, setIsPassword] = useState(true)

  const togglePassword = () => setIsPassword(!isPassword)

  const dispatch = useDispatch()

  return (
    <Formik
      initialValues={{
        password: '',
        confirmPassword: ''
      }}
      validationSchema={schema}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        dispatch(accountAction.selfChangePassword(values.password)).then((status) => {
          if (status === 202) resetForm()
          setSubmitting(false)
        })
      }}
    >
      {(formik) => (
        <Form onSubmit={formik.handleSubmit} className="form-horizontal animated fadeIn">
          <Row>
            <Col md={6}>
              <Card>
                <CardHeader>
                  <strong>Cambiar contraseña</strong>
                </CardHeader>
                <CardBody>
                  <FormGroup>
                    <Label htmlFor="password">Nueva contraseña</Label>
                    <InputGroup className={formik.errors.password ? 'is-invalid' : null}>
                      <Input
                        type={isPassword ? 'password' : 'text'}
                        name="password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        invalid={formik.errors.password && formik.touched.password ? true : false}
                      />
                      <InputGroupAddon addonType="append">
                        <Button color="secondary" onClick={togglePassword}>
                          {isPassword ? <i className="icon-lock-open"></i> : <i className="icon-lock"></i>}
                        </Button>
                      </InputGroupAddon>
                    </InputGroup>
                    <FormFeedback>{formik.errors.password}</FormFeedback>
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="confirmPassword">Confirmar nueva contraseña</Label>
                    <InputGroup className={formik.errors.confirmPassword ? 'is-invalid' : null}>
                      <Input
                        type={isPassword ? 'password' : 'text'}
                        name="confirmPassword"
                        value={formik.values.confirmPassword}
                        onChange={formik.handleChange}
                        invalid={formik.errors.confirmPassword && formik.touched.confirmPassword ? true : false}
                      />
                      <InputGroupAddon addonType="append">
                        <Button color="secondary" onClick={togglePassword}>
                          {isPassword ? <i className="icon-lock-open"></i> : <i className="icon-lock"></i>}
                        </Button>
                      </InputGroupAddon>
                    </InputGroup>
                    <FormFeedback>{formik.errors.confirmPassword}</FormFeedback>
                  </FormGroup>
                </CardBody>
                <CardFooter>
                  <div className="form-actions">
                    <Button type="submit" color="primary" disabled={formik.isSubmitting}>
                      {formik.isSubmitting ? (
                        <Fragment>
                          <SpinCircle /> Guardando...
                        </Fragment>
                      ) : (
                        'Guardar'
                      )}
                    </Button>
                    {` `}
                    <Button type="button" color="secondary" onClick={() => history.push('/dashboard')}>
                      Cancelar
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            </Col>
          </Row>
        </Form>
      )}
    </Formik>
  )
}

export default ChangePassword
