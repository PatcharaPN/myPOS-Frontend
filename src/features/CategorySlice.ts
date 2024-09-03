import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { getAllCategory } from "../services/categoryService";
import { Categories, Product, User } from "../types/interface";
import axios from "axios";
const serviceURL = import.meta.env.VITE_APP_SERVICE_URL;

export const getCategory = createAsyncThunk("category/getAll", async () => {
  try {
    const res = await getAllCategory();
    return res;
  } catch (error) {
    console.error("Error when fetching category", error);
  }
});

export const createCategory = createAsyncThunk(
  "product/createBrand",
  async (
    categoryData: { name: string; description: string; createdBy: string },
    thunkAPI,
  ) => {
    try {
      const response = await axios.post(
        `${serviceURL}/api/Categories`,
        categoryData,
      );
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data || error.message);
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
