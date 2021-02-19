import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import reducers from 'redux/reducers'

const logger = (store) => (next) => (action) => {

    let result = next(action)

    if (process.env.REACT_APP_ENVIRONMENT !== 'dev'){

        return result
    }

    if (typeof action === 'function') return result

    console.group('State modified')

    console.log('%cType: %c' + action.type, 'font-weight: bold;', 'color: red')

    if (action.content) console.log('%cContent', 'font-weight: bold;', action.content)

    console.log('%cNew state', 'font-weight: bold;', store.getState())

    console.groupEnd()

    return result
}

const store = createStore(reducers, applyMiddleware(logger, thunk))

export default store
