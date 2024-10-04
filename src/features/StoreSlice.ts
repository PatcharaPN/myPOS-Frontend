/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Store, StoreState } from "../types/interface";
import axios, { AxiosError } from "axios";
import { handleAxiosError } from "../utils/errorHandler";
const serviceURL = import.meta.env.VITE_APP_SERVICE_URL;

const initialState: StoreState = {
  store: [],
  currentStore: null,
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

export const getStoreById = createAsyncThunk<Store, string>(
  "store/getById",
  async (storeId, { rejectWithValue }) => {
    try {
      const response = await axios.get<Store>(
        `${serviceURL}/api/store/${storeId}`,
      );
      return response.data; // This returns a single Store object
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(handleAxiosError(error));
      }
      return rejectWithValue("An error occurred when fetching the store by ID");
    }
  },
);
export const deleteStore = createAsyncThunk<Store, string>(
  "store/delete",
  async (storeId, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${serviceURL}/api/store/${storeId}`);
      return response.data; // Return the status code (e.g., 200 for success)
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(handleAxiosError(error));
      }
      return rejectWithValue("Error when deleting Store"); // Fallback for non-Axios errors
    }
  },
);

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
      })
      .addCase(deleteStore.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteStore.fulfilled, (state, action) => {
        state.loading = false;
        state.store = state.store.filter(
          (store) => store._id != action.payload._id,
        );
      })
      .addCase(deleteStore.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error as string;
      })
      .addCase(getStoreById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getStoreById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentStore = action.payload;
      })
      .addCase(getStoreById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error as string;
      });
  },
});

export default storeSlice.reducer;
