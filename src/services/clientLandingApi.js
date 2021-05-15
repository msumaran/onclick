
import apiService from 'services/apiService'

const getClientLanding = async (client_id) => {

    try {

        return await apiService.get('/client-landing/' + client_id)
    } catch (error) {

        throw error
    }
}

const saveClientLanding = async (client_id, data) => {

    try {

        return await apiService.put('/client-landing/' + client_id, data)
    } catch (error) {

        throw error
    }
}

export default {
    getClientLanding,
    saveClientLanding,
}
