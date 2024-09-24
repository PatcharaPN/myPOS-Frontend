import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {
  addProduct,
  deleteProduct,
  getAmount,
  getProduct,
} from "../services/productService";
import {
  Brand,
  getAllAmount,
  LowStockItem,
  Product,
  ProductState,
} from "../types/interface";
import { fetchBrand } from "../services/ApiService";
import axios, { AxiosError } from "axios";
import { handleAxiosError } from "../utils/errorHandler";

// Define API base URL based on your environment setup
const serviceURL =
  import.meta.env.VITE_APP_SERVICE_URL || "http://localhost:3000"; // Fallback to localhost if env variable is not set

const initialState: ProductState = {
  products: [],
  brand: [],
  lowStock: [],
  loading: false,
  totalAmount: [],
  error: null,
};

export const getBrand = createAsyncThunk<Brand[]>(
  "brand/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetchBrand();
      return res;
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(handleAxiosError(error));
      }
      return rejectWithValue("An unexpected error occured");
    }
  },
);

export const getAmountSummary = createAsyncThunk<getAllAmount[]>(
  "products/getAmount",
  async (_, { rejectWithValue }) => {
    try {
      const data = await getAmount();
      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(handleAxiosError(error));
      }
      return rejectWithValue("An unexpected error occured");
    }
  },
);

export const addItem = createAsyncThunk<Product, FormData>(
  "product/addItem",
  async (formData: FormData, { rejectWithValue }) => {
    try {
      const response = await addProduct(formData);
      return response;
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(handleAxiosError(error));
      }
      return rejectWithValue("An unexpected error occured");
    }
  },
);

export const lowStock = createAsyncThunk<LowStockItem[]>(
  "product/lowStock",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${serviceURL}/api/lowstock`);
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(handleAxiosError(error));
      }
      return rejectWithValue("An unexpected error occured");
    }
  },
);

export const createBrand = createAsyncThunk(
  "product/createBrand",
  async (
    brandData: { name: string; prefix: string; addedBy: string },
    { rejectWithValue },
  ) => {
    try {
      const response = await axios.post(`${serviceURL}/api/brand`, brandData, {
        timeout: 10000,
      });
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(handleAxiosError(error));
      }
      return rejectWithValue("An unexpected error occured");
    }
  },
);

export const getAllProducts = createAsyncThunk<Product[]>(
  "products/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const data = await getProduct();
      const groupedProducts = data.reduce(
        (acc: Record<string, Product & { _id: string }>, product: Product) => {
          const key = `${product.name}-${product.price}`;
          if (!acc[key]) {
            acc[key] = { ...product, stock: 0, available: 0, reserved: 0 };
          }
          acc[key].stock += product.stock;
          acc[key].available += product.available;
          acc[key].reserved += product.reserved;
          return acc;
        },
        {} as Record<string, Product & { _id: string }>,
      );
      return Object.values(groupedProducts);
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(handleAxiosError(error));
      }
      return rejectWithValue("An unexpected error occured");
    }
  },
);

export const deleteOne = createAsyncThunk<Product, string>(
  "products/delete",
  async (productId: string, { rejectWithValue }) => {
    try {
      const res = await deleteProduct(productId);
      return res;
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(handleAxiosError(error));
      }
      return rejectWithValue("An unexpected error occured");
    }
  },
);

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.products = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        state.error = action.error.message || "Failed to fetch products";
        state.loading = false;
      })
      .addCase(deleteOne.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteOne.fulfilled, (state, action) => {
        state.loading = false;
        state.products = state.products.filter(
          (product) => product._id !== action.payload._id,
        );
      })
      .addCase(deleteOne.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
      })
      .addCase(getAmountSummary.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAmountSummary.fulfilled, (state, action) => {
        state.totalAmount = action.payload;
        state.loading = false;
      })
      .addCase(getAmountSummary.rejected, (state, action) => {
        state.error = action.error.message || "Failed to fetch amount summary";
        state.loading = false;
      })
      .addCase(getBrand.pending, (state) => {
        state.loading = true;
      })
      .addCase(getBrand.fulfilled, (state, action) => {
        state.brand = action.payload;
        state.loading = false;
      })
      .addCase(getBrand.rejected, (state, action) => {
        state.error = action.error.message || "Failed to fetch brands";
        state.loading = false;
      })
      .addCase(createBrand.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createBrand.fulfilled, (state, action) => {
        state.loading = false;
        state.brand.push(action.payload);
      })
      .addCase(createBrand.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(lowStock.pending, (state) => {
        state.loading = true;
      })
      .addCase(lowStock.fulfilled, (state, action) => {
        state.lowStock = action.payload;
        state.loading = false;
      })
      .addCase(lowStock.rejected, (state, action) => {
        state.error = action.error.message || "Failed to fetch low stock data";
        state.loading = false;
      });
  },
});

export default productSlice.reducer;
