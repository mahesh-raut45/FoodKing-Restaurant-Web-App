import { Component } from "react";
import styles from "./Nav.module.css";
import navlogo from "../../photos/navlogo.jpg";
import { Link } from "react-router-dom";
import { auth, db } from "../../firabaseInit";
import { doc, getDoc } from "firebase/firestore";
import { toast } from "react-toastify";

class Nav extends Component {
  state = {
    scrolled: false,
    userDetails: null,
  };

  // setup an event listenerfor scrolling when the components mounts
  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
    this.fetchUserData();
  }
  //remove scroll event listener when the component unmount
  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
    // this.setState({
    //   userDetails: null,
    // });
  }

  handleScroll = () => {
    const isScrolled = window.scrollY > 49;
    if (isScrolled !== this.state.scrolled) {
      this.setState({ scrolled: isScrolled });
    }
  };

  fetchUserData = async () => {
    auth.onAuthStateChanged(async (user) => {
      console.log(user);
      if (user) {
        try {
          const docRef = doc(db, "Users", user.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            // setUserDetails(docSnap.data());
            this.setState({
              userDetails: docSnap.data(),
            });
            // console.log(docSnap.data());
            // toast.success("User logged in successfully!", {
            //   position: "top-right",
            // });
          } else {
            console.log("User is not logged in");
          }
        } catch (error) {
          toast.error(`User is not logged in!, ${error.message} `, {
            position: "top-right",
          });
        }
      }
    });
  };

  handleLogout = async () => {
    try {
      await auth.signOut();
      window.location.href = "/";
      console.log("User logged out!");
    } catch (error) {
      console.log("User does not logout,", error.message);
    }
  };

  render() {
    const { userDetails } = this.state;
    return (
      <>
        {/* Conditionally render `nav_top` only if the user has not scrolled */}
        {!this.setState.scrolled && (
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
                />
              </a>
              <a href="#">
                <img
                  className={styles.small_icon}
                  src="https://cdn-icons-png.flaticon.com/128/2168/2168336.png"
                />
              </a>
              <a href="#">
                <img
                  className={styles.small_icon}
                  src="https://cdn-icons-png.flaticon.com/128/1384/1384015.png"
                />
              </a>
              <a href="#">
                <img
                  className={styles.small_icon}
                  src="https://cdn-icons-png.flaticon.com/128/49/49440.png"
                />
              </a>
            </div>
          </div>
        )}
        <hr />
        {/* Add the `nav_fixed` class to `nav` when scrolled state is true */}
        <div
          className={`${styles.nav} ${
            this.state.scrolled ? styles.nav_fixed : ""
          }`}
        >
          <div className={styles.nav_container}>
            <div className={styles.nav_left}>
              <img className={styles.nav_logo} src={navlogo} alt="nav logo" />
              <h1 className={styles.nav_header}>FOODKING</h1>
            </div>

            <div>
              <h1>{userDetails ? `Welcome ${userDetails.fName}` : ""}</h1>
            </div>

            <div className={styles.nav_right}>
              <div className={styles.nav_cart}>
                <Link to="/cart">
                  <img
                    src="https://t3.ftcdn.net/jpg/00/73/10/64/240_F_73106428_Q91LNUigg4ZRIi1ItxIcgEzyW8C9yluE.jpg"
                    alt="cart"
                    className={styles.nav_cart_logo}
                  />
                  <span className={styles.cart_counter}>
                    {this.props.cartCount}
                  </span>
                </Link>
              </div>
              <p className={styles.nav_contactus}>CONTACT US</p>
              <img
                src="https://cdn-icons-png.flaticon.com/128/7787/7787479.png"
                alt="menu"
                className={styles.nav_menu}
              />
              {userDetails ? (
                <button onClick={this.handleLogout}>Log Out</button>
              ) : null}
            </div>
          </div>
        </div>
      </>
    );
  }
}
export { Nav };
