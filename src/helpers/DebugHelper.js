
export const Log = (...params) => {

    if (process.env.REACT_APP_ENVIRONMENT === 'dev') console.log(...params)
}

export const Warn = (...params) => {

    if (process.env.REACT_APP_ENVIRONMENT === 'dev') console.warn(...params)
}