import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import auth from '../../config/firebase/firebase.config';

const initialState = {
    user: { email: "", role: "" },
    isLoading: true,
    isError: false,
    error: "",
}

export const createUser = createAsyncThunk(
    "user/createUser",
    async ({ email, password }) => {
        const result = await createUserWithEmailAndPassword(auth, email, password);
        return result.user.email;
    }
);

export const signIn = createAsyncThunk(
    "user/signIn",
    async ({ email, password }) => {
        const result = await signInWithEmailAndPassword(auth, email, password);
        return result.user.email;
    }
);

export const signInWithGoogle = createAsyncThunk(
    "user/signInWithGoogle",
    async () => {
        const provider = new GoogleAuthProvider();
        const result = await signInWithPopup(auth, provider);
        return result.user.email;
    }
);

export const getUser = createAsyncThunk(
    "user/getUser",
    async (email) => {
        const res = await fetch(`http://localhost:5000/user/${email}`);
        const data = await res.json();
        if (data.status) {
            return data
        }
        return email;
    }
);

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        logOut: state => {
            state.user = { email: "", role: "" };
        },
        toggleLoading: (state) => {
            state.isLoading = false;
        }
    },
    extraReducers: (builder) => {
        // sign up
        builder
            .addCase(createUser.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(createUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user.email = action.payload;
            })
            .addCase(createUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.error = action.error.message;
            })

            // sign in
            .addCase(signIn.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(signIn.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user.email = action.payload;
            })
            .addCase(signIn.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.error = action.error.message;
            })

            // google sign in
            .addCase(signInWithGoogle.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(signInWithGoogle.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user.email = action.payload;
            })
            .addCase(signInWithGoogle.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.error = action.error.message;
            })

            // get user, check existancy and set user object
            .addCase(getUser.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(getUser.fulfilled, (state, { payload }) => {
                state.isLoading = false;

                if (payload.status) {
                    state.user = payload.data;
                } else {
                    // if not exist then set the email only
                    state.user.email = payload;
                }
            })
            .addCase(getUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.user = {};
                state.error = action.error.message;
            })
    }
})

export const { logOut, setUser, setRole, toggleLoading } = userSlice.actions;
export default userSlice.reducer;