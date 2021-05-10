
import apiService from './apiService'

const api_base = '/activation'

export const findAll = async (period) => {

    try {

        return await apiService.get(`${api_base}/combobox?period=${period}`)
    } catch (error) {

        throw error
    }
}

export const createUser = async (data) => {

    try {

        return await apiService.post(`${api_base}/user`, data)
    } catch (error) {

        throw error
    }
}

export default {
    findAll,
    createUser,
}
