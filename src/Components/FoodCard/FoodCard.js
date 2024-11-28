import { Component } from "react";
import styles from "./FoodCard.module.css";
import { MdFavoriteBorder } from "react-icons/md";
import { FaShoppingCart } from "react-icons/fa";
import { CiStar } from "react-icons/ci";

class FoodCard extends Component {
  render() {
    // console.log("Food card Probs: ",   this.props.foodData);
    const { foodData, cartItemsArr, handleCart, name, image, rating, price } =
      this.props;

    // console.log(rating);
    return (
      <>
        <div className={styles.container}>
          <button className={styles.fav_btn}>
            <MdFavoriteBorder className={styles.icon} />
          </button>

          <img
            className={styles.food_item}
            src={foodData.image}
            alt="food item"
          />
          <button
            className={styles.addtocart_btn}
            onClick={() => handleCart(foodData)}
          >
            <FaShoppingCart />
            {foodData.isInCart ? "Remove From Cart" : "Add to cart"}
          </button>
          <div className={styles.bottum_info}>
            <div className={styles.item_price}>${price}</div>
            <h3 className="item_name">{name}</h3>
            <div className={styles.item_rating}>
              <ul className={styles.rating_star_list}>
                {rating}
                <li>
                  <CiStar />
                </li>
                <li>
                  <CiStar />
                </li>
                <li>
                  <CiStar />
                </li>
                <li>
                  <CiStar />
                </li>
                <li>
                  <CiStar />
                </li>
              </ul>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export { FoodCard };
