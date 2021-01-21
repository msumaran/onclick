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
  Input,
  InputGroup,
  InputGroupAddon
} from 'reactstrap'
import { Formik } from 'formik'
import * as yup from 'yup'

import { SpinCircle } from 'components/Spin'

import userAction from 'redux/actions/userAction'

const validationSchema = yup.object().shape({
  password: yup.string().required('This field is required.'),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords do not match.')
    .required('Password confirm is required.')
})

const ChangePasswordForm = ({ show, dismiss }) => {
  const [isLoading, setIsLoading] = useState(true)

  const [isPassword, setIsPassword] = useState(true)

  const dispatch = useDispatch()

  const data = useSelector((store) => store.userReducer.user)

  const [initialValues, setInitialValues] = useState({
    id: '',
    password: '',
    passwordConfirm: '',
    isChangePasword: true
  })

  useEffect(() => {
    if (data) {
      setInitialValues({
        id: data.id,
        password: '',
        passwordConfirm: '',
        isChangePasword: true
      })
      setIsLoading(false)
    }
  }, [data])

  if (isLoading) return null

  return (
    <Formik
      enableReinitialize={true}
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        dispatch(userAction.changePassword(values.id, values)).then((status) => {
          setSubmitting(false)

          if (status === 200 || status === 202  ) {
            resetForm()
            dismiss()
          }
        })
      }}
    >
      {(formik) => (
        <Modal isOpen={show} backdrop="static" keyboard={true} centered>
          <Form onSubmit={formik.handleSubmit} className="form-horizontal">
            <ModalHeader toggle={dismiss}>Actualizar contraseña</ModalHeader>
            <ModalBody>
              {/* <pre>{JSON.stringify(formik.values, null, 2)}</pre> */}
              <FormGroup>
                <Label htmlFor="password">Nueva contraseña</Label>
                <InputGroup className={formik.errors.password ? 'is-invalid' : null}>
                  <Input
                    type={isPassword ? 'password' : 'text'}
                    name="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    invalid={formik.errors.password ? true : false}
                  />
                  <InputGroupAddon addonType="append">
                    <Button color="secondary" onClick={() => setIsPassword(!isPassword)}>
                      {isPassword ? <i className="icon-lock-open"></i> : <i className="icon-lock"></i>}
                    </Button>
                  </InputGroupAddon>
                </InputGroup>
                <FormFeedback>{formik.errors.password}</FormFeedback>
              </FormGroup>
              <FormGroup>
                <Label htmlFor="passwordConfirm">Confirmar contraseña</Label>
                <Input
                  type={isPassword ? 'password' : 'text'}
                  name="passwordConfirm"
                  value={formik.values.passwordConfirm}
                  onChange={formik.handleChange}
                  invalid={formik.errors.passwordConfirm ? true : false}
                />
                <FormFeedback>{formik.errors.passwordConfirm}</FormFeedback>
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
        </Modal>
      )}
    </Formik>
  )
}

export default ChangePasswordForm
