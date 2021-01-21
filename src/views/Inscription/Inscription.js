import React, { useState, useEffect, useCallback, useMemo } from 'react'
import {
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Button,
  Badge,
  Form,
  FormGroup,
  Label,
  CustomInput,
  Collapse,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap'
import { Formik } from 'formik'
import { toast } from 'react-toastify'
import { SpinCircle } from 'components/Spin'
import { StripedTable } from 'components/CustomTable'
import { useSelector, useDispatch } from 'react-redux'
import moment from 'moment'
import ReactExport from 'react-export-excel'

import evaluationAction from 'redux/actions/evaluationAction'
import ubigeoAction from 'redux/actions/ubigeoAction'

import CartoonForm from './CartoonForm'
import StatusForm from './StatusForm'
import EvaluationForm from './EvaluationForm'
import RegionalWinnerForm from './RegionalWinnerForm'
import NacionalWinnerForm from './NacionalWinnerForm'

import { PermssionHelper } from 'helpers/permission'

const Inscription = () => {
  const ExcelFile = ReactExport.ExcelFile
  const ExcelSheet = ReactExport.ExcelFile.ExcelSheet
  const ExcelColumn = ReactExport.ExcelFile.ExcelColumn

  const [loading, setLoading] = useState(true)
  const [collapse, setCollapse] = useState(true)

  const toggleCollapse = () => setCollapse(!collapse)

  // < nacional winner form
  const [showNacionalWinnerForm, setShowNacionalWinnerForm] = useState(false)

  const toggleNacionalWinnerForm = useCallback(() => {
    setShowNacionalWinnerForm(!showNacionalWinnerForm)
  }, [showNacionalWinnerForm])
  // > nacional winner form

  // < regional winner form
  const [showRegionalWinnerForm, setShowRegionalWinnerForm] = useState(false)

  const toggleRegionalWinnerForm = useCallback(() => {
    setShowRegionalWinnerForm(!showRegionalWinnerForm)
  }, [showRegionalWinnerForm])
  // > regional winner form

  // < edit cartoon name form
  const [showCartoonForm, setShowCartoonForm] = useState(false)

  const toggleCartoonForm = useCallback(() => {
    setShowCartoonForm(!showCartoonForm)
  }, [showCartoonForm])
  // > edit cartoon name form

  // < edit status name form
  const [showStatusForm, setShowStatusForm] = useState(false)

  const toggleStatusForm = useCallback(() => {
    setShowStatusForm(!showStatusForm)
  }, [showStatusForm])
  // > edit status name form

  // < evaluation form
  const [showEvaluationForm, setShowEvaluationForm] = useState(false)

  const toggleEvaluationForm = useCallback(() => {
    setShowEvaluationForm(!showEvaluationForm)
  }, [showEvaluationForm])
  // > evaluation form

  const dispatch = useDispatch()

  // fetch ubigeo
  const [ubigeoLoading, setUbigeoLoading] = useState(true)

  const ubigeo = useSelector((store) => store.ubigeoReducer.ubigeo)

  const fetchUbigeo = useCallback(() => {
    dispatch(ubigeoAction.findAll()).then((status) => {
      console.log(status)
    })
  }, [dispatch])

  useEffect(() => {
    if (ubigeo.length === 0) {
      fetchUbigeo()
    } else {
      setUbigeoLoading(false)
    }
  }, [ubigeo, fetchUbigeo])

  // fetch evaluations
  const data = useSelector((store) => store.evaluationReducer.evaluations)
  const loaded = useSelector((store) => store.evaluationReducer.loaded)

  const fetchEvaluation = useCallback(() => {
    dispatch(evaluationAction.findAll()).then((status) => {
      console.log(status)
    })
  }, [dispatch])

  const columns = useMemo(
    () => [
      {
        Header: ' ',
        Cell: ({ row: { original } }) => {
          return original.inscription.hasFileInscription ? <strong className="icon-check text-success"></strong> : <strong className="icon-close text-danger"></strong>
        }
      },
      {
        Header: 'Código',
        accessor: 'inscription.code'
      },
      {
        Header: 'Participante',
        accessor: 'inscription.name'
      },
      {
        Header: 'Categoria',
        accessor: 'inscription.category',
        Cell: ({ cell: { value } }) => value.name
      },
      {
        Header: 'Ubigeo',
        accessor: 'inscription',
        Cell: ({ cell: { value } }) => value.departament + ' - ' + value.province + ' - ' + value.district
      },
      {
        Header: 'Presentación',
        accessor: 'inscription.cartoonPresentation',
        Cell: ({ cell: { value } }) => {
          if (value === 'dig') {
            return <Badge color="dark">Digital</Badge>
          } else if (value === 'pre') {
            return <Badge color="info">Presencial</Badge>
          } else if (value === 'repetido') {
            return <Badge color="warning">Repetido</Badge>
          } else {
            return <Badge color="danger">Inválido</Badge>
          }
        }
      },
      {
        Header: 'Calificación',
        accessor: 'evaluation.total'
      },
      // {
      //   Header: 'Registro',
      //   accessor: 'createdAt',
      //   Cell: ({ cell: { value } }) => moment(value).format('LLL')
      // },
      {
        Header: 'Evaluar',
        Cell: ({ row: { original } }) => {
          return (
            <>
              {PermssionHelper('evaluation', 'cu') ? (
                <Button type="button" color="dark" outline size="sm"
                  onClick={() => {
                    dispatch(evaluationAction.find(original.id))
                    toggleEvaluationForm()
                  }}
                >
                  <i className="icon-star"></i> Calificar
                </Button>
              ) : null}
            </>
          )
        }
      },
      {
        Header: 'Acciones',
        width: 300,
        Cell: ({ row: { original } }) => {
          const [dropdownOpen, setDropdownOpen] = useState(false)

          const toggleDropdown = () => setDropdownOpen((prevState) => !prevState)

          return (
            <div>
              <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown} size="sm">
                <DropdownToggle caret>
                  <i className="cib-semaphoreci"></i>
                </DropdownToggle>
                <DropdownMenu>
                  {PermssionHelper('participant', 'u') ? (
                    <DropdownItem
                      onClick={() => {
                        dispatch(evaluationAction.find(original.id))
                        toggleCartoonForm()
                      }}
                    >
                      <i className="icon-pencil"></i> Editar nombre de la historieta
                    </DropdownItem>
                  ) : null}
                  <DropdownItem
                      onClick={() => {
                        dispatch(evaluationAction.find(original.id))
                        toggleStatusForm()
                      }}
                    >
                      <i className="icon-pencil"></i> Cambiar estado de presentación
                  </DropdownItem>
                  <DropdownItem
                    disabled={original.inscription.cartoonPresentation === 'pre' ? true : false}
                    onClick={() => {
                      window.open(original.inscription.files, '_blank')
                    }}
                  >
                    <i className="icon-cloud-download"></i> Descargar historieta
                  </DropdownItem>
                  <DropdownItem
                    onClick={() => {
                      dispatch(evaluationAction.compress({ id: original.id })).then((res) => {
                        console.log(res)
                        window.open(res.zipFile, '_blank')
                      })
                    }}
                  >
                    <i className="icon-cloud-download"></i> Descargar ZIP
                  </DropdownItem>
                  {PermssionHelper('evaluation', 'cu') ? (
                    <DropdownItem
                      onClick={() => {
                        dispatch(evaluationAction.find(original.id))
                        toggleEvaluationForm()
                      }}
                    >
                      <i className="icon-star"></i> Calificar
                    </DropdownItem>
                  ) : null}
                </DropdownMenu>
              </Dropdown>
            </div>
          )
        }
      }
    ],
    [dispatch, toggleCartoonForm, toggleEvaluationForm, PermssionHelper]
  )

  useEffect(() => {
    if (loaded) {
      setLoading(false)
    } else {
      fetchEvaluation()
    }
  }, [loaded, fetchEvaluation])

  return (
    <div className="animated fadeIn">
      <Row>
        <Col xs={12}>
          <Card>
            <CardHeader>
              <strong>
                Participantes <small>Filtros</small>
              </strong>
              <div className="card-header-actions">
                <a className="card-header-action btn btn-minimize" data-target="#cardFilter" onClick={toggleCollapse}>
                  {collapse ? <i className="cil-minus"></i> : <i className="cil-plus"></i>}
                </a>
              </div>
            </CardHeader>
            <Collapse isOpen={collapse} id="cardFilter">
              <CardBody>
                <Formik
                  initialValues={{
                    category: '',
                    shippingType: '',
                    department: '',
                    state: 'all'
                    // code: '',
                    // name: ''
                  }}
                  onSubmit={(values, { setSubmitting }) => {
                    const criteria = []

                    if (values.category !== '') criteria.category = values.category
                    if (values.shippingType !== '') criteria.shippingType = values.shippingType
                    if (values.department !== '') criteria.department = values.department
                    if (values.state !== '') criteria.state = values.state
                    // if (values.code !== '') criteria.code = values.code
                    // if (values.name !== '') criteria.name = values.name

                    if (Object.keys(criteria).length > 0) {
                      //send findby
                      dispatch(evaluationAction.findBy(criteria)).then((status) => {
                        console.log(status)

                        setSubmitting(false)
                      })
                    } else {
                      toast.warn('Please select at least one filter.')
                      setSubmitting(false)
                    }
                  }}
                >
                  {(formik) => (
                    <Form onSubmit={formik.handleSubmit} className="form-horizontal">
                      <FormGroup row>
                        <Col md={3}>
                          <Label>Estado</Label>
                          <CustomInput
                            type="select"
                            id="state"
                            value={formik.values.state}
                            onChange={formik.handleChange}
                            disabled={formik.isSubmitting}
                          >
                            <option value="all">Seleccione</option>
                            <option value="1">Sin calificar</option>
                            <option value="2">Calificadas</option>
                          </CustomInput>
                        </Col>
                        <Col md={3}>
                          <Label>Categoría</Label>
                          <CustomInput
                            type="select"
                            id="category"
                            value={formik.values.category}
                            onChange={formik.handleChange}
                            disabled={formik.isSubmitting}
                          >
                            <option value="">Seleccione</option>
                            <option value="1">Categoría Primaria 1</option>
                            <option value="2">Categoría Primaria 2</option>
                            <option value="3">Categoría Secundaria 1</option>
                            <option value="4">Categoría Secundaria 2</option>
                          </CustomInput>
                        </Col>
                        <Col md={3}>
                          <Label>Tipo de envió</Label>
                          <CustomInput
                            type="select"
                            id="shippingType"
                            value={formik.values.shippingType}
                            onChange={formik.handleChange}
                            disabled={formik.isSubmitting}
                          >
                            <option value="">Seleccione</option>
                            <option value="dig">Digital</option>
                            <option value="pre">Presencial</option>
                          </CustomInput>
                        </Col>
                        <Col md={3}>
                          <Label>Departamento</Label>
                          {ubigeoLoading ? (
                            <div className="form-control-plaintext animated fadeIn">
                              <SpinCircle /> Loading...
                            </div>
                          ) : (
                            <CustomInput
                              type="select"
                              id="department"
                              value={formik.values.department}
                              onChange={formik.handleChange}
                              disabled={formik.isSubmitting}
                            >
                              <option value="">Seleccione</option>
                              {ubigeo.map((option, i) => (
                                <option key={i} value={option.name.toUpperCase()}>
                                  {option.name.toUpperCase()}
                                </option>
                              ))}
                            </CustomInput>
                          )}
                        </Col>
                      </FormGroup>
                      {/* <FormGroup row>
                        <Col md={4}>
                          <Label>Código</Label>
                          <Input
                            type="text"
                            placeholder="Código"
                            id="code"
                            value={formik.values.code}
                            onChange={formik.handleChange}
                            disabled={formik.isSubmitting}
                          />
                        </Col>
                        <Col md={4}>
                          <Label>Participante</Label>
                          <Input
                            type="text"
                            placeholder="Nombre del participante"
                            id="name"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            disabled={formik.isSubmitting}
                          />
                        </Col>
                      </FormGroup> */}
                      <hr />
                      <div className="text-right">
                        <Button type="submit" color="primary" disabled={formik.isSubmitting}>
                          {formik.isSubmitting ? (
                            <>
                              <SpinCircle /> Filtrando...
                            </>
                          ) : (
                            <>
                              <i className="cil-filter"></i> Filtrar
                            </>
                          )}
                        </Button>
                      </div>
                    </Form>
                  )}
                </Formik>
              </CardBody>
            </Collapse>
          </Card>
          {ubigeoLoading ? (
            <div className="text-center animated fadeIn">
              <SpinCircle /> Loading...
            </div>
          ) : (
            <Card>
              <CardHeader>
                <strong>
                  Participantes <small>Datos</small>
                </strong>
              </CardHeader>
              <CardBody>
                <div className="rt-wrapper">
                  <div className="rt-buttons">
                    {PermssionHelper('participant_winner', 'cu') ? (
                      <>
                        <Button type="button" color="dark" outline onClick={toggleNacionalWinnerForm}>
                          <i className="icon-trophy"></i> Asignar ganador nacional
                        </Button>
                        {` `}
                        <Button type="button" color="dark" outline onClick={toggleRegionalWinnerForm}>
                          <i className="icon-trophy"></i> Asignar ganador regional
                        </Button>
                      </>
                    ) : null}
                    {` `}
                    {PermssionHelper('participant', 'r') ? (
                      <ExcelFile
                        element={
                          <Button color="success">
                            <i className="icon-plus"></i> Exportar
                          </Button>
                        }
                        filename={`${moment().format('DD-MM-YYYY--h-mm')}-Participantes`}
                      >
                        <ExcelSheet data={data} name="Participantes">
                          <ExcelColumn label="ID" value={(col) => col.inscription.id} />
                          <ExcelColumn label="Categoria Grado" value={(col) => col.education.grade} />
                          <ExcelColumn label="Categoria Nivel" value={(col) => col.education.level} />
                          <ExcelColumn label="Nombre" value={(col) => col.inscription.name} />
                          <ExcelColumn label="Apellidos" value={(col) => col.inscription.lastname} />
                          <ExcelColumn label="Institución educativa" value={(col) => col.inscription.schoolName} />

                          <ExcelColumn label="Departamento" value={(col) => col.inscription.departament} />
                          <ExcelColumn label="Provincia" value={(col) => col.inscription.province} />
                          <ExcelColumn label="Distrito" value={(col) => col.inscription.district} />

                          <ExcelColumn label="Apoderado Nombre" value={(col) => col.inscription.guardianName} />
                          <ExcelColumn label="Apoderado Apellido" value={(col) => col.inscription.guardianLastname} />
                          <ExcelColumn label="Apoderado DNI" value={(col) => col.inscription.guardianDni} />
                          <ExcelColumn
                            label="Apoderado Correo electrónico"
                            value={(col) => col.inscription.guardianEmail}
                          />
                          <ExcelColumn label="Apoderado teléfono" value={(col) => col.inscription.guardianPhone} />

                          <ExcelColumn label="Profesor" value={(col) => (col.inscription.hasTeacher ? 'Si' : 'No')} />
                          <ExcelColumn label="Profesor nombre" value={(col) => col.inscription.teacherName} />
                          <ExcelColumn label="Profesor apellidos" value={(col) => col.inscription.teacherLastname} />

                          <ExcelColumn
                            label="Presentacion"
                            value={(col) => (col.inscription.cartoonPresentation === 'dig' ? 'Digital' : 'Presencial')}
                          />

                          <ExcelColumn label="Código" value={(col) => col.inscription.code} />

                          <ExcelColumn label="Nombre de la historieta" value={(col) => col.inscription.cartoonName} />

                          <ExcelColumn label="Registro" value="createdAt" />
                        </ExcelSheet>
                      </ExcelFile>
                    ) : null}
                  </div>

                  {PermssionHelper('participant', 'r') ? (
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
          )}
        </Col>
      </Row>

      <CartoonForm show={showCartoonForm} dismiss={toggleCartoonForm} />
      <StatusForm show={showStatusForm} dismiss={toggleStatusForm} />
      <EvaluationForm show={showEvaluationForm} dismiss={toggleEvaluationForm} />
      <RegionalWinnerForm show={showRegionalWinnerForm} dismiss={toggleRegionalWinnerForm} />
      <NacionalWinnerForm show={showNacionalWinnerForm} dismiss={toggleNacionalWinnerForm} />
    </div>
  )
}

export default Inscription
