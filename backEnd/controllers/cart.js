
import { bd } from "../bd.js";


export const addProductToCart = async (req, res) => {
  try {
        
    const userId = [req.userId];
    const getUserCartQuery = `
    SELECT id FROM cart WHERE user_id = ? LIMIT 1;
    `;
    bd.query(getUserCartQuery, [req.userId], (err, cartResult) => {
     

      if (err) {
        console.error(err, " : Erreur de base de données");
        return res.status(500).json({ error: "Erreur de base de données" });
      }

      let cartId;
      if (cartResult.length > 0) {
        cartId = cartResult[0].id;

      } else {
        const createCartQuery = "INSERT INTO cart (`user_id`) VALUES (?)";
        bd.query(createCartQuery, [userId], (err, createResult) => {

          if (err) {
            console.error(err, " : Erreur de base de données");
            return res.status(500).json({ error: "Erreur de base de données" });
          }
          cartId = createResult.insertId;
        });
      }

      const { productID } = req.body; 
      
      
      const getProductQuery = `
        SELECT id, price FROM product WHERE id = ?
      `;
      bd.query(getProductQuery, [productID], (err, productResult) => {
        

        if (err) {
          console.error(err, " : Erreur de base de données");
          return res.status(500).json({ error: "Erreur de base de données" });
        }

        if (productResult.length === 0) {
          return res.status(404).json({ error: "Produit non trouvé" });
        }

        const ProductID = productResult[0].id;
        const priceItem = productResult[0].price;
        const productQuantity = req.body.productQuantity || 1; 

        const checkCartLineQuery = `
          SELECT id FROM cart_line WHERE cart_id = ? AND product_id = ?
        `;
        bd.query(checkCartLineQuery, [cartId, ProductID], (err, cartLineResult) => {
          if (err) {
            console.error(err, " : Erreur de base de données");
            return res.status(500).json({ error: "Erreur de base de données" });
          }

          if (cartLineResult.length > 0) {
            return res.status(200).json({ status: "Produit déjà dans le panier" });
          } else {
            const insertCartLineQuery = `
              INSERT INTO cart_line (cart_id, product_id, quantite, price_item) VALUES (?, ?, ?, ?)
            `;
            bd.query(insertCartLineQuery, [cartId, ProductID, productQuantity, priceItem], (err) => {
              if (err) {
                console.error(err, " : Erreur de base de données");
                return res.status(500).json({ error: "Erreur de base de données" });
              }
              return res.status(200).json({ status: "Item added successfully" });
            });
          }
        });
      });
    });
  } catch (err) {
    console.error(err, " : Erreur interne du serveur");
    return res.status(500).json({ error: "Erreur interne du serveur" });
  }
};




export const getProductToCartLine = async (req, res) => {
  try {
    const getUserCartQuery = `
      SELECT * FROM cart WHERE user_id = ?
    `;
    bd.query(getUserCartQuery, [req.userId], (err, cartResult) => {
      
      if (err) {
        console.error(err, " : Erreur de base de données");
        return res.status(500).json({ error: "Erreur de base de données" });
      }

      if (cartResult.length === 0) {
        return res.status(404).json({ error: "Panier non trouvé" });
      }

      const cartId = cartResult[0].id;

  const getCartLinesQuery = `
  SELECT cl.id, cl.product_id, cl.quantite, p.title, pp.picture, pc.typeMachine, p.price, p.currency
  FROM cart_line cl
  JOIN product p ON cl.product_id = p.id
  JOIN pictureProduct pp ON p.id = pp.productID
  JOIN productByCategorie pc ON p.id = pc.productID_type
  WHERE cl.cart_id = ?
`;

      bd.query(getCartLinesQuery, [cartId], (err, cartLines) => {
        if (err) {
          console.error(err, " : Erreur de base de données");
          return res.status(500).json({ error: "Erreur de base de données" });
        }

        return res.status(200).json({ cartItems: cartLines });
      });
    });
  } catch (err) {
    console.error(err, " : Erreur interne du serveur");
    return res.status(500).json({ error: "Erreur interne du serveur" });
  }
};


