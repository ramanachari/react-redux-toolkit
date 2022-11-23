import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios, * as others from "axios";
//import { https } from "https";

type User = {
  id: number;
  name: string;
};

type InitialState = {
  isLoading: boolean;
  data: User[];
  error: string;
};

const initialState: InitialState = {
  isLoading: false,
  data: [],
  error: "",
};

// Generates pending, fulfilled and rejected action types
export const fetchUsers = createAsyncThunk("user/fetchUsers", () => {
  // const httpsAgent = new https.Agent({
  //   rejectUnauthorized: false,
  // });
  // axios.defaults.httpsAgent = httpsAgent;
  return axios
    .get("https://jsonplaceholder.typicode.com/users")
    .then((response) => response.data);
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      fetchUsers.fulfilled,
      (state, action: PayloadAction<User[]>) => {
        state.isLoading = false;
        state.data = action.payload;
        state.error = "";
      }
    );
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.isLoading = false;
      state.data = [];
      state.error = action?.error?.message || "Something went wrong...";
    });
  },
});

export default userSlice.reducer;
