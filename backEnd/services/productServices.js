import { 
  insertProduct, 
  insertPicture, 
  insertTypeMachine, 
  insertNameMuscle,
  getAllProducts 
} from "../model/productModel.js";

export const createProduct = async ({ title, price, currency, unitNumber, description, typeMachine,
  nameMuscle, picture }) => {
  const available = "AVAILABLE";

  if (!title || !price || !currency || !unitNumber || !description) {
    throw new Error("All fields are required");
  }

  const productID = await insertProduct([title, price, currency, unitNumber, description, available]);

  if (picture) {
    await insertPicture(productID, picture);
  }

  if (typeMachine) {
    await insertTypeMachine(productID, typeMachine);
  }

  if (nameMuscle) {
    await insertNameMuscle(productID, nameMuscle);
  }

  return productID;
};

export const fetchAllProducts = async () => {
  const products = await getAllProducts();
  return products.map(product => ({
    id: product.id,
    title: product.title,
    price: product.price,
    currency: product.currency,
    unitNumber: product.unitNumber,
    description: product.description,
    picture: product.picture ? product.picture.toString('base64') : null,
    typeMachine: product.typeMachine,
    nameMuscle: product.nameMuscle
  }));
};
