/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Store, StoreState } from "../types/interface";
import axios from "axios";

const serviceURL = import.meta.env.VITE_APP_SERVICE_URL;
const initialState: StoreState = {
  store: [],
  loading: false,
  error: null,
};

export const createStore = createAsyncThunk<
  Store,
  {
    storename: string;
    location: string;
    owner: string;
    storeImage: File | null;
  }
>("store/create", async (storeData, thunkAPI) => {
  try {
    const formData = new FormData();
    formData.append("storename", storeData.storename);
    formData.append("location", storeData.location);
    formData.append("owner", storeData.owner);
    if (storeData.storeImage) {
      formData.append("storeImage", storeData.storeImage);
    }

    const response = await axios.post<Store>(
      `${serviceURL}/api/Store`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );
    return response.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response?.data || error.message);
  }
});

export const getAllStore = createAsyncThunk<Store[]>(
  "store/getAll",
  async () => {
    try {
      const response = await axios.get<Store[]>(`${serviceURL}/api/Store`);
      return response.data;
    } catch (error) {
      throw new Error("Error fetching store");
    }
  },
);

const storeSlice = createSlice({
  name: "store",
  initialState,
  reducers: {
    setStore: (state, action: PayloadAction<Store[]>) => {
      state.store = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllStore.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getAllStore.fulfilled,
        (state, action: PayloadAction<Store[]>) => {
          state.store = action.payload;
          state.loading = false;
        },
      )
      .addCase(getAllStore.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "An error occurred";
      })
      .addCase(createStore.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createStore.fulfilled, (state, action: PayloadAction<Store>) => {
        state.store.push(action.payload);
        state.loading = false;
      })
      .addCase(createStore.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "An error occurred";
      });
  },
});

export default storeSlice.reducer;
