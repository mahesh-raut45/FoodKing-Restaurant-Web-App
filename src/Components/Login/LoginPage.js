import { Link, useNavigate } from "react-router-dom";
import styles from "./LoginPage.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faGithub,
  faGooglePlusG,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, registerUser, reset } from "../../Redux/Slice/userSlice";
import { toast } from "react-toastify";

const LoginPage = () => {
  const [isActive, setIsActive] = useState(false);
  const [loginUserData, setLoginUserData] = useState({
    username: "",
    password: "",
  });

  const [regUserData, setRegUserData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth || {}
  );

  useEffect(() => {
    // if (isError) {
    //   toast.error(message, {
    //     position: "top-right",
    //   });
    // }

    if (isSuccess) {
      toast.success("Registration successful! Please login.", {
        postion: "top-right",
      });
    }

    // dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onRegValChange = (e) => {
    setRegUserData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onLoginValChange = (e) => {
    setLoginUserData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // for switching between sign in and sign up

  const handleRegister = () => {
    setIsActive(true);
  };
  const handleSignIn = () => {
    setIsActive(false);
  };

  // on form submitting

  const onLogin = (e) => {
    e.preventDefault();

    const userData = {
      userName: loginUserData.username,
      password: loginUserData.password,
    };

    // dispatch(login(userData));

    dispatch(loginUser(userData)).then((result) => {
      if (loginUser.fulfilled.match(result)) {
        toast.success("User Logged In successfully!", {
          position: "top-right",
        });
        navigate("/home");
      } else {
        toast.error(`Failed to login user! ${result.payload}`, {
          position: "top-right",
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

    if (regUserData.password !== regUserData.confirmPassword) {
      toast.warning("Password and Confirm Password should be same!", {
        position: "top-right",
      });
    } else {
      const userData = {
        userName: regUserData.username,
        email: regUserData.email,
        password: regUserData.password,
      };

      // dispatch(register(userData));
      dispatch(registerUser(userData)).then((result) => {
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
    }
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
              name="username"
              value={regUserData.username}
              onChange={onRegValChange}
              placeholder="Username"
              required
            />
            <input
              type="email"
              name="email"
              value={regUserData.email}
              onChange={onRegValChange}
              placeholder="Email"
            />
            <input
              type="password"
              name="password"
              value={regUserData.password}
              onChange={onRegValChange}
              placeholder="Password"
            />
            <input
              type="password"
              name="confirmPassword"
              value={regUserData.confirmPassword}
              onChange={onRegValChange}
              placeholder="Confirm Password"
            />
            <button type="submit" disabled={isLoading}>
              {isLoading ? "Signing Up..." : "Sign Up"}
            </button>
            {isError && <p style={{ color: "blue" }}>{message}</p>}
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
              type="text"
              name="username"
              value={loginUserData.username}
              onChange={onLoginValChange}
              placeholder="username"
              required
            />
            <input
              type="password"
              name="password"
              value={loginUserData.password}
              onChange={onLoginValChange}
              placeholder="Password"
              required
            />
            <Link to="#" className={styles.forget_password}>
              Forget Your Password
            </Link>
            {isError && <p style={{ color: "red" }}>{message}</p>}
            <button type="submit" disabled={isLoading}>
              {isLoading ? "Signing In..." : "Sign In"}
            </button>
          </form>
        </div>
        <div className={styles.toggle_container}>
          <div className={styles.toggle}>
            <div className={`${styles.toggle_panel} ${styles.toggle_left} `}>
              <h1>Hello Friend!</h1>
              <p>Create your new account</p>
              <button className={styles.hidden} onClick={handleSignIn}>
                Sign In
              </button>
            </div>
            <div className={`${styles.toggle_panel} ${styles.toggle_right} `}>
              <h1>Welcome Back!</h1>
              <p>Enter your personal details</p>
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
