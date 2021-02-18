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
  InputGroup,
  InputGroupAddon
} from 'reactstrap'
import { Formik } from 'formik'
import * as yup from 'yup'

import { SpinCircle } from 'components/Spin'

import profileAction from 'redux/actions/profileAction'
import userAction from 'redux/actions/userAction'

const initialValues = {
  id: '',
  name: '',
  lastname: '',
  username: '',
  password: '',
  passwordConfirm: '',
  profileId: '',
  // isActive: true,
  isChangePassword: false
}

const UserForm = ({ show, dismiss, isEdit }) => {
  const [profileLoading, setProfileLoading] = useState(true)

  const [isPassword, setIsPassword] = useState(true)

  const togglePassword = () => setIsPassword(!isPassword)

  const data = useSelector((store) => store.userReducer.user)

  const profiles = useSelector((store) => store.profileReducer.profiles)

  const dispatch = useDispatch()

  const fetchProfiles = useCallback(() => {
    dispatch(profileAction.findAll()).then((status) => {
      // console.log('fetchprofiles', status)
      setProfileLoading(!profileLoading)
    })
  }, [ dispatch, profileLoading ])

  useEffect(() => fetchProfiles(), [fetchProfiles])

  return (
    <Modal isOpen={show} toggle={dismiss} backdrop="static" keyboard={true} centered>
      <Formik
        initialValues={
          isEdit
            ? {
                ...data,
                isChangePassword: false,
                profileId: data.profile.id
              }
            : initialValues
        }
        validationSchema={
          isEdit
            ? yup.object().shape({
                name: yup.string().required('This field is required.'),
                lastname: yup.string().required('This field is required.'),
                username: yup.string().required('This field is required.'),
                profileId: yup.string().required('This field is required.')
              })
            : yup.object().shape({
                name: yup.string().required('This field is required.'),
                lastname: yup.string().required('This field is required.'),
                username: yup.string().required('This field is required.'),
                password: yup.string().required('This field is required.'),
                passwordConfirm: yup
                  .string()
                  .oneOf([yup.ref('password'), null], 'Passwords do not match.')
                  .required('Password confirm is required.'),
                profileId: yup.string().required('This field is required.')
              })
        }
        onSubmit={(values, { setSubmitting, resetForm }) => {
          if (isEdit) {
            //  EDIT
            dispatch(userAction.update(values.id, values)).then((status) => {
              setSubmitting(false)
              if (status === 200 || status === 202) {
                // console.log('EDITADO! fin')
                resetForm()
                dismiss()
              }
            })
          } else {
            // NEW
            dispatch(userAction.create(values)).then((status) => {
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
            <ModalHeader toggle={dismiss}>{isEdit ? 'Editar Usuario' : 'Nuevo Usuario'}</ModalHeader>
            <ModalBody>
              {/* <pre>{JSON.stringify(formik.values, null, 2)}</pre> */}

              <FormGroup>
                <Label htmlFor="name">Nombre</Label>
                <Input
                  type="text"
                  name="name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  invalid={formik.errors.name ? true : false}
                />
                <FormFeedback>{formik.errors.name}</FormFeedback>
              </FormGroup>
              <FormGroup>
                <Label htmlFor="lastname">Apellidos</Label>
                <Input
                  type="text"
                  name="lastname"
                  value={formik.values.lastname}
                  onChange={formik.handleChange}
                  invalid={formik.errors.lastname ? true : false}
                />
                <FormFeedback>{formik.errors.lastname}</FormFeedback>
              </FormGroup>
              <FormGroup>
                <Label htmlFor="username">
                  Usuario{` `}
                  <small>- Este campo no podra ser editado posteriormente.</small>
                </Label>
                <Input
                  type="text"
                  name="username"
                  value={formik.values.username}
                  onChange={formik.handleChange}
                  invalid={formik.errors.username ? true : false}
                  disabled={isEdit}
                />
                <FormFeedback>{formik.errors.username}</FormFeedback>
              </FormGroup>
              {!isEdit ? (
                <>
                  <FormGroup>
                    <Label htmlFor="password">Contraseña</Label>
                    <InputGroup className={formik.errors.password ? 'is-invalid' : null}>
                      <Input
                        type={isPassword ? 'password' : 'text'}
                        name="password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        invalid={formik.errors.password ? true : false}
                      />
                      <InputGroupAddon addonType="append">
                        <Button color="secondary" onClick={togglePassword}>
                          {isPassword ? <i className="icon-lock-open"></i> : <i className="icon-lock"></i>}
                        </Button>
                      </InputGroupAddon>
                    </InputGroup>
                    <FormFeedback>{formik.errors.password}</FormFeedback>
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="passwordConfirm">Confirmar contraseña</Label>
                    <InputGroup className={formik.errors.passwordConfirm ? 'is-invalid' : null}>
                      <Input
                        type={isPassword ? 'password' : 'text'}
                        name="passwordConfirm"
                        value={formik.values.passwordConfirm}
                        onChange={formik.handleChange}
                        invalid={formik.errors.passwordConfirm ? true : false}
                      />
                      <InputGroupAddon addonType="append">
                        <Button color="secondary" onClick={togglePassword}>
                          {isPassword ? <i className="icon-lock-open"></i> : <i className="icon-lock"></i>}
                        </Button>
                      </InputGroupAddon>
                    </InputGroup>
                    <FormFeedback>{formik.errors.passwordConfirm}</FormFeedback>
                  </FormGroup>
                </>
              ) : null}
              <FormGroup>
                <Label htmlFor="profileId">Perfil</Label>
                {profileLoading ? (
                  <div className="form-control-plaintext animated fadeIn">
                    <SpinCircle /> Loading...
                  </div>
                ) : (
                  <CustomInput
                    id="profileId"
                    type="select"
                    name="profileId"
                    value={formik.values.profileId}
                    onChange={formik.handleChange}
                    invalid={formik.errors.profileId ? true : false}
                  >
                    <option disabled label="Select..." />
                    {profiles.map((option, i) => (
                      // {profileIds.map((option, i) => (
                      <option key={i} value={option.id} label={option.name} />
                    ))}
                  </CustomInput>
                )}
                <FormFeedback>{formik.errors.profileId}</FormFeedback>
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
                    'Guardar editición'
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
