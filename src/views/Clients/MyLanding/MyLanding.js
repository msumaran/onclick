/*eslint no-unused-vars: "off" */

import React, { useEffect, useRef, useState } from 'react'
import { Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap'
import { Prompt } from 'react-router'

import Preloader from '../../../components/Preloader/Preloader'

import { useDispatch, useSelector } from 'react-redux'

import landingActions from 'redux/actions/landingActions'
import { string_to_slug } from 'redux/reducers/landingReducer'

import PermissionHelper from 'helpers/PermissionHelper'

import HtmlEditor from '../../../components/HtmlEditor/HtmlEditor'
import { configApp } from 'helpers/config'

import accountAction from 'redux/actions/accountAction'

const MyLanding = () => {

    const dispatch = useDispatch()

    const my_permissions = useSelector((state) => state.accountReducer.permissions)

    const landingId = useSelector((state) => state.landingReducer.id)
    const landingCode = useSelector((state) => state.landingReducer.code)
    const isPublished = useSelector((state) => state.landingReducer.published)
    const landingSeo = useSelector((state) => state.landingReducer.seo)
    const landingMessages = useSelector((state) => state.landingReducer.messages)
    const landingLoaded = useSelector((state) => state.landingReducer.loaded)
    const landingSaveDraftStatus = useSelector((state) => state.landingReducer.saveDraftStatus)
    const landingPublishStatus = useSelector((state) => state.landingReducer.publishStatus)
    const saveSeoStatus = useSelector((state) => state.landingReducer.saveSeoStatus)
    const saveMessagesStatus = useSelector((state) => state.landingReducer.saveMessagesStatus)

    const [ state, setState ] = useState({
        design: JSON.parse(landingCode),
        designLoaded: false,
    })

    const [ draftModified, setDraftModified ] = useState(false)

    const [ activeTab, setActiveTab ] = useState('editor')
    const [ seo, setSeo ] = useState(landingSeo)
    const [ validSlug, setValidSlug ] = useState(true)
    const [ messages, setMessages ] = useState(landingMessages)

    const editor_ref = useRef()

    const loadMyLanding = () => {

        dispatch(landingActions.getMyLanding())
    }

    useEffect(() => {

        if (!landingLoaded) {

            loadMyLanding()
        } else {

            if (!state.designLoaded) {

                setState({
                    ...state,
                    design: JSON.parse(landingCode),
                    designLoaded: true
                })
            }
        }
    }, [ landingCode, landingLoaded, loadMyLanding ])

    const getSaveDraftStatus = () => {

        switch(landingSaveDraftStatus) {
            case 'saving':
                return 'Guardando...'
            default:
                return 'Guardar borrador'
        }
    }

    const getPublishStatus = () => {

        switch(landingPublishStatus) {
            case 'publishing':
                return 'Publicando...'
            default:
                return 'Publicar'
        }
    }

    const getSaveSeoStatus = () => {

        if (saveSeoStatus === 'saving') {
            return 'Guardando...'
        } else {
            return 'Guardar'
        }
    }

    const getSaveMessagesStatus = () => {

        if (saveMessagesStatus === 'saving') {
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

        const _seo = Object.assign({}, seo)

        if (field === 'slug') {

            if (value !== landingSeo.slug) {

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

        const isValid = await dispatch(landingActions.validateSlug(landingId, slug))

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

            dispatch(landingActions.saveDraft(data))
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

            dispatch(landingActions.publish(data))
        })
    }

    const saveSeo = () => {

        if (!validSlug) {

            alert('Valida la ruta para guardarla')
            return
        }

        dispatch(landingActions.saveSeo(seo)).then((status) => {
            if (status === 200 || status === 202) {
                dispatch(accountAction.getAccountData())
            }
          })

    }

    const saveMessages = () => {

        dispatch(landingActions.saveMessages(messages))
    }

    const hideSidebar = () => {

        const body = document.getElementsByTagName('body')[0]
        body.classList.remove('sidebar-lg-show')

        document.getElementsByClassName('main-breadcrumb')[0].classList.add('d-none')
        document.getElementsByClassName('main-container')[0].classList.add('no-breadcrumb')
    }

    hideSidebar()

    console.log("landingLoaded ", landingLoaded);

    return (
        <>
            <Prompt
                when={draftModified}
                message='¿Estás seguro de continuar sin guardar? Algunos cambios podrian perderse.'
            />
            <div className="module-editor animated fadeIn">
                {!landingLoaded ? <Preloader /> : (
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
                                    </div>
                                    <div className="btn-toolbar tab-pane-toolbar">
                                        {isPublished && (
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
                                                                            { name: "fullname", label: "Nombres y apellidos", type: "text" },
                                                                            { name: "email", label: "Correo electrónico", type: "email" },
                                                                            { name: "message", label: "Mensaje", type: "textarea", show_label: true }
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
                                                                    {
                                                                        name: 'message',
                                                                        type: 'textarea',
                                                                        label: 'Mensaje',
                                                                        placeholder_text: 'Mensaje',
                                                                        show_label: true,
                                                                        required: false,
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
                                                    {configApp.websiteUrl}/u/
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

export default MyLanding
