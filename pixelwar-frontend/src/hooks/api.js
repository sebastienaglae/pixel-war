import { useAsync } from "react-async-hook";
import axios from "axios";
import { useCallback, useState, useContext } from "react";
import { RoleContext } from "@contexts/RoleContext";

const apiUrl = "http://127.0.0.1:3000";
export const useApi = (url, method = "get", options = {}) => {
  const { token } = useContext(RoleContext);

  const asyncCall = useAsync(async () => {
    const headers = {
      Authorization: `Bearer ${token}`,
      ...options.headers,
    };

    const requestOptions = {
      ...options,
      headers,
    };

    try {
      const response = await axios[method](apiUrl + url, requestOptions);
      return { data: response.data, success: true };
    } catch (error) {
      let errorMessage = "An error occurred";
      let success = false;
      if (error.response) {
        if (error.response.status === 400) {
          if (error.response.data.errors) {
            errorMessage = error.response.data.errors
              .map((err) => `${err.msg} in ${err.path}`)
              .join(", ");
          } else if (error.response.data.error) {
            errorMessage = error.response.data.error || errorMessage;
          }
        } else {
          errorMessage = error.response.data.message || errorMessage;
        }
      }
      return { error: errorMessage, success };
    }
  }, [url, method, JSON.stringify(options), token]);
  return {
    loading: asyncCall.loading,
    error: asyncCall.error,
    data: asyncCall.result?.data,
    success: asyncCall.result?.success,
  };
};

export const useRequest = (
  baseUrl,
  defaultOptions = {},
  defaultMethod = "get"
) => {
  const [state, setState] = useState({
    loading: false,
    error: "",
    success: "",
    data: null,
  });

  const { token } = useContext(RoleContext);

  const execute = useCallback(
    async (urlSuffix = "", dynamicOptions = {}, method = defaultMethod) => {
      setState((prevState) => ({
        ...prevState,
        loading: true,
        error: "",
        success: "",
      })); // Clear previous error/success messages and set loading
      try {
        const options = {
          ...defaultOptions,
          ...dynamicOptions,
          headers: {
            Authorization: `Bearer ${token}`,
            ...defaultOptions.headers,
            ...dynamicOptions.headers,
          },
        };
        const response = await axios[method](
          `${apiUrl}${baseUrl}${urlSuffix}`,
          ...(["get", "delete"].includes(method)
            ? [options]
            : [options.data, options])
        );
        setState({
          loading: false,
          data: response.data,
          error: "",
          success: "Request successful!",
        });
      } catch (error) {
        let errorMessage = "An error occurred";
        if (error.response) {
          if (error.response.status === 400) {
            if (error.response.data.errors) {
              errorMessage = error.response.data.errors
                .map((err) => `${err.msg} in ${err.path}`)
                .join(", ");
            } else if (error.response.data.error) {
              errorMessage = error.response.data.error || errorMessage;
            }
          } else {
            errorMessage = error.response.data.message || errorMessage;
          }
        }
        setState({
          loading: false,
          error: errorMessage,
          success: "",
          data: null,
        });
      }
    },
    [baseUrl, JSON.stringify(defaultOptions), defaultMethod]
  );

  return { ...state, execute };
};

export const asset = (url) => {
  return `${apiUrl}${url}`;
};

export const downloadImage = async (imageUrl) => {
  try {
    const response = await axios.get(asset(imageUrl), {
      responseType: "blob",
    });

    const url = window.URL.createObjectURL(response.data);

    const link = document.createElement("a");
    link.href = url;
    link.download = "image.png";

    document.body.appendChild(link);

    link.click();

    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Erreur lors du téléchargement :", error);
  }
};