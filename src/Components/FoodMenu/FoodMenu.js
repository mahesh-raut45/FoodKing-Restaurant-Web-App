import { useSelector } from "react-redux";
import { FoodCard } from "../FoodCard/FoodCard";
import HeaderComponent from "../HeaderComponent/HeaderComponent";
import styles from "./FoodMenu.module.css";

const FoodMenu = () => {
  const { products, status } = useSelector((state) => state.products);

  console.log("Fetched Products: ", products);
  console.log("Status: ", status);

  return (
    <>
      <HeaderComponent title="Food Menu" />
      {/* <FoodCard /> */}
      <div className={styles.container}>
        <div className={styles.wrapper}>
          {/* left side filter bar */}
          <aside className={styles.filter_bar}></aside>

          {/* right side food items */}
          <div className={styles.food_menu}>
            <div className={styles.search_bar}></div>
            {/* list of products */}
            <ul className={styles.item_list}></ul>
            <nav className={styles.bottom_navigation}>
              {/* list of pages */}
            </nav>
          </div>
        </div>
      </div>
    </>
  );
};

export default FoodMenu;
