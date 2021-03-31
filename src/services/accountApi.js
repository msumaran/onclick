import axios from 'axios'

import { getHeaders, handleError } from 'helpers/api'
import { configApp } from 'helpers/config'

const baseUrl = `${configApp.baseUrl}`

const login = async (username, password) => {
  try {
    const headers = await getHeaders()

    const res = await axios.post(`${baseUrl}/login_check`, { username, password }, { headers })

    localStorage.setItem('session', JSON.stringify({
      name: res.data.name,
      profileId: res.data.profileId,
      token: res.data.token,
      tutorial: true,
    }))

    return res.data
  } catch (err) {
    handleError(err)
  }
}

const logout = () => {

  localStorage.removeItem('session')
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
