const getHeaders = async () => {
  try {
    const uuid = require('uuid')

    const uniqid = uuid.v4()

    const headers = {
      'Content-Type': 'application/json',
      'X-ONCLICK-CONSUMER-ID': 'REACT-ADMIN-WEB',
      'X-ONCLICK-REQUEST-ID': uniqid
    }

    const session = JSON.parse(localStorage.getItem('session'))

    if (session) {
      if (session.token !== '') {
        headers['Authorization'] = `Bearer ${session.token}`
      }
    }

    return headers
  } catch (err) {
    if (process.env.REACT_APP_ENVIRONMENT === 'dev') console.log('api.getHeaders', err)

    throw err
  }
}

const handleError = (err) => {
  // console.log('handleError.err', err)
  // console.log('handleError.err.response', err.response.data)
  if (err.response !== undefined) {
    switch (err.response.status) {
      case 401:
        throw err.response.data
      // case 404:
      //     window.location.replace('/404')
      //     return
      default:
        throw err.response.data.error
    }
  }
  // the service is unavailable
  const defaultError = { code: 503, message: err.message }

  throw defaultError
}

const handleCatchNotify = (err) => {
  const reactToastify = require('react-toastify')

  switch (err.code) {
    case 401:

      localStorage.removeItem('session')
      alert('Sessión expirada')
      window.location.reload()

      return
    default:
      reactToastify.toast.error(err.message)
  }
}

export { getHeaders, handleError, handleCatchNotify }
