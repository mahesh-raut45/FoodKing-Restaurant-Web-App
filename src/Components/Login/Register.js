import { useState } from "react";
import styles from "./Register.module.css";
import { toast } from "react-toastify";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../firabaseInit";
import { doc, setDoc } from "firebase/firestore";

const Register = () => {
  const [userData, setUserData] = useState({
    fName: "",
    lName: "",
    email: "",
    password: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(userData);
    // toast("User register successfully!");
    try {
      await createUserWithEmailAndPassword(
        auth,
        userData.email,
        userData.password
      );
      const user = auth.currentUser;
      console.log(user);
      if (user) {
        await setDoc(doc(db, "Users", user.uid), {
          email: user.email,
          fName: userData.fName,
          lName: userData.lName,
          password: userData.password,
        });
      }
      console.log("User register successfully!");
      toast.success("User register successfully!", {
        position: "top-right",
      });
    } catch (error) {
      console.log(error.message);
      toast.error(`Failed to register user!, ${error.message}`, {
        position: "top-right",
      });
    }
  };

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
            onChange={(e) =>
              setUserData({
                fName: e.target.value,
                lName: userData.lName,
                email: userData.email,
                password: userData.password,
              })
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
            onChange={(e) =>
              setUserData({
                fName: userData.fName,
                lName: e.target.value,
                email: userData.email,
                password: userData.password,
              })
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
            onChange={(e) =>
              setUserData({
                fName: userData.fName,
                lName: userData.lName,
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
                fName: userData.fName,
                lName: userData.lName,
                email: userData.email,
                password: e.target.value,
              })
            }
            required
          />
          <br />
          <button>Sign Up</button>
          <p>
            Already a user? <a href="#">Sign in</a>
          </p>
        </form>
      </div>
    </>
  );
};

export { Register };
