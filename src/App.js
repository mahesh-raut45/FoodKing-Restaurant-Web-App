import { Header } from "./Components/HeaderSection/Header";
import { Hero } from "./Components/Hero/Hero";
import { Nav } from "./Components/Nav/Nav";
import React from "react";
import { ChooseUs } from "./Components/ChooseUs/ChooseUs";
import { Cart } from "./Components/CartPage/Cart";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import { DeliveryBanner } from "./Components/FastDelivery/DeliveryBanner";
import { Reservation } from "./Components/Reservations/Reservations";
import { SeatBook } from "./Components/Reservations/SeatBook";
import "react-toastify/dist/ReactToastify.css";
import { LoginPage } from "./Components/Login/LoginPage";
import { Page404 } from "./PageNotFound/Page404";
import { SingleFoodItem } from "./Components/SingleFoodItem/SingleFoodItem";
import { ThemeProvider } from "@material-tailwind/react";
import { ToastContainer } from "react-toastify";
import FoodMenu from "./Components/FoodMenu/FoodMenu";

const App = () => {
  // constructor() {
  //   super();

  //   this.state = {
  //     foodData: data,
  //     cartCount: 0,
  //     cartItems: [],
  //   };
  // }

  // take food as para
  // get index of food item
  // update bool value of isInCart
  // update cart count
  // add and remove items to the cart
  // handleCart = (foodItem) => {
  //   let { cartCount, foodData, cartItems } = this.state;
  //   const foodIdx = foodData.indexOf(foodItem);
  //   // console.log(foodIdx);
  //   foodData[foodIdx].isInCart = !foodData[foodIdx].isInCart;
  //   console.log(" Added to cart: ", foodData[foodIdx]);
  //   if (foodData[foodIdx].isInCart) {
  //     cartCount += 1;
  //     cartItems.push(foodData[foodIdx]);
  //   } else {
  //     cartCount -= 1;
  //     const removedFoodIdx = cartItems.indexOf(foodItem);
  //     cartItems.splice(removedFoodIdx, 1);
  //   }
  //   this.setState({ cartCount, cartItems });
  //   console.log("inside cart: ", cartCount);
  //   console.log("cart arr :", cartItems);
  // };

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <Nav />
          <Outlet />
          <DeliveryBanner />
        </>
      ),
      errorElement: <Page404 />,
      children: [
        { index: true, element: <LoginPage /> },
        {
          path: "home",
          element: (
            <>
              <Header />
              <Hero />
              <ChooseUs />
              <SeatBook />
            </>
          ),
        },
        { path: "foodItem/:id", element: <SingleFoodItem /> },
        { path: "cart/user/:id", element: <Cart /> },
        { path: "food-menu", element: <FoodMenu /> },
        { path: "reservations", element: <Reservation /> },
      ],
    },
    {
      path: "*",
      element: <Page404 />,
    },
  ]);

  return (
    <ThemeProvider>
      <ToastContainer />
      <RouterProvider router={router} />
    </ThemeProvider>
    // <Router>
    //   <Nav cartCount={cartCount} />

    //
    //   <Routes>
    //     {/* <Register /> */}
    //     <Route path="/" element={<LoginPage />} />
    //     <Route path="/register" element={<Register />} />
    //     {}
    //     <Route
    //       path="/home"
    //       element={
    //         <>
    //           <Header />
    //           <Hero
    //           // foodData={foodData}
    //           // cartItemsArr={cartItems}
    //           // handleCart={this.handleCart}
    //           />
    //           <ChooseUs />
    //           <SeatBook />
    //         </>
    //       }
    //     />
    //     <Route path="/foodItem/id" element={<SingleFoodItem />} />

    //     <Route
    //       path="/cart"
    //       element={
    //         <Cart
    //           cartItemsArr={cartItems}
    //           cartCount={cartCount}
    //           foodData={foodData}
    //           handleCart={this.handleCart}
    //         />
    //       }
    //     />
    //     <Route path="/reservations" element={<Reservation />} />
    //   </Routes>
    //   <footer>
    //     <DeliveryBanner />
    //   </footer>
    // </Router>
  );
};
// }

export default App;
