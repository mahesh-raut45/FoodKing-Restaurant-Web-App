import { Component, useEffect, useRef, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
import { FoodCard } from "../FoodCard/FoodCard";
import styles from "./Hero.module.css";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../Redux/Slice/productSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { TbLoader } from "react-icons/tb";
import { SingleFoodItem } from "../SingleFoodItem/SingleFoodItem";
import { useNavigate } from "react-router-dom";

const Hero = ({ foodData, handleCart, cartItemsArr }) => {
  const scrollContainerRef = useRef();
  const isScrollBlocked = useRef(false);

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

  products.map((item) => {
    if (item.mealType.includes("Lunch")) {
      LunchItems.push(item);
    }
  });

  const scrollBackward = () => {
    if (!isScrollBlocked.current && scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const scrollForward = () => {
    if (!isScrollBlocked.current && scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };
  const stopScroll = (e) => {
    console.log(e.target);
  };

  const handleItemDetails = (e) => {
    // console.log(e.target);
    // const item = e.target;
    // <SingleFoodItem item={item} />;
    // navigate("/foodItem");
  };

  return (
    <>
      <div className="hero">
        <div className={styles.hero_container}>
          <div className={styles.row}>
            <div className={styles.left}>
              <span>Flavors for royalty</span>
              <h2>Best in lunch</h2>
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
                  <li
                    key={index}
                    onClick={handleItemDetails}
                    onMouseEnter={() => (isScrollBlocked.current = true)}
                    onMouseLeave={() => (isScrollBlocked.current = false)}
                  >
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
