import axios from 'axios'

import { getHeaders, handleError } from 'helpers/api'
import { configApp } from 'helpers/config'

const baseUrl = `${configApp.baseUrl}`

const login = async (username, password) => {
  try {
    const headers = await getHeaders()

    const res = await axios.post(`${baseUrl}/login_check`, { username, password }, { headers })

    // localStorage.setItem('token', res.data.token)
    // localStorage.setItem('name', res.data.name)
    // localStorage.setItem('lastname', res.data.lastname)
    // localStorage.setItem('permissions', res.data.permissions)
    localStorage.setItem('session', JSON.stringify(res.data))

    return res.data
  } catch (err) {
    handleError(err)
  }
}

const logout = async () => {
  try {
    // localStorage.removeItem('token')
    // localStorage.removeItem('name')
    // localStorage.removeItem('lastname')
    // localStorage.removeItem('permissions')
    localStorage.removeItem('session')
  } catch (err) {
    handleError(err)
  }
}

const selfChangePassword = async (password) => {
  try {
    const headers = await getHeaders()

    const res = await axios.put(`${baseUrl}/user/self-change-password`, { password }, { headers })

    return res.data
  } catch (err) {
    handleError(err)
  }
}

const getPermissions = async () => {

  try {

    const headers = await getHeaders()

    const res = await axios.get(`${baseUrl}/account`, { headers })

    return res.data
  } catch (error) {

    handleError(error)
  }
}

const accountApi = {
  login,
  logout,
  selfChangePassword,
  getPermissions,
}

export default accountApi
