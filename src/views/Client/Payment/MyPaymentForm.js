/*eslint no-unused-vars: "off" */

import React, { useState, useEffect, useCallback } from 'react'
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
  CustomInput,
} from 'reactstrap'
import { Formik } from 'formik'
import * as yup from 'yup'

import { SpinCircle } from 'components/Spin'

import paymentAction from 'redux/actions/paymentAction'
import packAction from 'redux/actions/packAction'

const initialValues = {
  id: '',
  cardname: '',
  cardnumber: '',
  carddate: '',
  cardcvv: '',
  pack: ''
}

const UserForm = ({ show, dismiss, isEdit }) => {

  const data = useSelector((store) => store.userReducer.user)

  const dispatch = useDispatch()

  const [packLoading, setPackLoading] = useState(true)
  const packs = useSelector((store) => store.packReducer.packs)

  const fetchPacks = useCallback(() => {
    dispatch(packAction.findAll()).then((status) => {
      setPackLoading(!packLoading)
    })
  }, [dispatch, packLoading])

  useEffect(() => fetchPacks(), [fetchPacks])

  return (
    <Modal isOpen={show} toggle={dismiss} backdrop="static" keyboard={true} centered>
      <Formik
        initialValues={
          isEdit
            ? {
                ...data,
                // isChangePassword: false,
                // packId: data.profile.id
              }
            : initialValues
        }
        validationSchema={
          isEdit
            ? yup.object().shape({
                cardname: yup.string().required('This field is required.'),
                // lastname: yup.string().required('This field is required.'),
                // username: yup.string().required('This field is required.'),
                // packId: yup.string().required('This field is required.')
              })
            : yup.object().shape({
                cardname: yup.string().required('This field is required.'),
                // lastname: yup.string().required('This field is required.'),
                // username: yup.string().required('This field is required.'),
                // password: yup.string().required('This field is required.'),
                // passwordConfirm: yup
                //   .string()
                //   .oneOf([yup.ref('password'), null], 'Passwords do not match.')
                //   .required('Password confirm is required.'),
                // packId: yup.string().required('This field is required.')
              })
        }
        onSubmit={(values, { setSubmitting, resetForm }) => {
          if (isEdit) {
            //  EDIT
            dispatch(paymentAction.update(values.id, values)).then((status) => {
              setSubmitting(false)
              if (status === 200 || status === 202) {
                // console.log('EDITADO! fin')
                resetForm()
                dismiss()
              }
            })
          } else {
            // NEW
            dispatch(paymentAction.create(values)).then((status) => {
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
            <ModalHeader toggle={dismiss}>{isEdit ? 'Editar Pago' : 'Nuevo Pago'}</ModalHeader>
            <ModalBody>
              <pre>{JSON.stringify(formik.values, null, 2)}</pre>

              <FormGroup>
                <Label htmlFor="cardname">Nombre en tarjeta</Label>
                <Input
                  type="text"
                  name="cardname"
                  value={formik.values.cardname}
                  onChange={formik.handleChange}
                  invalid={formik.errors.cardname ? true : false}
                />
                <FormFeedback>{formik.errors.cardname}</FormFeedback>
              </FormGroup>

              <FormGroup>
                <Label htmlFor="cardnumber">Numero de tarjeta</Label>
                <Input
                  type="text"
                  name="cardnumber"
                  value={formik.values.cardnumber}
                  onChange={formik.handleChange}
                  invalid={formik.errors.cardnumber ? true : false}
                />
                <FormFeedback>{formik.errors.cardnumber}</FormFeedback>
              </FormGroup>

              <FormGroup>
                <Label htmlFor="carddate">Fecha en tarjeta</Label>
                <Input
                  type="text"
                  name="carddate"
                  value={formik.values.carddate}
                  onChange={formik.handleChange}
                  invalid={formik.errors.carddate ? true : false}
                />
                <FormFeedback>{formik.errors.carddate}</FormFeedback>
              </FormGroup>

              <FormGroup>
                <Label htmlFor="cardcvv">CVV</Label>
                <Input
                  type="text"
                  name="cardcvv"
                  value={formik.values.cardcvv}
                  onChange={formik.handleChange}
                  invalid={formik.errors.cardcvv ? true : false}
                />
                <FormFeedback>{formik.errors.cardcvv}</FormFeedback>
              </FormGroup>

              {!isEdit ? (
                <>
                </>
              ) : null}
              <FormGroup>
                <Label htmlFor="packId">Packs</Label>
                {packLoading ? (
                  <div className="form-control-plaintext animated fadeIn">
                    <SpinCircle /> Loading...
                  </div>
                ) : (
                  <CustomInput
                    id="packId"
                    type="select"
                    name="packId"
                    value={formik.values.packId}
                    onChange={formik.handleChange}
                    invalid={formik.errors.packId ? true : false}
                  >
                    <option disabled label="Select..." />
                    {packs.map((option, i) => (
                      // {packIds.map((option, i) => (
                      <option key={i} value={option.id} label={option.name} />
                    ))}
                  </CustomInput>
                )}
                <FormFeedback>{formik.errors.packId}</FormFeedback>
              </FormGroup>
              {/* <FormGroup>
                <Label htmlFor="isActive">Activar</Label>
                <CustomInput
                  id="isActive"
                  type="checkbox"
                  name="isActive"
                  value={formik.values.isActive}
                  checked={formik.values.isActive}
                  onChange={formik.handleChange}
                  label="Si"
                />
              </FormGroup> */}
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

export default UserForm
