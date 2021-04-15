
import apiService from 'services/apiService'

const getMyLanding = async () => {

    try {

        return await apiService.get('/my-landing')
    } catch (error) {

        throw error
    }
}

const saveMyLanding = async (data) => {

    try {

        return await apiService.put('/my-landing', data)
    } catch (error) {

        throw error
    }
}

export default {
    getMyLanding,
    saveMyLanding,
}
