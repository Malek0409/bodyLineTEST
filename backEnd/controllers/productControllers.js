import { createProduct, fetchAllProducts } from "../services/productServices.js";

export const addProduct = async (req, res) => {
  try {
    const { title, price, currency, unitNumber, description, typeMachine, nameMuscle } = req.body;
    const picture = req.file ? req.file.buffer : null;

    const productID = await createProduct({
      title, price, currency, unitNumber, description,
      typeMachine, nameMuscle, picture
    });

    return res.status(200).json({ status: "Success", productID });
  } catch (err) {
    console.error(err, " : Error creating product");
    if (err.message === "All fields are required") {
      return res.status(400).json({ error: err.message });
    } else {
      return res.status(500).json({ error: "Internal server error" });
    }
  }
};

export const getProduct = async (req, res) => {
  try {
    const products = await fetchAllProducts();

    if (products.length > 0) {
      return res.status(200).json({ status: "Success", products });
    } else {
      return res.status(404).json({ error: "No products found" });
    }
  } catch (err) {
    console.error(err, " : Internal server error");
    return res.status(500).json({ error: "Internal server error" });
  }
};
