import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: "https://jobbox-server-ochre.vercel.app" }),
    endpoints: (builder) => ({}),
    tagTypes: ["Jobs", "JobDetails", "JobApplied", "Message", "ApplicantsDetails"]
});

export default apiSlice;