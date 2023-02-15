import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import auth from '../../config/firebase/firebase.config';

const initialState = {
    email: "",
    role: "",
    isLoading: false,
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

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        logOut: state => {
            state.email = "";
        },
        setUser: (state, action) => {
            state.email = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(createUser.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(createUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.email = action.payload;
            })
            .addCase(createUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.error = action.error.message;
            })
            .addCase(signIn.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(signIn.fulfilled, (state, action) => {
                state.isLoading = false;
                state.email = action.payload;
            })
            .addCase(signIn.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.error = action.error.message;
            })
            .addCase(signInWithGoogle.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(signInWithGoogle.fulfilled, (state, action) => {
                state.isLoading = false;
                state.email = action.payload;
            })
            .addCase(signInWithGoogle.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.error = action.error.message;
            })
    }
})

export const { logOut, setUser } = userSlice.actions;
export default userSlice.reducer;