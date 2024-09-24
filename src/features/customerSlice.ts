import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { Customer, CustomerState } from "../types/interface";
import { handleAxiosError } from "../utils/errorHandler";

const serviceURL = import.meta.env.VITE_APP_SERVICE_URL;
const initialState: CustomerState = {
  customer: [],
  totalcustomer: 0,
  error: null,
  loading: false,
};
export const createCustomer = createAsyncThunk<
  Customer,
  { customername: string; email: string; phone: string }
>("customer/create", async (customerData, { rejectWithValue }) => {
  try {
    const response = await axios.post<Customer>(
      `${serviceURL}/api/Customer`,
      customerData,
    );
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      return rejectWithValue(handleAxiosError(error));
    }
    return rejectWithValue("An unexpected error occured");
  }
});
export const getAllCustomer = createAsyncThunk<Customer[], void>(
  "customer/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get<Customer[]>(
        `${serviceURL}/api/Customer`,
      );
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(handleAxiosError(error));
      }
      return rejectWithValue("An unexpected error occured");
    }
  },
);

// /Customer/amount
export const getAmountCustomer = createAsyncThunk<number>(
  "customer/Amount",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get<{ amount: number }>(
        `${serviceURL}/api/Customer/amount`,
      );
      return response.data.amount;
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(handleAxiosError(error));
      }
      return rejectWithValue("An unexpected error occured");
    }
  },
);
const customerSlice = createSlice({
  name: "customer",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllCustomer.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        getAllCustomer.fulfilled,
        (state, action: PayloadAction<Customer[]>) => {
          state.customer = action.payload || [];
        },
      )
      .addCase(getAllCustomer.rejected, (state, action) => {
        state.error = action.error as string;
      })
      .addCase(
        createCustomer.fulfilled,
        (state, action: PayloadAction<Customer>) => {
          state.customer.push(action.payload);
          state.loading = false;
        },
      )
      .addCase(createCustomer.pending, (state) => {
        state.loading = true;
      })
      .addCase(createCustomer.rejected, (state, action) => {
        state.error = action.error as string;
      })
      .addCase(getAmountCustomer.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAmountCustomer.fulfilled, (state, action) => {
        state.totalcustomer = action.payload;
      })
      .addCase(getAmountCustomer.rejected, (state, action) => {
        state.error = action.error as string;
      });
  },
});

export default customerSlice.reducer;
