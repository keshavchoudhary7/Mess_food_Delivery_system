import axios from "axios";
import Cookies from "js-cookie";

const Api = axios.create({
  baseURL: "http://localhost:3000/api/mess",
  headers: {
    "Content-Type": "application/json",
  },
});

export const MessDetails = async () => {
  const token = Cookies.get("token");
  try {
    const response = await Api.get("/getAllMessInfo", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("Mess Details Fetched successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
};
