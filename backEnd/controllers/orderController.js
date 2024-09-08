
import { bd } from "../bd.js";


export const addOrder = async (req, res) => {
  try {
    const getUserCartQuery = `
      SELECT id FROM cart WHERE user_id = ?
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
        bd.query(createCartQuery, [req.userId], (err, createResult) => {
          if (err) {
            console.error(err, " : Erreur de base de données");
            return res.status(500).json({ error: "Erreur de base de données" });
          }
          cartId = createResult.insertId;
        });
      }

      const { productID } = req.body;

      const checkCartLineQuery = `
        SELECT id FROM cart_line WHERE cart_id = ? AND product_id = ?
      `;

      bd.query(checkCartLineQuery, [cartId, productID], (err, cartLineResult) => {
        if (err) {
          console.error(err, " : Erreur de base de données");
          return res.status(500).json({ error: "Erreur de base de données" });
        }

        if (cartLineResult.length > 0) {
          return res.status(200).json({ status: "Produit déjà dans le panier" });
        } else {
          const insertCartLineQuery = `
            INSERT INTO cart_line (cart_id, product_id, quantite) VALUES (?, ?, 1)
          `;
          bd.query(insertCartLineQuery, [cartId, productID], (err) => {
            if (err) {
              console.error(err, " : Erreur de base de données");
              return res.status(500).json({ error: "Erreur de base de données" });
            }
            return res.status(200).json({ status: "Succès" });
          });
        }
      });
    });
  } catch (err) {
    console.error(err, " : Erreur interne du serveur");
    return res.status(500).json({ error: "Erreur interne du serveur" });
  }
};
