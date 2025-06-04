import { useNavigate } from "react-router-dom";
import styles from "./Reservation.module.css";
import HeaderComponent from "../HeaderComponent/HeaderComponent";

const Reservation = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/home");
  };

  return (
    <>
      <HeaderComponent title="reservation" />
      <section className={styles.wrapper}>
        {/* <button className={styles.backButton} onClick={handleNavigate}>
          &larr; Home
        </button> */}

        <div className={styles.container}>
          <div className={styles.imageGallery}>
            <img
              src="https://static.wixstatic.com/media/0c647f_a1e555188acf4363820fbbd10fe90818~mv2.jpg/v1/fit/w_2500,h_1330,al_c/0c647f_a1e555188acf4363820fbbd10fe90818~mv2.jpg"
              alt="Restaurant seating"
            />
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTu6e9vLtioBRs0NxQ0d4X5p9dMr9albcER3m4hBR-7zFLLRf91G6MlPFBkVnlWknK4p7M&usqp=CAU"
              alt="Dining space"
            />
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShvAVWhmjZcwQ93targVIp7KEvNZmnEg6SSu41i8ZrzVpkfODpfffEklcJRpK2VmCE8N8&usqp=CAU"
              alt="Food ambiance"
            />
          </div>

          <h2 className={styles.title}>Book Your Table</h2>

          <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
            <input type="text" placeholder="Full Name" required />
            <input type="number" placeholder="Number of Guests" required />
            <input type="tel" placeholder="Phone Number" required />
            <input type="date" required />
            <input type="email" placeholder="Email Address" required />

            <button type="submit">Reserve Now</button>
          </form>
        </div>
      </section>
    </>
  );
};

export { Reservation };
