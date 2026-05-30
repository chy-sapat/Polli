import * as SecureStore from "expo-secure-store";


export const validateToken = async () => {
  try {
    const token = await SecureStore.getItemAsync("token");
    return token ?? null;
  } catch (error) {
    console.error("Token validation error:", error);
    return null;
  }
};