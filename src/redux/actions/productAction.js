// productAction.js
import { productActions } from "../reducers/productReducer";

// 환경변수 또는 직접 설정한 API URL 사용
const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

// 모든 제품 가져오기
function getProducts(typeQuery) {
  return async (dispatch) => {
    try {
      let url = `${API_BASE_URL}/products`;
      let params = new URLSearchParams();

      // type이 존재하면 쿼리 파라미터 추가
      if (typeQuery) params.append("type", typeQuery);
      url += `?${params.toString()}`;

      const response = await fetch(url);
      if (!response.ok) throw new Error("Failed to fetch products");

      const data = await response.json();
      dispatch(productActions.getAllProducts(data));
    } catch (error) {
      console.error("Error fetching products:", error);
      alert("제품을 불러오는 데 실패했습니다.");
    }
  };
}
// 특정 제품 상세 정보 가져오기
function getProductDetail(id) {
  return async (dispatch) => {
    try {
      const response = await fetch(`${API_BASE_URL}/products/${id}`);
      if (!response.ok) throw new Error("Failed to fetch product details");

      const data = await response.json();
      dispatch(productActions.getProductDetail(data));
    } catch (error) {
      console.error("Error fetching product details:", error);
      alert("제품 상세 정보를 불러오는 데 실패했습니다.");
    }
  };
}

export const productAction = { getProducts, getProductDetail };
