import { combineReducers } from 'redux'

// reducer import
import canvasReducer from './reducers/canvasReducer'

// ==============================|| COMBINE REDUCER ||============================== //

const reducer = combineReducers({
    canvas: canvasReducer,
})

export default reducer
