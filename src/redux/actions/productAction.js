import { productActions } from "../reducers/productReducer";

function getProducts(searchQuery, typeQuery, menuQuery) {
  return async (dispatch) => {
    try {
      let url = `https://my-json-server.typicode.com/KimHeeH/zara_mall/products`;
      let params = new URLSearchParams();

      if (searchQuery) params.append("q", searchQuery);
      if (typeQuery) params.append("type", typeQuery);
      if (menuQuery) params.append("gender", menuQuery);
      url += `?${params.toString()}`;

      let response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      let data = await response.json();
      console.log("Fetched products:", data); // Debugging line
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
      console.log("Fetched product detail:", data); // Debugging line
      dispatch(productActions.getProductDetail(data));
    } catch (error) {
      console.error("Error fetching product detail:", error);
    }
  };
}

export const productAction = { getProducts, getProductDetail };
