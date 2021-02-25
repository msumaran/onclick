
import React from 'react'

import './preloader.css'
import preload_gif from './preloader.gif'

const Preloader = (props) => {

    const alpha = parseInt((props.alpha || 255), 10).toString(16)

    return (
        <div className="preloader" style={{
            backgroundColor: `#FFFFFF${alpha}`
        }}>
            <div className="preloader-valigned">
                <img src={preload_gif} width="128" alt="preloader" />
            </div>
        </div>
    )
}

export default Preloader
