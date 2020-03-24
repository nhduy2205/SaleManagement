import {SET_ALERT, REMOVE_ALERT} from './../actions/types'
const InitialState = []
const alert = (state = InitialState, action) => {
    const {type, payload} = action
    switch (type) {
        case SET_ALERT:
            // console.log(action)
            return [...state, payload]
        case REMOVE_ALERT:
            
            return  state.filter(alert => alert.id !== payload)
        default:
            return state;    
    }
}
export default alert