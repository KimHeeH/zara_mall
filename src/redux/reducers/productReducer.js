// reducers/productReducer.js
import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  productList: undefined,
  product: [], // 빈 객체로 초기화
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    getAllProducts(state, action) {
      state.productList = action.payload;
    },
    getProductDetail(state, action) {
      state.product = action.payload;
    },
  },
});

export const productActions = productSlice.actions;
export default productSlice.reducer;
