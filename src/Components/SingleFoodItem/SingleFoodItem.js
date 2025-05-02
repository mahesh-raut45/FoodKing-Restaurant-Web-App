import { useEffect, useState } from "react";
import styles from "./SingleFoodItem.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  fetchProductById,
  fetchProducts,
} from "../../Redux/Slice/productSlice";
import { Card } from "../FoodCard/Card/SmallCard";
import { addItemToCart, removeFromCart } from "../../Redux/Slice/cartSlice";
import React from "react";
import { fetchUserDetails } from "../../Feature/auth/AuthService";
import { toast } from "react-toastify";
import HeaderComponent from "../HeaderComponent/HeaderComponent";
import SingleItemSkeleton from "../Skeleton/SingleItemSkeleton";

export const SingleFoodItem = () => {
  const [quantity, setQuantity] = useState(1);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [isInCart, setIsInCart] = useState(false);
  const [userDetails, setUserDetails] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  const increaseQuantity = () => setQuantity(quantity + 1);

  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };
  // taking from ProductSlice
  const { products, status, product } = useSelector((state) => state.products);

  /**
   * This effect fetches the user details after the component mounts.
   * - Calls the `fetchUserDetails` function to retrieve the logged-in user's information from localStorage.
   * - If a user is found, it updates the component state with the user's details.
   * - If no user is found (i.e., the user is not logged in), it displays a toast notification
   *   informing the user to log in and redirects them to the homepage.
   *
   * The effect runs only once, when the component is first mounted.
   */
  useEffect(() => {
    const fetchUser = async () => {
      const user = await fetchUserDetails();
      if (user) {
        setUserDetails(user);
      } else {
        toast.info("Please login to continue!", {
          position: "top-right",
        });
        navigate("/");
      }
    };
    fetchUser();
  }, []);

  /**
   * This effect filters out similar products based on the tags of the current product.
   * - It runs whenever `products`, `product`, or `id` changes.
   * - Filters the `products` array to find items that have at least one tag in common with the current product,
   *   excluding the current product itself (by comparing the product `id`).
   * - Sets the resulting similar products to the `similarProducts` state.
   *
   * The effect ensures that similar products are only calculated when the product details or the list of all products is updated.
   */
  useEffect(() => {
    if (products.length > 0 && product) {
      const similar = products.filter(
        (item) =>
          item.tags &&
          item.tags.some(
            (type) => product.tags.includes(type) && item.id !== product.id
          )
      );
      setSimilarProducts(similar); // Store the similar products in the state
    }
  }, [products, product, id]);

  // useEffect(() => {
  //   if (products.length > 0 && product) {
  //     const similar = products.filter(
  //       (item) =>
  //         item.tags &&
  //         product.tags && // Add this check
  //         item.tags.some(
  //           (type) => product.tags.includes(type) && item.id !== product.id
  //         )
  //     );
  //     setSimilarProducts(similar);
  //   }
  // }, [products, product, id]);

  useEffect(() => {
    // Scroll to top smoothly
    window.scrollTo({ top: 0, behavior: "smooth" });

    dispatch(fetchProductById(id));
    dispatch(fetchProducts());
  }, [id]);

  /**
   * Handles the addition of a product to the user's cart.
   * - Dispatches the `addItemToCart` action with the user's ID, product ID, and quantity.
   * - Updates the `isInCart` state to `true`, indicating the item is now in the cart.
   *
   * @param {Object} prod - The product being added to the cart.
   * @param {number} qty - The quantity of the product being added.
   */
  const handleAddToCart = (prod, qty) => {
    dispatch(addItemToCart(userDetails.id, prod.id, qty));
    setIsInCart(true);
  };

  /**
   * Handles the removal of a product from the user's cart.
   * - Dispatches the `removeFromCart` action to remove the item with the given quantity.
   * - Updates the `isInCart` state to `false`, indicating the item is no longer in the cart.
   *
   * @param {Object} prod - The product being removed from the cart.
   * @param {number} qty - The quantity of the product being removed.
   */
  const handleRemoveFromCart = (prod, qty) => {
    dispatch(removeFromCart(prod, qty));
    setIsInCart(false);
  };

  const goToFoodItem = (id) => {
    navigate(`/foodItem/${id}`);
  };

  return (
    <>
      <HeaderComponent title="Product Details" />
      {status === "loading" || !product ? (
        <SingleItemSkeleton />
      ) : (
        // <p> Loading...</p>
        <div className={styles.container}>
          {/* Left Side - Food Image */}
          <div className={styles.imageContainer}>
            <img
              src={product.image}
              alt="Food Item"
              className={styles.foodImage}
            />
          </div>

          {/* Right Side - Food Details */}
          <div className={styles.details}>
            <h4 className={styles.calories}>
              Calories : {product.caloriesPerServing}
            </h4>
            <h2 className={styles.foodTitle}>{product.name}</h2>
            {/* <p className={styles.foodDescription}>{product.instructions}</p> */}

            {/* Price Section */}
            <div className={styles.priceSection}>
              <span className={styles.price}>$ {product.price}</span>
              <span className={styles.discountedPrice}>
                ${((15 / product.price) * 100).toFixed(2)}
              </span>
            </div>

            {/* Quantity Selector */}
            <div className={styles.quantityContainer}>
              <button
                className={styles.quantityButton}
                onClick={() => {
                  decreaseQuantity();
                }}
              >
                −
              </button>
              <input
                type="text"
                value={quantity}
                readOnly
                className={styles.quantityInput}
              />
              <button
                className={styles.quantityButton}
                onClick={() => {
                  increaseQuantity();
                }}
              >
                +
              </button>
            </div>

            {/* Add to Cart Button */}
            <button
              className={
                isInCart ? styles.removeFromCart : styles.addToCartButton
              }
              onClick={() => {
                isInCart
                  ? handleRemoveFromCart(product, quantity)
                  : handleAddToCart(product, quantity);
              }}
              disabled={!userDetails}
            >
              🛒 {isInCart ? "Remove From Cart" : "Add to Cart"}
            </button>
            <p className={styles.ratings_review}>
              <span className={styles.rating}>{product.rating}</span>
              <span>⭐</span>
              <span className={styles.review}>
                ({product.reviewCount} Reviews)
              </span>
            </p>
            <h4>Cuisine : {product.cuisine}</h4>
            <h4>
              Tags:{" "}
              {product.tags.map((tag, index) => (
                <span key={index} className={styles.rating}>{`${tag},  `}</span>
              ))}
            </h4>
          </div>
        </div>
      )}
      <div className={styles.similarItems}>
        <h2>Similar Dishes</h2>
        <div className={styles.similarProductsContainer}>
          {similarProducts.map((product, index) => (
            <li key={index} onClick={() => goToFoodItem(product.id)}>
              <Card product={product} />
            </li>
          ))}
        </div>
      </div>
    </>
  );
};