export const deleteProductFromCart = async (req, res) => {
  console.log('start for delete')
  try {
   
    const getUserCartQuery = `
      SELECT id FROM cart WHERE user_id = ?
    `;
    bd.query(getUserCartQuery, [req.userId], (err, cartResult) => {
      if (err) {
        console.error(err, " : Erreur de base de données");
        return res.status(500).json({ error: "Erreur de base de données" });
      }

      if (cartResult.length === 0) {
        return res.status(404).json({ error: "Panier non trouvé" });
      }
      

      const cartId = cartResult[0].id;
      const { cartLineId } = req.body;

      const checkCartLineQuery = `
        SELECT * FROM cart_line WHERE cart_id = ? 
      `;

      bd.query(checkCartLineQuery, [cartId, cartLineId], (err, checkResult) => {
        if (err) {
          console.error(err, " : Erreur de base de données lors de la vérification");
          return res.status(500).json({ error: "Erreur de base de données" });
        }
        
        if (checkResult.length === 0) {
          return res.status(404).json({ error: "Produit non trouvé dans le panier" });
        }

        const deleteCartLineQuery = `
          DELETE FROM cart_line WHERE cart_id = ? 
        `;

        bd.query(deleteCartLineQuery, [cartId, cartLineId], (err) => {
          if (err) {
            console.error(err, " : Erreur de base de données lors de la suppression");
            return res.status(500).json({ error: "Erreur de base de données" });
          }

          return res.status(200).json({ status: "Produit supprimé du panier" });
        });
      });
    });
  } catch (err) {
    console.error(err, " : Erreur interne du serveur");
    return res.status(500).json({ error: "Erreur interne du serveur" });
  }
};

export const updateProductToCart = async (req, res) => {
  try {
    const getUserCartQuery = `SELECT id FROM cart WHERE user_id = ?`;
    
    bd.query(getUserCartQuery, [req.userId], (err, cartResult) => {
      if (err) {
        console.error(err, " : Erreur de base de données");
        return res.status(500).json({ error: "Erreur de base de données" });
      }

      let cartId;

      if (cartResult.length > 0) {
        cartId = cartResult[0].id;
      } else {
        const createCartQuery = "INSERT INTO cart (`user_id`) VALUES (?)";
        bd.query(createCartQuery, [req.userId], (err, createResult) => {
          if (err) {
            console.error(err, " : Erreur de base de données");
            return res.status(500).json({ error: "Erreur de base de données" });
          }
          cartId = createResult.insertId;
        });
      }

      const { productID, action } = req.body;

      const checkCartLineQuery = `SELECT id, quantite FROM cart_line WHERE cart_id = ? AND product_id = ?`;

      bd.query(checkCartLineQuery, [cartId, productID], (err, cartLineResult) => {
        if (err) {
          console.error(err, " : Erreur de base de données");
          return res.status(500).json({ error: "Erreur de base de données" });
        }

        if (cartLineResult.length > 0) {
          let newQty;
          if (action === "increment") {
            newQty = cartLineResult[0].quantite + 1;
          } else if (action === "decrement" && cartLineResult[0].quantite > 1) {
            newQty = cartLineResult[0].quantite - 1;
          } else {
            return res.status(400).json({ error: "Quantité invalide" });
          }

          const updateCartLineQuery = `
            UPDATE cart_line SET quantite = ?, price_total = ? * quantite WHERE id = ?
          `;
          bd.query(updateCartLineQuery, [newQty, productID, cartLineResult[0].id], (err) => {
            if (err) {
              console.error(err, " : Erreur de base de données");
              return res.status(500).json({ error: "Erreur de base de données" });
            }
            return res.status(200).json({ status: "Quantité mise à jour" });
          });
        } else {
          const insertCartLineQuery = `
            INSERT INTO cart_line (cart_id, product_id, quantite, price_total) VALUES (?, ?, 1, ?)
          `;
          bd.query(insertCartLineQuery, [cartId, productID, productPrice], (err) => {
            if (err) {
              console.error(err, " : Erreur de base de données");
              return res.status(500).json({ error: "Erreur de base de données" });
            }
            return res.status(200).json({ status: "Produit ajouté avec succès" });
          });
        }
      });
    });
  } catch (err) {
    console.error(err, " : Erreur interne du serveur");
    return res.status(500).json({ error: "Erreur interne du serveur" });
  }
};


