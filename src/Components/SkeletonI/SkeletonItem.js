import styles from "./Skeleton.module.css"; // Ensure you create a corresponding CSS module

const SkeletonFoodItem = () => {
  return (
    <div className={styles.container}>
      {/* Left Side - Image Skeleton */}
      <div className={styles.imageContainer}>
        <div className={styles.skeletonImage}></div>
      </div>

      {/* Right Side - Details Skeleton */}
      <div className={styles.details}>
        <div className={styles.skeletonTitle}></div>
        <div className={styles.skeletonText}></div>
        <div className={styles.skeletonText}></div>

        {/* Price Section */}
        <div className={styles.priceSection}>
          <div className={styles.skeletonPrice}></div>
          <div className={styles.skeletonDiscount}></div>
        </div>

        {/* Quantity Selector Skeleton */}
        <div className={styles.quantityContainer}>
          <div className={styles.skeletonButton}></div>
          <div className={styles.skeletonInput}></div>
          <div className={styles.skeletonButton}></div>
        </div>

        {/* Add to Cart Button Skeleton */}
        <div className={styles.skeletonButtonWide}></div>
      </div>
    </div>
  );
};

export default SkeletonFoodItem;
