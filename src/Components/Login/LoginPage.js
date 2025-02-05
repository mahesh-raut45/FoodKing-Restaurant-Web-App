import { Link, useNavigate } from "react-router-dom";
import styles from "./LoginPage.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faGithub,
  faGooglePlusG,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, registerUser } from "../../Redux/Slice/userSlice";
import { toast } from "react-toastify";

const LoginPage = () => {
  const [isActive, setIsActive] = useState(false);
  const navigate = useNavigate();
  const [loginUserData, setLoginUserData] = useState({
    logInEmail: "",
    loginPassword: "",
  });

  const [regUserData, setRegUserData] = useState({
    fName: "",
    lName: "",
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.user);

  //   for switching between sign in and sign up
  const handleRegister = () => {
    setIsActive(true);
  };
  const handleSignIn = () => {
    setIsActive(false);
  };

  //   on form submitting

  const onLogin = (e) => {
    e.preventDefault();
    dispatch(loginUser(loginUserData)).then((result) => {
      if (loginUser.fulfilled.match(result)) {
        toast.success("User Logged In successfully!", {
          position: "bottom-right",
        });
        navigate("/home");
      } else {
        toast.error(`Failed to login user! ${result.payload}`, {
          position: "bottom-right",
        });
      }
    });

    setLoginUserData({
      logInEmail: "",
      loginPassword: "",
    });
  };

  const onRegister = (e) => {
    e.preventDefault();
    dispatch(registerUser(regUserData)).then((result) => {
      if (registerUser.fulfilled.match(result)) {
        toast.success("User registered successfully!", {
          position: "bottom-right",
        });
        setIsActive(true);
      } else {
        toast.error(`Failed to register user! ${result.payload}`, {
          position: "bottom-right",
        });
      }
    });

    setRegUserData({ fName: "", lName: "", email: "", password: "" });
  };

  return (
    <>
      <div className={`${styles.container} ${isActive ? styles.active : ""}`}>
        <div className={`${styles.form_container} ${styles.sign_up}`}>
          <form onSubmit={onRegister}>
            <h1>Create Account</h1>
            <div className={styles.social_icons}>
              <Link to="#" className={styles.icon}>
                <FontAwesomeIcon icon={faGooglePlusG} size="2x" />
              </Link>
              <Link to="#" className={styles.icon}>
                <FontAwesomeIcon icon={faGithub} size="2x" />
              </Link>
              <Link to="#" className={styles.icon}>
                <FontAwesomeIcon icon={faFacebook} size="2x" />
              </Link>
              <Link to="#" className={styles.icon}>
                <FontAwesomeIcon icon={faLinkedin} size="2x" />
              </Link>
            </div>
            <span>or use your email for registration</span>
            <input
              type="text"
              value={regUserData.fName}
              onChange={(e) =>
                setRegUserData({ ...regUserData, fName: e.target.value })
              }
              placeholder="First Name"
              required
            />
            <input
              type="text"
              value={regUserData.lName}
              onChange={(e) =>
                setRegUserData({ ...regUserData, lName: e.target.value })
              }
              placeholder="Last name"
            />
            <input
              type="email"
              value={regUserData.email}
              onChange={(e) =>
                setRegUserData({ ...regUserData, email: e.target.value })
              }
              placeholder="Email"
            />
            <input
              type="password"
              value={regUserData.password}
              onChange={(e) =>
                setRegUserData({ ...regUserData, password: e.target.value })
              }
              placeholder="Password"
            />
            <button type="submit" disabled={loading}>
              {loading ? "Signing Up..." : "Sign Up"}
            </button>
            {error && <p style={{ color: "blue" }}>{error}</p>}
          </form>
        </div>

        <div className={`${styles.form_container} ${styles.sign_in}`}>
          <form onSubmit={onLogin}>
            <h1>Sign In</h1>
            <div className={styles.social_icons}>
              <Link to="#" className={styles.icon}>
                <FontAwesomeIcon icon={faGooglePlusG} size="2x" />
              </Link>
              <Link to="#" className={styles.icon}>
                <FontAwesomeIcon icon={faGithub} size="2x" />
              </Link>
              <Link to="#" className={styles.icon}>
                <FontAwesomeIcon icon={faFacebook} size="2x" />
              </Link>
              <Link to="#" className={styles.icon}>
                <FontAwesomeIcon icon={faLinkedin} size="2x" />
              </Link>
            </div>
            <span>or use your email and password</span>
            <input
              type="email"
              value={loginUserData.logInEmail}
              onChange={(e) =>
                setLoginUserData({
                  ...loginUserData,
                  logInEmail: e.target.value,
                })
              }
              placeholder="Email"
              required
            />
            <input
              type="password"
              value={loginUserData.loginPassword}
              onChange={(e) =>
                setLoginUserData({
                  ...loginUserData,
                  loginPassword: e.target.value,
                })
              }
              placeholder="Password"
              required
            />
            <Link to="#" className={styles.forget_password}>
              Forget Your Password
            </Link>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <button type="submit" disabled={loading}>
              {loading ? "Signing In..." : "Sign In"}
            </button>
          </form>
        </div>
        <div className={styles.toggle_container}>
          <div className={styles.toggle}>
            <div className={`${styles.toggle_panel} ${styles.toggle_left} `}>
              <h1>Welcome Back!</h1>
              <p>Enter your personal details</p>
              <button className={styles.hidden} onClick={handleSignIn}>
                Sign In
              </button>
            </div>
            <div className={`${styles.toggle_panel} ${styles.toggle_right} `}>
              <h1>Hello Friend!</h1>
              <p>Register your personal details</p>
              <button className={styles.hidden} onClick={handleRegister}>
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export { LoginPage };
