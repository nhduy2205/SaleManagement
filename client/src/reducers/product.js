import {
    ADD_PRODUCT, GETALL_PRODUCT
} from './../actions/types'

const InitialState = {
    products: [],
    product: null,
    loading: true,
    errors: []
}
const product = (state = InitialState, action) => {
    const {type, payload} = action
    switch (type) {
        case ADD_PRODUCT:
            return {
                ...state,
                product: payload,
                loading: false
            }
        case GETALL_PRODUCT: 
            return {
                ...state,
                products: payload,
                loading: false

            }
        default:
            return state
    }
}
export default product