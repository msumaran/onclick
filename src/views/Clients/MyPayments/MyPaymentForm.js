
import React, {useState} from 'react'
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
     Card,
     CardText,
     CardTitle,
} from 'reactstrap'

import { Formik } from 'formik'
import * as yup from 'yup'

import { SpinCircle } from '../../../components/Spin'

import InputMask from 'react-input-mask';

import imgvisa from 'assets/img/cc-visa.svg';
import imgmastercard from 'assets/img/cc-mastercard.svg';
import imgamericanexpres from 'assets/img/cc-americanexpress.svg';

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

    const [cards, setCards] = useState(
        [
            {id:"visa", img: imgvisa, opacity:true, status:"disabled"},
            {id:"master", img: imgmastercard, opacity:true, status:"disabled"},
            {id:"american", img: imgamericanexpres, opacity:true, status:"disabled"},
        ]
    );

    const showPaymentForm = (value) => {

        var firstLetter = value.split("");

        let cards = [
            {id:"visa", img: imgvisa, opacity:true, status:"disabled"},
            {id:"master", img: imgmastercard, opacity:true, status:"disabled"},
            {id:"american", img: imgamericanexpres, opacity:true, status:"disabled"},
        ];

        switch (firstLetter[0]) {
            case "3":
                cards[2] = {id:"american", img: imgamericanexpres, opacity:true, status:""};
                setCards(cards);
                break;
            case "4":
                cards[0] = {id:"visa", img: imgvisa, opacity:true, status:""};
                setCards(cards);
                break;
            case "5":
                cards[1] = {id:"master", img: imgmastercard, opacity:true, status:""};
                setCards(cards);
                break;
            default:
                setCards(cards);
                break;
        }
    }

    const [showPackData, setShowPackData] = useState(false);
    const [packData, setPackData] = useState(
        { name:"", description:"", cover:"", price:"", }
    );

    const showDataPack = (value) => {
        if(value){
            setShowPackData(true);
            var data = (props.packs.filter((pack) => pack.id == value ))[0];
            setPackData(data);
        }else{
            setShowPackData(true);
            setPackData();
        }
    }

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
                                    invalid={formik.errors.cardname && formik.touched.cardname ? true : false}
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

                                <InputMask
                                    mask="9999-9999-9999-9999" maskChar="" alwaysShowMask="true" value={formik.values.cardnumber}
                                    onChange={
                                        (e) => {
                                            showPaymentForm(e.target.value)
                                            formik.handleChange(e)
                                        }
                                    }
                                    invalid={formik.errors.cardnumber && formik.touched.cardnumber ? true : false}
                                >
                                    {(inputProps) => <Input {...inputProps}  type="text" name="cardnumber"  /> }
                                </InputMask>

                                <div className="cards">
                                {cards.map((card, i) => {
                                    return ( <img className={card.status} src={card.img}  key={card.id} /> )
                                })}
                                </div>

                                <FormFeedback>{formik.errors.cardnumber}</FormFeedback>
                            </FormGroup>
                            <Row>
                                <Col xs={3}>
                                    <FormGroup>
                                        <Label>Expiración</Label>

                                        <InputMask mask="99/9999"
                                            maskChar=""
                                            alwaysShowMask="true"
                                            value={formik.values.carddate}
                                            onChange={formik.handleChange}
                                            invalid={formik.errors.carddate && formik.touched.carddate ? true : false}
                                        >
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
                                            invalid={formik.errors.cardcvv && formik.touched.cardcvv ? true : false}
                                        />
                                        <FormFeedback>{formik.errors.cardcvv}</FormFeedback>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <FormGroup>
                                <Label>Paquete</Label>
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
                                        onChange={
                                            (e) => {
                                                showDataPack(e.target.value)
                                                formik.handleChange(e)
                                            }
                                        }
                                        invalid={formik.errors.pack_id && formik.touched.pack_id ? true : false}
                                    >
                                        <option value="" label="Seleccione" />
                                        {props.packs.map((pack, i) => (
                                            <option key={i} value={pack.id} label={pack.name} />
                                        ))}
                                    </CustomInput>
                                )}
                                <FormFeedback>{formik.errors.pack_id}</FormFeedback>

                                <br/>
                                <br/>

                                {
                                    showPackData &&
                                    <Card body>
                                        <CardTitle tag="h5">Paquete: { packData.name }</CardTitle>
                                        <CardText>
                                            Precio: { packData.price }
                                            <br/>
                                            { packData.description }
                                        </CardText>
                                    </Card>
                                }

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
