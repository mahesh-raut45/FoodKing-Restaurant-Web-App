import { useEffect, useState } from "react";
import styles from "./Header.module.css";
import fried_Chicken from "../../photos/chiken.png";
import whopper_burger from "../../photos/whopper_burger.png";
import { Button } from "../Button/Button";
import { TbTruckDelivery } from "react-icons/tb";
import { Link } from "react-router-dom";

const names = ["Delicious FriedChicken", "Juicy Burger"];
const itemList = [fried_Chicken, whopper_burger];

/**
 * Header component for the food ordering web app.
 *
 * - Displays a promotional section with alternating food item names and images.
 * - Uses a timed interval (6 seconds) to switch between "Delicious FriedChicken" and "Juicy Burger".
 * - Includes a "Order Now" button that navigates to the food menu.
 * - Visually enhanced with animated text and rotating food imagery to attract users.
 *
 * State:
 * - `index`: Determines the currently displayed food item and name.
 *
 * Side Effects:
 * - A `setInterval` in `useEffect` to update the `index` every 6 seconds.
 *
 * Assets:
 * - Uses local images (`chiken.png`, `whopper_burger.png`) and remote promotional graphics.
 */
const Header = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % names.length);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className={styles.header_container}>
        <div className={styles.Header_left}>
          <span>crispy, every bite taste</span>
          <h1 className={styles.fade_in}>{names[index]}</h1>
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
            src={itemList[index]}
            alt="fried chicken"
          />
        </div>
      </div>
    </>
  );
};

export { Header };
