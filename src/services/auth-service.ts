import axios from "axios";
import { BASE_URL } from "./config";
import { tokenStorage } from "../state/storage";
import { useAuthStore } from "../state/auth-store";
import { resetAndNavigate } from "../utils/navigationUtils";
import { appAxios } from "./api-interceptors";

export const customerLogin = async (phone: string) => {
  try {
    const res = await axios.post(`${BASE_URL}/customer/login`, { phone });
    const { accessToken, refreshToken, customer } = res.data;

    await tokenStorage.setItem("accessToken", accessToken);
    await tokenStorage.setItem("refreshToken", refreshToken);

    const { setUser } = useAuthStore.getState();

    setUser(customer);
  } catch (error) {
    console.log("Login error...", error);
  }
};

export const deliveryLogin = async (email: string, password: string) => {
  try {
    const res = await axios.post(`${BASE_URL}/delivery/login`, {
      email,
      password,
    });
    const { accessToken, refreshToken, deliveryPartner } = res.data;

    await tokenStorage.setItem("accessToken", accessToken);
    await tokenStorage.setItem("refreshToken", refreshToken);

    const { setUser } = useAuthStore.getState();

    setUser(deliveryPartner);
  } catch (error) {
    console.log("Login error...", error);
  }
};

export const refresh_tokens = async () => {
  try {
    const refreshToken = await tokenStorage.getItem("refreshToken");
    const res = await axios.post(`${BASE_URL}/refresh-token`, { refreshToken });
    const new_access_token = res.data.accessToken;
    const new_refresh_token = res.data.refreshToken;

    await tokenStorage.setItem("accessToken", new_access_token);
    await tokenStorage.setItem("refreshToken", new_refresh_token);

    return new_access_token;
  } catch (error) {
    console.log("Refresh token error...", error);
    await tokenStorage.removeItem("accessToken");
    await tokenStorage.removeItem("refreshToken");
    resetAndNavigate("CustomerLogin");
  }
};

export const refetchUser = async (setUser: (user: any) => void) => {
  try {
    const res = await appAxios.get("/user");
    setUser(res.data.user);
  } catch (error) {
    console.log("Login error...", error);
  }
};

export const updateUserLocation = async (
  data: any,
  setUser: (user: any) => void
) => {
  try {
    const res = await appAxios.patch("/user", data);
    refetchUser(setUser);
  } catch (error) {
    console.log("Update user location error...", error);
  }
};
