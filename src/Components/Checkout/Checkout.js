import React, { useEffect, useState } from "react";
import styles from "./Checkout.module.css";
import { PaymentDetails } from "./PaymetDetails";
import HeaderComponent from "../HeaderComponent/HeaderComponent";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    address: "",
    state: "",
    zip: "",
    city: "",
  });
  const [user, setUser] = useState();

  const navigate = useNavigate();

  const cartItems = useSelector((state) => state.cart.cartItems);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    console.log("user from localStorage", user);
    setUser(user);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const goToCart = () => {
    navigate(`/cart/user/${user.id}`);
  };

  return (
    <>
      <HeaderComponent title="Checkout" />
      <div className={styles.container}>
        <div className={styles.checkout_container}>
          {/* <h2 className={`${styles.heading} ${styles.center}`}>Checkout</h2> */}
          <form className={styles.from}>
            <div className={styles.separator}>
              <hr className={styles.line} />
              <h3 className={styles.center}>Personal Information</h3>
              <hr className={styles.line} />
            </div>
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              required
            />
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              required
            />

            <div className={styles.separator}>
              <hr className={styles.line} />
              <h3 className={styles.center}>Delivery Address</h3>
              <hr className={styles.line} />
            </div>
            <input
              type="text"
              name="address"
              placeholder="Street Address"
              value={formData.address}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="city"
              placeholder="City"
              value={formData.city}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="state"
              placeholder="State"
              value={formData.state}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="zip"
              placeholder="ZIP Code"
              value={formData.zip}
              onChange={handleChange}
              required
            />

            <div className={styles.separator}>
              <hr className={styles.line} />
              <h3 className={styles.center}>Cart Info</h3>
              <hr className={styles.line} />
            </div>
            <div className={styles.cart_info}>
              <p> Total Item x {cartItems.length} </p>
              <button onClick={goToCart}>View</button>
            </div>
          </form>
        </div>
        <PaymentDetails />
      </div>
    </>
  );
};

export { Checkout };
