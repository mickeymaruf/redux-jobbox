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
        closeJob: builder.mutation({
            query: (id) => ({
                url: `/job/${id}`,
                method: "DELETE",
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

        getApplicantsDetails: builder.mutation({
            query: ({ data, jobId }) => ({
                url: `/getApplicantsDetails/${jobId}`,
                method: "POST",
                body: data
            }),
        }),

        sendMessage: builder.mutation({
            query: (data) => ({
                url: `/messages`,
                method: "POST",
                body: data
            }),
            invalidatesTags: ["Message"]
        }),

        getMessages: builder.query({
            query: (email) => `/messages/${email}`
        }),

        getMessage: builder.query({
            query: ({ person, email }) => `/message/${person}/${email}`,
            providesTags: ["Message"]
        }),

    })
});

export const {
    usePostJobMutation,
    useGetJobQuery,
    useGetJobDetailsQuery,
    useApplyJobMutation,
    useGetAppliedJobsQuery,
    useAskQuestionMutation,
    useReplyQuestionMutation,
    useGetPostedJobsQuery,
    useCloseJobMutation,
    useGetApplicantsDetailsMutation,
    useSendMessageMutation,
    useGetMessagesQuery,
    useGetMessageQuery,
} = jobApi;