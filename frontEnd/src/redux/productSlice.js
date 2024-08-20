import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const initialState = {
  productList: [],
  cartProductItems: []
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    // setDataProduct: (state, action) => {
    //       state.productList = [...action.payload.product];
    //       console.log(action)
    // },
    addCartProductItemps: (state, action) => {
        const check = state.cartProductItems.some(el => el.id === action.payload.product.id);
        if (check) {
        toast("Item already in Cart");
        } else {
        toast("Item added successfully");
            const total = action.payload.product.price;
        state.cartProductItems = [
          ...state.cartProductItems,
          { ...action.payload.product, qty: 1, total: total }
        ];
          console.log(state.cartProductItems)   
          console.log(...state.cartProductItems)  
      }
      },
    deleteCartProductItemps: (state, id) => {
      toast("Product deleted");
      const index = state.cartProductItems.findIndex(el => el.id === id.payload);
      state.cartProductItems.splice(index, 1);
    },
      increaseQty: (state, id) => {
      const index = state.cartProductItems.findIndex(el => el.id === id.payload);
      let qty = state.cartProductItems[index].qty;
      const qtyInc = ++qty;
      state.cartProductItems[index].qty = qtyInc;
      const price = state.cartProductItems[index].price;
      const total = price * qtyInc;
      state.cartProductItems[index].total = total;
      },
     
    decreaseQty: (state, id) => {
      const index = state.cartProductItems.findIndex(el => el.id === id.payload);
      let qty = state.cartProductItems[index].qty;
      if (qty > 1) {
        const qtyDec = --qty;
        state.cartProductItems[index].qty = qtyDec;
        const price = state.cartProductItems[index].price;
        const total = price * qtyDec;
        state.cartProductItems[index].total = total;
      }
    }
  }
});

export const {
  setDataProduct,
  addCartProductItemps,
  deleteCartProductItemps,
  increaseQty,
  decreaseQty
} = productSlice.actions;
export default productSlice.reducer;