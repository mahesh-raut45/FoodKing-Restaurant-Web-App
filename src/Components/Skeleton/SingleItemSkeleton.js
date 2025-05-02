const SingleItemSkeleton = () => {
  return (
    <div className="container">
      {/* Image Skeleton */}
      <div className="imageContainer">
        <div className="foodImage skeleton-box" />
      </div>

      {/* Details Skeleton */}
      <div className="details">
        <div className="calories skeleton-box short" />
        <div className="foodTitle skeleton-box" />
        <div className="priceSection">
          <span className="price skeleton-box short" />
          <span className="discountedPrice skeleton-box xshort" />
        </div>
        <div className="quantityContainer">
          <div className="quantityButton skeleton-box xshort" />
          <div className="quantityInput skeleton-box xshort" />
          <div className="quantityButton skeleton-box xshort" />
        </div>
        <div className="addToCartButton skeleton-box" />
        <div className="ratings_review skeleton-box short" />
        <div className="skeleton-box short" />
        <div className="skeleton-box short" />
      </div>
    </div>
  );
};

export default SingleItemSkeleton;

// CSS Styles
const styles = `
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: var(--white);
  padding: 40px 5px;
  border-radius: 10px;
  max-width: 900px;
  margin: auto;
  box-shadow: 0px 0px 10px 5px var(--bg2);
}

.imageContainer {
  width: 100%;
  display: flex;
  justify-content: center;
}

.foodImage {
  width: 100%;
  max-width: 500px;
  border-radius: 15px;
  height: 300px;
}

.details {
  width: 100%;
  text-align: center;
  padding: 20px;
}

.foodTitle,
.price,
.discountedPrice,
.quantityButton,
.quantityInput,
.addToCartButton,
.rating,
.review,
.calories {
  border-radius: 8px;
  margin: 10px 0;
}

.skeleton-box {
  background-color: #ddd;
  border-radius: 6px;
  animation: shimmer 1.5s infinite;
}

.skeleton-box.short {
  width: 60%;
  height: 20px;
  margin: 10px auto;
}

.skeleton-box.xshort {
  width: 30px;
  height: 30px;
  margin: 5px;
}

.skeleton-box {
  height: 40px;
  width: 100%;
  margin: 10px 0;
}

@keyframes shimmer {
  0% {
    background-position: -200px 0;
  }
  100% {
    background-position: 200px 0;
  }
}

.skeleton-box {
  background: linear-gradient(90deg, #eee 25%, #f5f5f5 50%, #eee 75%);
  background-size: 200% 100%;
}
`;
