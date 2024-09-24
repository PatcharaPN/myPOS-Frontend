import { useEffect, useState } from "react";
import axios, { AxiosRequestConfig, AxiosError } from "axios";

const useFetch = <T>(url: string, option: AxiosRequestConfig = {}) => {
  const [data, setData] = useState<T | null>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const response = await axios(url, option);
        setData(response.data);
      } catch (error) {
        const axiosError = error as AxiosError;
        setError(axiosError.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, option]);
  return { data, loading, error };
};

export default useFetch;
