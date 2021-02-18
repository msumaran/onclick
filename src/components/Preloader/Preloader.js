
import React from 'react'

import './preloader.css'
import preload_gif from './preloader.gif'

const Preloader = () => {

    return (
        <div className="preloader">
            <div className="preloader-valigned">
                <img src={preload_gif} width="128" alt="preloader" />
            </div>
        </div>
    )
}

export default Preloader
