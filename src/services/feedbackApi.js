
import axios from 'axios'
import { getHeaders, handleError } from 'helpers/api'
import apiService from './apiService'

const API_URL = '/feedback'

export const findAll = async () => {

    try {

        return await apiService.get(`${API_URL}/combobox`)
    } catch (error) {

        throw error
    }
}

export const create = async (data) => {

    try {

        return await apiService.post(API_URL, data)
    } catch (error) {

        throw error
    }
}

export default {
    findAll,
    create,
}
