import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col } from "react-bootstrap";
import ProductCard from "../component/ProductCard";
import { useSelector, useDispatch } from "react-redux";
import { productAction } from "../redux/actions/productAction";

const HomePage = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [query, setQuery] = useSearchParams();
  const productList = useSelector((state) => state.product.productList) || [];
  const [showSlideImage, setShowSlideImage] = useState(true);
  const dispatch = useDispatch();
  const images = [
    "https://static.zara.net/assets/public/0a98/d6fb/50bf4a318158/6ec7218bbb09/08578324681-h1/08578324681-h1.jpg?ts=1721731183960&w=1920",
    "https://static.zara.net/photos///contents/4ed0/ba62/db9043ef907a/a505879d5c83//svg-landscape-fill-e4de43a4-c004-4757-bba9-0b90b98237ca-default.svg?ts=1720690570259",
    "https://static.zara.net/photos///contents/mkt/spots/ss24-north-woman-new/subhome-xmedia-30-home-3//w/1920/image-landscape-fill-9403704b-9a47-4241-83c4-dc63ee69ee83-default_0.jpg?ts=1721834863069",
    "https://static.zara.net/photos///contents/mkt/spots/ss24-north-woman-new/subhome-xmedia-30-home-4//w/1920/image-landscape-fill-db0320a6-aabf-4dad-be49-23d87e8e2192-default_0.jpg?ts=1721835021975",
  ];

  const getProducts = () => {
    let searchQuery = query.get("q") || "";
    let typeQuery = query.get("type") || "";
    let menuQuery = query.get("gender") || "";
    dispatch(productAction.getProducts(searchQuery, typeQuery, menuQuery));
    setShowSlideImage(!searchQuery && !typeQuery && !menuQuery);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length]);

  useEffect(() => {
    getProducts();
  }, [query]);

  return (
    <div>
      {showSlideImage && (
        <img
          src={images[currentImageIndex]}
          alt="slide"
          style={{ width: "100%", height: "auto" }}
        />
      )}
      <Container>
        <Row>
          {productList.length > 0 ? (
            productList.map((product) => (
              <Col lg={3} key={product.id}>
                <ProductCard product={product} />
              </Col>
            ))
          ) : (
            <p>No products found</p>
          )}
        </Row>
      </Container>
    </div>
  );
};

export default HomePage;
