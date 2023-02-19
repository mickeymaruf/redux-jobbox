import apiSlice from "../api/apiSlice";

const jobApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        postJob: builder.mutation({
            query: (data) => ({
                url: "/job",
                method: "POST",
                body: data
            }),
            invalidatesTags: ["Jobs"]
        }),
        getJob: builder.query({
            query: () => "/jobs",
            providesTags: ["Jobs"]
        }),
        getAppliedJobs: builder.query({
            query: (email) => `/applied-jobs/${email}`,
            providesTags: ["JobApplied"]
        }),
        getPostedJobs: builder.query({
            query: (email) => `/posted-jobs/${email}`,
            providesTags: ["Jobs"]
        }),
        getJobDetails: builder.query({
            query: (id) => `/job/${id}`,
            transformResponse: (response) => response.data,
            providesTags: ["JobDetails"]
        }),

        applyJob: builder.mutation({
            query: (data) => ({
                url: "/apply",
                method: "PATCH",
                body: data
            }),
            invalidatesTags: ["JobDetails"]
        }),

        askQuestion: builder.mutation({
            query: (data) => ({
                url: "/query",
                method: "PATCH",
                body: data
            }),
            invalidatesTags: ["JobDetails"]
        }),

        replyQuestion: builder.mutation({
            query: (data) => ({
                url: "/reply",
                method: "PATCH",
                body: data
            }),
            invalidatesTags: ["JobDetails"]
        }),
    })
});

export const { usePostJobMutation, useGetJobQuery, useGetJobDetailsQuery, useApplyJobMutation, useGetAppliedJobsQuery, useAskQuestionMutation, useReplyQuestionMutation, useGetPostedJobsQuery } = jobApi;