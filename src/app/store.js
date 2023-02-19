import { configureStore } from '@reduxjs/toolkit'
import apiSlice from '../features/api/apiSlice';
import userSlice from '../features/user/userSlice';

const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: userSlice
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware)
})

export default store;