import { useEffect, useState } from "react";
import styles from "./Cart.module.css";
import { ImCross } from "react-icons/im";
import { Button } from "../Button/Button";
import { useDispatch, useSelector } from "react-redux";
import React from "react";
import { fetchUserDetails } from "../../Feature/auth/AuthService";
import { deleteCartItem } from "../../Redux/Slice/cartSlice";

const Cart = () => {
  let [shipping, setShipping] = useState(60);
  let [finalTotal, setFinalTotal] = useState(0);
  const [userDetails, setUserDetails] = useState(null);
  const dispatch = useDispatch();

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
  useEffect(() => {
    if (totalAmount > 1000) {
      setShipping(0);
    }
    const total = totalAmount + shipping;
    setFinalTotal(total);
  }, []);

  // remove item from cart
  const removeItem = (userId, itemId) => {
    dispatch(deleteCartItem(userId, itemId));
  };

  console.log("Cart items: ", cartItems);

  const updateCart = () => {
    if (totalAmount > 1000) {
      setShipping(0);
    } else {
      setShipping(60);
    }
    // const total = totalAmount + shipping;

    const total = cartItems.reduce((sum, item) => {
      sum += item.foodItem.price * item.foodItem.quantity;
      return sum;
    }, 0);

    setFinalTotal(total);
    console.log("Total: ", total);
  };

  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     quantities: [],
  //     cartSubtotalArr: [], // store total price of cart items
  //     checkoutSubtotal: 0,
  //     prevheckoutSubtotal: 0,
  //     shipping: 60,
  //     finalSubtotal: 0,
  //   };
  // }

  // console.log(cartItems);

  // componentDidMount() {
  //   this.setState({
  //     quantities: this.props.cartItemsArr.map(() => 1), // each item start with qty 1
  //     cartSubtotalArr: this.props.cartItemsArr.map(() => 0),
  //   });
  // }

  // handleQty = (e, item) => {
  //   const newQty = parseInt(e.target.value);
  //   if (newQty >= 1) {
  //     const { cartItemsArr } = this.props;
  //     const itemIdx = cartItemsArr.indexOf(item);
  //     // Create a copy of the quantities array with updated quantity for specific item.
  //     const updatedQuantities = [...this.state.quantities];
  //     updatedQuantities[itemIdx] = newQty;
  //     console.log("quantities arr: ", updatedQuantities);

  //     this.setState({
  //       quantities: updatedQuantities,
  //     });
  //   }
  // };

  // handleCart = (foodItem) => {
  //   const { cartItemsArr } = this.props;
  //   this.props.handleCart(foodItem);
  //   cartItemsArr.filter((foodItem, index) => foodItem.id !== index);
  //   this.setState({ cartItemsArr });
  // };

  // handleUpdateCart = () => {
  //   let {
  //     cartSubtotalArr,
  //     checkoutSubtotal,
  //     prevheckoutSubtotal,
  //     finalSubtotal,
  //     shipping,
  //     quantities,
  //   } = this.state;
  //   const { cartItemsArr } = this.props;

  //   // Calculate individual item subtotals and update cartSubtotalArr
  //   cartSubtotalArr = cartItemsArr.map((item, index) => {
  //     return item.price * quantities[index];
  //   });

  //   // Calculate the checkout subtotal by adding all subtotals
  //   checkoutSubtotal = cartSubtotalArr.reduce((total, curr) => total + curr, 0);
  //   console.log("Checkout Sub Total: ", checkoutSubtotal);

  //   // cartSubtotalArr = cartItemsArr.map((item) => ())
  //   if (prevheckoutSubtotal !== checkoutSubtotal) {
  //     finalSubtotal = checkoutSubtotal + shipping;
  //   }

  //   this.setState({
  //     cartSubtotalArr,
  //     checkoutSubtotal,
  //     finalSubtotal,
  //     prevheckoutSubtotal: checkoutSubtotal,
  //   });
  // };

  // //  Handle Checkout
  // handleCheckout = () => {
  //   const { finalSubtotal } = this.state;
  //   if (finalSubtotal > 0) {
  //     toast.success(
  //       `Your order Placed Successfully!
  //        Total Amount: $ ${finalSubtotal}`,
  //       {
  //         position: "bottom-right",
  //       }
  //     );
  //   } else {
  //     toast.warn("Card is Empty!", {
  //       position: "bottom-right",
  //     });
  //   }
  // };

  // render() {
  //   const { cartItemsArr } = this.props;
  //   // console.log("inside cart ", cartItemsArr);
  return (
    <>
      <h2 className={styles.heading}>My Cart</h2>
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
                        <td className={styles.text_center_width}>
                          {item.foodItem.price}
                        </td>
                        <td className={styles.text_center_width}>
                          {item.foodItem.quantity}
                        </td>
                        <td className={styles.text_center_width}>
                          {/* storing the subtotal for individiual cart items */}
                          {item.foodItem.price * item.foodItem.quantity}
                        </td>
                        <td
                          className={`${styles.text_center_width} `}
                          onClick={() =>
                            removeItem(userDetails.id, item.foodItem.id)
                          }
                        >
                          <ImCross className={styles.remove_btn} />
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
              <span>{finalTotal}</span>
            </li>
            <hr />
            <li>
              <span>Shipping</span>
              <span>{shipping}</span>
            </li>
            <hr />
            <li>
              <span>Total</span>
              <span>{finalTotal}</span>
            </li>
          </ul>
          <div className={styles.checkout_btn}>
            <Button text="Checkout" />
          </div>
        </div>
      </div>
    </>
  );
};
// }

export { Cart };
