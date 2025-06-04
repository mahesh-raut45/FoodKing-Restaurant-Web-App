import { Header } from "./Components/HeaderSection/Header";
import { Hero } from "./Components/Hero/Hero";
import { Nav } from "./Components/Nav/Nav";
import React from "react";
import { ChooseUs } from "./Components/ChooseUs/ChooseUs";
import { Cart } from "./Components/CartPage/Cart";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import { DeliveryBanner } from "./Components/Footer/DeliveryBanner";
import { Reservation } from "./Components/Reservations/Reservations";
import { SeatBook } from "./Components/Reservations/SeatBook";
import "react-toastify/dist/ReactToastify.css";
import { LoginPage } from "./Components/Login/LoginPage";
import { Page404 } from "./PageNotFound/Page404";
import { SingleFoodItem } from "./Components/SingleFoodItem/SingleFoodItem";
import { ThemeProvider } from "@material-tailwind/react";
import { ToastContainer } from "react-toastify";
import FoodMenu from "./Components/FoodMenu/FoodMenu";
import { ContactUs } from "./Components/ContactUs/ContactUs";
import ScrollToTopOnNavigation from "./Components/Navigation/ScrollToTopOnNavigation";
import UserProfile from "./Components/UserProfile/UserProfile";
import { Checkout } from "./Components/Checkout/Checkout";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <Nav />
          <ScrollToTopOnNavigation />
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
        { path: "checkout", element: <Checkout /> },
        { path: "food-menu", element: <FoodMenu /> },
        { path: "reservations", element: <Reservation /> },
        { path: "contact-us", element: <ContactUs /> },
        { path: "user", element: <UserProfile /> },
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
      <RouterProvider router={router} future={{ v7_startTransition: true }} />
    </ThemeProvider>
  );
};

export default App;
