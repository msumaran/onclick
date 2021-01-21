import { toast } from 'react-toastify'

import { handleCatchNotify } from 'helpers/api'
import { configApp } from 'helpers/config'

import api from 'services/evaluationApi'

const findAll = () => {
  return async (dispatch) => {
    try {
      const res = await api.findAll()

      dispatch({
        type: 'EVALUATION_FIND_ALL',
        payload: res.content
      })

      return res.code
    } catch (err) {
      if (configApp.env === 'dev') console.log('evaluationAction.findAll', err)

      handleCatchNotify(err)

      return err.code
    }
  }
}

const findBy = (criteria = [], orderBy = false, limit = false, offset = false) => {
  return async (dispatch) => {
    try {
      const res = await api.findBy(criteria, orderBy, limit, offset)

      dispatch({
        type: 'EVALUATION_FIND_BY',
        payload: res.content
      })

      return res.code
    } catch (err) {
      if (configApp.env === 'dev') console.log('evaluationAction.findBy', err)

      handleCatchNotify(err)

      return err.code
    }
  }
}

const findInscriptionsBy = (criteria = [], orderBy = false, limit = false, offset = false) => {
  return async (dispatch) => {
    try {
      const res = await api.findBy(criteria, orderBy, limit, offset)

      dispatch({
        type: 'INSCRIPTION_FIND_BY',
        payload: res.content
      })

      return res.code
    } catch (err) {
      if (configApp.env === 'dev') console.log('evaluationAction.findInscriptionsBy', err)

      handleCatchNotify(err)

      return err.code
    }
  }
}

const find = (id) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: 'EVALUATION_FIND',
        payload: id
      })
    } catch (err) {
      if (configApp.env === 'dev') console.log('evaluationAction.find', err)

      handleCatchNotify(err)
    }
  }
}

const create = (data) => {
  return async (dispatch) => {
    try {
      const res = await api.create(data)

      dispatch({
        type: 'EVALUATION_CREATE',
        payload: res.content
      })

      toast.success(res.message)

      return res.code
    } catch (err) {
      if (configApp.env === 'dev') console.log('evaluationAction.create', err)

      handleCatchNotify(err)

      return err.code
    }
  }
}

const update = (id, data) => {
  return async (dispatch) => {
    try {
      const res = await api.update(id, data)

      dispatch({
        type: 'EVALUATION_UPDATE',
        payload: res.content
      })

      toast.success(res.message)

      return res.code
    } catch (err) {
      if (configApp.env === 'dev') console.log('evaluationAction.update', err)

      handleCatchNotify(err)

      return err.code
    }
  }
}

const remove = (id) => {
  return async (dispatch) => {
    try {
      const res = await api.remove(id)

      dispatch({
        type: 'EVALUATION_REMOVE',
        payload: res.content
      })

      toast.success(res.message)

      return res.code
    } catch (err) {
      if (configApp.env === 'dev') console.log('evaluationAction.remove', err)

      handleCatchNotify(err)

      return err.code
    }
  }
}

const compress = (data) => {
  return async (dispatch) => {
    try {
      const res = await api.compress(data)

      dispatch({
        type: 'EVALUATION_COMPRESS_CREATE',
        payload: res.content
      })

      toast.success(res.message)

      return res.content
    } catch (err) {
      if (configApp.env === 'dev') console.log('evaluationAction.compress', err)

      handleCatchNotify(err)

      return err.code
    }
  }
}

const calification = (data) => {
  return async (dispatch) => {
    try {
      const res = await api.calification(data)

      dispatch({
        type: 'EVALUATION_CALIFICATION_UPDATE',
        payload: res.content
      })

      toast.success(res.message)

      return res.code
    } catch (err) {
      if (configApp.env === 'dev') console.log('evaluationAction.calification', err)

      handleCatchNotify(err)

      return err.code
    }
  }
}

const addRegionalWinner = (data) => {
  return async (dispatch) => {
    try {
      const res = await api.addRegionalWinner(data)

      dispatch({
        type: 'ADD_REGIONAL_WINNER',
        payload: res.content
      })

      toast.success(res.message)

      return res.code
    } catch (err) {
      if (configApp.env === 'dev') console.log('evaluationAction.addRegionalWinner', err)

      handleCatchNotify(err)

      return err.code
    }
  }
}

const addNacionalWinner = (data) => {
  return async (dispatch) => {
    try {
      const res = await api.addNacionalWinner(data)

      dispatch({
        type: 'ADD_NACIONAL_WINNER',
        payload: res.content
      })

      toast.success(res.message)

      return res.code
    } catch (err) {
      if (configApp.env === 'dev') console.log('evaluationAction.addNacionalWinner', err)

      handleCatchNotify(err)

      return err.code
    }
  }
}

const listRegionalWinners = (criteria = []) => {
  return async (dispatch) => {
    try {
      const res = await api.listRegionalWinners(criteria)

      dispatch({
        type: 'INSCRIPTION_FIND_BY_REGIONAL_WINNERS',
        payload: res.content
      })

      return res.code
    } catch (err) {
      if (configApp.env === 'dev') console.log('evaluationAction.listRegionalWinners', err)

      handleCatchNotify(err)

      return err.code
    }
  }
}

const evaluationAction = {
  findAll,
  findBy,
  find,
  create,
  update,
  remove,
  compress,
  calification,
  findInscriptionsBy,
  addRegionalWinner,
  addNacionalWinner,
  listRegionalWinners
}

export default evaluationAction
