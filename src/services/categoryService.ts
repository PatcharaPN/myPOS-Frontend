import axios from "axios";
const serviceURL = import.meta.env.VITE_APP_SERVICE_URL;
const CATEGORY_URL = `${serviceURL}/api/categories`;

export const getAllCategory = async () => {
  try {
    const response = await axios.get(`${CATEGORY_URL}`);
    console.log(response.data);

    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
