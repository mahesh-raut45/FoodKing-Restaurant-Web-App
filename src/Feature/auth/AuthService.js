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

  if (response.data) {
    localStorage.setItem("token", response.data.token);
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

// Fetch logged-in user details
export const fetchUserDetails = async () => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) throw new Error("User is not logged in!");

  return user; // Return user data from localStorage

  // const token = localStorage.getItem("token");

  // if (!token) {
  //   throw new Error("User is not logged in!");
  // }

  // const response = await axios.get(API_URL + "user", {
  //   headers: {
  //     Authorization: `Bearer ${token}`, // Sending token in headers
  //   },
  // });

  // return response.data;
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
