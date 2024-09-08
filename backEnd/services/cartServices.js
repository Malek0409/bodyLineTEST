import { 
  getUserCart, 
  createCart, 
  getProductById, 
  checkCartLine, 
  insertCartLine, 
  getCartLines, 
  deleteCartLine, 
  updateCartLine 
} from "../model/cartModel.js";

export const addProductToCartService = async (userId, productID, productQuantity = 1) => {
  let cartResult = await getUserCart(userId);

  let cartId;
  if (cartResult.length > 0) {
    cartId = cartResult[0].id;
  } else {
    cartId = await createCart(userId);
  }

  let productResult = await getProductById(productID);

  if (productResult.length === 0) {
    throw new Error("Produit non trouvé");
  }

  let ProductID = productResult[0].id;
  let priceItem = productResult[0].price;

  let cartLineResult = await checkCartLine(cartId, ProductID);

  if (cartLineResult.length > 0) {
    return { status: "Produit déjà dans le panier" };
  } else {
    await insertCartLine(cartId, ProductID, productQuantity, priceItem);
    return { status: "Produit ajouté avec succès" };
  }
};

export const getCartItemsService = async (userId) => {
  let cartResult = await getUserCart(userId);

  if (cartResult.length === 0) {
    throw new Error("Panier non trouvé");
  }

  let cartId = cartResult[0].id;
  return await getCartLines(cartId);
};

export const deleteProductFromCartService = async (userId, cartLineId) => {
  let cartResult = await getUserCart(userId);

  if (cartResult.length === 0) {
    throw new Error("Panier non trouvé");
  }

  let cartId = cartResult[0].id;
  return await deleteCartLine(cartId, cartLineId);
};

export const updateProductInCartService = async (userId, productID, action) => {
  let cartResult = await getUserCart(userId);

  let cartId;
  if (cartResult.length > 0) {
    cartId = cartResult[0].id;
  } else {
    cartId = await createCart(userId);
  }

  let cartLineResult = await checkCartLine(cartId, productID);

  if (cartLineResult.length > 0) {
    let newQty;
    if (action === "increment") {
      newQty = cartLineResult[0].quantite + 1;
    } else if (action === "decrement" && cartLineResult[0].quantite > 1) {
      newQty = cartLineResult[0].quantite - 1;
    } else {
      throw new Error("Quantité invalide");
    }

    await updateCartLine(cartLineResult[0].id, newQty, cartLineResult[0].price_item);
    return { status: "Quantité mise à jour" };
  } else {
    throw new Error("Produit non trouvé dans le panier");
  }
};
