import { Component } from "react";
import styles from "./FoodCard.module.css";
import { MdFavoriteBorder } from "react-icons/md";
import { FaShoppingCart, FaStarOfLife } from "react-icons/fa";
import { CiStar } from "react-icons/ci";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faStarAndCrescent,
  faStarHalf,
  faStarOfDavid,
  faStarOfLife,
} from "@fortawesome/free-solid-svg-icons";

class FoodCard extends Component {
  render() {
    // console.log("Food card Probs: ",   this.props.foodData);
    const { foodData, handleCart, name, rating, reviewCount } = this.props;

    // console.log(rating);

    return (
      <>
        <div className={styles.container}>
          <img
            className={styles.food_item}
            src={foodData.image}
            alt="food item"
          />
          <div className={styles.btn_container}>
            <button
              className={styles.addtocart_btn}
              onClick={() => handleCart(foodData)}
            >
              <FaShoppingCart />
              {foodData.isInCart ? "Remove From Cart" : "Add to cart"}
            </button>

            {/* <button className={styles.fav_btn}>
              <MdFavoriteBorder className={styles.icon} />
            </button> */}
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
  }
}

export { FoodCard };
