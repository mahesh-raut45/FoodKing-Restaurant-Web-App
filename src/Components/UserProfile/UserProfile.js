import React, { useEffect, useRef, useState } from "react";
import styles from "./UserProfile.module.css";
import HeaderComponent from "../HeaderComponent/HeaderComponent";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const initialUser = {
  userName: "Mahesh Raut",
  email: "mahesh@example.com",
  profilePic: "https://i.pravatar.cc/150?img=12",
  addresses: ["123 Main Street, Pune, India", "56 MG Road, Mumbai, India"],
  joined: "March 2023",
  totalOrders: 42,
  cardDetails: [
    { type: "Visa", number: "**** **** **** 1234" },
    { type: "MasterCard", number: "**** **** **** 5678" },
  ],
  previousOrders: [
    {
      id: "OD1234",
      restaurant: "FoodKing",
      items: ["Burger", "Fries"],
      total: "₹250",
      date: "April 28, 2025",
    },
    {
      id: "OD1235",
      restaurant: "Spicy Biryani",
      items: ["Chicken Biryani"],
      total: "₹180",
      date: "May 2, 2025",
    },
  ],
};

const UserProfile = () => {
  const [user, setUser] = useState(initialUser);
  const [selectedImage, setSelectedImage] = useState(null);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const profilePic = "https://i.pravatar.cc/150?img=12";

  useEffect(() => {
    const getUserDetails = async () => {
      try {
        const user = await getUserDetails();
        if (user === null) {
          toast.info("Please login first", {
            position: "bottom-right",
          });
          navigate("/");
        } else {
          console.log("Fetched user: ", user);
          setUser(user);
        }
      } catch (error) {
        console.log("Error while fetching user: ", error.messsage);
      }
    };
  }, [navigate]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setSelectedImage(imageURL);
    }
  };

  return (
    <>
      <HeaderComponent title="User Profile" />
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.profileImageSection}>
            <img
              className={styles.profilePic}
              src={selectedImage || profilePic}
              alt="Profile"
            />
            <button
              onClick={() => fileInputRef.current.click()}
              className={styles.uploadBtn}
            >
              Upload New
            </button>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleImageUpload}
              style={{ display: "none" }}
            />
          </div>
          <div>
            <h2 className={styles.name}>{user.userName}</h2>
            <p className={styles.email}>{user.email}</p>
            <p className={styles.joined}>Joined: {user.createdAt}</p>
          </div>
        </div>

        {/* Info Grid */}
        <div className={styles.infoGrid}>
          {/* Addresses */}
          <div className={styles.infoCard}>
            <h3>Saved Addresses</h3>
            <ul className={styles.addressList}>
              {user.addresses.map((addr, idx) => (
                <li key={idx}>{addr}</li>
              ))}
            </ul>
          </div>
          {/* Card Details */}
          <div className={styles.infoCard}>
            <h3>Saved Cards</h3>
            <ul className={styles.cardList}>
              {user.cardDetails.map((card, idx) => (
                <li key={idx}>
                  {card.type}: {card.number}
                </li>
              ))}
            </ul>
          </div>

          {/* Stats */}
          <div className={styles.infoCard}>
            <h3>Account Stats</h3>
            <p>Total Orders: {user.totalOrders}</p>
          </div>
        </div>

        {/* Previous Orders */}
        <div className={styles.orders}>
          <h3>Previous Orders</h3>
          <ul>
            {user.previousOrders.map((order) => (
              <li key={order.id} className={styles.orderItem}>
                <p className={styles.restaurant}>{order.restaurant}</p>
                <p className={styles.orderDetails}>
                  Items: {order.items.join(", ")} | Total: {order.total} | Date:{" "}
                  {order.date}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
