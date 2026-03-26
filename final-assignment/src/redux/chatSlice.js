import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { sendMessageAPI } from "../services/api";

export const sendMessage = createAsyncThunk(
    "chat/sendMessage",
    async (message) => {
        const response = await sendMessageAPI(message);
        return response;
    }
);

const chatSlice = createSlice({
    name: "chat",
    initialState: {
        messages: [],
        loading: false,
        error: null,
    },
    reducers: {
        addUserMessage: (state, action) => {
            state.messages.push({ role: "user", content: action.payload});
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(sendMessage.pending, (state) =>{
                state.loading = true;
            })
            .addCase(sendMessage.fulfilled, (state, action) => {
                state.loading = false;
                state.messages.push({ role: "ai", content: action.payload });
                state.messages.push({ role: "ai", content: "Please Call on +1-800-123-4567", });
            })
            .addCase(sendMessage.rejected, (state) => {
                state.loading = false;
                state.error = "Something went wrong";
            });
    },
});

export const { addUserMessage} = chatSlice.actions;
export default chatSlice.reducer;