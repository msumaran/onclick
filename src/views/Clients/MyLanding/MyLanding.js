
import React, { useEffect, useRef, useState } from 'react'
import { Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap'

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
    const landingTitle = useSelector((state) => state.landingReducer.title)
    const landingDescription = useSelector((state) => state.landingReducer.description)
    const landingOgTitle = useSelector((state) => state.landingReducer.og_title)
    const landingOgDescription = useSelector((state) => state.landingReducer.og_description)
    const landingOgType = useSelector((state) => state.landingReducer.og_type)
    const landingOgSiteName = useSelector((state) => state.landingReducer.og_site_name)
    const landingLoaded = useSelector((state) => state.landingReducer.loaded)
    const landingSaveStatus = useSelector((state) => state.landingReducer.saveStatus)

    const [ state, setState ] = useState({
        design: sample,
        designLoaded: false,
    })

    const [ activeTab, setActiveTab ] = useState('editor')
    const [ seo, setSeo ] = useState({
        title: landingTitle,
        description: landingDescription,
        og_title: landingOgTitle,
        og_description: landingOgDescription,
        og_type: landingOgType,
        og_site_name: landingOgSiteName,
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

    const getSaveDraftStatus = () => {

        switch(landingSaveStatus) {
            case 'saving':
                return 'Guardando...'
            default:
                return 'Guardar borrador'
        }
    }

    const onLoadEditor = () => {

        console.log('onLoad')
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

    const save = (publish = false) => {
        editor_ref.current.editor.exportHtml((editor_data) => {

            const { design, html } = editor_data

            setState({
                ...state,
                design: design
            })

            const data = {
                title: seo.title,
                code: JSON.stringify({ body: design.body }),
                html
            }

            dispatch(landingActions.saveMyLanding(data, publish))
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

                                    save()

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
                                        onClick={() => save()}
                                    >
                                        <i className="icon-disc"></i> {getSaveDraftStatus()}
                                    </button>
                                </div>
                                <div className="btn-group">
                                    <button className="btn btn-primary"
                                        onClick={() => save(true)}
                                    >
                                        <i className="icon-globe"></i> Publicar
                                    </button>
                                </div>
                            </div>
                            <div className="tab-pane-content less-toolbar">
                                <HtmlEditor
                                    ref={editor_ref}
                                    design={state.design}
                                    onLoad={() => onLoadEditor()}
                                    style={{
                                        border: '1px solid #c8ced3'
                                    }}
                                    options={{
                                        locale: 'es-ES',
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
                                        <textarea rows="4" className="form-control"></textarea>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label htmlFor="" className="col-sm-2 col-form-label text-right">
                                        og:title
                                    </label>
                                    <div className="col-sm-10">
                                        <input type="text" className="form-control" />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label htmlFor="" className="col-sm-2 col-form-label text-right">
                                        og:description
                                    </label>
                                    <div className="col-sm-10">
                                        <textarea rows="4" className="form-control"></textarea>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label htmlFor="" className="col-sm-2 col-form-label text-right">
                                        og:type
                                    </label>
                                    <div className="col-sm-10">
                                        <input type="text" className="form-control" />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label htmlFor="" className="col-sm-2 col-form-label text-right">
                                        og:site_name
                                    </label>
                                    <div className="col-sm-10">
                                        <input type="text" className="form-control" />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <div className="offset-sm-2 col-sm-10">
                                        <button className="btn btn-primary"
                                            onClick={(e) => {
                                                e.preventDefault()

                                                save()
                                            }}
                                        >
                                            {getSaveDraftStatus()}
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </TabPane>
                    </TabContent>
                </>
            )}
        </div>
    )
}

export default MyLanding
