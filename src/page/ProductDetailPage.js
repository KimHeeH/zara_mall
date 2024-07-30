import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleArrowRight } from "@fortawesome/free-solid-svg-icons"; // 개별 아이콘 가져오기
import Button from "react-bootstrap/Button";

const ProductDetailPage = () => {
  const [slideproductImage, setSlideproductImage] = useState(false);
  const [product, setProduct] = useState("");
  const [sizeList, setSizeList] = useState([]);
  let { id } = useParams();

  const getProducts = async () => {
    let url = `http://localhost:5000/products/${id}`;
    let response = await fetch(url);
    let data = await response.json();
    setProduct(data);
    setSizeList(data.size);
    console.log(data.size);
    console.log("data는요", data);
  };
  const handleClickSlide = () => {
    setSlideproductImage(!slideproductImage);
  };
  useEffect(() => {
    getProducts();
  }, [id]);

  return (
    <Container>
      <Row>
        <Col lg={12} className="img-flex-end">
          <div className="imagecontainer">
            {slideproductImage ? (
              <img width="350px" src={product?.img} alt="Product Image 1" />
            ) : (
              <img width="350px" src={product?.img2} alt="Product Image 2" />
            )}

            <FontAwesomeIcon
              className="arrow"
              icon={faCircleArrowRight}
              onClick={handleClickSlide}
              style={{
                cursor: "pointer",
                fontSize: "24px",
              }}
            />
          </div>
          <div className="description" style={{ padding: "30px" }}>
            <div style={{ marginBottom: "10px", fontSize: "12px" }}>
              {product?.title}
            </div>
            <div style={{ marginBottom: "20px", fontSize: "11px" }}>
              \ {product?.price}
            </div>
            <div
              className="desborder"
              style={{
                height: "118px",
                borderBottom: "1px solid #666666",
              }}
            >
              <div
                style={{
                  marginBottom: "30px",
                  fontSize: "11px",
                }}
              >
                {product?.des}
              </div>
            </div>
            <Container style={{ marginTop: "30px" }}>
              <Row>
                {sizeList.map((size, index) => (
                  <Col key={index} lg={6} className="mb-2">
                    <Button
                      className="custombutton"
                      variant="outline-secondary"
                      style={{
                        fontSize: "12px",
                      }}
                    >
                      {size}
                    </Button>
                  </Col>
                ))}
              </Row>
            </Container>
            <div
              style={{
                marginTop: "80px",
                borderTop: "1px solid #666666",
              }}
            >
              <button
                style={{
                  backgroundColor: "white",
                  width: "100%",
                  border: "none",
                  marginTop: "10px",
                  fontSize: "12px",
                }}
              >
                추가하기
              </button>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductDetailPage;
