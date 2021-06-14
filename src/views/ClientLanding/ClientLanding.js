/*eslint no-unused-vars: "off" */

import React, { useEffect, useRef, useState } from 'react'
import { Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap'
import { Prompt } from 'react-router'

import Preloader from 'components/Preloader/Preloader'

import { useDispatch, useSelector } from 'react-redux'

import clientLandingActions from 'redux/actions/clientLandingActions'
import { string_to_slug } from 'redux/reducers/clientLandingReducer'

import PermissionHelper from 'helpers/PermissionHelper'

import HtmlEditor from 'components/HtmlEditor/HtmlEditor'

import { configApp } from 'helpers/config'

const ClientLanding = (props) => {

    const dispatch = useDispatch()

    const my_permissions = useSelector((state) => state.accountReducer.permissions)
    const permission_helper = new PermissionHelper(my_permissions)

    const clientLandingId = useSelector((state) => state.clientLandingReducer.id)
    const clientLandingCode = useSelector((state) => state.clientLandingReducer.code)
    const ClientLandingIsPublished = useSelector((state) => state.clientLandingReducer.published)
    const clientLandingSeo = useSelector((state) => state.clientLandingReducer.seo)
    const clientLandingMessages = useSelector((state) => state.clientLandingReducer.messages)
    const clientLandingLoaded = useSelector((state) => state.clientLandingReducer.loaded)
    const clientLandingSaveDraftStatus = useSelector((state) => state.clientLandingReducer.saveDraftStatus)
    const clientLandingPublishStatus = useSelector((state) => state.clientLandingReducer.publishStatus)
    const clientLandingSaveSeoStatus = useSelector((state) => state.clientLandingReducer.saveSeoStatus)
    const clientLandingSaveMessagesStatus = useSelector((state) => state.clientLandingReducer.saveMessagesStatus)

    const [ state, setState ] = useState({
        design: JSON.parse(clientLandingCode),
        designLoaded: false,
    })

    const [ draftModified, setDraftModified ] = useState(false)

    const [ activeTab, setActiveTab ] = useState('editor')
    const [ seo, setSeo ] = useState(clientLandingSeo)
    const [ validSlug, setValidSlug ] = useState(true)
    const [ messages, setMessages ] = useState(clientLandingMessages)

    const editor_ref = useRef()

    const client_id = props.match.params.client_id

    const loadClientLanding = () => {

        dispatch(clientLandingActions.getClientLanding(client_id))
    }

    useEffect(() => {

        if (!clientLandingLoaded) {

            loadClientLanding()
        } else {

            if (!state.designLoaded) {

                setState({
                    ...state,
                    design: JSON.parse(clientLandingCode),
                    designLoaded: true
                })
            }
        }
    }, [ clientLandingCode, clientLandingLoaded, loadClientLanding ])

    const getSaveDraftStatus = () => {

        switch(clientLandingSaveDraftStatus) {
            case 'saving':
                return 'Guardando...'
            default:
                return 'Guardar borrador'
        }
    }

    const getPublishStatus = () => {

        switch(clientLandingPublishStatus) {
            case 'publishing':
                return 'Publicando...'
            default:
                return 'Publicar'
        }
    }

    const getSaveSeoStatus = () => {

        if (clientLandingSaveSeoStatus === 'saving') {
            return 'Guardando...'
        } else {
            return 'Guardar'
        }
    }

    const getSaveMessagesStatus = () => {

        if (clientLandingSaveMessagesStatus === 'saving') {
            return 'Guardando...'
        } else {
            return 'Guardar'
        }
    }

    const onLoadDesign = () => {

        console.log('Design loaded')
    }

    const onUpdateDesign = () => {

        console.log('Design updated')

        setDraftModified(true)
    }

    const handleSeoInputsChange = (field, value) => {

        if (field === 'slug') {

            if (value !== clientLandingSeo.slug) {

                setValidSlug(false)
            }
        }

        setSeo({
            ...seo,
            [field]: value
        })
    }

    const handleMessagesInputsChange = (field, value) => {

        setMessages({
            ...messages,
            [field]: value
        })
    }

    const validarSlug = async () => {

        const slug  = string_to_slug(seo.slug)

        setSeo({ ...seo, slug })

        const isValid = await dispatch(clientLandingActions.validateSlug(clientLandingId, slug))

        setValidSlug(isValid)
    }

    const showPreview = (device) => {

        editor_ref.current.editor.showPreview(device)
    }

    const saveDraft = () => {

        setDraftModified(false)

        editor_ref.current.editor.exportHtml((editor_data) => {

            const { design } = editor_data

            const data = {
                code: JSON.stringify({ body: design.body }),
            }

            dispatch(clientLandingActions.saveDraft(client_id, data))
        })
    }

    const publish = () => {

        setDraftModified(false)

        editor_ref.current.editor.exportHtml((editor_data) => {

            const { design, html } = editor_data

            const data = {
                code: JSON.stringify({ body: design.body }),
                html,
            }

            dispatch(clientLandingActions.publish(client_id, data))
        })
    }

    const saveSeo = () => {

        dispatch(clientLandingActions.saveSeo(client_id, seo))
    }

    const saveMessages = () => {

        dispatch(clientLandingActions.saveMessages(client_id, messages))
    }

    const hideSidebar = () => {

        const body = document.getElementsByTagName('body')[0]
        body.classList.remove('sidebar-lg-show')

        document.getElementsByClassName('main-breadcrumb')[0].classList.add('d-none')
        document.getElementsByClassName('main-container')[0].classList.add('no-breadcrumb')
    }

    hideSidebar()

    return (
        <>
            <Prompt
                when={draftModified}
                message='¿Estás seguro de continuar sin guardar? Algunos cambios podrian perderse.'
            />
            <div className="module-editor animated fadeIn">
                {!clientLandingLoaded ? <Preloader /> : (
                    <>
                        <Nav tabs>
                            <NavItem>
                                <NavLink
                                    className={activeTab === 'editor' ? 'active' : ''}
                                    onClick={() => setActiveTab('editor')}
                                >
                                    Editor
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink
                                    className={activeTab === 'seo' ? 'active' : ''}
                                    onClick={() => setActiveTab('seo')}
                                >
                                    SEO
                                </NavLink>
                            </NavItem>
                            {/* <NavItem>
                                <NavLink
                                    className={activeTab === 'message' ? 'active' : ''}
                                    onClick={() => setActiveTab('message')}
                                >
                                    Mensajes de Formulario
                                </NavLink>
                            </NavItem> */}
                        </Nav>
                        <TabContent activeTab={activeTab}>
                            <TabPane tabId='editor' className="tab-pane-editor">
                                <div className="d-flex justify-content-between">
                                    <div className="btn-toolbar tab-pane-toolbar">
                                        <div className="btn-group mr-1">
                                            <button className="btn btn-secondary"
                                                onClick={() => showPreview('desktop')}
                                            >
                                                <i className="icon-eye"></i> Previsualizar
                                            </button>
                                        </div>
                                        {!permission_helper.validate('client_landing', 'u') ? null : (
                                            <>
                                                <div className="btn-group mr-1">
                                                    <button className="btn btn-secondary"
                                                        onClick={() => saveDraft()}
                                                    >
                                                        <i className="icon-disc"></i> {getSaveDraftStatus()} {draftModified ? '*' : ''}
                                                    </button>
                                                </div>
                                                <div className="btn-group">
                                                    <button className="btn btn-primary"
                                                        onClick={() => publish()}
                                                    >
                                                        <i className="icon-globe"></i> {getPublishStatus()}
                                                    </button>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                    <div className="btn-toolbar tab-pane-toolbar">
                                        {ClientLandingIsPublished && (
                                            <div className="btn-group">
                                                <a className="btn btn-outline-secondary"
                                                    href={`${configApp.websiteUrl}u/${seo.slug}`}
                                                    target="_blank"
                                                >
                                                    <i className="oc oc-external-link-alt"></i>
                                                    Ir a landing
                                                </a>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="tab-pane-content less-toolbar">
                                    {!state.designLoaded ? null : (
                                        <HtmlEditor
                                            ref={editor_ref}
                                            design={state.design}
                                            onDesignLoaded={onLoadDesign}
                                            onDesignUpdated={onUpdateDesign}
                                            style={{
                                                border: '1px solid #c8ced3'
                                            }}
                                            options={{
                                                locale: 'es-ES',
                                                translations: {
                                                    'es-ES': {
                                                        "modals.delete.confirmation": "¿Estás seguro de que quieres eliminar esto?",
                                                        "editor.font_family.label": "Familia tipográfica",
                                                    }
                                                },
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
                                                                        allowCustomUrl: false,
                                                                        actions: [
                                                                            {
                                                                                label: 'Marketing',
                                                                                method: 'POST',
                                                                                target: '_blank',
                                                                                url: '',
                                                                            }
                                                                        ]
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }}
                                        />
                                    )}
                                </div>
                            </TabPane>

                            <TabPane tabId='seo'>
                                <div className="btn-toolbar tab-pane-toolbar">
                                    <div className="btn-group">
                                        <button className="btn btn-primary"
                                            onClick={() => saveSeo()}
                                        >
                                            <i className="icon-save"></i> {getSaveSeoStatus()}
                                        </button>
                                    </div>
                                </div>
                                <form>
                                    <div className="form-group row">
                                        <label htmlFor="" className="col-sm-2 col-form-label text-right">
                                            Título:
                                        </label>
                                        <div className="col-sm-10">
                                            <input type="text" className="form-control"
                                                value={seo.title}
                                                onChange={(e) => handleSeoInputsChange('title', e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label htmlFor="" className="col-sm-2 col-form-label text-right">
                                            Url:
                                        </label>
                                        <div className="col-sm-10">
                                        <div className="input-group has-validation">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text" id="basic-addon3">
                                                    {configApp.websiteUrl}u/
                                                </span>
                                            </div>
                                            <input type="text" className={`form-control is-${validSlug ? '' : 'in'}valid`}
                                                value={seo.slug}
                                                onChange={(e) => handleSeoInputsChange('slug', e.target.value)}
                                            />
                                            <div className="input-group-append">
                                                <button className={`btn btn-outline-${validSlug ? 'success' : 'danger'}`} type="button"
                                                    onClick={() => validarSlug()}
                                                >
                                                    {!validSlug ? (
                                                        <>
                                                            <i className="oc oc-question-circle"></i> Validar
                                                        </>
                                                    ) : (
                                                        <>
                                                            <i className="oc oc-check-circle"></i> Válido
                                                        </>
                                                    )}
                                                </button>
                                            </div>
                                        </div>
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label htmlFor="" className="col-sm-2 col-form-label text-right">
                                            Meta description:
                                        </label>
                                        <div className="col-sm-10">
                                            <textarea rows="4" className="form-control"
                                                value={seo.description}
                                                onChange={(e) => handleSeoInputsChange('description', e.target.value)}
                                            ></textarea>
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label htmlFor="" className="col-sm-2 col-form-label text-right">
                                            og:title
                                        </label>
                                        <div className="col-sm-10">
                                            <input type="text" className="form-control"
                                                value={seo.og_title}
                                                onChange={(e) => handleSeoInputsChange('og_title', e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label htmlFor="" className="col-sm-2 col-form-label text-right">
                                            og:description
                                        </label>
                                        <div className="col-sm-10">
                                            <textarea rows="4" className="form-control"
                                                value={seo.og_description}
                                                onChange={(e) => handleSeoInputsChange('og_description', e.target.value)}
                                            > </textarea>
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label htmlFor="" className="col-sm-2 col-form-label text-right">
                                            og:site_name
                                        </label>
                                        <div className="col-sm-10">
                                            <input type="text" className="form-control"
                                                value={seo.og_site_name}
                                                onChange={(e) => handleSeoInputsChange('og_site_name', e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    {/* <div className="form-group row">
                                        <div className="offset-sm-2 col-sm-10">
                                            <button className="btn btn-primary"
                                                onClick={(e) => {
                                                    e.preventDefault()

                                                    saveDraft()
                                                }}
                                            >
                                                {getSaveDraftStatus()}
                                            </button>
                                        </div>
                                    </div> */}
                                </form>
                            </TabPane>

                            <TabPane tabId='message'>
                                <div className="btn-toolbar tab-pane-toolbar">
                                    <div className="btn-group">
                                        <button className="btn btn-primary"
                                            onClick={() => saveMessages()}
                                        >
                                            <i className="icon-save"></i> {getSaveMessagesStatus()}
                                        </button>
                                    </div>
                                </div>
                                <form>
                                    <div className="form-group row">
                                        <label htmlFor="" className="col-sm-2 col-form-label text-right">
                                            Mensaje exitoso:
                                        </label>
                                        <div className="col-sm-10">
                                            <textarea rows="4" className="form-control"
                                                value={messages.success}
                                                onChange={(e) => handleMessagesInputsChange('success', e.target.value)}
                                            ></textarea>
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label htmlFor="" className="col-sm-2 col-form-label text-right">
                                            Mensaje fallido:
                                        </label>
                                        <div className="col-sm-10">
                                            <textarea rows="4" className="form-control"
                                                value={messages.faill}
                                                onChange={(e) => handleMessagesInputsChange('faill', e.target.value)}
                                            ></textarea>
                                        </div>
                                    </div>
                                    {/* <div className="form-group row">
                                        <div className="offset-sm-2 col-sm-10">
                                            <button className="btn btn-primary"
                                                onClick={(e) => {
                                                    e.preventDefault()

                                                    saveDraft()
                                                }}
                                            >
                                                {getSaveDraftStatus()}
                                            </button>
                                        </div>
                                    </div> */}
                                </form>
                            </TabPane>

                        </TabContent>
                    </>
                )}
            </div>
        </>
    )
}

export default ClientLanding
