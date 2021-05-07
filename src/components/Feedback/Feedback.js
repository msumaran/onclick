
import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'

import './Feedback.scss'

const defaultFeedback = {
    type: '',
    message: ''
}

const Feedback = (props) => {

    const location = useLocation()

    const [ visible, setVisible ] = useState(false)

    const [ data, setData ] = useState(Object.assign({}, defaultFeedback))

    const toggleVisible = () => {

        if (!visible) {

            setVisible(true)
        } else {

            hideFeedback()
        }
    }

    const hideFeedback = () => {

        setData(Object.assign({}, defaultFeedback))
        setVisible(false)
    }

    const sendFeedback = async () => {

        data.url = location.pathname

        await props.dispatch(data)

        hideFeedback()
    }

    return (
        <div className="app-feedback">
            <button className={`btn-feedback ${visible ? 'active' : ''}`} onClick={() => toggleVisible()}>
              Sugerencia
              <i className="oc oc-feedback"></i>
            </button>

            {!visible ? null : (
                <div className={ "feedback-window " + props.position }>
                    <div className="feedback-header">
                        <button className="feedback-close"
                            onClick={() => hideFeedback()}
                        >
                            <i className="icon-close"></i>
                        </button>
                        <h5>Envíanos tus comentarios</h5>
                    </div>
                    <div className="feedback-body">
                        <div className="form">
                            <div className="form-group">
                                <label htmlFor="">¿Qué deseas contarnos?</label>
                                <select className="form-control" onChange={(e) => setData({ ...data, type: e.currentTarget.value})}>
                                    <option>Selecciona</option>
                                    <option value="sugerencia">Quiero dar una sugerencia</option>
                                    <option value="problema">Quiero informar de un problema</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="">¿Cuáles son tus comentarios?</label>
                                <textarea className="form-control"
                                    rows='4'
                                    style={{
                                        resize: 'none'
                                    }}
                                    onChange={(e) => setData({ ...data, message: e.currentTarget.value })}
                                ></textarea>
                            </div>
                            <div className="text-right">
                                <button className="btn btn-primary" onClick={() => sendFeedback()}>
                                    {!props.sending ? 'Enviar' : 'Enviando...'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Feedback
