import { productActions } from "../reducers/productReducer";

function getProducts(searchQuery, typeQuery, menuQuery) {
  return async (dispatch) => {
    let url = `http://localhost:5000/products`;
    let params = new URLSearchParams();

    if (searchQuery) params.append("q", searchQuery);
    if (typeQuery) params.append("type", typeQuery);
    if (menuQuery) params.append("gender", menuQuery);
    url += `?${params.toString()}`;

    let response = await fetch(url);
    let data = await response.json();
    dispatch(productActions.getAllProducts(data));
  };
}

function getProductDetail(id) {
  return async (dispatch) => {
    let url = `http://localhost:5000/products/${id}`;
    let response = await fetch(url);
    let data = await response.json();
    console.log("data는", data);
    dispatch(productActions.getProductDetail(data));
  };
}

export const productAction = { getProducts, getProductDetail };
