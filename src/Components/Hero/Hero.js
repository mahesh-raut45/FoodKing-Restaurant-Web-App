import { Component, useEffect, useRef, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
import { FoodCard } from "../FoodCard/FoodCard";
import styles from "./Hero.module.css";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../Redux/Slice/productSlice";
import { useNavigate } from "react-router-dom";

const Hero = ({ foodData, handleCart, cartItemsArr }) => {
  const scrollContainerRef = useRef();
  const isScrollBlocked = useRef(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  let scrollAmount = 250;
  // taking from ProductSlice
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

  const goToFooItem = (id) => {
    console.log(id);
    navigate(`/foodItem/${id}`);
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
                LunchItems.map((item) => (
                  <li
                    key={item.id}
                    onClick={() => goToFooItem(item.id)}
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
                <p>Loading...</p>
              )}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export { Hero };
