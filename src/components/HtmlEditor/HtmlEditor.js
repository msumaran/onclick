
import React from 'react'

let lastEditorNum = 0
class HtmlEditor extends React.Component {

    constructor(props) {
        super(props)

        this.editorId = `editor-${++lastEditorNum}`

        this.state = {
            loaded: false,
            updated: false
        }
    }

    componentDidMount() {

        this.loadEditor()
    }

    componentDidUpdate() {

        if (!this.state.loaded) {

            // this.editor.loadDesign(this.props.design)
        }
    }

    loadEditor() {

        const {
            props,
        } = this

        const default_options = {
            features: {
                preview: false,
                undoRedo: false,
            }
        }

        const displayMode = props.displayMode || 'web'
        const options = Object.assign(default_options, props.options)
        const onLoad = props.onLoad

        this.editor = window.unlayer.createEditor({
            id: this.editorId,
            displayMode,
            ...options,
            // features: {
            //     colorPicker: {
            //       presets: ['#D9E3F0']
            //     }
            // },
            fonts: {
                showDefaultFonts: true,
                customFonts: [
                    {
                        label: "Roboto",
                        value: "'Roboto', sans-serif",
                        url: "https://fonts.googleapis.com/css2?family=Roboto"
                    },
                    {
                        label: "Train One",
                        value: "'Train One',cursive",
                        url: "https://fonts.googleapis.com/css2?family=Train+One"
                    },
                ]
              },
        })

        this.editor.loadDesign(props.design)

        this.editor.addEventListener('design:loaded', () => {

            // console.log('design loaded')

            this.props.onDesignLoaded()
        })
        this.editor.addEventListener('design:updated', this.props.onDesignUpdated)

        onLoad && onLoad()
    }

    render() {

        const style = this.props.style || {}

        return (
            <div
                style={{
                    ...style,
                    display: 'flex',
                    flex: 1,
                    height: '100%',
                    // minHeight: 800,
                }}
            >
                <div id={this.editorId} style={{ flex: 1}} />
            </div>
        )
    }
}

export default HtmlEditor
