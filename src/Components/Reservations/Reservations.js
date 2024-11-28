import { useNavigate } from "react-router-dom";
import styles from "./Reservation.module.css";

const Reservation = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/");
  };
  return (
    <>
      <h2 className={styles.back_btn} onClick={handleNavigate}>
        {"<"} Home Page
      </h2>
      <h1>Reservations</h1>
      <div className={styles.container}>
        <div className={styles.reservations}>
          <h3 className={styles.title}>create an reservation</h3>
          <form className={styles.reservation_form} onSubmit={() => {}}>
            <div className={styles.rows}>
              <input placeholder="Enter Name..." />
            </div>
            <div className={styles.rows}>
              <input placeholder="Select people..." />
            </div>
            <div className={styles.rows}>
              <input placeholder="Enter Number..." />
            </div>
            <div className={styles.rows}>
              <input placeholder="Enter Date..." />
            </div>
            <div className={`${styles.rows} ${styles.input_wide}`}>
              <input placeholder="Enter Email..." />
            </div>
            <button>Book A Table</button>
          </form>
        </div>
      </div>
    </>
  );
};

export { Reservation };
