import { useState } from "react";
import styles from "./Register.module.css";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../Redux/userSlice";

const Login = () => {
  const [userData, setUserData] = useState({ email: "", password: "" });

  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.user);

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(loginUser(userData)).then((result) => {
      if (loginUser.fulfilled.match(result)) {
        toast.success("User Logged In successfully!", {
          position: "bottom-right",
        });
        window.location.href = "/home";
      } else {
        toast.error(`Failed to login user! ${result.payload}`, {
          position: "bottom-right",
        });
      }
    });

    setUserData({ email: "", password: "" });
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   try {
  //     await signInWithEmailAndPassword(auth, userData.email, userData.password);
  //     // toast.success("User Logged In successfully!", {
  //     //   position: "top-right",
  //     // });

  //     window.location.href = "/home";
  //   } catch (error) {
  //     console.log(error.message);
  //     toast.error(`Failed to login user!, ${error.message}`, {
  //       position: "top-right",
  //     });
  //   }
  // };

  return (
    <div className={styles.container}>
      <h1>Sign In</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <br />
        <input
          id="email"
          type="email"
          value={userData.email}
          onChange={(e) => setUserData({ ...userData, email: e.target.value })}
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
          value={userData.password}
          onChange={(e) =>
            setUserData({ ...userData, password: e.target.value })
          }
          required
        />
        <br />
        <button type="submit" disabled={loading}>
          {loading ? "Signing In..." : "Sign In"}
        </button>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <p>
          New user? <a href="/register">Register</a>
        </p>
      </form>
    </div>
  );
};

export { Login };
