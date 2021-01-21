import React, { useState, useEffect, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, FormGroup, Label, CustomInput } from 'reactstrap'
import { Formik } from 'formik'

import { SpinCircle } from 'components/Spin'

import ubigeoAction from 'redux/actions/ubigeoAction'
import userAction from 'redux/actions/userAction'

const RegionForm = ({ show, dismiss }) => {
  const [isLoading, setIsLoading] = useState(true)

  const [initialValues, setInitialValues] = useState({
    user_id: '',
    departament_id: []
  })

  const dispatch = useDispatch()

  const data = useSelector((store) => store.userReducer.user)

  useEffect(() => {
    if (data) {
      setInitialValues({
        user_id: data.id,
        departament_id: data.departmentsList
      })
      setIsLoading(false)
    }
  }, [data])

  const [regionLoading, setRegionLoading] = useState(true)

  const regions = useSelector((store) => store.ubigeoReducer.ubigeo)

  const fetchRegions = useCallback(() => {
    dispatch(ubigeoAction.findAll()).then((status) => {
      console.log('regions', status)
      setRegionLoading(false)
    })
  }, [dispatch])

  useEffect(() => fetchRegions(), [fetchRegions])

  if (isLoading) return null

  return (
    <Modal isOpen={show} toggle={dismiss} backdrop="static" keyboard={true} centered>
      <Formik
        enableReinitialize={true}
        initialValues={initialValues}
        onSubmit={(values, { setSubmitting }) => {
          dispatch(userAction.editRegions(values)).then((status) => {
            setSubmitting(false)
            if (status === 200 || status === 201) {
              dismiss()
            }
          })
        }}
      >
        {(formik) => (
          <Form onSubmit={formik.handleSubmit} className="form-horizontal">
            <ModalHeader toggle={dismiss}>Asignar regiones</ModalHeader>
            <ModalBody>
              {/* <pre>{JSON.stringify(formik.values, null, 2)}</pre> */}
              <FormGroup>
                <Label>Regiones</Label>
                {regionLoading ? (
                  <div className="form-control-plaintext animated fadeIn">
                    <SpinCircle /> Loading...
                  </div>
                ) : (
                  <CustomInput
                    style={{ height: 300 }}
                    id="departament_id"
                    type="select"
                    name="departament_id"
                    value={formik.values.departament_id}
                    onChange={formik.handleChange}
                    multiple
                  >
                    {regions.map((option, i) => (
                      <option key={i} value={option.id}>
                        {option.name}
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

export default RegionForm
