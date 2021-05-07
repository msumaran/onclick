import React from 'react'
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
  Input,
} from 'reactstrap'
import { Formik } from 'formik'
import * as yup from 'yup'

import { SpinCircle } from 'components/Spin'

import clientAction from 'redux/actions/clientAction'

const initialValues = {
  id: '',
  code_ga: '',
}

const ClientCode = ({ show, dismiss, isEdit }) => {

  const data = useSelector((store) => store.clientReducer.client)

  const dispatch = useDispatch()

  return (
    <Modal isOpen={show} toggle={dismiss} backdrop="static" keyboard={true} centered>
      <Formik
        initialValues={
          isEdit
            ? {
                ...data,
              }
            : initialValues
        }
        validationSchema={
          isEdit
            ? yup.object().shape({
                code_ga: yup.string().required('El código de Google Analitycs es requerido.').nullable(),
              })
            : yup.object().shape({
                code_ga: yup.string().required('El código de Google Analitycs es requerido.').nullable(),
              })
        }
        onSubmit={(values, { setSubmitting, resetForm }) => {
          if (isEdit) {
            //  EDIT
            const sendData = {
              id: values.id,
              code_ga: values.code_ga
            }
            dispatch(clientAction.update(values.id, sendData)).then((status) => {
              setSubmitting(false)
              if (status === 200 || status === 202) {
                // console.log('EDITADO! fin')
                resetForm()
                dismiss()
              }
            })
          } else {
            // NEW
            dispatch(clientAction.create(values)).then((status) => {
              setSubmitting(false)
              if (status === 200 || status === 201) {
                resetForm()
                dismiss()
              }
            })
          }
        }}
      >
        {(formik) => (
          <Form onSubmit={formik.handleSubmit} className="form-horizontal">
            <ModalHeader toggle={dismiss}>{isEdit ? 'Editar CA' : 'Nuevo CA'}</ModalHeader>
            <ModalBody>
              <FormGroup>
                <Label htmlFor="code_ga">Codigo de Google Analitycs</Label>
                <Input
                  type="text"
                  name="code_ga"
                  value={formik.values.code_ga}
                  onChange={formik.handleChange}
                  invalid={formik.errors.code_ga ? true : false}
                />
                <FormFeedback>{formik.errors.code_ga}</FormFeedback>
              </FormGroup>
            </ModalBody>
            <ModalFooter>
              {!isEdit ? (
                <Button type="submit" color="primary" disabled={formik.isSubmitting}>
                  {formik.isSubmitting ? (
                    <>
                      <SpinCircle /> Procesando...
                    </>
                  ) : (
                    'Guardar'
                  )}
                </Button>
              ) : (
                <Button type="submit" color="primary" disabled={formik.isSubmitting}>
                  {formik.isSubmitting ? (
                    <>
                      <SpinCircle /> Procesando...
                    </>
                  ) : (
                    'Guardar edición'
                  )}
                </Button>
              )}

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

export default ClientCode
