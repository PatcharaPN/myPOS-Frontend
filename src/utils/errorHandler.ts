import { AxiosError } from "axios";

export const handleAxiosError = (error: AxiosError) => {
  const axiosError = error;
  return axiosError.response?.data || axiosError.message;
};
