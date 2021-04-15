
import { toast } from 'react-toastify'

import { handleCatchNotify } from 'helpers/api'
import { Log } from 'helpers/DebugHelper'

import myPaymentsApi from 'services/myPaymentsApi'

import { toastDefaults } from 'helpers/config'

export const findAll = () => {

    return async (dispatch) => {

        try {

            const data = await myPaymentsApi.findAll()

            dispatch({
                type: 'MY_PAYMENTS_FIND_ALL',
                payload: data.content
            })
        } catch (error) {

            Log('myPaymentsActions.findAll', error.message)

            handleCatchNotify(error)
        }
    }
}

export const create = (row_data) => {

    return async (dispatch) => {

        try {

            const data = await myPaymentsApi.create(row_data)

            dispatch({
                type: 'MY_PAYMENTS_CREATE',
                payload: data.content
            })

            toast.success(data.message, toastDefaults)
        } catch (error) {

            //
        }
    }
}

export default {
    findAll,
    create,
}
