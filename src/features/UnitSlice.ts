import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { UnitState } from "../types/interface";
const serviceURL = import.meta.env.VITE_APP_SERVICE_URL;

export const initialState: UnitState = {
  unit: [],
  loading: false,
  error: null,
};

export const getAllUnit = createAsyncThunk("unit/getall", async () => {
  try {
    const result = await axios.get(`${serviceURL}/api/unit`);
    return result.data;
  } catch (error) {
    console.log("Error when getting unit (Client)", error);
  }
});
const unitSlice = createSlice({
  name: "unit",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllUnit.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllUnit.fulfilled, (state, action) => {
        state.unit = action.payload;
      })
      .addCase(getAllUnit.rejected, (state, action) => {
        state.error = action.error as string;
      });
  },
});

export default unitSlice.reducer;
