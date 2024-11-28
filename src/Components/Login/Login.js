import { useState } from "react";
import styles from "./Register.module.css";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../../firabaseInit";
import { toast } from "react-toastify";

const Login = () => {
  const [userData, setUserData] = useState({ email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, userData.email, userData.password);
      toast.success("User Logged In successfully!", {
        position: "top-right",
      });

      window.location.href = "/home";
    } catch (error) {
      console.log(error.message);
      toast.error(`Failed to login user!, ${error.message}`, {
        position: "top-right",
      });
    }
  };

  return (
    <div className={styles.container}>
      <h1>Sign In</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <br />
        <input
          id="email"
          type="email"
          onChange={(e) =>
            setUserData({
              email: e.target.value,
              password: userData.password,
            })
          }
          placeholder="Email..."
          required
        />
        <br />

        <label htmlFor="password">Password</label>
        <br />
        <input
          id="password"
          type="password"
          placeholder="Password..."
          onChange={(e) =>
            setUserData({
              email: userData.email,
              password: e.target.value,
            })
          }
          required
        />
        <br />
        <button>Sign Up</button>
        <p>
          New a user? <a href="#">Register</a>
        </p>
      </form>
    </div>
  );
};

export { Login };
