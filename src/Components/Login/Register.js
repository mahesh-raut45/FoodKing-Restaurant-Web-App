import { useState } from "react";
import styles from "./Register.module.css";
import { toast } from "react-toastify";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../firabaseInit";
import { doc, setDoc } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../Redux/userSlice";

const Register = () => {
  const [userData, setUserData] = useState({
    fName: "",
    lName: "",
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.user);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Dispatch asyncThunk
    // if fulfilled then success / failed
    dispatch(registerUser(userData)).then((result) => {
      if (registerUser.fulfilled.match(result)) {
        toast.success("User registered successfully!", {
          position: "top-right",
        });
      } else {
        toast.error(`Failed to register user! ${result.payload}`, {
          position: "top-right",
        });
      }
    });
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   // console.log(userData);
  //   // toast("User register successfully!");
  //   try {
  //     await createUserWithEmailAndPassword(
  //       auth,
  //       userData.email,
  //       userData.password
  //     );
  //     const user = auth.currentUser;
  //     console.log(user);
  //     if (user) {
  //       await setDoc(doc(db, "Users", user.uid), {
  //         email: user.email,
  //         fName: userData.fName,
  //         lName: userData.lName,
  //         password: userData.password,
  //       });
  //     }
  //     console.log("User register successfully!");
  //     toast.success("User register successfully!", {
  //       position: "top-right",
  //     });
  //   } catch (error) {
  //     console.log(error.message);
  //     toast.error(`Failed to register user!, ${error.message}`, {
  //       position: "top-right",
  //     });
  //   }
  // };

  return (
    <>
      <div className={styles.container}>
        <h1>Sign Up</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">First Name</label>
          <br />
          <input
            id="fname"
            type="text"
            value={userData.fName}
            onChange={(e) =>
              setUserData({ ...userData, fName: e.target.value })
            }
            placeholder="First Name..."
            required
          />
          <br />
          <label htmlFor="lname">Last Name</label>
          <br />
          <input
            id="lname"
            type="text"
            value={userData.lName}
            onChange={(e) =>
              setUserData({ ...userData, lName: e.target.value })
            }
            placeholder="Last Name..."
            required
          />
          <br />
          <label htmlFor="email">Email</label>
          <br />
          <input
            id="email"
            type="email"
            value={userData.email}
            onChange={(e) =>
              setUserData({ ...userData, email: e.target.value })
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
            value={userData.password}
            onChange={(e) =>
              setUserData({ ...userData, password: e.target.value })
            }
            required
          />
          <br />
          <button type="submit" disabled={loading}>
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
          <p>
            Already a user? <a href="/">Sign in</a>
          </p>
          {error && <p style={{ color: "blue" }}>{error}</p>}
        </form>
      </div>
    </>
  );
};

export { Register };
