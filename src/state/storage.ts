import * as SecureStore from "expo-secure-store";

type SecureStorage = {
  setItem: (key: string, value: string) => Promise<void>;
  getItem: (key: string) => Promise<string | null>;
  removeItem: (key: string) => Promise<void>;
};

const createSecureStorage = (keyPrefix = ""): SecureStorage => ({
  setItem: async (key, value) => {
    await SecureStore.setItemAsync(keyPrefix + key, value, {
      keychainAccessible: SecureStore.WHEN_UNLOCKED,
    });
  },
  getItem: async (key) => {
    const result = await SecureStore.getItemAsync(keyPrefix + key);
    return result;
  },
  removeItem: async (key) => {
    await SecureStore.deleteItemAsync(keyPrefix + key);
  },
});

export const storage = createSecureStorage("app-");

export const tokenStorage = createSecureStorage("token-");
