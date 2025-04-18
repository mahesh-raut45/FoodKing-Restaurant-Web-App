import { useEffect, useState } from "react";
import styles from "./Cart.module.css";
import { ImCross } from "react-icons/im";
import { Button } from "../Button/Button";
import { useDispatch, useSelector } from "react-redux";
import React from "react";
import { fetchUserDetails } from "../../Feature/auth/AuthService";
import { deleteCartItem } from "../../Redux/Slice/cartSlice";
import { MdModeEdit } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import HeaderComponent from "../HeaderComponent/HeaderComponent";

const Cart = () => {
  let [shipping, setShipping] = useState(100);
  let [finalTotal, setFinalTotal] = useState(0);
  const [userDetails, setUserDetails] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartItems = useSelector((state) => state.cart.cartItems);
  const totalAmount = useSelector((state) => state.cart.totalAmount);

  // fetching user details
  useEffect(() => {
    const getUserData = async () => {
      try {
        const user = await fetchUserDetails();
        setUserDetails(user);
      } catch (error) {
        console.log("Error in fetching user details: ", error);
      }
    };
    getUserData();
  }, []);

  // calculating final total
  // useEffect(() => {
  //   if (totalAmount > 1000) {
  //     setShipping(0);
  //   }
  //   const total = totalAmount + shipping;
  //   setFinalTotal(total);
  // }, []);

  // remove item from cart

  const removeItem = (userId, itemId) => {
    dispatch(deleteCartItem(userId, itemId));
  };

  console.log("Cart items: ", cartItems);

  // updating cart total on button click
  const updateCart = () => {
    if (totalAmount > 1000) {
      setShipping(0);
    } else {
      setShipping(100);
    }
    // const total = totalAmount + shipping;

    const total = cartItems.reduce((sum, item) => {
      sum += item.foodItem.price * item.quantity;
      return sum;
    }, 0);

    setFinalTotal(total);
    console.log("Total: ", total);
  };

  // edit botton
  const editItem = (itemId) => {
    console.log("item id: ", itemId);
    navigate(`/foodItem/${itemId}`);
  };

  return (
    <>
      <HeaderComponent title="Shop Cart" />
      {/* <h2 className={styles.heading}>My Cart</h2> */}
      <div className={styles.container}>
        <div className={styles.main_cart}>
          <div className={styles.cart_items}>
            <table className={styles.cart_table}>
              <thead>
                <tr className={styles.header_row}>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Subtotal</th>
                  <th>Remove</th>
                </tr>
              </thead>
              <tbody>
                {cartItems !== null
                  ? cartItems.map((item, index) => (
                      <tr key={index} className={styles.body_row}>
                        <td className={styles.cart_item_img_name}>
                          <img
                            className={styles.cart_item_img}
                            src={item.foodItem.image}
                            alt="item"
                          />
                          <p className={styles.cart_item_name}>
                            {item.foodItem.name}
                          </p>
                        </td>
                        <td
                          className={`${styles.text_center_width} ${styles.item_price}`}
                        >
                          {"₹" + item.foodItem.price}
                        </td>
                        <td className={styles.text_center_width}>
                          {item.quantity}
                        </td>
                        <td
                          className={`${styles.text_center_width} ${styles.item_price}`}
                        >
                          {/* storing the subtotal for individiual cart items */}
                          {"₹" + item.foodItem.price * item.quantity}
                        </td>
                        <td
                          className={`${styles.text_center_width} `}
                          onClick={() =>
                            removeItem(userDetails.id, item.foodItem.id)
                          }
                        >
                          <ImCross className={styles.remove_btn} />
                        </td>
                        <td
                          className={styles.edit_btn_container}
                          onClick={() => editItem(item.foodItem.id)}
                        >
                          <MdModeEdit className={styles.edit_btn} />
                        </td>
                      </tr>
                    ))
                  : null}
              </tbody>
            </table>
          </div>
          <div onClick={() => updateCart()}>
            <Button text={"Update Cart"} />
          </div>
        </div>

        {/* Cart Total */}
        <div className={styles.cart_total}>
          <h4>Cart Total</h4>
          <ul className={styles.list}>
            <li>
              <span>Subtotal</span>
              <span>{"₹" + finalTotal}</span>
            </li>
            <hr />
            <li>
              <span>Shipping</span>
              <span>{"₹" + shipping}</span>
            </li>
            <hr />
            <li className={styles.item_price}>
              <span>Total</span>
              <span>₹ {finalTotal + shipping}</span>
            </li>
          </ul>
          <div className={styles.checkout_btn}>
            {/* <Button text="Checkout" /> */}
            <button>Checkout</button>
          </div>
        </div>
      </div>
    </>
  );
};
// }

export { Cart };
