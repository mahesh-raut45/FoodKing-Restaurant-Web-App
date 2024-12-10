import { useNavigate } from "react-router-dom";
import styles from "./Reservation.module.css";

const Reservation = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/home");
  };
  return (
    <>
      <h2 className={styles.back_btn} onClick={handleNavigate}>
        {"<"} Home Page
      </h2>
      {/* <h1>Reservations</h1> */}
      <div className={styles.container}>
        <div className={styles.reservations}>
          <div className={styles.seat_images}>
            <img
              src="https://static.wixstatic.com/media/0c647f_a1e555188acf4363820fbbd10fe90818~mv2.jpg/v1/fit/w_2500,h_1330,al_c/0c647f_a1e555188acf4363820fbbd10fe90818~mv2.jpg"
              alt="img"
            />
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTu6e9vLtioBRs0NxQ0d4X5p9dMr9albcER3m4hBR-7zFLLRf91G6MlPFBkVnlWknK4p7M&usqp=CAU"
              alt="img"
            />
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShvAVWhmjZcwQ93targVIp7KEvNZmnEg6SSu41i8ZrzVpkfODpfffEklcJRpK2VmCE8N8&usqp=CAU"
              alt="img"
            />
          </div>
          <h3 className={styles.title}>create an reservation</h3>
          <form className={styles.reservation_form} onSubmit={() => {}}>
            <div className={styles.rows}>
              <input type="text" placeholder="Enter Name..." />
            </div>
            <div className={styles.rows}>
              <input type="text" placeholder="Select people..." />
            </div>
            <div className={styles.rows}>
              <input type="number" placeholder="Enter Number..." />
            </div>
            <div className={styles.rows}>
              <input type="date" placeholder="Enter Date..." />
            </div>
            <div className={`${styles.rows} ${styles.input_wide}`}>
              <input type="email" placeholder="Enter Email..." />
            </div>
            <button>Book A Table</button>
          </form>
        </div>
      </div>
    </>
  );
};

export { Reservation };
