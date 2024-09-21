import { bd } from "../bd.js";

export const insertProduct = (values) => {
  const queryProductPost = `
    INSERT INTO product (title, price, currency, unitNumber, description, available) 
    VALUES (?, ?, ?, ?, ?, ?)
  `;
  return new Promise((resolve, reject) => {
    bd.query(queryProductPost, values, (err, result) => {
      if (err) {
       return  reject(err);
      } 
        resolve(result.insertId);
      
    });
  });
};

export const insertPicture = (productID, picture) => {
  const queryPicture = "INSERT INTO pictureProduct (productID, picture) VALUES (?, ?)";
  return new Promise((resolve, reject) => {
    bd.query(queryPicture, [productID, picture], (err) => {
      if (err) {
       return reject(err);
      } 
        resolve();
      
    });
  });
};

export const insertTypeMachine = (productID, typeMachine) => {
  const queryTypeMachine = "INSERT INTO productByCategorie (productID_type, typeMachine) VALUES (?, ?)";
  return new Promise((resolve, reject) => {
    bd.query(queryTypeMachine, [productID, typeMachine], (err) => {
      if (err) {
       return reject(err);
      } 
        resolve();
      
    });
  });
};

export const insertNameMuscle = (productID, nameMuscle) => {
  const queryNameMuscle = "INSERT INTO productByMuscle (productID_muscle, nameMuscle) VALUES (?, ?)";
  return new Promise((resolve, reject) => {
    bd.query(queryNameMuscle, [productID, nameMuscle], (err) => {
      if (err) {
        return reject(err);
      } 
        resolve();
      
    });
  });
};

export const getAllProducts = () => {
  const queryGetProduct = `
    SELECT
        p.id,
        p.title,
        p.currency,
        p.price,
        p.unitNumber,
        p.description,
        pp.picture,
        pc.typeMachine,
        nm.nameMuscle
    FROM
        product as p
        LEFT JOIN pictureProduct as pp ON p.id = pp.productID
        LEFT JOIN productByCategorie as pc ON p.id = pc.productID_type
        LEFT JOIN productByMuscle as nm ON p.id = nm.productID_muscle
  `;
  return new Promise((resolve, reject) => {
    bd.query(queryGetProduct, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};
