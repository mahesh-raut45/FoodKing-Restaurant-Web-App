import { useEffect, useState } from "react";
import styles from "./SingleFoodItem.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import SkeletonFoodItem from "../SkeletonI/SkeletonItem";
import { fetchProducts } from "../../Redux/Slice/productSlice";
import { Card } from "../FoodCard/Card/SmallCard";

const SingleFoodItem = () => {
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState(null);
  const [similarProducts, setSimilarProducts] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const increaseQuantity = () => setQuantity(quantity + 1);
  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // taking from ProductSlice
  const { products, status, error } = useSelector((state) => state.products);
  console.log(products);
  // extract id from url
  const { id } = useParams();
  // console.log(parseInt(id));

  useEffect(() => {
    if (products.length > 0) {
      const foundProd = products.find((prod) => prod.id === parseInt(id));
      if (foundProd) {
        setProduct(foundProd);
      }
      const similar = products.filter((item) =>
        item.tags.some((type) => foundProd.tags.includes(type))
      );
      setSimilarProducts(similar);
    }
  }, [products, id]);
  console.log("similar products: ", similarProducts);

  const goToFooItem = (id) => {
    navigate(`/foodItem/${id}`);
  };

  return (
    <>
      {status === "loading" || !product ? (
        <SkeletonFoodItem />
      ) : (
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
              <span className={styles.price}>$4,600.00</span>
              <span className={styles.discountedPrice}>$4,800.00</span>
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
            <li key={product.id} onClick={() => goToFooItem(product.id)}>
              <Card product={product} />
            </li>
          ))}
        </div>
      </div>
    </>
  );
};

export { SingleFoodItem };
