const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
const port = 5000;

// CORS 설정
app.use(cors());
app.use(express.json());
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal Server Error" });
});

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
app.get("/", (req, res) => {
  const { type, search, gender } = req.query;
  let query = "SELECT * FROM productDB";
  let queryParams = [];
  let conditions = [];

  // 조건문을 모두 if로 수정하여 여러 조건을 동시에 처리할 수 있도록 함
  if (type) {
    conditions.push("type = ?");
    queryParams.push(type);
  }
  if (search) {
    conditions.push("title LIKE ?");
    queryParams.push(`%${search}%`);
  }
  if (gender) {
    conditions.push("gender = ?");
    queryParams.push(gender);
  }

  // 조건이 하나라도 있을 경우 WHERE 절 추가
  if (conditions.length > 0) {
    query += " WHERE " + conditions.join(" AND ");
  }

  db.query(query, queryParams, (err, results) => {
    if (err) {
      console.error("Database query error:", err); // 오류 로그 추가
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
