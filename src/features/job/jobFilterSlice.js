import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    byDate: "lastApplied",
    byStatus: ""
}

const jobFilterSlice = createSlice({
    name: "jobFilterSlice",
    initialState,
    reducers: {
        filterByDate: (state, { payload }) => {
            state.byDate = payload;
        },
        filterByStatus: (state, { payload }) => {
            state.byStatus = payload;
        }
    }
});

export const { filterByDate, filterByStatus } = jobFilterSlice.actions;
export default jobFilterSlice.reducer;