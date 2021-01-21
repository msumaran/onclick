import React, { useState, useEffect, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Row, Col, Card, CardBody, Button, Form, FormGroup, CustomInput, FormFeedback } from 'reactstrap'
import { Formik } from 'formik'
import * as yup from 'yup'

import { SpinCircle } from 'components/Spin'

import ubigeoAction from 'redux/actions/ubigeoAction'
import reportAction from 'redux/actions/reportAction'

import { PermssionHelper } from 'helpers/permission'

const Report = () => {
  const dispatch = useDispatch()

  const [regionLoading, setRegionLoading] = useState(true)

  const regions = useSelector((store) => store.ubigeoReducer.ubigeo)

  const fetchRegions = useCallback(() => {
    dispatch(ubigeoAction.findAll()).then((status) => {
      setRegionLoading(false)
    })
  }, [dispatch])

  useEffect(() => fetchRegions(), [fetchRegions])

  return (
    <div className="animated fadeIn">
      {PermssionHelper('report', 'c') ? (
        <Row>
          <Col md={4}>
            <Card color="primary" className="text-white text-center">
              <CardBody>
                <Formik
                  initialValues={{}}
                  onSubmit={(values, { setSubmitting }) => {
                    dispatch(reportAction.make('all_dig')).then((res) => {
                      setSubmitting(false)

                      if (res.path) window.open(res.path)
                      else window.open(res)
                    })
                  }}
                >
                  {(formik) => (
                    <Form onSubmit={formik.handleSubmit}>
                      <blockquote className="card-bodyquote">
                        <p>Historietas inscriptas pero no enviadas.</p>
                      </blockquote>
                      <Button type="submit" color="light" outline disabled={formik.isSubmitting}>
                        {formik.isSubmitting ? (
                          <>
                            <SpinCircle /> Procesando...
                          </>
                        ) : (
                          <>
                            <i className="icon-cloud-download"></i> Generar reporte
                          </>
                        )}
                      </Button>
                    </Form>
                  )}
                </Formik>
              </CardBody>
            </Card>
          </Col>
          <Col md={4}>
            <Card color="dark" className="text-white text-center">
              <CardBody>
                <Formik
                  initialValues={{}}
                  onSubmit={(values, { setSubmitting }) => {
                    dispatch(reportAction.make('qty_by_dep')).then((res) => {
                      setSubmitting(false)

                      if (res.path) window.open(res.path)
                      else window.open(res)
                    })
                  }}
                >
                  {(formik) => (
                    <Form onSubmit={formik.handleSubmit}>
                      <blockquote className="card-bodyquote">
                        <p>Cantidad de historietas recibidas por cada departamento.</p>
                      </blockquote>
                      <Button type="submit" color="light" outline disabled={formik.isSubmitting}>
                        {formik.isSubmitting ? (
                          <>
                            <SpinCircle /> Procesando...
                          </>
                        ) : (
                          <>
                            <i className="icon-cloud-download"></i> Generar reporte
                          </>
                        )}
                      </Button>
                    </Form>
                  )}
                </Formik>
              </CardBody>
            </Card>
          </Col>
          <Col md={4}>
            <Card color="primary" className="text-white text-center">
              <CardBody>
                <Formik
                  initialValues={{}}
                  onSubmit={(values, { setSubmitting }) => {
                    dispatch(reportAction.make('qty_by_category')).then((res) => {
                      setSubmitting(false)

                      if (res.path) window.open(res.path)
                      else window.open(res)
                    })
                  }}
                >
                  {(formik) => (
                    <Form onSubmit={formik.handleSubmit}>
                      <blockquote className="card-bodyquote">
                        <p>Cantidad de historietas recibidas por cada categoría.</p>
                      </blockquote>
                      <Button type="submit" color="light" outline disabled={formik.isSubmitting}>
                        {formik.isSubmitting ? (
                          <>
                            <SpinCircle /> Procesando...
                          </>
                        ) : (
                          <>
                            <i className="icon-cloud-download"></i> Generar reporte
                          </>
                        )}
                      </Button>
                    </Form>
                  )}
                </Formik>
              </CardBody>
            </Card>
          </Col>
          <Col md={4}>
            <Card color="dark" className="text-white text-center">
              <CardBody>
                <Formik
                  initialValues={{}}
                  onSubmit={(values, { setSubmitting }) => {
                    dispatch(reportAction.make('qty_by_district')).then((res) => {
                      setSubmitting(false)

                      if (res.path) window.open(res.path)
                      else window.open(res)
                    })
                  }}
                >
                  {(formik) => (
                    <Form onSubmit={formik.handleSubmit}>
                      <blockquote className="card-bodyquote">
                        <p>Cantidad de historietas recibidas por cada distrito.</p>
                      </blockquote>
                      <Button type="submit" color="light" outline disabled={formik.isSubmitting}>
                        {formik.isSubmitting ? (
                          <>
                            <SpinCircle /> Procesando...
                          </>
                        ) : (
                          <>
                            <i className="icon-cloud-download"></i> Generar reporte
                          </>
                        )}
                      </Button>
                    </Form>
                  )}
                </Formik>
              </CardBody>
            </Card>
          </Col>
          <Col md={4}>
            <Card color="primary" className="text-white text-center">
              <CardBody>
                <Formik
                  initialValues={{}}
                  onSubmit={(values, { setSubmitting }) => {
                    dispatch(reportAction.make('qty_department_province_district')).then((res) => {
                      setSubmitting(false)

                      if (res.path) window.open(res.path)
                      else window.open(res)
                    })
                  }}
                >
                  {(formik) => (
                    <Form onSubmit={formik.handleSubmit}>
                      <blockquote className="card-bodyquote">
                        <p>Cantidad de totales en departamento con lista de provincias y distritos.</p>
                      </blockquote>
                      <Button type="submit" color="light" outline disabled={formik.isSubmitting}>
                        {formik.isSubmitting ? (
                          <>
                            <SpinCircle /> Procesando...
                          </>
                        ) : (
                          <>
                            <i className="icon-cloud-download"></i> Generar reporte
                          </>
                        )}
                      </Button>
                    </Form>
                  )}
                </Formik>
              </CardBody>
            </Card>
          </Col>
          <Col md={4}>
            <Card color="dark" className="text-white text-center">
              <CardBody>
                <Formik
                  initialValues={{}}
                  onSubmit={(values, { setSubmitting }) => {
                    dispatch(reportAction.make('qty_by_grade')).then((res) => {
                      setSubmitting(false)

                      if (res.path) window.open(res.path)
                      else window.open(res)
                    })
                  }}
                >
                  {(formik) => (
                    <Form onSubmit={formik.handleSubmit}>
                      <blockquote className="card-bodyquote">
                        <p>Cantidad de historietas recibidas por grado.</p>
                      </blockquote>
                      <Button type="submit" color="light" outline disabled={formik.isSubmitting}>
                        {formik.isSubmitting ? (
                          <>
                            <SpinCircle /> Procesando...
                          </>
                        ) : (
                          <>
                            <i className="icon-cloud-download"></i> Generar reporte
                          </>
                        )}
                      </Button>
                    </Form>
                  )}
                </Formik>
              </CardBody>
            </Card>
          </Col>
          <Col md={4}>
            <Card color="primary" className="text-white text-center">
              <CardBody>
                <Formik
                  initialValues={{
                    dep: ''
                  }}
                  validationSchema={yup.object().shape({
                    dep: yup.string().required('This field is required.')
                  })}
                  onSubmit={(values, { setSubmitting }) => {
                    dispatch(reportAction.make('evaluation_by_departament', `dep=${values.dep}`)).then((res) => {
                      setSubmitting(false)

                      if (res.path) window.open(res.path)
                      else window.open(res)
                    })
                  }}
                >
                  {(formik) => (
                    <Form onSubmit={formik.handleSubmit}>
                      <blockquote className="card-bodyquote">
                        <p>Calificacion por departamento.</p>
                      </blockquote>
                      <FormGroup>
                        {regionLoading ? (
                          <div className="form-control-plaintext animated fadeIn">
                            <SpinCircle /> Loading...
                          </div>
                        ) : (
                          <>
                            <CustomInput
                              id="dep"
                              type="select"
                              name="dep"
                              value={formik.values.dep}
                              onChange={formik.handleChange}
                              invalid={formik.errors.dep ? true : false}
                            >
                              <option>Seleccione</option>
                              {regions.map((option, i) => (
                                <option key={i} value={option.name}>
                                  {option.name}
                                </option>
                              ))}
                            </CustomInput>
                            <FormFeedback>{formik.errors.dep}</FormFeedback>
                          </>
                        )}
                      </FormGroup>
                      <Button type="submit" color="light" outline disabled={formik.isSubmitting}>
                        {formik.isSubmitting ? (
                          <>
                            <SpinCircle /> Procesando...
                          </>
                        ) : (
                          <>
                            <i className="icon-cloud-download"></i> Generar reporte
                          </>
                        )}
                      </Button>
                    </Form>
                  )}
                </Formik>
              </CardBody>
            </Card>
          </Col>
          <Col md={4}>
            <Card color="dark" className="text-white text-center">
              <CardBody>
                <Formik
                  initialValues={{}}
                  onSubmit={(values, { setSubmitting }) => {
                    dispatch(reportAction.make('qty_participant_best_calification')).then((res) => {
                      setSubmitting(false)

                      if (res.path) window.open(res.path)
                      else window.open(res)
                    })
                  }}
                >
                  {(formik) => (
                    <Form onSubmit={formik.handleSubmit}>
                      <blockquote className="card-bodyquote">
                        <p>Total de historietas con mayor calificacion.</p>
                      </blockquote>
                      <Button type="submit" color="light" outline disabled={formik.isSubmitting}>
                        {formik.isSubmitting ? (
                          <>
                            <SpinCircle /> Procesando...
                          </>
                        ) : (
                          <>
                            <i className="icon-cloud-download"></i> Generar reporte
                          </>
                        )}
                      </Button>
                    </Form>
                  )}
                </Formik>
              </CardBody>
            </Card>
          </Col>
          <Col md={4}>
            <Card color="primary" className="text-white text-center">
              <CardBody>
                <Formik
                  initialValues={{}}
                  onSubmit={(values, { setSubmitting }) => {
                    dispatch(reportAction.make('qty_evaluation_region')).then((res) => {
                      setSubmitting(false)

                      if (res.path) window.open(res.path)
                      else window.open(res)
                    })
                  }}
                >
                  {(formik) => (
                    <Form onSubmit={formik.handleSubmit}>
                      <blockquote className="card-bodyquote">
                        <p>Cantidad de notas que tiene cada región.</p>
                      </blockquote>
                      <Button type="submit" color="light" outline disabled={formik.isSubmitting}>
                        {formik.isSubmitting ? (
                          <>
                            <SpinCircle /> Procesando...
                          </>
                        ) : (
                          <>
                            <i className="icon-cloud-download"></i> Generar reporte
                          </>
                        )}
                      </Button>
                    </Form>
                  )}
                </Formik>
              </CardBody>
            </Card>
          </Col>
          <Col md={4}>
            <Card color="dark" className="text-white text-center">
              <CardBody>
                <Formik
                  initialValues={{}}
                  onSubmit={(values, { setSubmitting }) => {
                    dispatch(reportAction.make('qty_participant_region')).then((res) => {
                      setSubmitting(false)

                      if (res.path) window.open(res.path)
                      else window.open(res)
                    })
                  }}
                >
                  {(formik) => (
                    <Form onSubmit={formik.handleSubmit}>
                      <blockquote className="card-bodyquote">
                        <p>Cantidad de historietas calificadas por región.</p>
                      </blockquote>
                      <Button type="submit" color="light" outline disabled={formik.isSubmitting}>
                        {formik.isSubmitting ? (
                          <>
                            <SpinCircle /> Procesando...
                          </>
                        ) : (
                          <>
                            <i className="icon-cloud-download"></i> Generar reporte
                          </>
                        )}
                      </Button>
                    </Form>
                  )}
                </Formik>
              </CardBody>
            </Card>
          </Col>
          <Col md={4}>
            <Card color="primary" className="text-white text-center">
              <CardBody>
                <Formik
                  initialValues={{}}
                  onSubmit={(values, { setSubmitting }) => {
                    dispatch(reportAction.make('bestevaluations')).then((res) => {
                      setSubmitting(false)

                      if (res.path) window.open(res.path)
                      else window.open(res)
                    })
                  }}
                >
                  {(formik) => (
                    <Form onSubmit={formik.handleSubmit}>
                      <blockquote className="card-bodyquote">
                        <p>Mejores calificaciones por regiones</p>
                      </blockquote>
                      <Button type="submit" color="light" outline disabled={formik.isSubmitting}>
                        {formik.isSubmitting ? (
                          <>
                            <SpinCircle /> Procesando...
                          </>
                        ) : (
                          <>
                            <i className="icon-cloud-download"></i> Generar reporte
                          </>
                        )}
                      </Button>
                    </Form>
                  )}
                </Formik>
              </CardBody>
            </Card>
          </Col>
          <Col md={4}>
            <Card color="dark" className="text-white text-center">
              <CardBody>
                <Formik
                  initialValues={{}}
                  onSubmit={(values, { setSubmitting }) => {
                    dispatch(reportAction.make('r3')).then((res) => {
                      setSubmitting(false)

                      if (res.path) window.open(res.path)
                      else window.open(res)
                    })
                  }}
                >
                  {(formik) => (
                    <Form onSubmit={formik.handleSubmit}>
                      <blockquote className="card-bodyquote">
                        <p>Cantidad de historietas por categoría</p>
                      </blockquote>
                      <Button type="submit" color="light" outline disabled={formik.isSubmitting}>
                        {formik.isSubmitting ? (
                          <>
                            <SpinCircle /> Procesando...
                          </>
                        ) : (
                          <>
                            <i className="icon-cloud-download"></i> Generar reporte
                          </>
                        )}
                      </Button>
                    </Form>
                  )}
                </Formik>
              </CardBody>
            </Card>
          </Col>
          <Col md={4}>
            <Card color="primary" className="text-white text-center">
              <CardBody>
                <Formik
                  initialValues={{}}
                  onSubmit={(values, { setSubmitting }) => {
                    dispatch(reportAction.make('r3-evaluation_by_departament-zip')).then((res) => {
                      setSubmitting(false)

                      if (res.path) window.open(res.path)
                      else window.open(res)
                    })
                  }}
                >
                  {(formik) => (
                    <Form onSubmit={formik.handleSubmit}>
                      <blockquote className="card-bodyquote">
                        <p>Reporte de todos los departamentos en ZIP</p>
                      </blockquote>
                      <Button type="submit" color="light" outline disabled={formik.isSubmitting}>
                        {formik.isSubmitting ? (
                          <>
                            <SpinCircle /> Procesando...
                          </>
                        ) : (
                          <>
                            <i className="icon-cloud-download"></i> Generar reporte
                          </>
                        )}
                      </Button>
                    </Form>
                  )}
                </Formik>
              </CardBody>
            </Card>
          </Col>
          <Col md={4}>
            <Card color="dark" className="text-white text-center">
              <CardBody>
                <Formik
                  initialValues={{}}
                  onSubmit={(values, { setSubmitting }) => {
                    dispatch(reportAction.make('windep')).then((res) => {
                      setSubmitting(false)

                      if (res.path) window.open(res.path)
                      else window.open(res)
                    })
                  }}
                >
                  {(formik) => (
                    <Form onSubmit={formik.handleSubmit}>
                      <blockquote className="card-bodyquote">
                        <p>Lista de ganadores regionales</p>
                      </blockquote>
                      <Button type="submit" color="light" outline disabled={formik.isSubmitting}>
                        {formik.isSubmitting ? (
                          <>
                            <SpinCircle /> Procesando...
                          </>
                        ) : (
                          <>
                            <i className="icon-cloud-download"></i> Generar reporte
                          </>
                        )}
                      </Button>
                    </Form>
                  )}
                </Formik>
              </CardBody>
            </Card>
          </Col>
        </Row>
      ) : null}
    </div>
  )
}

export default Report
