import { getAccessToken } from "@/auth/getAccessToken";
import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  jobs: [],
  isLoading: false,
  error: null,
};

//async data fetching from api using thunk
export const fetchJobs = createAsyncThunk("jobs/fetchJobs", async () => {
  const accessToken = getAccessToken();
  const res = await axios.get(`${import.meta.env.VITE_API_URL}/jobs/get`, {
    headers:{
      Authorization: `Bearer ${accessToken}`,
    }
  });
  return res.data.data;
});

const jobSlice = createSlice({
  name: "job",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //extra reducers which gives access to states
    builder.addCase(fetchJobs.pending, (state) => {
      state.isLoading = true;
      state.error = null
    });
    builder.addCase(fetchJobs.fulfilled, (state, action) => {
      state.isLoading = false;
      state.jobs = action.payload;
      state.error = null
    });
    builder.addCase(fetchJobs.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
  },
});

export default jobSlice.reducer;
