import { configureStore } from "@reduxjs/toolkit";
import authenticateReducer from "./reducers/authenticateReducer";
import productReducer from "./reducers/productReducer";
const store = configureStore({
  reducer: { product: productReducer, auth: authenticateReducer },
});

export default store;
