import { configureStore } from '@reduxjs/toolkit'
import apiSlice from '../features/api/apiSlice';
import jobFilterSlice from '../features/job/jobFilterSlice';
import userSlice from '../features/user/userSlice';

const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: userSlice,
        jobFilteration : jobFilterSlice
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware)
})

export default store;