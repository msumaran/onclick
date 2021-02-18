
export const Log = (...params) => {

    if (process.env.REACT_APP_ENVIRONMENT === 'dev') console.log(...params)
}