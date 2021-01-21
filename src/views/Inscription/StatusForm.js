import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
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

const schema = yup.object().shape({
  cartoonPresentation: yup.string().required('This field is requiered.')
})

const StatusForm = ({ show, dismiss }) => {
  const [isLoading, setIsLoading] = useState(true)

  const [initialValues, setInitialValues] = useState({
    id: '',
    cartoonPresentation: ''
  })

  const dispatch = useDispatch()

  const data = useSelector((store) => store.evaluationReducer.evaluation)

  useEffect(() => {
    if (data) {
      // console.log(data)
      setInitialValues({
        id: data.inscription.id,
        cartoonPresentation: data.inscription.cartoonPresentation ? data.inscription.cartoonPresentation : ''
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
            // console.log(values)
            // setSubmitting(false)
          dispatch(evaluationAction.update(values.id, values)).then((status) => {
            setSubmitting(false)
            if (status === 200 || status === 202) {
              dismiss()
            }
          })
        }}
      >
        {(formik) => (
          <Form onSubmit={formik.handleSubmit} className="form-horizontal">
            <ModalHeader toggle={dismiss}>Editar</ModalHeader>
            <ModalBody>
              {/* <pre>{JSON.stringify(formik.values, null, 2)}</pre> */}
              <FormGroup>
                <Label>Estado de presentación</Label>
                <CustomInput
                    type="select"
                    id="cartoonPresentation"
                    value={formik.values.cartoonPresentation}
                    onChange={formik.handleChange}
                >
                    <option value="dig">Digital</option>
                    <option value="pre">Presencial</option>
                    <option value="repetido">Repetido</option>
                    <option value="invalido">Inválido</option>
                </CustomInput>
                <FormFeedback>{formik.errors.cartoonPresentation}</FormFeedback>
              </FormGroup>
            </ModalBody>
            <ModalFooter>
              <Button type="submit" color="primary" disabled={formik.isSubmitting}>
                {formik.isSubmitting ? (
                  <>
                    <SpinCircle /> Procesando...
                  </>
                ) : (
                  'Actualizar'
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

export default StatusForm
