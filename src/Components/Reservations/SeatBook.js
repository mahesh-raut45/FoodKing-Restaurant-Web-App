import { useNavigate } from "react-router-dom";
import { Button } from "../Button/Button";
import styles from "./SeatBook.module.css";
import { PiPhoneCallFill } from "react-icons/pi";

const SeatBook = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/reservations");
  };

  return (
    <div className={styles.container}>
      <div className={styles.text}>
        <span>crispy, every bite taste</span>
        <h2>need booking? reserve your table?</h2>

        <div className={styles.customer_support}>
          <div>
            <PiPhoneCallFill className={styles.call_icon} />
          </div>
          <div className={styles.content}>
            <span>24/7 Support center</span>
            <p>+1718-904-4450</p>
          </div>
        </div>
      </div>
      <div className={styles.book_now} onClick={handleNavigate}>
        <Button text="Book Now" />
      </div>
    </div>
  );
};

export { SeatBook };
