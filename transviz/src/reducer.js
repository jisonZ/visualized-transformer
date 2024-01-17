import { configureStore } from '@reduxjs/toolkit'

// reducer import
import canvasReducer from './canvasReducer'

// ==============================|| COMBINE REDUCER ||============================== //

export const store = configureStore({
    reducer: {
        canvas: canvasReducer
    }
});