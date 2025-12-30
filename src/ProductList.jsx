import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addItem } from "../redux/CartSlice";
import "./ProductList.css";
import CartItem from "./CartItem";

function ProductList({ onHomeClick }) {
  const dispatch = useDispatch();

  const [showCart, setShowCart] = useState(false);
  const [addedToCart, setAddedToCart] = useState({});

  const plantsArray = [
    {
      category: "Air Purifying Plants",
      plants: [
        {
          name: "Snake Plant",
          image:
            "https://cdn.pixabay.com/photo/2021/01/22/06/04/snake-plant-5939187_1280.jpg",
          description: "Produces oxygen at night, improving air quality.",
          cost: "$15",
        },
        {
          name: "Spider Plant",
          image:
            "https://cdn.pixabay.com/photo/2018/07/11/06/47/chlorophytum-3530413_1280.jpg",
          description: "Filters formaldehyde and xylene from the air.",
          cost: "$12",
        },
        {
          name: "Peace Lily",
          image:
            "https://cdn.pixabay.com/photo/2019/06/12/14/14/peace-lilies-4269365_1280.jpg",
          description: "Removes mold spores and purifies the air.",
          cost: "$18",
        },
      ],
    },
    {
      category: "Aromatic Fragrant Plants",
      plants: [
        {
          name: "Lavender",
          image:
            "https://images.unsplash.com/photo-1611909023032-2d6b3134ecba",
          description: "Calming scent, used in aromatherapy.",
          cost: "$20",
        },
        {
          name: "Mint",
          image:
            "https://cdn.pixabay.com/photo/2016/01/07/18/16/mint-1126282_1280.jpg",
          description: "Refreshing aroma, used in teas and cooking.",
          cost: "$12",
        },
      ],
    },
    {
      category: "Medicinal Plants",
      plants: [
        {
          name: "Aloe Vera",
          image:
            "https://cdn.pixabay.com/photo/2018/04/02/07/42/leaf-3283175_1280.jpg",
          description: "Soothing gel used for skin ailments.",
          cost: "$14",
        },
        {
          name: "Chamomile",
          image:
            "https://cdn.pixabay.com/photo/2016/08/19/19/48/flowers-1606041_1280.jpg",
          description: "Soothes anxiety and promotes sleep.",
          cost: "$15",
        },
      ],
    },
  ];

  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));
    setAddedToCart((prev) => ({
      ...prev,
      [plant.name]: true,
    }));
  };

  const handleCartClick = (e) => {
    e.preventDefault();
    setShowCart(true);
  };

  const handleContinueShopping = () => {
    setShowCart(false);
  };

  return (
    <div>
      {/* NAVBAR */}
      <div className="navbar">
        <h2 onClick={onHomeClick} style={{ cursor: "pointer" }}>
          Paradise Nursery
        </h2>
        <button onClick={handleCartClick}>🛒 Cart</button>
      </div>

      {/* PRODUCT LIST OR CART */}
      {!showCart ? (
        <div className="product-grid">
          {plantsArray.map((category) => (
            <div key={category.category}>
              <h2>{category.category}</h2>

              <div className="category-grid">
                {category.plants.map((plant) => (
                  <div className="product-card" key={plant.name}>
                    <img src={plant.image} alt={plant.name} />
                    <h3>{plant.name}</h3>
                    <p>{plant.description}</p>
                    <p>{plant.cost}</p>

                    <button
                      onClick={() => handleAddToCart(plant)}
                      disabled={addedToCart[plant.name]}
                    >
                      {addedToCart[plant.name]
                        ? "Added to Cart"
                        : "Add to Cart"}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <CartItem onContinueShopping={handleContinueShopping} />
      )}
    </div>
  );
}

export default ProductList;
