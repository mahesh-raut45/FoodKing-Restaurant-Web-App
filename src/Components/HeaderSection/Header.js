import { Component } from "react";
import styles from "./Header.module.css";
import friedChicken from "../../photos/chiken.png";
import { Button } from "../Button/Button";
import { TbTruckDelivery } from "react-icons/tb";
import { Link } from "react-router-dom";

class Header extends Component {
  render() {
    return (
      <>
        <div className={styles.header_container}>
          <div className={styles.Header_left}>
            <span>crispy, every bite taste</span>
            <h1 className={styles.fade_in}>Delicious FriedChicken</h1>
            <Link to={"/food-menu"}>
              <Button icon={<TbTruckDelivery />} text="Order Now" />
            </Link>
          </div>
          <div className={styles.Header_right}>
            <img
              className={styles.offer}
              src="https://foodking-react.vercel.app/assets/img/hero/offer-shape.png"
              alt="50% off"
            />
            <img
              className={styles.best_deal}
              src="https://foodking-react.vercel.app/assets/img/shape/pizza-text-2.png"
              alt="best deal"
            />
            <img
              className={`${styles.fried_chicken} ${styles.fade_in}`}
              src={friedChicken}
              alt="fried chicken"
            />
          </div>
        </div>
      </>
    );
  }
}

export { Header };
