import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, Router, RouterProvider } from "react-router-dom";
import "./styles.css";
import Header from "./components/header";
import Body from "./components/body";
import Footer from "./components/footer";
import Offers from "./components/offer";
import Error from "./components/error";
import Help from "./components/help";
import Cart from "./components/cart";
import Login from "./components/login.js";
import { Outlet } from "react-router-dom";
import RestaurantMenu from "./components/restaurantDetail";
import Shimmer from "./components/shimmer";
import store from "./redux/store";
import { Provider } from "react-redux";
import OrderComponent from "./components/order.js";


// Lazy loading
const InstaMart = lazy(() => import("./components/instaMart.js"));

const AppLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

const AppRouter = createBrowserRouter([
  {
    path: "/",
    element: (
      <Provider store={store}> 
        <AppLayout />
      </Provider>
    ),
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Body />,
      },
      {
        path: "/offer",
        element: <Offers />,
      },
      {
        path: "/help",
        element: <Help />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/restaurant/:resId",
        element: <RestaurantMenu />,
      },
      {
        path: "/instamart",
        element: (
          <Suspense fallback={<Shimmer/>}>
            <InstaMart />
          </Suspense>
        ),
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/order",
        element: <OrderComponent />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <RouterProvider router={AppRouter}>
    <Router />
  </RouterProvider>
);
