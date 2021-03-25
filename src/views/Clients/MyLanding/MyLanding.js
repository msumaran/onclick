
import React, { useEffect, useRef, useState } from 'react'
import { Button, Card, CardBody, Col, Row } from 'reactstrap'

import Preloader from '../../../components/Preloader/Preloader'

import { useDispatch, useSelector } from 'react-redux'

import landingActions from 'redux/actions/landingActions'

import PermissionHelper from 'helpers/PermissionHelper'

import HtmlEditor from '../../../components/HtmlEditor/HtmlEditor'

import sample from './sample.json'

const MyLanding = () => {

    const dispatch = useDispatch()

    const my_permissions = useSelector((state) => state.accountReducer.permissions)
    const permission_helper = new PermissionHelper(my_permissions)

    const landingCode = useSelector((state) => state.landingReducer.code)
    const landingLoaded = useSelector((state) => state.landingReducer.loaded)
    const landingSaveStatus = useSelector((state) => state.landingReducer.saveStatus)

    const [ state, setState ] = useState({
        design: sample,
        designLoaded: false,
    })

    const editor_ref = useRef()

    const loadMyLanding = () => {

        dispatch(landingActions.getMyLanding())
    }

    useEffect(() => {

        if (!landingLoaded) {

            loadMyLanding()
        } else {

            if (!state.designLoaded && landingCode !== '{}') {

                setState({
                    ...state,
                    design: JSON.parse(landingCode),
                    designLoaded: true
                })
            }
        }
    }, [ landingLoaded, loadMyLanding ])

    const getSaveStatus = () => {

        switch(landingSaveStatus) {
            case 'saving':
                return 'Guardando...'
            default:
                return 'Guardar'
        }
    }

    const onLoadEditor = () => {

        console.log('onLoad')
    }

    const save = () => {
        editor_ref.current.editor.exportHtml((data) => {

            const { design, html } = data

            setState({
                ...state,
                design: design
            })

            dispatch(landingActions.saveMyLanding({ body: design.body }, html))
        })
    }

    return (
        <div className="animated fadeIn">
            <Row>
                <Col xs={12}>
                    <Card>
                        <CardBody>
                        <div className="rt-wrapper">
                            <div className="rt-buttons">
                                {permission_helper.validate('landing', 'u') ? (
                                    <Button color="primary" onClick={() => save()}>
                                        {getSaveStatus()}
                                    </Button>
                                ) : null}
                            </div>
                        </div>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
            {!landingLoaded ? <Preloader /> : (
                <HtmlEditor
                    ref={editor_ref}
                    design={state.design}
                    onLoad={() => onLoadEditor()}
                    options={{
                        locale: 'es-ES',
                        // translations: {
                        //     'es-ES': {
                        //         "content_tools.button": "El botón",
                        //         "option_groups.responsive_design.title": "Ver diseño adaptativo",
                        //     }
                        // },
                        tools: {
                            form: {
                                usageLimit: 1,
                                properties: {
                                    buttonText: 'Enviar',
                                    fields: {
                                        editor: {
                                            data: {
                                                allowCustomUrl: false,
                                                allowAddNewField: false,
                                                defaultFields: [
                                                    {name: "fullname", label: "Nombres y apellidos", type: "text"},
                                                    {name: "email", label: "Correo electrónico", type: "email"}
                                                ],
                                            }
                                        },
                                        value: [
                                            {
                                                name: 'fullname',
                                                type: 'text',
                                                label: 'Nombres y apellidos',
                                                placeholder_text: 'Nombres y apellidos',
                                                show_label: true,
                                                required: true,
                                            },
                                            {
                                                name: 'email',
                                                type: 'email',
                                                label: 'Correo electrónico',
                                                placeholder_text: 'Correo electrónico',
                                                show_label: true,
                                                required: true,
                                            },
                                        ]
                                    },
                                    action: {
                                        editor: {
                                            data: {
                                                actions: [
                                                    {
                                                        label: 'Marketing',
                                                        method: 'POST',
                                                        url: '',
                                                    }
                                                ]
                                            }
                                        }
                                    },
                                }
                            }
                        }
                    }}
                />
            )}
        </div>
    )
}

export default MyLanding
