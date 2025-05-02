import { useEffect, useState } from "react";
import styles from "./Cart.module.css";
import { ImCross } from "react-icons/im";
import { Button } from "../Button/Button";
import { useDispatch, useSelector } from "react-redux";
import React from "react";
import { fetchUserDetails } from "../../Feature/auth/AuthService";
import { deleteCartItem } from "../../Redux/Slice/cartSlice";
import { MdModeEdit } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import HeaderComponent from "../HeaderComponent/HeaderComponent";

const Cart = () => {
  let [shipping, setShipping] = useState(100);
  let [finalTotal, setFinalTotal] = useState(0);
  const [userDetails, setUserDetails] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartItems = useSelector((state) => state.cart.cartItems);
  const totalAmount = useSelector((state) => state.cart.totalAmount);

  /**
   * Fetches and sets the user's details when the component is mounted.
   * - Calls the `fetchUserDetails` function to retrieve user data from localStorage.
   * - Sets the `userDetails` state with the retrieved user information.
   * - Logs an error to the console if fetching user details fails.
   *
   * This effect runs only once when the component is first mounted.
   */
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

  /**
   * Removes an item from the user's cart.
   * - Dispatches the `deleteCartItem` action to remove the item based on the userId and itemId.
   *
   * @param {string} userId - The ID of the user whose cart the item will be removed from.
   * @param {string} itemId - The ID of the item to be removed from the cart.
   */
  const removeItem = (userId, itemId) => {
    dispatch(deleteCartItem(userId, itemId));
  };

  // console.log("Cart items: ", cartItems);

  /**
   * Updates the shopping cart by recalculating the final total and shipping cost.
   * - If the total amount is greater than 1000, sets the shipping cost to 0, otherwise sets it to 100.
   * - Recalculates the total cost of the cart items (product price * quantity).
   *
   * Updates the final total, including the price of the items and shipping cost.
   */
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
    // console.log("Total: ", total);
  };

  // edit botton
  const editItem = (itemId) => {
    // console.log("item id: ", itemId);
    navigate(`/foodItem/${itemId}`);
  };

  return (
    <>
      <HeaderComponent title="Shop Cart" />
      {/* <h2 className={styles.heading}>My Cart</h2> */}
      <div className={styles.container}>
        <div className={styles.main_cart}>
          <div className={styles.cart_items}>
            {cartItems.length === 0 ? (
              <p
                style={{
                  fontWeight: "bolder",
                  fontSize: "20px",
                  margin: "auto",
                  color: "green",
                }}
              >
                <span>Uh-oh!</span> Looks like your cravings haven’t made it to
                the cart yet.{" "}
                <Link to={"/food-menu"}>
                  <span style={{ color: "var(--orange)" }}>Order Now</span>
                </Link>
              </p>
            ) : (
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
                  {cartItems !== null ? (
                    cartItems.map((item, index) => (
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
                  ) : (
                    <p className={styles.not_found}>
                      <span>Oops!</span> Looks like we ran out of items for your
                      cravings.{" "}
                      <span style={{ color: "green" }}>
                        Try a different search or filter!
                      </span>
                    </p>
                  )}
                </tbody>
              </table>
            )}
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
