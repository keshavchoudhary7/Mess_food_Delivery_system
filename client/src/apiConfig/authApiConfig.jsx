import axios from "axios";
import Cookies from "js-cookie";

const Api = axios.create({
  baseURL: import.meta.env.VITE_AUTH_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Function to handle user signUp
export const register = async (userData) => {
  try {
    const response = await Api.post("/register", userData);
    console.log("User registered successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
};

export const login = async (userData) => {
  try {
    const response = await Api.post("/login", userData);
    console.log("login success", response.data);
    return response.data;
  } catch (error) {
    console.log("login failed", error);
    throw error;
  }
};

export const logout = async (token) => {
  try {
    const response = await Api.post(
      "/logout",
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error(
      "Error logging out user:",
      error.response?.data?.message || error.message
    );
    throw error;
  }
};
