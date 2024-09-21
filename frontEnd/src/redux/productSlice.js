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
    alert("L'article est déjà dans le panier");
  } else {
    state.cartProductItems.push(action.payload);
    console.log(state.cartProductItems);

    try {

      axios.post(`https://api.bodyline.site/addProductToCart`, {

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
      console.error("Une erreur est survenue lors de l'ajout du produit au panier:", error);
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
            axios.post(`https://api.bodyline.site/deleteProductFromCart`, {

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

increaseQty: (state, action) => {
  const item = state.cartProductItems.find((el) => el === action.payload);
  console.log(state.cartProductItems)
  
  console.log(action.payload)

  if (item) {
    try {
      axios.post(`https://api.bodyline.site/updateProductToCart`, {

        productID: action.payload,
        action: "increment"
      }).then(res => {
        if (res.data.status === "Quantité mise à jour") {
          let qty = item.qty;
          const qtyInc = ++qty; 
          item.qty = qtyInc; 
          
          const price = item.price;
          const total = price * qtyInc; 
          item.total = total; 

          console.log(qtyInc);
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
  console.log("test")
      const index = state.cartProductItems.findIndex(el => el.id === action.payload.id);
      console.log(index !== -1 && state.cartProductItems[index].qty > 1)
      console.log(index)
  if (index !== -1 && state.cartProductItems[index].qty > 1) {
    try { 
      axios.post(`https://api.bodyline.site/updateProductToCart`, {

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