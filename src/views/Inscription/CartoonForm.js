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
  Input
} from 'reactstrap'
import { Formik } from 'formik'
import * as yup from 'yup'

import { SpinCircle } from 'components/Spin'

import evaluationAction from 'redux/actions/evaluationAction'

const schema = yup.object().shape({
  cartoonName: yup.string().required('This field is requiered.')
})

const CartoonForm = ({ show, dismiss }) => {
  const [isLoading, setIsLoading] = useState(true)

  const [initialValues, setInitialValues] = useState({
    id: '',
    cartoonName: ''
  })

  const dispatch = useDispatch()

  const data = useSelector((store) => store.evaluationReducer.evaluation)

  useEffect(() => {
    if (data) {
      // console.log(data)
      setInitialValues({
        id: data.inscription.id,
        cartoonName: data.inscription.cartoonName ? data.inscription.cartoonName : ''
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
                <Label>Nombre de la historieta</Label>
                <Input
                  name="cartoonName"
                  type="text"
                  value={formik.values.cartoonName}
                  onChange={formik.handleChange}
                  invalid={formik.errors.cartoonName ? true : false}
                />
                <FormFeedback>{formik.errors.cartoonName}</FormFeedback>
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

export default CartoonForm
