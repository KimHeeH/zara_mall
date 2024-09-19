const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
const port = 5000;

// CORS 설정
app.use(cors());
app.use(express.json());

// MySQL 연결 설정
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1234",
  database: "zaraDB",
});

// MySQL 연결 확인
db.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
    return;
  }
  console.log("Connected to MySQL database");
});

// 모든 상품 가져오기 (GET /products)
app.get("/products", (req, res) => {
  const { type } = req.query; // 쿼리 파라미터에서 type 가져오기
  let query = "SELECT * FROM productDB"; // 기본 쿼리
  let queryParams = [];

  // type이 존재하면 조건 추가
  if (type) {
    query += " WHERE type = ?";
    queryParams.push(type);
  }

  db.query(query, queryParams, (err, results) => {
    if (err) {
      res.status(500).send("Error fetching products");
      return;
    }
    res.json(results);
  });
});

// 특정 상품 가져오기 (GET /products/:id)
app.get("/products/:id", (req, res) => {
  const { id } = req.params;
  console.log("Requested ID:", id); // 요청된 ID 값을 콘솔로 출력하여 확인
  const query = "SELECT * FROM productDB WHERE id = ?";
  db.query(query, [id], (err, results) => {
    if (err) {
      console.error("Database error:", err);
      res.status(500).send("Error fetching product");
      return;
    }
    if (results.length === 0) {
      res.status(404).send("Product not found");
      return;
    }
    res.json(results[0]);
  });
});

// 서버 실행
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
