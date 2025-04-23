import { useSelector } from "react-redux";
import HeaderComponent from "../HeaderComponent/HeaderComponent";
import styles from "./FoodMenu.module.css";
import MenuCard from "../FoodCard/Card/MenuCard";
import { useState } from "react";

const FoodMenu = () => {
  const { products, status } = useSelector((state) => state.products);
  const [isFiltered, setIsFiltered] = useState(false);
  const [filteredItems, setFilteredItems] = useState([]);

  // Less than 300 rs
  const handleLessThan = () => {
    setIsFiltered(true);
    const itmes = products.filter((item) => item.price <= 300);
    setFilteredItems(itmes);
  };
  // console.log("Filtered Items: ", filteredItems);

  // clear all filters
  const handleClearFilter = () => {
    setIsFiltered(false);
    setFilteredItems([]);
  };

  // handle rating filter
  const handleRatingFilter = () => {
    setIsFiltered(true);
    let items;
    if (filteredItems.length === 0) {
      items = products.filter((item) => item.rating >= 4);
    } else {
      items = filteredItems.filter((item) => item.rating >= 4);
    }

    setFilteredItems(items);
  };
  console.log("Filtered Items: ", filteredItems);

  return (
    <>
      <HeaderComponent title="Food Menu" />
      {/* <FoodCard /> */}
      <div className={styles.container}>
        <div className={styles.wrapper}>
          {/* left side filter bar */}
          {/* <aside className={styles.filter_bar}></aside> */}

          {/* right side food items */}
          <div className={styles.food_menu}>
            <div className={styles.search_bar}>
              <div>
                <button onClick={() => handleClearFilter()}>
                  Clear Filter
                </button>
              </div>
              <div>
                <button onClick={() => handleRatingFilter()}>Rating 4+</button>
              </div>
              <div>
                <button>Rs.300 - Rs.600</button>
              </div>
              <div>
                <button onClick={() => handleLessThan()}>
                  Less than Rs.300
                </button>
              </div>
              <div>
                <button>Non-Veg</button>
              </div>
            </div>
            {/* list of products */}
            <div className={styles.item_list}>
              {!isFiltered &&
                products.map((item) => (
                  // console.log(item.id)
                  <MenuCard
                    key={item.id}
                    id={item.id}
                    name={item.name}
                    rating={item.rating}
                    price={item.price}
                    image={item.image}
                  />
                ))}

              {isFiltered &&
                filteredItems.map((item) => (
                  // console.log(item.id)
                  <MenuCard
                    key={item.id}
                    id={item.id}
                    name={item.name}
                    rating={item.rating}
                    price={item.price}
                    image={item.image}
                  />
                ))}
            </div>
            {/* <nav className={styles.bottom_navigation}>
             
            </nav> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default FoodMenu;
