import { useEffect, useState } from "react";
import styles from "./SingleFoodItem.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  fetchProductById,
  fetchProducts,
} from "../../Redux/Slice/productSlice";
import { Card } from "../FoodCard/Card/SmallCard";
import { CardPlacehoderSkeleton } from "../Skeleton/CardSeleton";
import Skeleton from "react-loading-skeleton";

export const SingleFoodItem = () => {
  const [quantity, setQuantity] = useState(1);
  const [similarProducts, setSimilarProducts] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  const increaseQuantity = () => setQuantity(quantity + 1);
  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  useEffect(() => {
    // Scroll to top smoothly
    window.scrollTo({ top: 0, behavior: "smooth" });

    dispatch(fetchProductById(id));
    dispatch(fetchProducts());
  }, [dispatch, id]);

  // taking from ProductSlice
  const { products, status, product } = useSelector((state) => state.products);
  // console.log("All products: ",products);

  useEffect(() => {
    if (products.length > 0 && product) {
      // const foundProd = products.find((prod) => prod.id === parseInt(id));
      // if (foundProd) {
      //   setProduct(foundProd);
      // }
      const similar = products.filter(
        (item) =>
          item.tags &&
          item.tags.some(
            (type) => product.tags.includes(type) && item.id !== product.id
          )
      );
      setSimilarProducts(similar);
    }
  }, [products, product, id]);

  const goToFoodItem = (id) => {
    navigate(`/foodItem/${id}`);
  };

  return (
    <>
      {status === "loading" || !product ? (
        <div className="p-6 rounded-lg shadow-lg bg-gray-100 animate-pulse max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Image Skeleton */}
            <div className="w-full md:w-1/2 h-64 bg-gray-300 rounded-lg"></div>

            {/* Right Side Skeleton */}
            <div className="w-full md:w-1/2 space-y-4">
              <div className="h-4 w-32 bg-gray-300 rounded"></div>
              <div className="h-6 w-3/4 bg-gray-300 rounded"></div>

              {/* Price & Discount Skeleton */}
              <div className="flex items-center gap-3">
                <div className="h-6 w-16 bg-gray-300 rounded"></div>
                <div className="h-4 w-12 bg-gray-300 rounded"></div>
              </div>

              {/* Quantity Buttons Skeleton */}
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 bg-gray-300 rounded"></div>
                <div className="h-8 w-12 bg-gray-300 rounded"></div>
                <div className="h-8 w-8 bg-gray-300 rounded"></div>
              </div>

              {/* Button Skeleton */}
              <div className="h-12 w-full bg-gray-300 rounded"></div>

              {/* Ratings Skeleton */}
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 bg-gray-300 rounded"></div>
                <div className="h-4 w-20 bg-gray-300 rounded"></div>
              </div>

              {/* Cuisine Skeleton */}
              <div className="h-4 w-32 bg-gray-300 rounded"></div>

              {/* Tags Skeleton */}
              <div className="flex flex-wrap gap-2">
                <div className="h-4 w-20 bg-gray-300 rounded"></div>
                <div className="h-4 w-16 bg-gray-300 rounded"></div>
                <div className="h-4 w-24 bg-gray-300 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        // <p> Loading...</p>
        <div className={styles.container}>
          {/* Left Side - Food Image */}
          <div className={styles.imageContainer}>
            <img
              src={product.image} // Replace with actual image
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
                onClick={decreaseQuantity}
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
                onClick={increaseQuantity}
              >
                +
              </button>
            </div>

            {/* Add to Cart Button */}
            <button className={styles.addToCartButton}>🛒 Add to Cart</button>
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
              {product.tags.map((tag) => (
                <span className={styles.rating}>{`${tag},  `}</span>
              ))}
            </h4>
          </div>
        </div>
      )}
      <div className={styles.similarItems}>
        <h2>Similar Dishes</h2>
        <div className={styles.similarProductsContainer}>
          {similarProducts.map((product) => (
            <li key={product.id} onClick={() => goToFoodItem(product.id)}>
              <Card product={product} />
            </li>
          ))}
        </div>
      </div>
    </>
  );
};
