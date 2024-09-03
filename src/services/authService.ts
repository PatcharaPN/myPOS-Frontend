import axios from "axios";

const serviceURL = import.meta.env.VITE_APP_SERVICE_URL;
const API_URL = `${serviceURL}/api/login`;

export const login = async (email: string, password: string) => {
  const response = await axios.post(API_URL, { email, password });
  return response.data;
};
