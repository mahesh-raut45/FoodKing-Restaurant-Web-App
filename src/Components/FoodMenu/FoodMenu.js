import { useSelector } from "react-redux";
import HeaderComponent from "../HeaderComponent/HeaderComponent";
import styles from "./FoodMenu.module.css";
import MenuCard from "../FoodCard/Card/MenuCard";
import { useEffect, useState } from "react";

const FoodMenu = () => {
  const { products, status } = useSelector((state) => state.products);
  // const [isFiltered, setIsFiltered] = useState(false);
  const [filteredItems, setFilteredItems] = useState([]);
  // const [searchedItems, setSearchedItems] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [filters, setFilters] = useState({
    rating: null,
    pricaRange: null,
  });

  // All filters are handled here
  useEffect(() => {
    let items = products;

    // search filter
    if (searchText.trim()) {
      items = items.filter((item) =>
        item.name.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    // rating filter
    if (filters.rating) {
      items = items.filter((item) => item.rating >= "4");
    }

    // filter by price
    if (filters.pricaRange === "lt300") {
      //lt = less than
      items = items.filter((item) => item.price <= 300);
    } else if (filters.pricaRange === "btw300-600") {
      //btw - between
      items = items.filter((item) => item.price >= 300 && item.price <= 600);
    }

    // setting filtered item
    setFilteredItems(items);
  }, [searchText, filters]);

  const handleClearFilter = () => {
    setFilters({
      rating: null,
      pricaRange: null,
    });
  };

  const handleLessThan = () => {
    setFilters((prev) => ({
      ...prev,
      pricaRange: "lt300",
    }));
  };

  const handleBetween = () => {
    setFilters((prev) => ({
      ...prev,
      pricaRange: "btw300-600",
    }));
  };

  const handleRatingFilter = () => {
    setFilters((prev) => ({
      ...prev,
      rating: "4",
    }));
  };

  // useEffect(() => {
  //   const items = searchText.trim()
  //     ? products.filter((item) =>
  //         item.name.toLowerCase().includes(searchText.toLowerCase())
  //       )
  //     : products;

  //   setSearchedItems(items);
  // }, [searchText]);

  // // Less than 300 rs
  // const handleLessThan = () => {
  //   setIsFiltered(true);
  //   const itmes = products.filter((item) => item.price <= 300);
  //   setFilteredItems(itmes);
  // };
  // console.log("Filtered Items: ", filteredItems);

  // clear all filters
  // const handleClearFilter = () => {
  //   setIsFiltered(false);
  //   setFilteredItems([]);
  // };

  // // handle rating filter
  // const handleRatingFilter = () => {
  //   setIsFiltered(true);
  //   let items;
  //   if (filteredItems.length === 0) {
  //     items = products.filter((item) => item.rating >= "4");
  //   } else {
  //     items = filteredItems.filter((item) => item.rating >= "4");
  //   }

  //   setFilteredItems(items);
  // };
  // console.log("Filtered Items: ", filteredItems);

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
                <button onClick={() => handleBetween()}>Rs.300 - Rs.600</button>
              </div>
              <div>
                <button onClick={() => handleLessThan()}>
                  Less than Rs.300
                </button>
              </div>
              <div>
                <button>Non-Veg</button>
              </div>

              <div className={styles.search}>
                {/* <form> */}
                <input
                  className={styles.search_box}
                  type="search"
                  value={searchText}
                  // ref={searchTextRef}
                  onChange={(e) => setSearchText(e.target.value)}
                  placeholder="Search"
                />
                {/* </form> */}
              </div>
            </div>

            {/* list of products */}
            <div className={styles.item_list}>
              {filteredItems.length > 0 ? (
                filteredItems.map((item) => (
                  <MenuCard
                    key={item.id}
                    id={item.id}
                    name={item.name}
                    rating={item.rating}
                    price={item.price}
                    image={item.image}
                  />
                ))
              ) : (
                <p className={styles.not_found}>
                  <span>Oops!</span> Looks like we ran out of items for your
                  cravings.{" "}
                  <span style={{ color: "green" }}>
                    Try a different search or filter!
                  </span>
                </p>
              )}

              {/* for searched items */}
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
