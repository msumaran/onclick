
import React, { useRef } from 'react'

import FusePageSimple from '@fuse/core/FusePageSimple';
import { makeStyles } from '@material-ui/core'
import Button from '@material-ui/core/Button'

import EmailEditor from 'react-email-editor'
import sample from './sample.json';

const useStyles = makeStyles(theme => ({
    page: {}
}))

const EditorPage = (props) => {

    const classes = useStyles(props)

    const emailEditorRef = useRef(null)

    const exportHtml = () => {

        emailEditorRef.current.editor.exportHtml((data) => {
            const { design, html } = data;
            console.log('exportHtml', html);
        });
    }

    const onLoad = () => {

        console.log({ sample })

        emailEditorRef.current.editor.loadDesign(sample)
        // you can load your template here;
        // const templateJson = {};
        // emailEditorRef.current.editor.loadDesign(templateJson);
    }

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

                        <div>
                            <div>
                                <Button variant="contained" onClick={exportHtml}>
                                    Export HTML
                                </Button>
                            </div>

                            <EmailEditor
                                ref={emailEditorRef}
                                onLoad={onLoad}
                            />
                        </div>
                    </div>
                }
            />
        </div>
    )
}

export default EditorPage
