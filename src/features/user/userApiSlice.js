import apiSlice from "../api/apiSlice";
import { getUser } from "./userSlice";

const userApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        postUser: builder.mutation({
            query: (data) => ({
                url: "/user",
                method: "POST",
                body: data
            }),
            async onQueryStarted(data, { dispatch, queryFulfilled }) {
                try {
                    const res = await queryFulfilled;
                    dispatch(getUser(data.email));
                } catch (err) {
                    // 
                }
            }
        })
    })
})

export const { usePostUserMutation, useGetUserQuery } = userApiSlice;