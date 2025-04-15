import React, { useState, useEffect } from "react";
import styles from "./Nav.module.css";
import navlogo from "../../photos/navlogo.jpg";
import { Link, useNavigate } from "react-router-dom";
import man from "../../photos/man.png";
import { fetchUserDetails } from "../../Feature/auth/AuthService";
import { useSelector } from "react-redux";

const Nav = (props) => {
  const [scrolled, setScrolled] = useState(false);
  const [userDetails, setUserDetails] = useState(null);
  const navigate = useNavigate();
  let cartItems = useSelector((state) => state.cart.cartItems);

  // Setup an event listener for scrolling when the component mounts
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 49;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    // Add event listener
    window.addEventListener("scroll", handleScroll);

    cartItems = cartItems.length;

    // Clean up event listener when component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled, cartItems]);

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

    // cartItems = cartItems.length;
  }, []);

  // const fetchUserData = async () => {
  //   auth.onAuthStateChanged(async (user) => {
  //     if (user) {
  //       console.log("User: ", user);
  //       try {
  //         const docRef = doc(db, "Users", user.uid);
  //         const docSnap = await getDoc(docRef);
  //         if (docSnap.exists()) {
  //           setUserDetails(docSnap.data());
  //           toast.success("User logged in successfully!", {
  //             position: "top-right",
  //           });
  //         } else {
  //           console.log("User is not logged in");
  //         }
  //       } catch (error) {
  //         toast.error(`User is not logged in!, ${error.message} `, {
  //           position: "top-right",
  //         });
  //       }
  //     }
  //   });
  // };

  const handleLogout = async () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/";
    // navite("/");
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
            <a>
              <img
                className={styles.small_icon}
                src="https://cdn-icons-png.flaticon.com/128/2175/2175193.png"
                alt="social"
              />
            </a>
            <a>
              <img
                className={styles.small_icon}
                src="https://cdn-icons-png.flaticon.com/128/2168/2168336.png"
                alt="social"
              />
            </a>
            <a>
              <img
                className={styles.small_icon}
                src="https://cdn-icons-png.flaticon.com/128/1384/1384015.png"
                alt="social"
              />
            </a>
            <a>
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
            <Link to={"/"}>
              <img className={styles.nav_logo} src={navlogo} alt="nav logo" />
            </Link>
            <h1 className={styles.nav_header}>FoodKing</h1>
          </div>

          <div className={styles.nav_right}>
            <div className={styles.nav_cart}>
              <Link to="/cart">
                <img
                  src="https://t3.ftcdn.net/jpg/00/73/10/64/240_F_73106428_Q91LNUigg4ZRIi1ItxIcgEzyW8C9yluE.jpg"
                  alt="cart"
                  className={styles.nav_cart_logo}
                />
                <span className={styles.cart_counter}>{cartItems.length}</span>
              </Link>
            </div>
            <p className={styles.nav_contactus}>CONTACT US</p>
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
