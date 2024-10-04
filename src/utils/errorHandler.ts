import { AxiosError } from "axios";

export const handleAxiosError = (error: AxiosError) => {
  if (error.response) {
    return error.response.data?.message || "Server responded with an error";
  }
  return error.message || "An unknown eror occurred";
  const axiosError = error;
  return axiosError.response?.data || axiosError.message;
};
