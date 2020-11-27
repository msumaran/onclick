
import React, { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import FusePageSimple from '@fuse/core/FusePageSimple';
import { makeStyles } from '@material-ui/core'
import Button from '@material-ui/core/Button'

import EmailEditor from 'react-email-editor'
import sample from './sample.json';

// import { obtenerPokemonesAccion } from '../redux/pokeDucks'
import * as userActions from "../../auth/store/actions"

const useStyles = makeStyles(theme => ({
    page: {}
}))

const EditorPage = (props) => {

    const userUID = useSelector(({ auth }) => auth.user.uid);

    // const useEditor = useSelector(({ auth }) => auth.user.useEditor);
    const useEditor = true;

    const dispatch =  useDispatch()

    const classes = useStyles(props)

    const emailEditorRef = useRef(null)

    const landing = useSelector(({ auth }) => auth.user.landing.code ? JSON.parse( auth.user.landing.code ) : sample ) ;

    const onLoad = () => {
        emailEditorRef.current.editor.loadDesign( landing )
    }

    const saveLanding = () => {
        emailEditorRef.current.editor.exportHtml((data) => {
            dispatch( userActions.saveLanding( data, userUID ) )
        });
    }

    // const exportLanding = () => {
    //     emailEditorRef.current.editor.exportHtml((data) => {
    //         console.log(data.html)
    //         // dispatch( userActions.saveLanding( data.design, userUID ) )
    //     });
    // }

    // useEffect( ()=>{
    //     // onLoad()
    //     console.log("ok: ", landing)
        
    // }, [landing] )

    return (
        <div className={classes.page}>
            <FusePageSimple
                // rightSidebarContent={
                //     <div className="p-24">
                //         <h4>EditorPage</h4>
                //     </div>
                // }
                content={
                    <div className="p-24 rounded-top bgdark">
                        <h4>Landing Editor</h4>
                        <br />

                        {
                            useEditor ? 
                                (
                                    <div>
                                        <div>
                                            <Button variant="contained" onClick={saveLanding}>
                                                Guardar
                                            </Button>
            
                                            {/* <Button variant="contained" onClick={exportLanding}>
                                                Exportar HTML
                                            </Button> */}
                                        </div>
            
                                        <EmailEditor
                                            ref={emailEditorRef}
                                            onLoad={onLoad}
                                            minHeight={650}
                                        />
                                    </div>
                                ):
                                (
                                    <p>
                                        Por favor asegúrese de que realizo la compra de un pack en la sección de pagos, gracias.
                                    </p>
                                )
                        }

                    </div>
                }
            />
        </div>
    )
}

export default EditorPage
