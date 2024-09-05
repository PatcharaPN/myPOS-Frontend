/* eslint-disable no-useless-catch */
import axios from "axios";

const serviceURL = import.meta.env.VITE_APP_SERVICE_URL;
const PRODUCT_GetAmont = `${serviceURL}/api/getAmount/`;
export const getAmount = async () => {
  try {
    const response = await axios.get(PRODUCT_GetAmont);
    return response.data;
  } catch (error) {
    console.error(error);
    throw Error("Error with getAmont service.");
  }
};
const api = axios.create({
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export const addProduct = async (formData: FormData) => {
  try {
    const response = await api.post(`${serviceURL}/api/products/`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      timeout: 10000,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const addBrand = async (formData: FormData) => {
  try {
    const response = await axios.post(`${serviceURL}/api/brand`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      timeout: 10000,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const getProduct = async () => {
  try {
    const response = await axios.get(`${serviceURL}/api/products`);

    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
export const deleteProduct = async (productId: string) => {
  try {
    if (!productId) {
      throw new Error("Product ID is required");
    }
    const response = await axios.delete(`${serviceURL}/${productId}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(
        "Error deleting product:",
        error.response?.data || error.message,
      );
    } else {
      console.error("Unexpected error:", error);
    }
    throw new Error("Failed to delete product. Please try again.");
  }
};
