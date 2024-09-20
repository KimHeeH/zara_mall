import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Container, Row, Col, Spinner } from "react-bootstrap"; // Spinner 추가
import ProductCard from "../component/ProductCard";
import { useSelector, useDispatch } from "react-redux";
import { productAction } from "../redux/actions/productAction";

const HomePage = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [animate, setAnimate] = useState(true);
  const [query] = useSearchParams();
  const productList = useSelector((state) => state.product.productList);

  const [showSlideImage, setShowSlideImage] = useState(true);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  let menuQuery = query.get("gender") || "";
  let typeQuery = query.get("type") || "";
  let searchQuery = query.get("search") || "";
  const images = [
    "https://static.zara.net/assets/public/0a98/d6fb/50bf4a318158/6ec7218bbb09/08578324681-h1/08578324681-h1.jpg?ts=1721731183960&w=1920",
    "https://static.zara.net/photos///contents/4ed0/ba62/db9043ef907a/a505879d5c83//svg-landscape-fill-e4de43a4-c004-4757-bba9-0b90b98237ca-default.svg?ts=1720690570259",
    "https://static.zara.net/photos///contents/mkt/spots/ss24-north-woman-new/subhome-xmedia-30-home-3//w/1920/image-landscape-fill-9403704b-9a47-4241-83c4-dc63ee69ee83-default_0.jpg?ts=1721834863069",
    "https://static.zara.net/photos///contents/mkt/spots/ss24-north-woman-new/subhome-xmedia-30-home-4//w/1920/image-landscape-fill-db0320a6-aabf-4dad-be49-23d87e8e2192-default_0.jpg?ts=1721835021975",
  ];

  const getProducts = async () => {
    if (loading) return; // 이미 로딩 중이면 추가 요청 방지

    setLoading(true);

    try {
      await dispatch(
        productAction.getProducts(searchQuery, typeQuery, menuQuery)
      );
    } catch (error) {
      console.error("Failed to fetch products:", error);
    } finally {
      setLoading(false);
    }

    setShowSlideImage(!searchQuery && !typeQuery && !menuQuery);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimate(false);
      setTimeout(() => {
        setCurrentImageIndex((prevIndex) =>
          prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
        setAnimate(true);
      }, 0);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    getProducts();
  }, [query]); // query를 의존성으로 사용

  return (
    <div>
      {loading || productList === undefined ? ( // 로딩 상태나 undefined 상태 확인
        <div
          style={{
            display: "flex",
            justifyContent: "center",

            height: "90vh",
          }}
        >
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>{" "}
          {/* 로딩 스피너 표시 */}
        </div>
      ) : (
        <div>
          {showSlideImage && (
            <div style={{ display: "flex", justifyContent: "center" }}>
              <img
                src={images[currentImageIndex]}
                alt="slide"
                className={animate ? "slide-img" : ""}
                style={{
                  width: "90%",
                  height: "auto",
                  marginBottom: "50px",
                }}
              />
            </div>
          )}
          <Container>
            <Row>
              <h5>
                {menuQuery && typeQuery
                  ? `${menuQuery} - ${typeQuery}`
                  : menuQuery
                  ? menuQuery
                  : typeQuery
                  ? typeQuery
                  : null}
              </h5>

              {productList.length > 0 ? (
                productList.map((product) => (
                  <Col lg={3} key={product.id}>
                    <ProductCard product={product} />
                  </Col>
                ))
              ) : (
                <h5 style={{ color: "grey" }}>
                  로딩중 ..메뉴를 한번 더 클릭해주세요
                </h5>
              )}
            </Row>
          </Container>
        </div>
      )}
    </div>
  );
};

export default HomePage;
