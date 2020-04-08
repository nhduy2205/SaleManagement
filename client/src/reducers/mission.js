import {GET_USERMISSION, CREATE_BILLS_SUCCESS} from './../actions/types'
const InitialState = {
    mission: null,
    missions: [],
    loading: true,
    errors: [] 
}
const mission = (state = InitialState, action) => {
    const {type, payload} = action
    switch (type) {
        case GET_USERMISSION:
        case CREATE_BILLS_SUCCESS:            
            return {
                ...state,
                loading: false,
                mission: payload,
            }; 
        
        default:
            return state
    }
}

export default mission