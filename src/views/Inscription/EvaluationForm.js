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
  Input
} from 'reactstrap'
import { Formik } from 'formik'
import * as yup from 'yup'

import { SpinCircle } from 'components/Spin'

import evaluationAction from 'redux/actions/evaluationAction'

const schema = yup.object().shape({
  coherence: yup
    .string()
    .matches(/^[1-5]{1}$/, 'Se debe calificar entre 1 y 5')
    .required('This field is requiered.'),
  creativity: yup
    .string()
    .matches(/^[1-5]{1}$/, 'Se debe calificar entre 1 y 5')
    .required('This field is requiered.'),
  draw: yup
    .string()
    .matches(/^[1-5]{1}$/, 'Se debe calificar entre 1 y 5')
    .required('This field is requiered.'),
  narrative: yup
    .string()
    .matches(/^[1-5]{1}$/, 'Se debe calificar entre 1 y 5')
    .required('This field is requiered.')
})

const EvaluationForm = ({ show, dismiss }) => {
  const [isLoading, setIsLoading] = useState(true)

  const [initialValues, setInitialValues] = useState({
    id: '',
    coherence: '',
    creativity: '',
    draw: '',
    narrative: ''
  })

  const dispatch = useDispatch()

  const data = useSelector((store) => store.evaluationReducer.evaluation)

  useEffect(() => {
    if (data) {
      // console.log(data)
      setInitialValues({
        id: data.id,
        coherence: data.evaluation.coherence,
        creativity: data.evaluation.creativity,
        draw: data.evaluation.draw,
        narrative: data.evaluation.narrative
      })
      setIsLoading(false)
    }
  }, [data])

  if (isLoading) return null

  return (
    <Modal isOpen={show} toggle={dismiss} backdrop="static" keyboard={true} centered>
      <Formik
        enableReinitialize={true}
        initialValues={initialValues}
        validationSchema={schema}
        onSubmit={(values, { setSubmitting }) => {
          dispatch(evaluationAction.calification(values)).then((status) => {
            setSubmitting(false)
            if (status === 200 || status === 201) {
              dismiss()
            }
          })
        }}
      >
        {(formik) => (
          <Form onSubmit={formik.handleSubmit} className="form-horizontal">
            <ModalHeader toggle={dismiss}>Calificación</ModalHeader>
            <ModalBody>
              {/* <pre>{JSON.stringify(formik.values, null, 2)}</pre> */}
              <FormGroup>
                <div className="form-control-plaintext">
                  <strong>{data.inscription.code}</strong> - {`${data.inscription.name} ${data.inscription.lastname}`}
                </div>
              </FormGroup>
              <FormGroup row>
                <Col md={6}>
                  <Label>Coherencia</Label>
                  <Input
                    name="coherence"
                    type="number"
                    value={formik.values.coherence}
                    onChange={formik.handleChange}
                    invalid={formik.errors.coherence ? true : false}
                  />
                  <FormFeedback>{formik.errors.coherence}</FormFeedback>
                </Col>
                <Col md={6}>
                  <Label>Creatividad</Label>
                  <Input
                    name="creativity"
                    type="number"
                    value={formik.values.creativity}
                    onChange={formik.handleChange}
                    invalid={formik.errors.creativity ? true : false}
                  />
                  <FormFeedback>{formik.errors.creativity}</FormFeedback>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col md={6}>
                  <Label>Dibujo</Label>
                  <Input
                    name="draw"
                    type="number"
                    value={formik.values.draw}
                    onChange={formik.handleChange}
                    invalid={formik.errors.draw ? true : false}
                  />
                  <FormFeedback>{formik.errors.draw}</FormFeedback>
                </Col>
                <Col md={6}>
                  <Label>Narrativa</Label>
                  <Input
                    name="narrative"
                    type="number"
                    value={formik.values.narrative}
                    onChange={formik.handleChange}
                    invalid={formik.errors.narrative ? true : false}
                  />
                  <FormFeedback>{formik.errors.narrative}</FormFeedback>
                </Col>
              </FormGroup>
            </ModalBody>
            <ModalFooter>
              <Button type="submit" color="primary" disabled={formik.isSubmitting}>
                {formik.isSubmitting ? (
                  <>
                    <SpinCircle /> Procesando...
                  </>
                ) : (
                  'Calificar'
                )}
              </Button>
              {` `}
              <Button type="button" color="secondary" onClick={dismiss}>
                Cancelar
              </Button>
            </ModalFooter>
          </Form>
        )}
      </Formik>
    </Modal>
  )
}

export default EvaluationForm
