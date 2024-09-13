import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Product, User } from "../types/interface";
import axios, { AxiosError } from "axios";

const serviceURL = import.meta.env.VITE_APP_SERVICE_URL;
export type Payment = {
  _id: string;
  createdBy: User;
  products: Product;
  status: string;
  amount: number;
  createdAt: Date;
  updatedAt: Date;
};
export type PaymentSummary = {
  _id: {
    month: number;
    year: number;
  };
  totalPayments: number;
  totalAmount: number;
  monthName: string;
};
interface ErrorResponse {
  message: string;
}

export interface PaymentState {
  payments: Payment[]; // Changed to 'payments' to reflect multiple payments
  loading: boolean;
  paymentSummary: PaymentSummary[];
  amount: number | null;
  error: string | null;
}

const initialState: PaymentState = {
  payments: [],
  paymentSummary: [],
  amount: null,
  loading: false,
  error: null,
};
export const createPayment = createAsyncThunk<
  Payment, // Success response type
  { createdBy: string; products: string[]; status: string }, // Input payload
  {
    rejectValue: ErrorResponse; // Type for rejected action
  }
>("payment/create", async (paymentData, thunkAPI) => {
  try {
    const response = await axios.post<Payment>(
      `${serviceURL}/api/payment`,
      paymentData,
    );
    return response.data;
  } catch (error) {
    // Narrow down the type of the error
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<ErrorResponse>;
      // Check if the error response exists, otherwise fall back to a default message
      return thunkAPI.rejectWithValue(
        axiosError.response?.data || { message: axiosError.message },
      );
    } else {
      // If the error is not an AxiosError, return a generic error
      return thunkAPI.rejectWithValue({ message: String(error) });
    }
  }
});
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
