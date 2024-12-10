import { Component } from "react";
import styles from "./Cart.module.css";
import { ImCross } from "react-icons/im";
import { Link } from "react-router-dom";
import { Button } from "../Button/Button";
import { toast } from "react-toastify";

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quantities: [],
      cartSubtotalArr: [], // store total price of cart items
      checkoutSubtotal: 0,
      prevheckoutSubtotal: 0,
      shipping: 60,
      finalSubtotal: 0,
    };
  }

  componentDidMount() {
    this.setState({
      quantities: this.props.cartItemsArr.map(() => 1), // each item start with qty 1
      cartSubtotalArr: this.props.cartItemsArr.map(() => 0),
    });
  }

  handleQty = (e, item) => {
    const { cartSubtotalArr } = this.state;
    const newQty = parseInt(e.target.value);
    if (newQty >= 1) {
      const { cartItemsArr } = this.props;
      const itemIdx = cartItemsArr.indexOf(item);
      // Create a copy of the quantities array with updated quantity for specific item.
      const updatedQuantities = [...this.state.quantities];
      updatedQuantities[itemIdx] = newQty;
      console.log("quantities arr: ", updatedQuantities);

      this.setState({
        quantities: updatedQuantities,
      });
    }
  };

  handleCart = (foodItem) => {
    const { cartItemsArr } = this.props;
    this.props.handleCart(foodItem);
    cartItemsArr.filter((foodItem, index) => foodItem.id !== index);
    this.setState({ cartItemsArr });
  };

  handleUpdateCart = () => {
    let {
      cartSubtotalArr,
      checkoutSubtotal,
      prevheckoutSubtotal,
      finalSubtotal,
      shipping,
      quantities,
    } = this.state;
    const { cartItemsArr } = this.props;

    // Calculate individual item subtotals and update cartSubtotalArr
    cartSubtotalArr = cartItemsArr.map((item, index) => {
      return item.price * quantities[index];
    });

    // Calculate the checkout subtotal by adding all subtotals
    checkoutSubtotal = cartSubtotalArr.reduce((total, curr) => total + curr, 0);
    console.log("Checkout Sub Total: ", checkoutSubtotal);

    // cartSubtotalArr = cartItemsArr.map((item) => ())
    if (prevheckoutSubtotal !== checkoutSubtotal) {
      finalSubtotal = checkoutSubtotal + shipping;
    }

    this.setState({
      cartSubtotalArr,
      checkoutSubtotal,
      finalSubtotal,
      prevheckoutSubtotal: checkoutSubtotal,
    });
  };

  //  Handle Checkout
  handleCheckout = () => {
    const { finalSubtotal } = this.state;
    if (finalSubtotal > 0) {
      toast.success(
        `Your order Placed Successfully!
         Total Amount: $ ${finalSubtotal}`,
        {
          position: "bottom-right",
        }
      );
    } else {
      toast.warn("Card is Empty!", {
        position: "bottom-right",
      });
    }
  };

  render() {
    const { cartItemsArr } = this.props;
    console.log("inside cart ", cartItemsArr);
    return (
      <>
        <Link to="/home">
          <h2 className={styles.homepage_link}>{"<"} Home Page</h2>
        </Link>
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
                  {cartItemsArr.map((item, index) => (
                    <tr key={item.id} className={styles.body_row}>
                      {console.log("Single cart item", item)}
                      <td className={styles.cart_item_img_name}>
                        <img
                          className={styles.cart_item_img}
                          src={item.image}
                        />
                        <p className={styles.cart_item_name}>{item.name}</p>
                      </td>
                      <td className={styles.text_center_width}>{item.price}</td>
                      <td className={styles.text_center_width}>
                        <input
                          type="number"
                          value={this.state.quantities[index] || 1}
                          onChange={(e) => this.handleQty(e, item)}
                          min={1}
                        />
                        {/* {console.log("qty :", this.state.qty)} */}
                      </td>
                      {/* Subtotal */}
                      <td className={styles.text_center_width}>
                        {/* storing the subtotal for individiual cart items */}
                        {
                          (this.state.cartSubtotalArr[item.id] =
                            item.price * this.state.quantities[index])
                        }
                        {console.log(
                          "cart subtotal: ",
                          this.state.cartSubtotalArr
                        )}
                      </td>
                      <td
                        className={styles.text_center_width}
                        onClick={() => this.handleCart(item)}
                      >
                        <ImCross />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div
              className={styles.update_cartbtn}
              onClick={() => this.handleUpdateCart()}
            >
              <Button text="Update Cart" />
            </div>
          </div>
          <div className={styles.cart_total}>
            <h4>Cart Total</h4>
            <ul className={styles.list}>
              <li>
                <span>Subtotal</span>
                <span>{this.state.checkoutSubtotal}</span>
              </li>
              <hr />
              <li>
                <span>Shipping</span>
                <span>{this.state.shipping}</span>
              </li>
              <hr />
              <li>
                <span>Total</span>
                <span>
                  {this.state.checkoutSubtotal !== 0
                    ? this.state.finalSubtotal
                    : 0}
                </span>
              </li>
            </ul>
            <div className={styles.checkout_btn} onClick={this.handleCheckout}>
              <Button text="Checkout" />
            </div>
          </div>
        </div>
      </>
    );
  }
}

export { Cart };
