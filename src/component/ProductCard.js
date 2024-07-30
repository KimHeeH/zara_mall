import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const ProductCard = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();
  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  const goClickProduct = (id) => {
    navigate(`/products/${product.id}`);
  };
  return (
    <div className="product" onClick={goClickProduct}>
      <div
        className="image-container"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <img
          className="product-img"
          width="300px"
          src={isHovered ? product.img2 : product.img}
          alt={product.title}
        />
      </div>
      <div>{product?.choice === true ? "concious choice" : ""}</div>
      <div>{product?.title}</div>
      <div>{product?.price}</div>
      <div>{product?.new === true ? "신제품" : ""}</div>
    </div>
  );
};

export default ProductCard;
