import { bd } from "../bd.js";

// Obtenir le panier d'un utilisateur
export const getUserCart = (userId) => {
  const getUserCartQuery = `SELECT id FROM cart WHERE user_id = ? LIMIT 1;`;
  return new Promise((resolve, reject) => {
    bd.query(getUserCartQuery, [userId], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

// Créer un nouveau panier pour l'utilisateur
export const createCart = (userId) => {
  const createCartQuery = "INSERT INTO cart (`user_id`) VALUES (?)";
  return new Promise((resolve, reject) => {
    bd.query(createCartQuery, [userId], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result.insertId);
      }
    });
  });
};

// Obtenir un produit par ID
export const getProductById = (productID) => {
  const getProductQuery = `SELECT id, price FROM product WHERE id = ?`;
  return new Promise((resolve, reject) => {
    bd.query(getProductQuery, [productID], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

// Vérifier si une ligne de panier existe déjà pour un produit donné
export const checkCartLine = (cartId, productID) => {
  const checkCartLineQuery = `SELECT id FROM cart_line WHERE cart_id = ? AND product_id = ?`;
  return new Promise((resolve, reject) => {
    bd.query(checkCartLineQuery, [cartId, productID], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

// Ajouter une ligne au panier
export const insertCartLine = (cartId, productID, quantity, priceItem) => {
  const insertCartLineQuery = `
    INSERT INTO cart_line (cart_id, product_id, quantite, price_item) VALUES (?, ?, ?, ?)
  `;
  return new Promise((resolve, reject) => {
    bd.query(insertCartLineQuery, [cartId, productID, quantity, priceItem], (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};

// Obtenir les lignes de panier pour un panier donné
export const getCartLines = (cartId) => {
  const getCartLinesQuery = `
    SELECT cl.id, cl.product_id, cl.quantite, p.title, pp.picture, pc.typeMachine, p.price, p.currency
    FROM cart_line cl
    JOIN product p ON cl.product_id = p.id
    JOIN pictureProduct pp ON p.id = pp.productID
    JOIN productByCategorie pc ON p.id = pc.productID_type
    WHERE cl.cart_id = ?
  `;
  return new Promise((resolve, reject) => {
    bd.query(getCartLinesQuery, [cartId], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

// Supprimer une ligne du panier
export const deleteCartLine = (cartId, cartLineId) => {
  const deleteCartLineQuery = `DELETE FROM cart_line WHERE cart_id = ? AND id = ?`;
  return new Promise((resolve, reject) => {
    bd.query(deleteCartLineQuery, [cartId, cartLineId], (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};

// Mettre à jour la quantité d'un produit dans le panier
export const updateCartLine = (cartLineId, quantity, priceItem) => {
  const updateCartLineQuery = `
    UPDATE cart_line SET quantite = ?, price_total = ? * quantite WHERE id = ?
  `;
  return new Promise((resolve, reject) => {
    bd.query(updateCartLineQuery, [quantity, priceItem, cartLineId], (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};
