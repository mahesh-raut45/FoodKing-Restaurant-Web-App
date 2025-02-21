import { useState } from "react";
import styles from "./SingleFoodItem.module.css"; // Importing CSS module

const SingleFoodItem = () => {
  const [quantity, setQuantity] = useState(1);

  const increaseQuantity = () => setQuantity(quantity + 1);
  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  return (
    <div className={styles.container}>
      {/* Left Side - Food Image */}
      <div className={styles.imageContainer}>
        <img
          src="https://via.placeholder.com/400" // Replace with actual image
          alt="Food Item"
          className={styles.foodImage}
        />
      </div>

      {/* Right Side - Food Details */}
      <div className={styles.details}>
        <h2 className={styles.foodTitle}>Whopper Burger King</h2>
        <p className={styles.foodDescription}>
          A delicious burger with fresh ingredients, cheese, and a juicy patty.
        </p>

        {/* Price Section */}
        <div className={styles.priceSection}>
          <span className={styles.price}>$4,600.00</span>
          <span className={styles.discountedPrice}>$4,800.00</span>
        </div>

        {/* Quantity Selector */}
        <div className={styles.quantityContainer}>
          <button className={styles.quantityButton} onClick={decreaseQuantity}>
            −
          </button>
          <input
            type="text"
            value={quantity}
            readOnly
            className={styles.quantityInput}
          />
          <button className={styles.quantityButton} onClick={increaseQuantity}>
            +
          </button>
        </div>

        {/* Add to Cart Button */}
        <button className={styles.addToCartButton}>🛒 Add to Cart</button>
      </div>
    </div>
  );
};

export { SingleFoodItem };
