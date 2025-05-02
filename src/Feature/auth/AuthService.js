import axios from "axios";

// const API_URL = "http://localhost:8080/api/auth/";

/**
 * AuthService provides functions to handle user authentication actions:
 * - Registering a new user
 * - Logging in an existing user
 * - Fetching user details from localStorage
 * - Logging out the user
 *
 * API Endpoints used:
 * - `/api/auth/register`: Endpoint for registering a new user.
 * - `/api/auth/login`: Endpoint for logging in an existing user.
 *
 * LocalStorage:
 * - User data (`user` and `token`) is stored in localStorage after a successful login.
 * - This data is retrieved by `fetchUserDetails`.
 * - Data is cleared from localStorage during logout.
 */

/**
 * Registers a new user by sending a POST request with the user data.
 *
 * @param {Object} userData - The registration data (e.g., username, email, password).
 * @returns {Promise<Object>} The response data from the server.
 */
export const register = async (userData) => {
  const response = await axios.post(
    `${process.env.REACT_APP_BASE_URL}/api/auth/register`,
    userData,
    {
      headers: { "Content-Type": "application/json" },
    }
  );
  return response.data;
};

/**
 * Logs in a user by sending a POST request with the login credentials.
 *
 * - On success, stores the token and user data in localStorage.
 * - Returns the user data (including token) after successful login.
 *
 * @param {Object} userData - The login data (e.g., username, password).
 * @returns {Promise<Object>} The logged-in user data.
 */
export const login = async (userData) => {
  const response = await axios.post(
    `${process.env.REACT_APP_BASE_URL}/api/auth/login`,
    userData
  );

  console.log("Response: ", response);
  if (response.data) {
    localStorage.setItem("token", response.data.token);
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

/**
 * Fetches the logged-in user details from localStorage.
 *
 * - If no user data is found in localStorage, logs a warning and returns `null`.
 * - Returns the user data object if found.
 *
 * @returns {Object|null} The user data from localStorage or `null` if no data exists.
 */
export const fetchUserDetails = async () => {
  const user = JSON.parse(localStorage.getItem("user"));

  // if (!user) throw new Error("User is not logged in!");
  if (!user) {
    console.warn("No user data found in localStorage");
    return null;
  }

  return user; // Return user data from localStorage
};

/**
 * Logs the user out by clearing the user data and token from localStorage.
 */
export const logout = () => {
  localStorage.removeItem("user");
};

// const authService = {
//   register,
//   login,
//   logout,
// };

// export default authService;
