
import React, { useRef, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import FusePageSimple from '@fuse/core/FusePageSimple';
import { makeStyles } from '@material-ui/core'
import Button from '@material-ui/core/Button'

import EmailEditor from 'react-email-editor'
import sample from './sample.json';

// import { obtenerPokemonesAccion } from '../redux/pokeDucks'
import * as userActions from "../../auth/store/actions"

import moment from 'moment'
import { truncate } from 'lodash';

const useStyles = makeStyles(theme => ({
    page: {}
}))

const EditorPage = (props) => {

    const formUrl = "http://onclick.com/somaething"

    const userUID = useSelector(({ auth }) => auth.user.uid);

    // const useEditor = useSelector(({ auth }) => auth.user.useEditor);
    const [useEditor, setuseEditor] = useState(false)

    const dispatch =  useDispatch()

    const classes = useStyles(props)

    const emailEditorRef = useRef(null)

    const landing = useSelector(({ auth }) => auth.user.landing.code ? JSON.parse( auth.user.landing.code ) : sample ) ;
    const html = useSelector(({ auth }) => auth.user.landing.html ? auth.user.landing.html : "" ) ;

    const timeservice = useSelector(({ auth }) => auth.user.timeservice);

    const email = useSelector(({ auth }) => auth.user.data.email);

    const checkSubscription = (lastDateUnix) => {
        const now = Date.now() / 1000
        var a = moment( moment.unix(lastDateUnix).format('D MMM YYYY h:mm') );
        var b = moment( moment.unix(now).format('D MMM YYYY h:mm') );
        var dif = a.diff(b, "minutes", true)
        if( dif > 0 ){
            setuseEditor(true);
            return;
        }
        setuseEditor(false);
        return;
    }

    useEffect(() => {
        checkSubscription(timeservice);
    }, [useEditor, setuseEditor])

    const onLoad = () => {
        emailEditorRef.current.editor.loadDesign( landing )
    }

    const saveLanding = () => {         
        emailEditorRef.current.editor.exportHtml((data) => {
            
            let newDtatita = findTextOnHtml("getForm", data.html);
            data.html = newDtatita;
            // console.log("data ",data.html);

            dispatch( userActions.saveLanding( data, userUID ) );
            
        });
    }

    const findTextOnHtml = (id, htmlData)=>{

        const idFind = `[${id}]`; // "[getForm]"
        let html = String( htmlData );

        const form = `<form action="${formUrl}" method="POST" > <div class="form-group" ><input name="id" value="${email}" /></div> <div class="form-group" style=" margin-bottom: 10px;"> <label for="nameField">Nombre completo</label> <input type="text" class="form-control" id="nameField" aria-describedby="emailHelp" placeholder="Ingrese su nombre completo" style=" width: 100%;"> </div> <div class="form-group" style=" margin-bottom: 10px;"> <label for="emailField">Correo electrónico</label> <input type="password" class="form-control" id="emailField" placeholder="Ingrese su correo electrónico" style=" width: 100%;"> </div> <button type="submit" class="btn btn-primary">Enviar</button></form>`;

        html = html.replace(idFind, form);

        return html;

    } 

    const findTextOnArray = (id, newData)=>{ 
        const idFind = `[${id}]`; // "[getForm]"   
        newData.design.body.rows.map(row => {
            row.columns.map(column => { 
                if( column.contents.length >= 1 ){
                    column.contents.map(content => { 
                        if( content.type = "text" ){
                            if( content.values.text ){
                                if( content.values.text.includes(idFind) ){
                                    console.log("1 content.values.text: ",content.values.text);  
                                    let newText = String( content.values.text ); 
                                    newText = newText.replace(idFind, idFind); 
                                    content.values.text = newText; 
                                }
                            }
                        } 
                    }); 
                }
            }); 
        });   
        return newData;
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
