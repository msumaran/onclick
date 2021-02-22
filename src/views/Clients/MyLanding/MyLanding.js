
import React, { useEffect, useRef } from 'react'
import { Button, Card, CardBody, Col, Row } from 'reactstrap'

import Preloader from '../../../components/Preloader/Preloader'

import { useDispatch, useSelector } from 'react-redux'

import landingActions from 'redux/actions/landingActions'

import PermissionHelper from 'helpers/PermissionHelper'

import EmailEditor from 'react-email-editor'
import sample from './sample.json'

const MyLanding = () => {

    const dispatch = useDispatch()

    const my_permissions = useSelector((state) => state.accountReducer.permissions)

    const permission_helper = new PermissionHelper(my_permissions)

    const landingCode = useSelector((state) => state.landingReducer.code)
    const landingHtml = useSelector((state) => state.landingReducer.html)
    const landingLoaded = useSelector((state) => state.landingReducer.loaded)

    const loadMyLanding = () => {

        dispatch(landingActions.getMyLanding())
    }

    useEffect(() => {

        if (!landingLoaded) {

            loadMyLanding()
        }
    }, [ loadMyLanding, landingLoaded ])

    const editor_ref = useRef()

    const onLoadEditor = () => {

        const json = landingHtml === "" ? sample : JSON.parse(landingCode)

        editor_ref.current.editor.loadDesign(json)
    }

    const save = () => {
        editor_ref.current.editor.exportHtml((data) => {

            const { design, html } = data

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
                                        Guardar
                                    </Button>
                                ) : null}
                            </div>
                        </div>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
            {!landingLoaded ? (
                <Preloader />
            ) : (
                <EmailEditor
                    ref={editor_ref}
                    onLoad={onLoadEditor}
                />
            )}
        </div>
    )
}

export default MyLanding
