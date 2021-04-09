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

import './Login.css';
import bgImage from 'assets/img/bg.png';
import logoImage from 'assets/img/logo.svg';

import iconUser from 'assets/img/icon-user.png';
import iconPass from 'assets/img/icon-password.png';

const Login = () => {
  const dispatch = useDispatch()

  return (
    <div className="app flex-row align-items-center login" style={{backgroundImage: `url(${bgImage})`}}>
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
                        <img src={logoImage} />
                        <h1>Ingresa con tu cuenta</h1>
                        
                        <InputGroup className="mb-3">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <img src={iconUser} className="icon-user" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            type="text"
                            name="username"
                            value={values.username}
                            onChange={handleChange}
                            placeholder="Usuario"
                          />
                        </InputGroup>
                        <InputGroup className="mb-4">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                            <img src={iconPass} />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            type="password"
                            name="password"
                            value={values.password}
                            onChange={handleChange}
                            placeholder="Contraseña"
                          />
                        </InputGroup>
                        <Row>
                          <Col xs={12} className="text-center" >
                            <Button type="submit" color="primary" disabled={isSubmitting} className="px-4">
                              {isSubmitting ? (
                                <Fragment>
                                  <SpinCircle /> Logging
                                </Fragment>
                              ) : (
                                'Ingresar'
                              )}
                            </Button>
                          </Col>
                        </Row>
                        <Row>
                          <Col xs={12} className="text-center">
                            <a href="#" className="back-to-home" >Volver a la página inicial</a>
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
