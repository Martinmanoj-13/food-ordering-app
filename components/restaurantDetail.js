import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import useMenuItems from "../utils/useMenuItems";
import useRestaurant from "../utils/useRestaurant";
import { IMG_CDN_URL, ITEM_IMG_CDN_URL } from "../constants";
import { MenuShimmer } from "./shimmer";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useDispatch } from "react-redux";
import { addNewItem } from "../redux/cartSlice";
import store from "../redux/store";

const RestaurantMenu = () => {
  const { resId } = useParams();
  const dispatch = useDispatch();
  
  const [showPopup, setShowPopup] = useState(false); // State to control the visibility of the popup

  const restaurant = useRestaurant(resId);
  const menuItems = useMenuItems(resId);

  const handleAddToCart = (item) => {
      dispatch(addNewItem(item));
  };

  return !restaurant ? (
    <MenuShimmer />
  ) : (
    <div className="restaurant-menu">
      <div className="restaurant-summary">
        <img
          className="restaurant-img"
          src={IMG_CDN_URL + restaurant?.cloudinaryImageId}
          alt={restaurant?.name}
        />
        <div className="restaurant-summary-details">
          <h2 className="restaurant-title">{restaurant?.name}</h2>
          <p className="restaurant-tags">{restaurant?.cuisines?.join(", ")}</p>
          <div className="restaurant-details">
            <div
              className="restaurant-rating"
              style={
                restaurant?.avgRating < 4
                  ? { backgroundColor: "var(--light-red)" }
                  : restaurant?.avgRating === "--"
                  ? { backgroundColor: "white", color: "black" }
                  : { color: "white" }
              }
            >
              <i className="fa-solid fa-star"></i>
              <span>{restaurant?.avgRating}</span>
            </div>
            <div className="restaurant-rating-slash">|</div>
            <div>
              {restaurant?.aggregatedDiscountInfo?.header
                ? restaurant.aggregatedDiscountInfo.header
                : "15% OFF"}
            </div>
            <div className="restaurant-rating-slash">|</div>
            <div>{restaurant?.costForTwoMessage}</div>
          </div>
        </div>
      </div>

      <div className="restaurant-menu-content">
        <div className="menu-items-container">
          <div className="menu-title-wrap">
            <h3 className="menu-title">Recommended</h3>
            <p className="menu-count">{menuItems.length} ITEMS</p>
          </div>
          <div className="menu-items-list">
            {menuItems.map((item) => (
              <div className="menu-item" key={item?.id}>
                <div className="menu-item-details">
                  <h3 className="item-title">{item?.name}</h3>
                  <p className="item-cost">
                    {item?.price > 0
                      ? new Intl.NumberFormat("en-IN", {
                          style: "currency",
                          currency: "INR",
                        }).format(item?.price / 100)
                      : " "}
                  </p>
                  <p className="item-desc">{item?.description}</p>
                </div>
                <div className="menu-img-wrapper">
                  {item?.imageId && (
                    <img
                      className="menu-item-img"
                      src={ITEM_IMG_CDN_URL + item?.imageId}
                      alt={item?.name}
                    />
                  )}
                  <button
                    className="add-btn"
                    onClick={() => handleAddToCart(item)} // Call handleAddToCart instead of directly addToCart
                  >
                    ADD +
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Popup */}
      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <p>Item added to cart!</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default RestaurantMenu;
