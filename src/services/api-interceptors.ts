import axios from "axios";
import { BASE_URL } from "./config";
import { refresh_tokens } from "./auth-service";
import { tokenStorage } from "../state/storage";

export const appAxios = axios.create({
  baseURL: BASE_URL,
});

appAxios.interceptors.request.use(async (config) => {
  const accessToken = await tokenStorage.getItem("accessToken");

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

appAxios.interceptors.response.use(
  (res) => res,
  async (error) => {
    if (error.response && error.response.status === 401) {
      try {
        const newAccessToken = await refresh_tokens();

        if (newAccessToken) {
          error.config.headers.Authorization = `Bearer ${newAccessToken}`;
          return axios(error.config);
        }
      } catch (error) {
        console.log("Error refreshing token...");
      }
    }

    if (error.response && error.response.status !== 401) {
      const errorMessage =
        error.response.data.message || "Something went wrong...";
      console.log(errorMessage);
    }

    return Promise.resolve(error);
  }
);
