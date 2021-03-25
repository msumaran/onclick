
import React, { useState, useEffect } from 'react'

let lastEditorNum = 0

class HtmlEditor extends React.Component {

    constructor(props) {
        super(props)

        this.editorId = `editor-${++lastEditorNum}`
    }

    componentDidMount() {

        this.loadEditor()
    }

    componentDidUpdate() {

        this.editor.loadDesign(this.props.design)
    }

    loadEditor() {

        const {
            props,
        } = this

        const displayMode = props.displayMode || 'web'
        const options = Object.assign({}, props.options)
        const onLoad = props.onLoad

        this.editor = window.unlayer.createEditor({
            id: this.editorId,
            displayMode,
            ...options,
            // features: {
            //     colorPicker: {
            //       presets: ['#D9E3F0']
            //     }
            // }
        })

        this.editor.loadDesign(props.design)

        onLoad && onLoad()
    }

    loadDesign = (design) => {

        this.editor.loadDesign(design);
    }

    saveDesign = (callback) => {

        this.editor.saveDesign(callback);
    };

    exportHtml = (callback) => {

        this.editor.exportHtml(callback);
    }

    render() {

        return (
            <div
                style={{
                    display: 'flex',
                    flex: 1,
                    minHeight: 500,
                }}
            >
                <div id={this.editorId} style={{ flex: 1}} />
            </div>
        )
    }
}

export default HtmlEditor
