import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { login } from "../services/authService";
import { getLoginHistory } from "../services/ApiService";
import { User } from "../types/interface";
import axios, { AxiosError } from "axios";

const storedUser = localStorage.getItem("currentUser");
const serviceURL = import.meta.env.VITE_APP_SERVICE_URL;

interface DecodedToken {
  exp: number;
}
interface ErrorResponse {
  message: string;
}

interface UpdateUserArgs {
  userId: string;
  role: string;
}
export interface History {
  userId: string;
  user: User;
  ipAddress: string;
  loginFailed: boolean;
  loginTime: Date;
  userAgent: string;
}

const getTokenExpired = (token: string): Date | null => {
  try {
    const decoded: DecodedToken = jwtDecode(token);
    const expirationDate = new Date(decoded.exp * 1000);
    return expirationDate;
  } catch (error) {
    console.error("Failed to decode token", error);
    return null;
  }
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const isTokenValid = (): boolean => {
  const token = Cookies.get("accessToken");
  if (!token) {
    return false;
  }
  const expirationDate = getTokenExpired(token);
  return expirationDate ? expirationDate > new Date() : false;
};

const initialState = {
  currentUser: storedUser ? JSON.parse(atob(storedUser)) : null,
  loginHistory: [] as History[],
  users: [] as User[],
  isLoading: false,
  loginFailed: false,
  error: null as string | null,
};

export const getAllUsers = createAsyncThunk(
  "auth/getUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${serviceURL}/api/users`);
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponse>;
      return rejectWithValue(
        axiosError.response?.data.message || "failed to fetched all user",
      );
    }
  },
);

export const upDatedUser = createAsyncThunk<User, UpdateUserArgs>(
  "user/edit",
  async ({ userId, role }, { rejectWithValue }) => {
    try {
      const res = await axios.put(`${serviceURL}/api/user/update/${userId}`, {
        userId,
        role,
      });
      return res.data;
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponse>;
      return rejectWithValue(axiosError.response?.data.message);
    }
  },
);

export const getHistory = createAsyncThunk(
  "auth/history",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getLoginHistory();
      return response;
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponse>;
      return rejectWithValue(axiosError.response?.data.message);
    }
  },
);

export const loginUser = createAsyncThunk<
  User,
  { email: string; password: string },
  { rejectValue: string }
>("auth/loginUser", async ({ email, password }, { rejectWithValue }) => {
  try {
    const user = await login(email, password);
    localStorage.setItem("currentUser", btoa(JSON.stringify(user)));
    Cookies.set("accessToken", user.token, {
      expires: 7,
      secure: true,
      sameSite: "strict",
    });
    return user;
  } catch (error) {
    const axiosError = error as AxiosError<ErrorResponse>;
    return rejectWithValue(
      axiosError.response?.data?.message || "Login failed",
    );
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.currentUser = null;
      state.loginHistory = [];
      localStorage.removeItem("currentUser");
      Cookies.remove("accessToken");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.currentUser = action.payload;
        state.isLoading = false;
        state.loginFailed = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loginFailed = true;
        state.isLoading = false;
      })
      .addCase(getHistory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getHistory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.loginHistory = action.payload;
      })
      .addCase(getHistory.rejected, (state, action) => {
        state.error = action.payload as string;
        state.isLoading = false;
      })
      .addCase(getAllUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.users = action.payload;
        state.isLoading = false;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.error = action.payload as string;
        state.isLoading = false;
      })
      .addCase(upDatedUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(upDatedUser.fulfilled, (state, action) => {
        const updatedUser = state.users.findIndex(
          (user) => user._id === action.payload._id,
        );
        if (updatedUser !== -1) {
          state.users[updatedUser] = action.payload;
        }
        state.isLoading = false;
      })
      .addCase(upDatedUser.rejected, (state, action) => {
        state.error = action.error as string;
        state.isLoading = false;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
