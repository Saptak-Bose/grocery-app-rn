import axios from "axios";
import { BASE_URL } from "./config";
import { tokenStorage } from "../state/storage";
import { useAuthStore } from "../state/auth-store";

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
