import { Component } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
import { FoodCard } from "../FoodCard/FoodCard";
import styles from "./Hero.module.css";
import { data } from "../../FoodData/FoodData";
import React from "react";

class Hero extends Component {
  constructor(props) {
    super(props);
    this.scrollContainerRef = React.createRef();
    this.scrollAmount = 500;
  }
  scrollBackword = () => {
    this.scrollContainerRef.current.scrollBy({
      left: -this.scrollAmount,
      behavior: "smooth",
    });
  };

  scrollForword = () => {
    this.scrollContainerRef.current.scrollBy({
      left: this.scrollAmount,
      behavior: "smooth",
    });
  };

  render() {
    // console.log(data);
    console.log("hero probs: ", this.props);
    const { foodData, handleCart, cartItemsArr } = this.props;
    return (
      <>
        <div className="hero">
          <div className={styles.hero_container}>
            <div className={styles.row}>
              <div className={styles.left}>
                <span>crispy, every bite taste</span>
                <h2>Popular Food Items</h2>
              </div>
              <div className={styles.right}>
                <button
                  className={styles.hero_buttons}
                  onClick={() => this.scrollBackword()}
                >
                  <FaArrowLeft />
                </button>
                <button
                  className={styles.hero_buttons}
                  onClick={() => this.scrollForword()}
                >
                  <FaArrowRight />
                </button>
              </div>
            </div>
            <div
              className={styles.food_category_list}
              ref={this.scrollContainerRef}
            >
              <ul className={styles.food_category_slider}>
                {foodData.map((item, index) => (
                  <li key={index}>
                    <FoodCard
                      foodData={item}
                      cartItemsArr={cartItemsArr}
                      name={item.name}
                      image={item.image}
                      price={item.price}
                      rating={item.rating}
                      handleCart={handleCart}
                    />
                  </li>
                ))}
                {/* <li>
                  <FoodCard />
                </li>
                <li>
                  <FoodCard />
                </li>
                <li>
                  <FoodCard />
                </li>
                <li>
                  <FoodCard />
                </li> */}
              </ul>
            </div>
          </div>
        </div>
      </>
    );
  }
}
export { Hero };
