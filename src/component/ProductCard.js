import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { authenticateAction } from "../redux/actions/authenticateAction";
const ProductCard = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();
  const authenticate = useSelector((state) => state.auth.authenticate);
  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  const goClickProduct = () => {
    if (authenticate == true) {
      if (product?.id) {
        navigate(`/products/${product.id}`);
      }
    } else {
      navigate("/login");
    }
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
          src={isHovered ? product?.img2 : product?.img}
          alt={product?.title}
        />
      </div>

      <div>{product?.title}</div>
      <div>{product?.price}</div>
    </div>
  );
};

export default ProductCard;
