import { Component } from "react";
import styles from "./FoodCard.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

const FoodCard = ({ foodData, name, rating, reviewCount }) => {
  return (
    <>
      <div className={styles.container}>
        <img
          className={styles.food_item}
          src={foodData.image}
          alt="food item"
        />
        <div className={styles.btn_container}>
          <button className={styles.addtocart_btn}>
            {/* <FaMehRollingEyes /> */}
            {"View"}
          </button>
        </div>
        <div className={styles.bottum_info}>
          {/* <div className={styles.item_price}>${price}</div> */}
          <h3 className="item_name">{name}</h3>
          <div className={styles.item_rating}>
            <span>
              {rating} <FontAwesomeIcon icon={faStar} color="#e6d300" />
            </span>
            <span> Reviews: ({reviewCount})</span>
          </div>
        </div>
      </div>
    </>
  );
};

export { FoodCard };
