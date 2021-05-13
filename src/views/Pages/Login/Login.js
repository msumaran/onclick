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
                    onSubmit={(values, { setSubmitting, resetForm }) => {
                      dispatch(accountAction.login(values.username, values.password))
                        .then((status) => {
                          setSubmitting(false);
                          resetForm();
                        })
                        .catch((error)=>{
                          setSubmitting(false);
                        })
                    }}
                  >
                    {({ values, isSubmitting, handleChange, handleSubmit }) => (
                      <Form onSubmit={handleSubmit}>
                        <img src={logoImage} alt="logo" />
                        <h1>Ingresa con tu cuenta</h1>

                        <InputGroup className="mb-3">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <img src={iconUser} className="icon-user" alt="" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            type="email"
                            name="username"
                            value={values.username}
                            onChange={handleChange}
                            placeholder="Correo electrónico"
                          />
                        </InputGroup>

                        <InputGroup className="mb-0">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                            <img src={iconPass} alt="" />
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
                          <Col xs={12} className="text-right mb-4 mt-2">
                            <a href="admin#/recuperar-cuenta" target="_self" className="go-recovery" >
                              Olvidé la contraseña
                            </a>
                          </Col>
                        </Row>

                        <Row>
                          <Col xs={12} className="text-center" >
                            <Button type="submit" color="primary" disabled={isSubmitting} className="px-4">
                              {isSubmitting ? (
                                <Fragment>
                                  <SpinCircle /> Ingresando
                                </Fragment>
                              ) : (
                                'Ingresar'
                              )}
                            </Button>
                          </Col>
                        </Row>
                        <Row>
                          <Col xs={12} className="text-center">
                            <a href={`${process.env.REACT_APP_WEBSITE_URL}`} target="_self" className="back-to-home" >
                              Volver a la página inicial
                            </a>
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
