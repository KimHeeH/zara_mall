import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  productList: [],
  product: [],
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
