import { useAsync } from "react-async-hook";
import axiosClient from "./axiosClient";

const config = {
  baseURL: "https://127.0.0.1:8000/api",
};

export const useApi = (url, options = {}) => {
  const asyncCall = useAsync(async () => {
    const response = await axiosClient.get(`${config.baseURL}${url}`, options);
    return response.data;
  }, [url, JSON.stringify(options)]); 

  return {
    loading: asyncCall.loading,
    error: asyncCall.error,
    data: asyncCall.result,
  };
};

export const useRequest = (url, options = {}) => {
  const asyncCall = useAsync(async () => {
    const response = await axiosClient.get(`${config.baseURL}${url}`, options);
    return response.data;
  }, [url, JSON.stringify(options)]);

  return {
    loading: asyncCall.loading,
    error: asyncCall.error,
    data: asyncCall.result,
  };
}
