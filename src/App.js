import { Component } from "react";
import { Header } from "./Components/HeaderSection/Header";
import { Hero } from "./Components/Hero/Hero";
import { Nav } from "./Components/Nav/Nav";
import { data } from "./FoodData/FoodData";
import React from "react";
import { ChooseUs } from "./Components/ChooseUs/ChooseUs";
import { Cart } from "./Components/CartPage/Cart";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { DeliveryBanner } from "./Components/FastDelivery/DeliveryBanner";
import { Reservation } from "./Components/Reservations/Reservations";
import { SeatBook } from "./Components/Reservations/SeatBook";
import { Register } from "./Components/Login/Register";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Login } from "./Components/Login/Login";

class App extends Component {
  constructor() {
    super();

    this.state = {
      foodData: data,
      cartCount: 0,
      cartItems: [],
    };
  }

  // take food as para
  // get index of food item
  // update bool value of isInCart
  // update cart count
  // add and remove items to the cart
  handleCart = (foodItem) => {
    let { cartCount, foodData, cartItems } = this.state;
    const foodIdx = foodData.indexOf(foodItem);
    // console.log(foodIdx);
    foodData[foodIdx].isInCart = !foodData[foodIdx].isInCart;
    console.log(" Added to cart: ", foodData[foodIdx]);
    if (foodData[foodIdx].isInCart) {
      cartCount += 1;
      cartItems.push(foodData[foodIdx]);
    } else {
      cartCount -= 1;
      const removedFoodIdx = cartItems.indexOf(foodItem);
      cartItems.splice(removedFoodIdx, 1);
    }
    this.setState({ cartCount, cartItems });
    console.log("inside cart: ", cartCount);
    console.log("cart arr :", cartItems);
  };

  render() {
    // document.title = "FoodKing - Fast Food Restaurant";
    const { cartCount, foodData, cartItems } = this.state;
    return (
      <Router>
        <Nav cartCount={cartCount} />

        <ToastContainer />
        <Routes>
          {/* <Register /> */}
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {}
          <Route
            path="/home"
            element={
              <>
                <Header />
                <Hero
                  foodData={foodData}
                  cartItemsArr={cartItems}
                  handleCart={this.handleCart}
                  // scrollBackword={this.scrollBackword}
                  // scrollForword={this.scrollForword}
                />
                <ChooseUs />
                <SeatBook />
              </>
            }
          />

          <Route
            path="/cart"
            element={
              <Cart
                cartItemsArr={cartItems}
                cartCount={cartCount}
                foodData={foodData}
                handleCart={this.handleCart}
              />
            }
          />
          <Route path="/reservations" element={<Reservation />} />
        </Routes>
        <footer>
          <DeliveryBanner />
        </footer>
      </Router>
    );
  }
}

export default App;
