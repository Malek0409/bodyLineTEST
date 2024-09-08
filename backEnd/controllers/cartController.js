import { 
  addProductToCartService, 
  getCartItemsService, 
  deleteProductFromCartService, 
  updateProductInCartService 
} from "../services/cartServices.js";

export const addProductToCart = async (req, res) => {
  try {
    const { productID, productQuantity } = req.body;
    const userId = req.userId;

    const result = await addProductToCartService(userId, productID, productQuantity);
    return res.status(200).json(result);
  } catch (err) {
    console.error(err.message, " : Erreur interne du serveur");
    return res.status(500).json({ error: err.message });
  }
};

export const getProductToCartLine = async (req, res) => {
  try {
    const userId = req.userId;
    const cartItems = await getCartItemsService(userId);
    return res.status(200).json({ cartItems });
  } catch (err) {
    console.error(err.message, " : Erreur interne du serveur");
    return res.status(500).json({ error: err.message });
  }
};

export const deleteProductFromCart = async (req, res) => {
  try {
    const userId = req.userId;
    const { cartLineId } = req.body;

    await deleteProductFromCartService(userId, cartLineId);
    return res.status(200).json({ status: "Produit supprimé du panier" });
  } catch (err) {
    console.error(err.message, " : Erreur interne du serveur");
    return res.status(500).json({ error: err.message });
  }
};

export const updateProductToCart = async (req, res) => {
  try {
    const userId = req.userId;
    const { productID, action } = req.body;

    const result = await updateProductInCartService(userId, productID, action);
    return res.status(200).json(result);
  } catch (err) {
    console.error(err.message, " : Erreur interne du serveur");
    return res.status(500).json({ error: err.message });
  }
};
