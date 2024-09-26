import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {
  ErrorResponse,
  Payment,
  PaymentState,
  PaymentSummary,
} from "../types/interface";
import axios, { AxiosError } from "axios";
import { handleAxiosError } from "../utils/errorHandler";

const serviceURL = import.meta.env.VITE_APP_SERVICE_URL;

const initialState: PaymentState = {
  payments: [],
  paymentSummary: [],
  amount: null,
  loading: false,
  error: null,
};
export const createPayment = createAsyncThunk<
  Payment,
  { createdBy: string; products: string[]; status: string } // Input payload
>(
  "payment/create",
  async ({ createdBy, products, status }, { rejectWithValue }) => {
    try {
      const response = await axios.post<Payment>(`${serviceURL}/api/payment`, {
        createdBy,
        products,
        status,
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

export const getPaymentSummary = createAsyncThunk(
  "payment/getSummary",
  async () => {
    try {
      const response = await axios.get<PaymentSummary[]>(
        `${serviceURL}/api/getSummary`,
      );
      return response.data;
    } catch (error) {
      console.log(
        "Error when fetching Summay Data from Server reason: ",
        error,
      );
      return [];
    }
  },
);

export const getAmountOfPayment = createAsyncThunk<
  number | null,
  void,
  { rejectValue: ErrorResponse }
>("payment/getAmount", async (_, thunkAPI) => {
  try {
    const response = await axios.get<Payment>(`${serviceURL}/api/paymentcount`);
    return response.data.amount;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<ErrorResponse>;
      return thunkAPI.rejectWithValue(
        axiosError.response?.data || { message: axiosError.message },
      );
    } else {
      return thunkAPI.rejectWithValue({
        message: String(error),
      });
    }
  }
});

export const getAllPayments = createAsyncThunk<Payment[]>(
  "payment/getAll", // Updated action type to reflect fetching all payments
  async (_, thunkAPI) => {
    try {
      const response = await axios.get<Payment[]>(`{$serviceURL}/api/payment`);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<ErrorResponse>;
        return thunkAPI.rejectWithValue(
          axiosError.response?.data || { message: axiosError.message },
        );
      } else {
        return thunkAPI.rejectWithValue({ message: String(error) });
      }
    }
  },
);

const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createPayment.pending, (state) => {
        state.loading = true;
      })
      .addCase(createPayment.fulfilled, (state, action) => {
        state.loading = false;
        state.payments.push(action.payload);
      })
      .addCase(createPayment.rejected, (state, action) => {
        state.error = action.error.message || null;
      })
      .addCase(getAllPayments.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllPayments.fulfilled, (state, action) => {
        state.loading = false;
        state.payments = action.payload;
      })
      .addCase(getAllPayments.rejected, (state, action) => {
        state.error = action.error.message || null;
      })
      .addCase(getAmountOfPayment.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        getAmountOfPayment.fulfilled,
        (state, action: PayloadAction<number | null>) => {
          state.loading = false;
          state.amount = action.payload; // amount should be number or null
        },
      )
      .addCase(getAmountOfPayment.rejected, (state, action) => {
        state.error = action.error as string;
      })
      .addCase(getPaymentSummary.pending, (state) => {
        state.loading = false;
      })
      .addCase(
        getPaymentSummary.fulfilled,
        (state, action: PayloadAction<PaymentSummary[]>) => {
          state.loading = false;
          state.paymentSummary = action.payload;
        },
      )
      .addCase(getPaymentSummary.rejected, (state, action) => {
        state.error = action.error as string;
      });
  },
});

export default paymentSlice.reducer;
