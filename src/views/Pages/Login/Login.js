import React, { Fragment } from 'react'
import { useDispatch } from 'react-redux'
import { Formik } from 'formik'
import { ToastContainer } from 'react-toastify'
import {
  Button,
  Card,
  CardBody,
  CardGroup,
  Col,
  Container,
  Form,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row
} from 'reactstrap'

import { SpinCircle } from 'components/Spin'

import accountAction from 'redux/actions/accountAction'

const Login = () => {
  const dispatch = useDispatch()

  return (
    <div className="app flex-row align-items-center">
      <Container>
        <Row className="justify-content-center">
          <Col md={6} lg={5}>
            <CardGroup>
              <Card className="p-4">
                <CardBody>
                  <Formik
                    initialValues={{
                      username: '',
                      password: ''
                    }}
                    onSubmit={(values, { setSubmitting }) => {
                      dispatch(accountAction.login(values.username, values.password)).then((status) => {
                        setSubmitting(false)
                      })
                    }}
                  >
                    {({ values, isSubmitting, handleChange, handleSubmit }) => (
                      <Form onSubmit={handleSubmit}>
                        <h1>Login</h1>
                        <p className="text-muted">Sign In to you account</p>
                        <InputGroup className="mb-3">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="icon-user"></i>
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            type="text"
                            name="username"
                            value={values.username}
                            onChange={handleChange}
                            placeholder="Username"
                          />
                        </InputGroup>
                        <InputGroup className="mb-4">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="icon-lock"></i>
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            type="password"
                            name="password"
                            value={values.password}
                            onChange={handleChange}
                            placeholder="Password"
                          />
                        </InputGroup>
                        <Row>
                          <Col xs={6}>
                            <Button type="submit" color="primary" disabled={isSubmitting} className="px-4">
                              {isSubmitting ? (
                                <Fragment>
                                  <SpinCircle /> Logging
                                </Fragment>
                              ) : (
                                'Login'
                              )}
                            </Button>
                          </Col>
                        </Row>
                      </Form>
                    )}
                  </Formik>
                </CardBody>
              </Card>
            </CardGroup>
          </Col>
        </Row>
      </Container>
      <ToastContainer />
    </div>
  )
}

export default Login
