import React, { useState, useEffect } from "react";
import styles from "./Nav.module.css";
import navlogo from "../../photos/navlogo.jpg";
import { Link, useNavigate } from "react-router-dom";
import man from "../../photos/man.png";
import { fetchUserDetails } from "../../Feature/auth/AuthService";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart } from "../../Redux/Slice/cartSlice";

const Nav = () => {
  const [scrolled, setScrolled] = useState(false);
  const [userDetails, setUserDetails] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let cartItems = useSelector((state) => state.cart.cartItems);

  /**
   * Sets up a scroll event listener when the component mounts.
   * Updates the `scrolled` state if the page is scrolled more than 49px vertically.
   * Cleans up the event listener when the component unmounts or dependencies change.
   *
   * Dependencies:
   * - `scrolled`: ensures state is updated only when necessary to avoid unnecessary re-renders.
   * - `cartItems`: included if the scroll behavior is related to cart updates (consider removing if not needed).
   */
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 49;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled]);

  /**
   * Fetches user details from the backend when the component mounts,
   * but only if a valid token is already saved (handled inside fetchUserDetails).
   *
   * - If the user data is successfully retrieved and not null, navigates to the "/home" route.
   * - Catches and logs any errors that occur during the fetch process.
   *
   * Dependency:
   * - `navigate`: included to ensure navigation reference is up-to-date.
   */
  useEffect(() => {
    const getUserData = async () => {
      try {
        const user = await fetchUserDetails();
        setUserDetails(user);
        console.log("User: ", user);
        if (user != null) {
          navigate("/home");
        }
      } catch (error) {
        console.log("Login status: ", error.message);
      }
    };

    getUserData();
  }, [navigate]);

  /**
   * Fetches cart items from the backend when the user's ID becomes available.
   *
   * - Triggers the `fetchCart` action using the Redux `dispatch` function.
   * - Ensures that cart data is loaded only after user details (specifically `userDetails.id`) are set.
   *
   * Dependencies:
   * - `userDetails?.id`: ensures the effect runs only when a valid user ID is available.
   * - `dispatch`: included to satisfy React-Redux best practices.
   */
  useEffect(() => {
    dispatch(fetchCart(userDetails?.id));
  }, [userDetails?.id, dispatch]);

  /**
   * Logs the user out by clearing local storage and navigating to the root page.
   *
   * - Removes authentication token and user info from localStorage.
   * - Navigates to "/" using React Router without reloading the page.
   */
  const handleLogout = async () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    // navigate("/");
    window.location.href = "/";
  };

  return (
    <>
      {/* Conditionally render `nav_top` only if the user has not scrolled */}
      {!scrolled && (
        <div className={styles.nav_top}>
          <div className={styles.nav_top_container}>
            <ul className={styles.nav_top_list}>
              <li>
                <span>100% </span>
                Secure delivery without contacting the courier
              </li>
              <li className={styles.truck_icon}>
                <img
                  className={styles.small_icon}
                  src="https://cdn-icons-png.flaticon.com/128/713/713311.png"
                  alt="truck"
                />
                Track Your Order
              </li>
            </ul>
          </div>
          <div className={styles.nav_top_social_icon}>
            <a href="#">
              <img
                className={styles.small_icon}
                src="https://cdn-icons-png.flaticon.com/128/2175/2175193.png"
                alt="social"
              />
            </a>
            <a href="#">
              <img
                className={styles.small_icon}
                src="https://cdn-icons-png.flaticon.com/128/2168/2168336.png"
                alt="social"
              />
            </a>
            <a href="#">
              <img
                className={styles.small_icon}
                src="https://cdn-icons-png.flaticon.com/128/1384/1384015.png"
                alt="social"
              />
            </a>
            <a href="#">
              <img
                className={styles.small_icon}
                src="https://cdn-icons-png.flaticon.com/128/49/49440.png"
                alt="social"
              />
            </a>
          </div>
        </div>
      )}
      <hr />
      {/* Add the `nav_fixed` class to `nav` when scrolled state is true */}
      <div className={`${styles.nav} ${scrolled ? styles.nav_fixed : ""}`}>
        <div className={styles.nav_container}>
          <div className={styles.nav_left}>
            <Link to={"/home"}>
              <img className={styles.nav_logo} src={navlogo} alt="nav logo" />
            </Link>
            <h1 className={styles.nav_header}>FoodKing</h1>
          </div>

          <div className={styles.nav_right}>
            {userDetails ? (
              <div className={styles.nav_cart}>
                <Link to={`/cart/user/${userDetails.id}`}>
                  <img
                    src="https://t3.ftcdn.net/jpg/00/73/10/64/240_F_73106428_Q91LNUigg4ZRIi1ItxIcgEzyW8C9yluE.jpg"
                    alt="cart"
                    className={styles.nav_cart_logo}
                  />
                  <span className={styles.cart_counter}>
                    {cartItems.length}
                  </span>
                </Link>
              </div>
            ) : null}
            {/* <p className={styles.nav_contactus}>CONTACT US</p> */}
            {userDetails ? (
              <>
                <div className={styles.logged_user}>
                  <img src={man} alt="user" />
                  <p>{userDetails.userName}</p>
                  <ul className={styles.user_actions}>
                    <li>
                      <button onClick={handleLogout}>Sign Out</button>
                    </li>
                  </ul>
                </div>
              </>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
};

export { Nav };
