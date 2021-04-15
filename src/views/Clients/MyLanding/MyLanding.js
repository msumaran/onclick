/*eslint no-unused-vars: "off" */

import React, { useEffect, useRef, useState } from 'react'
import { Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap'
import { Prompt } from 'react-router'

import Preloader from '../../../components/Preloader/Preloader'

import { useDispatch, useSelector } from 'react-redux'

import landingActions from 'redux/actions/landingActions'

import PermissionHelper from 'helpers/PermissionHelper'

import HtmlEditor from '../../../components/HtmlEditor/HtmlEditor'

const MyLanding = () => {

    const dispatch = useDispatch()

    const my_permissions = useSelector((state) => state.accountReducer.permissions)

    const landingCode = useSelector((state) => state.landingReducer.code)
    const landingSeo = useSelector((state) => state.landingReducer.seo)
    const landingLoaded = useSelector((state) => state.landingReducer.loaded)
    const landingSaveDraftStatus = useSelector((state) => state.landingReducer.saveDraftStatus)
    const landingPublishStatus = useSelector((state) => state.landingReducer.publishStatus)

    const [ state, setState ] = useState({
        design: JSON.parse(landingCode),
        designLoaded: false,
    })

    const [ draftModified, setDraftModified ] = useState(false)

    const [ activeTab, setActiveTab ] = useState('editor')
    const [ seo, setSeo ] = useState(landingSeo)

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

    const onLoadDesign = () => {

        console.log('Design loaded')
    }

    const onUpdateDesign = () => {

        console.log('Design updated')

        setDraftModified(true)
    }

    const handleSeoInputsChange = (field, value) => {

        setSeo({
            ...seo,
            [field]: value
        })
    }

    const showPreview = (device) => {

        editor_ref.current.editor.showPreview(device)
    }

    const saveDraft = () => {

        setDraftModified(false)

        editor_ref.current.editor.exportHtml((editor_data) => {

            const { design } = editor_data

            const data = {
                seo,
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
                seo,
                code: JSON.stringify({ body: design.body }),
                html,
            }

            dispatch(landingActions.publish(data))
        })
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
                                    onClick={() => {

                                        setActiveTab('seo')
                                    }}
                                >
                                    SEO
                                </NavLink>
                            </NavItem>
                        </Nav>
                        <TabContent activeTab={activeTab}>
                            <TabPane tabId='editor' className="tab-pane-editor">
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
                        </TabContent>
                    </>
                )}
            </div>
        </>
    )
}

export default MyLanding
