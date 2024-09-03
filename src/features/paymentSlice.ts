import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Product, User } from "../types/interface";
import axios from "axios";

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

export interface PaymentState {
  payments: Payment[]; // Changed to 'payments' to reflect multiple payments
  loading: boolean;
  paymentSummary: PaymentSummary[];
  amount: Payment | any;
  error: string | null;
}

const initialState: PaymentState = {
  payments: [],
  paymentSummary: [],
  amount: 0,
  loading: false,
  error: null,
};

export const createPayment = createAsyncThunk<
  Payment,
  { createdBy: string; products: string[]; status: string } // Updated `products` to be an array of strings
>("payment/create", async (paymentData, thunkAPI) => {
  try {
    const response = await axios.post<Payment>(
      `${serviceURL}/api/payment`,
      paymentData,
    );
    return response.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response?.data || error.message);
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

export const getAmountOfPayment = createAsyncThunk(
  "payment/getAmount",
  async () => {
    try {
      const response = await axios.get<Payment>(
        `${serviceURL}/api/paymentcount`,
      );
      console.log(response.data);

      return response.data;
    } catch (error) {
      console.log(error);
    }
  },
);

export const getAllPayments = createAsyncThunk<Payment[]>(
  "payment/getAll", // Updated action type to reflect fetching all payments
  async (_, thunkAPI) => {
    try {
      const response = await axios.get<Payment[]>(`{$serviceURL}/api/payment`);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
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
      .addCase(getAmountOfPayment.fulfilled, (state, action) => {
        state.loading = false;
        state.amount = action.payload?.amount;
      })
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
