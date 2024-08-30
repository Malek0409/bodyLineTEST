import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

const initialState = {
  productList: [],
  cartProductItems: []
};




export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {

    setCartItems: (state, action) => {
      state.cartProductItems = action.payload;
    },
    
   addCartProductItemps: (state, action) => {
    const existingProduct = state.cartProductItems.find(
      item => item.product.id === action.payload.product.id
    );

    if (existingProduct) {
      alert("Item already in Cart");
    } else {
      state.cartProductItems.push(action.payload);
      console.log(state.cartProductItems);

      try {
        axios.post("http://localhost:8080/addProductToCart", {
          productID: action.payload.product.id,
        })
        .then((res) => {
          if (res.data.status === "Item added successfully") {
            alert(res.data.status);
          } else {
            alert(res.data.Error);
          }
        });
      } catch (error) {
        console.error("There was an error adding the product to the cart:", error);
      }
    }
  },

  
    deleteCartProductItemps: (state, action) => {
      console.log('Payload cartLine:', action.payload.id);
         console.log('state:', state.cartProductItems);


      const index = state.cartProductItems.findIndex(
      item => item.id === action.payload.id
    );
    if (index !== -1) {
      state.cartProductItems.splice(index, 1);

      try {
            axios.post("http://localhost:8080/deleteProductFromCart", {
              cartLineId: action.payload.id,
            })
            .then((res) => {
                if (res.data.status === "Produit supprimé du panier") {
                    alert(res.data.status);
                } else {
                    alert(res.data.error);
                }
            });
        } catch (error) {
            console.error("There was an error removing the product from the cart:", error);
        }
    } else {
        alert("Produit non trouvé dans le panier");
    }
},
    //   increaseQty: (state, id) => {
    //   const index = state.cartProductItems.findIndex(el => el.id === id.payload);
    //   let qty = state.cartProductItems[index].qty;
    //   const qtyInc = ++qty;
    //   state.cartProductItems[index].qty = qtyInc;
    //   const price = state.cartProductItems[index].price;
    //   const total = price * qtyInc;
    //   state.cartProductItems[index].total = total;
    //   },
     
    // decreaseQty: (state, id) => {
    //   const index = state.cartProductItems.findIndex(el => el.id === id.payload);
    //   let qty = state.cartProductItems[index].qty;
    //   if (qty > 1) {
    //     const qtyDec = --qty;
    //     state.cartProductItems[index].qty = qtyDec;
    //     const price = state.cartProductItems[index].price;
    //     const total = price * qtyDec;
    //     state.cartProductItems[index].total = total;
    //   }
    // },
    increaseQty: (state, action) => {
  const index = state.cartProductItems.findIndex(el => el.id === action.payload.id);
  if (index !== -1) {
    try {
      axios.post("http://localhost:8080/updateProductToCart", {
        productID: action.payload.id,
        action: "increment"
      }).then(res => {
        if (res.data.status === "Quantité mise à jour") {
          let qty = state.cartProductItems[index].qty + 1;
          state.cartProductItems[index].qty = qty;
          state.cartProductItems[index].total = state.cartProductItems[index].price * qty;
        } else {
          toast(res.data.error);
        }
      });
    } catch (err) {
      console.error("Error during increment request: ", err);
    }
  }
},

decreaseQty: (state, action) => {
  const index = state.cartProductItems.findIndex(el => el.id === action.payload.id);
  if (index !== -1 && state.cartProductItems[index].qty > 1) {
    try {
      axios.post("http://localhost:8080/updateProductToCart", {
        productID: action.payload.id,
        action: "decrement"
      }).then(res => {
        if (res.data.status === "Quantité mise à jour") {
          let qty = state.cartProductItems[index].qty - 1;
          state.cartProductItems[index].qty = qty;
          state.cartProductItems[index].total = state.cartProductItems[index].price * qty;
        } else {
          toast(res.data.error);
        }
      });
    } catch (err) {
      console.error("Error during decrement request: ", err);
    }
  }
},
      updatedProduct: (state, action) => {
      const index = state.productList.findIndex(product => product.id === action.payload.product.id);
      if (index !== -1) {
        state.productList[index] = {
          ...state.productList[index],
          ...action.payload.product
        };
        toast("Product updated successfully");
      } else {
        toast("Product not found");
      }
        
    }
  }
  
});

export const {
  setDataProduct,
  addCartProductItemps,
  deleteCartProductItemps,
  increaseQty,
  decreaseQty,
  updatedProduct,
  setCartItems
} = productSlice.actions;
export default productSlice.reducer;