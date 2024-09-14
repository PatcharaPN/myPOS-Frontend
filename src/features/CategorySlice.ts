import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Categories, Product, User } from "../types/interface";
import axios, { AxiosError } from "axios";
const serviceURL = import.meta.env.VITE_APP_SERVICE_URL;

interface ErrorResponse {
  message: string;
}

export const getCategory = createAsyncThunk<Categories[]>(
  "category/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${serviceURL}/api/categories`);
      return res.data;
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponse>;
      return rejectWithValue(
        axiosError.response?.data || "Fail to get all category",
      );
    }
  },
);

export const createCategory = createAsyncThunk(
  "product/createBrand",
  async (
    categoryData: { name: string; description: string; createdBy: string },
    { rejectWithValue },
  ) => {
    try {
      const response = await axios.post(
        `${serviceURL}/api/Categories`,
        categoryData,
      );
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponse>;
      return rejectWithValue(
        axiosError.response?.data || "Error when creating category",
      );
    }
  },
);
interface Composite {
  _id: string;
  name: string;
  addedBy: User;
  createdAt: Date;
  products: Product[];
  productCount: number;
}

export interface CategorieState {
  category: Categories[];
  composite: Composite[];
  loading: boolean;
  error: string | null;
}

const initialState: CategorieState = {
  category: [],
  composite: [],
  loading: false,
  error: null,
};

export const getTotalComposite = createAsyncThunk(
  "composite/getTotal",
  async () => {
    try {
      const result = await axios.get(`${serviceURL}/api/composite/findtotal`);
      return result.data;
    } catch (error) {
      console.error(error);
    }
  },
);

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setCategory: (state, action: PayloadAction<Categories[]>) => {
      state.category = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCategory.fulfilled, (state, action) => {
        state.category = action.payload;
        state.loading = false;
      })
      .addCase(getCategory.rejected, (state, action) => {
        state.error = action.error as string;
      })
      .addCase(createCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.category.push(action.payload);
        state.loading = false;
      })
      .addCase(createCategory.rejected, (state, action) => {
        state.error = action.error as string;
      })
      .addCase(getTotalComposite.pending, (state) => {
        state.loading = true;
      })
      .addCase(getTotalComposite.fulfilled, (state, action) => {
        state.composite = action.payload;
      })
      .addCase(getTotalComposite.rejected, (state, action) => {
        state.error = action.error as string;
      });
  },
});

export default categorySlice.reducer;
