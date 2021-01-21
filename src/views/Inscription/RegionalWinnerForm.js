import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  Col,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Form,
  FormGroup,
  FormFeedback,
  Label,
  CustomInput
} from 'reactstrap'
import { Formik } from 'formik'
import * as yup from 'yup'

import { SpinCircle } from 'components/Spin'

import evaluationAction from 'redux/actions/evaluationAction'

const RegionalWinnerForm = ({ show, dismiss }) => {
  const dispatch = useDispatch()

  return (
    <Modal isOpen={show} toggle={dismiss} backdrop="static" keyboard={true} centered>
      <Formik
        initialValues={{
          category: 1,
          region: '',
          inscription: ''
        }}
        validationSchema={yup.object().shape({
          category: yup.string().required('This field is requiered.'),
          region: yup.string().required('This field is requiered.'),
          inscription: yup.string().required('This field is requiered.')
        })}
        onSubmit={(values, { setSubmitting }) => {
          dispatch(evaluationAction.addRegionalWinner(values)).then((status) => {
            setSubmitting(false)
            if (status === 200 || status === 201) {
              dismiss()
            }
          })
        }}
      >
        {(formik) => <FormModal formik={formik} dismiss={dismiss} />}
      </Formik>
    </Modal>
  )
}

const FormModal = ({ formik, dismiss }) => {
  const dispatch = useDispatch()

  const [isSearching, setIsSearching] = useState(false)

  const ubigeo = useSelector((store) => store.ubigeoReducer.ubigeo)
  const inscriptions = useSelector((store) => store.evaluationReducer.inscriptions)

  useEffect(() => {
    if (formik.values.region !== '') {
      const criteria = []
      criteria.category = formik.values.category
      criteria.department = formik.values.region

      setIsSearching(true)

      dispatch(evaluationAction.findInscriptionsBy(criteria)).then((status) => {
        // console.log(status)
        setIsSearching(false)
      })
    }
  }, [formik.values.category, formik.values.region])

  return (
    <Form onSubmit={formik.handleSubmit} className="form-horizontal">
      <ModalHeader toggle={dismiss}>Asignar ganador regional</ModalHeader>
      <ModalBody>
        {/* <pre>{JSON.stringify(formik.values, null, 2)}</pre> */}
        <FormGroup row>
          <Col md={6}>
            <Label>Categoría</Label>
            <CustomInput
              type="select"
              id="category"
              name="category"
              value={formik.values.category}
              onChange={formik.handleChange}
              disabled={isSearching}
              invalid={formik.errors.category ? true : false}
            >
              <option value="1">Categoría Primaria 1</option>
              <option value="2">Categoría Primaria 2</option>
              <option value="3">Categoría Secundaria 1</option>
              <option value="4">Categoría Secundaria 2</option>
            </CustomInput>
            <FormFeedback>{formik.errors.category}</FormFeedback>
          </Col>
          <Col md={6}>
            <Label>Departamento (Región)</Label>
            <CustomInput
              type="select"
              id="region"
              name="region"
              value={formik.values.region}
              onChange={formik.handleChange}
              disabled={isSearching}
              invalid={formik.errors.region ? true : false}
            >
              <option value="">Seleccione</option>
              {ubigeo.map((option, i) => (
                <option key={i} value={option.name.toUpperCase()}>
                  {option.name.toUpperCase()}
                </option>
              ))}
            </CustomInput>
            <FormFeedback>{formik.errors.region}</FormFeedback>
          </Col>
        </FormGroup>
        <FormGroup>
          <Label>Participantes</Label>
          {isSearching ? (
            <div className="form-control-plaintext animated fadeIn">
              <SpinCircle /> Loading...
            </div>
          ) : (
            <CustomInput
              type="select"
              id="inscription"
              name="inscription"
              value={formik.values.inscription}
              onChange={formik.handleChange}
              disabled={formik.isSubmitting}
              invalid={formik.errors.inscription ? true : false}
            >
              <option label="Select..." />
              {inscriptions
                ? inscriptions.map((option, i) => (
                    <option
                      key={i}
                      value={option.inscription.id}
                      label={`${option.inscription.code} - ${option.inscription.name} ${option.inscription.lastname}`}
                    />
                  ))
                : null}
            </CustomInput>
          )}

          <FormFeedback>{formik.errors.inscription}</FormFeedback>
        </FormGroup>
      </ModalBody>
      <ModalFooter>
        <Button type="submit" color="primary" disabled={formik.isSubmitting}>
          {formik.isSubmitting ? (
            <>
              <SpinCircle /> Procesando...
            </>
          ) : (
            'Guardar'
          )}
        </Button>
        {` `}
        <Button type="button" color="secondary" onClick={dismiss}>
          Cancelar
        </Button>
      </ModalFooter>
    </Form>
  )
}

export default RegionalWinnerForm
