import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Product, User } from "../types/interface";
import axios from "axios";
import Package from "../pages/Package/Package";

const serviceURL = import.meta.env.VITE_APP_SERVICE_URL;

export interface Package {
  _id: string;
  name: string;
  createdAt: Date;
  owner: User;
  products: Product[];
}

export interface PackageState {
  products: Package[];
  loading: boolean;
  error: string | null;
}

const initialState: PackageState = {
  products: [],
  loading: false,
  error: null,
};

export const getPackage = createAsyncThunk("package/getAll", async () => {
  try {
    const response = await axios.get(`${serviceURL}/api/package`);
    return response.data;
  } catch (error) {
    console.error("Error when fetching package", error);
  }
});

const packageSlice = createSlice({
  name: "package",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPackage.pending, (state) => {
        state.loading = true;
      })
      .addCase(getPackage.fulfilled, (state, action) => {
        state.products = action.payload;
        state.loading = false;
      })
      .addCase(getPackage.rejected, (state, action) => {
        state.error = action.error as string;
      });
  },
});

export default packageSlice.reducer;
