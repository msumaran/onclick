
import React from 'react'
import {
    Button,
    Row,
    Col,
    Form,
    FormGroup,
     FormFeedback,
     Input,
     Label,
     Modal,
     ModalBody,
     ModalHeader,
     CustomInput,
     ModalFooter,
} from 'reactstrap'

import { Formik } from 'formik'
import * as yup from 'yup'

import { SpinCircle } from '../../../components/Spin'

import InputMask from 'react-input-mask';

const MyPaymentForm = (props) => {

    const initialValues = {
        id: '',
        cardname: '',
        cardnumber: '',
        carddate: '',
        cardcvv: '',
        pack_id: ''
    }

    const validationSchema = yup.object().shape({
        cardname: yup.string().required('Este dato es necesario'),
        cardnumber: yup.string().required('Este dato es necesario').length(19, 'Debe de tener 16 digitos.'),
        carddate: yup.string().required('Este dato es necesario').length(7, 'Debe de tener 6 digitos.'),
        cardcvv: yup.string().required('Este dato es necesario'),
        pack_id: yup.string().required('Este dato es necesario'),
    })

    return (
        <Modal
            isOpen={props.show}
            toggle={props.onDismiss}
            backdrop="static"
            keyboard={true}
            centered
        >
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={(values, methods) => {

                    props.onSubmit(values, methods)
                }}
            >
                {(formik) => (
                    <Form onSubmit={formik.handleSubmit}
                        className="form-horizontal"
                    >
                        <ModalHeader toggle={props.onDismiss}>
                            Nuevo Pago
                        </ModalHeader>
                        <ModalBody>

                            {/* <pre>{JSON.stringify(formik.values, null, 2)}</pre> */}

                            <FormGroup>
                                <Label>Titular de la tarjeta</Label>
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
                                <Label>Número de tarjeta</Label>
                                {/* <Input
                                    type="text"
                                    name="cardnumber"
                                    value={formik.values.cardnumber}
                                    onChange={formik.handleChange}
                                    invalid={formik.errors.cardnumber ? true : false}
                                /> */}

                                <InputMask mask="9999-9999-9999-9999" maskChar="" alwaysShowMask="true" value={formik.values.cardnumber} onChange={formik.handleChange} invalid={formik.errors.cardnumber ? true : false} >
                                    {(inputProps) => <Input {...inputProps}  type="text" name="cardnumber"  /> }
                                </InputMask>

                                <FormFeedback>{formik.errors.cardnumber}</FormFeedback>
                            </FormGroup>
                            <Row>
                                <Col xs={3}>
                                    <FormGroup>
                                        <Label>Expiración</Label>

                                        <InputMask mask="99/9999" maskChar="" alwaysShowMask="true" value={formik.values.carddate} onChange={formik.handleChange} invalid={formik.errors.carddate ? true : false} >
                                            {(inputProps) => <Input {...inputProps}  type="text" name="carddate"  /> }
                                        </InputMask>

                                        <FormFeedback>{formik.errors.carddate}</FormFeedback>
                                    </FormGroup>
                                </Col>
                                <Col xs={3}>
                                    <FormGroup>
                                        <Label>CVV</Label>
                                        <Input
                                            type="text"
                                            name="cardcvv"
                                            value={formik.values.cardcvv}
                                            onChange={formik.handleChange}
                                            invalid={formik.errors.cardcvv ? true : false}
                                        />
                                        <FormFeedback>{formik.errors.cardcvv}</FormFeedback>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <FormGroup>
                                <Label>Pack</Label>
                                {!props.packs.length ? (
                                    <div className="form-control-plaintext animated fadeIn">
                                        <SpinCircle /> Cargando...
                                    </div>
                                ) : (
                                    <CustomInput
                                        id="pack_id"
                                        type="select"
                                        name="pack_id"
                                        value={formik.values.pack}
                                        onChange={formik.handleChange}
                                        invalid={formik.errors.pack_id ? true : false}
                                    >
                                        <option disabled label="Seleccione" />
                                        {props.packs.map((pack, i) => (
                                            <option key={i} value={pack.id} label={pack.name} />
                                        ))}
                                    </CustomInput>
                                )}
                                <FormFeedback>{formik.errors.pack_id}</FormFeedback>
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
                            <Button type="button" color="secondary" onClick={props.onDismiss}>
                                Cancelar
                            </Button>
                        </ModalFooter>
                    </Form>
                )}
            </Formik>
        </Modal>
    )
}

export default MyPaymentForm
