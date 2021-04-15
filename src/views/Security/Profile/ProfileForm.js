import React, { useState, useEffect, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, FormGroup, Label, CustomInput } from 'reactstrap'
import { Formik } from 'formik'

import { SpinCircle } from 'components/Spin'

import permissionAction from 'redux/actions/permissionAction'
import profileAction from 'redux/actions/profileAction'

const ProfileForm = ({ show, dismiss }) => {
  const [isLoading, setIsLoading] = useState(true)

  const [initialValues, setInitialValues] = useState({
    profile_id: '',
    permissions_id: []
  })

  const [permissionLoading, setPermissionLoading] = useState(true)

  const dispatch = useDispatch()

  const data = useSelector((store) => store.profileReducer.profile)

  useEffect(() => {
    if (data) {
      setInitialValues({
        profile_id: data.id,
        permissions_id: data.permissionList
      })
      setIsLoading(false)
    }
  }, [data])

  const permissions = useSelector((store) => store.permissionReducer.permissions)

  const fetchPermissions = useCallback(() => {
    dispatch(permissionAction.findAll()).then((status) => {
      console.log('permissions', status)
      setPermissionLoading(false)
    })
  }, [dispatch])

  useEffect(() => fetchPermissions(), [fetchPermissions])

  if (isLoading) return null

  return (
    <Modal isOpen={show} toggle={dismiss} backdrop="static" keyboard={true} centered>
      <Formik
        enableReinitialize={true}
        initialValues={initialValues}
        onSubmit={(values, { setSubmitting }) => {

          dispatch(profileAction.update(values.profile_id, values)).then((status) => {
            setSubmitting(false)

            console.log({ status })

            if (status === 200 || status === 201) {
              dismiss()
            }
          })
        }}
      >
        {(formik) => (
          <Form onSubmit={formik.handleSubmit} className="form-horizontal">
            <ModalHeader toggle={dismiss}>Permisos</ModalHeader>
            <ModalBody>
              {/* <pre>{JSON.stringify(formik.values, null, 2)}</pre> */}
              <FormGroup>
                <Label>Acciones</Label>
                {permissionLoading ? (
                  <div className="form-control-plaintext animated fadeIn">
                    <SpinCircle /> Loading...
                  </div>
                ) : (
                  <CustomInput
                    style={{ height: 300 }}
                    id="permissions_id"
                    type="select"
                    name="permissions_id"
                    value={formik.values.permissions_id}
                    onChange={formik.handleChange}
                    multiple
                  >
                    {permissions.map((option, i) => (
                      <option key={i} value={option.id}>
                        {`${option.module} - ${option.name} - ${option.description}`}
                      </option>
                    ))}
                  </CustomInput>
                )}
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

export default ProfileForm
