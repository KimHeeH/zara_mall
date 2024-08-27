import { productActions } from "../reducers/productReducer";

function getProducts(searchQuery, typeQuery, menuQuery) {
  return async (dispatch) => {
    try {
      let url = `https://my-json-server.typicode.com/KimHeeH/zara_mall/products`;
      let params = new URLSearchParams();

      if (searchQuery) params.append("q", searchQuery);
      if (typeQuery) params.append("type", typeQuery);
      if (menuQuery) params.append("gender", menuQuery);

      // Limit을 추가해 한 번에 가져오는 상품의 수를 제한할 수 있습니다.
      params.append("_limit", 5);

      url += `?${params.toString()}`;

      let response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      let data = await response.json();
      console.log("Fetched products:", data); // 디버깅용 로그

      dispatch(productActions.getAllProducts(data));
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };
}

function getProductDetail(id) {
  return async (dispatch) => {
    try {
      let url = `https://my-json-server.typicode.com/KimHeeH/zara_mall/products/${id}`;
      let response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      let data = await response.json();
      console.log("Fetched product detail:", data); // 디버깅용 로그

      dispatch(productActions.getProductDetail(data));
    } catch (error) {
      console.error("Error fetching product detail:", error);
    }
  };
}

export const productAction = { getProducts, getProductDetail };
