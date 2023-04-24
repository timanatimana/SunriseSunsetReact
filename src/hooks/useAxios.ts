import { useState } from "react";
import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { Nullable } from "@/types/common.types";

export interface AxiosResponse<T = any> {
  data: T;
  status: number;
  statusText: string;
  headers: any;
  config: AxiosRequestConfig;
  request?: any;
}

const x_api_key = process.env.X_API_KEY;
const baseUrl = process.env.SERVER_API_BASE_URL;

const apiClient = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json",
    "x-api-key": x_api_key,
  },
});

export const useAxios = () => {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<Nullable<any>>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchData = async (params: AxiosRequestConfig<any>): Promise<void> => {
    setLoading(true);
    setError(null);
    setData(null);

    try {
      const res = await apiClient.request(params);

      switch (res.status) {
        case 200:
          setData(res.data);
          break;
        case 204:
          setError(
            "The location you entered rendered no results. Please change!"
          );
          break;
      }
    } catch (error) {
      const axiosError = (error as AxiosError).response;
      if (axiosError) {
        switch (axiosError.status) {
          case 404:
            setError(
              `Unfortunately, your request rendered no results. Please try again! errorcode: ${axiosError.status}`
            );
            break;
          case 400:
            setError(
              `Unfortunately, there occured an error while attempting to process your request. Please try again! errormessage: ${axiosError.status} - ${axiosError.statusText}`
            );
            break;
        }
      } else {
        console.error(`Error in useAxios hook - fetchData: ${error}`);
      }
    } finally {
      setLoading(false);
    }
  };

  return [data, error, loading, fetchData] as const;
};
