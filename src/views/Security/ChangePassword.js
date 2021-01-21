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
      {({ values, errors, isSubmitting, handleChange, handleSubmit }) => (
        <Form onSubmit={handleSubmit} className="form-horizontal animated fadeIn">
          <Row>
            <Col md={6}>
              <Card>
                <CardHeader>
                  <strong>Change Password</strong>
                </CardHeader>
                <CardBody>
                  <FormGroup>
                    <Label htmlFor="password">Password</Label>
                    <InputGroup className={errors.password ? 'is-invalid' : null}>
                      <Input
                        type={isPassword ? 'password' : 'text'}
                        name="password"
                        value={values.password}
                        onChange={handleChange}
                        invalid={errors.password ? true : false}
                      />
                      <InputGroupAddon addonType="append">
                        <Button color="secondary" onClick={togglePassword}>
                          {isPassword ? <i className="icon-lock-open"></i> : <i className="icon-lock"></i>}
                        </Button>
                      </InputGroupAddon>
                    </InputGroup>
                    <FormFeedback>{errors.password}</FormFeedback>
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <InputGroup className={errors.confirmPassword ? 'is-invalid' : null}>
                      <Input
                        type={isPassword ? 'password' : 'text'}
                        name="confirmPassword"
                        value={values.confirmPassword}
                        onChange={handleChange}
                        invalid={errors.confirmPassword ? true : false}
                      />
                      <InputGroupAddon addonType="append">
                        <Button color="secondary" onClick={togglePassword}>
                          {isPassword ? <i className="icon-lock-open"></i> : <i className="icon-lock"></i>}
                        </Button>
                      </InputGroupAddon>
                    </InputGroup>
                    <FormFeedback>{errors.confirmPassword}</FormFeedback>
                  </FormGroup>
                </CardBody>
                <CardFooter>
                  <div className="form-actions">
                    <Button type="submit" color="primary" disabled={isSubmitting}>
                      {isSubmitting ? (
                        <Fragment>
                          <SpinCircle /> Processing
                        </Fragment>
                      ) : (
                        'Save changes'
                      )}
                    </Button>
                    {` `}
                    <Button type="button" color="secondary" onClick={() => history.push('/dashboard')}>
                      Cancel
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
