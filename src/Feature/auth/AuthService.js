import axios from "axios";

const API_URL = "http://localhost:8080/api/auth/";

// Register user
export const register = async (userData) => {
  const response = await axios.post(API_URL + "register", userData, {
    headers: { "Content-Type": "application/json" },
  });
  return response.data;
};

// Login user
export const login = async (userData) => {
  const response = await axios.post(API_URL + "login", userData);

  console.log("Response: ", response);
  if (response.data) {
    localStorage.setItem("token", response.data.token);
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

// Fetch logged-in user details
export const fetchUserDetails = async () => {
  const user = JSON.parse(localStorage.getItem("user"));

  // if (!user) throw new Error("User is not logged in!");
  if (!user) {
    console.warn("No user data found in localStorage");
    return null;
  }

  return user; // Return user data from localStorage
};

// Logout user
export const logout = () => {
  localStorage.removeItem("user");
};

// const authService = {
//   register,
//   login,
//   logout,
// };

// export default authService;
