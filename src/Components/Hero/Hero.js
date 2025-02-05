import { Component, useEffect, useRef } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
import { FoodCard } from "../FoodCard/FoodCard";
import styles from "./Hero.module.css";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../Redux/Slice/productSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { TbLoader } from "react-icons/tb";

const Hero = ({ foodData, handleCart, cartItemsArr }) => {
  const scrollContainerRef = useRef();
  let scrollAmount = 250;
  const dispatch = useDispatch();
  const { products, status, error } = useSelector((state) => state.products);
  let LunchItems = [];

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    setInterval(() => {
      scrollForward();
    }, 3000);
  }, []);

  // if (status === "loading") return <p>Loading...</p>;
  // if (status === "failed") return <p>Error: {error}</p>;

  products.map((item) =>
    // console.log(item.mealType.filter((mealType) => mealType === "Dinner"))
    {
      if (item.mealType.includes("Lunch")) {
        LunchItems.push(item);
      }
    }
  );

  const scrollBackward = () => {
    scrollContainerRef.current.scrollBy({
      left: -scrollAmount,
      behavior: "smooth",
    });
  };

  const scrollForward = () => {
    scrollContainerRef.current.scrollBy({
      left: scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <>
      <div className="hero">
        <div className={styles.hero_container}>
          <div className={styles.row}>
            <div className={styles.left}>
              <span>Flavors for royalty</span>
              <h2>BEst in lunch</h2>
            </div>
            <div className={styles.right}>
              <button className={styles.hero_buttons} onClick={scrollBackward}>
                <FaArrowLeft />
              </button>
              <button className={styles.hero_buttons} onClick={scrollForward}>
                <FaArrowRight />
              </button>
            </div>
          </div>
          <div className={styles.food_category_list} ref={scrollContainerRef}>
            <ul className={styles.food_category_slider}>
              {status === "succeeded" ? (
                LunchItems.map((item, index) => (
                  <li key={index}>
                    <FoodCard
                      foodData={item}
                      name={item.name}
                      image={item.image}
                      reviewCount={item.reviewCount}
                      rating={item.rating}
                      cartItemsArr={cartItemsArr}
                      handleCart={handleCart}
                    />
                  </li>
                ))
              ) : (
                <p>{<FontAwesomeIcon icon={TbLoader} />}</p>
              )}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export { Hero };
