import { bd } from "../bd.js"


export const addProduct = async (req, res) => {
  try {
    const { title, price, currency, unitNumber, description, typeMachine, nameMuscle } = req.body;
    const picture = req.file ? req.file.buffer : null;
    const available = "AVAILABLE"

    if (!title || !price || !currency || !unitNumber || !description) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const queryProductPost = "INSERT INTO product (`title`, `price`, `currency`, `unitNumber`, `description`, `available`) VALUES (?, ?, ?, ?, ?, ?)";
    const values = [title, price, currency, unitNumber, description, available];

    bd.query(queryProductPost, values, async (err, result) => {
      if (err) {
        console.error(err, " : Database error");
        return res.status(500).json({ error: "Database error" });
      }

      const productID = result.insertId;
      const productID_type = result.insertId;
      const productID_muscle = result.insertId;


      if (picture) {
        const queryPicture = "INSERT INTO pictureProduct (`productID`, `picture`) VALUES (?, ?)";
         bd.query(queryPicture, [productID, picture], (err) => {
          if (err) {
            console.error(err, " : Error inserting image data");
            return res.status(500).json({ error: "Error inserting image data" });
          }
        });
      }

      
        const queryTypeMachine = "INSERT INTO productByCategorie (`productID_type`, `typeMachine`) VALUES (?, ?)";
        bd.query(queryTypeMachine, [productID_type, typeMachine], (err) => {
          if (err) {
            console.error(err, " : Error inserting typeMachine data");
            return res.status(500).json({ error: "Error inserting typeMachine data" });
          }
        });
      
if (nameMuscle) {
        const queryNameMuscle = "INSERT INTO productByMuscle (`productID_muscle`, `nameMuscle`) VALUES (?, ?)";
        bd.query(queryNameMuscle, [productID_muscle, nameMuscle], (err) => {
            if (err) {
                console.error(err, " : Error inserting muscle data");
                return res.status(500).json({ error: "Error inserting muscle data" });
            }
        });
   
}

      return res.status(200).json({ status: "Success" });
    });
  } catch (err) {
    console.error(err, " : Internal server error");
    return res.status(500).json({ error: "Internal server error" });
  }
};

  

export const getProduct = async (req, res) => {
  try {
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

    bd.query(queryGetProduct,[req], (err, result) => {
      if (err) {
        console.error(err, " : Database error");
        return res.status(500).json({ error: "Error fetching product data" });
      }

      if (result.length > 0) {
        const products = result.map(product => ({
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
        return res.status(200).json({ status: "Success", products });
      } else {
        return res.status(404).json({ error: "No products found" });
      }
    });
  } catch (err) {
    console.error(err, " : Internal server error");
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const updateProduct = async (req, res) => {
  console.log("ready for update")
  try {
    const { price, unitNumber, id } = req.body;

    if (price === "" || unitNumber === "" || id === "") {
        console.log("All fields are required" )

      return res.status(400).json({ error: "All fields are required" });
    }

    const queryUpdate = "UPDATE product SET price = ?, unitNumber = ? WHERE id = ?";
    const values = [price, unitNumber, id];

    bd.query(queryUpdate, values, (err, result) => {
      if (err) {
        console.error(err, " : Database error");
        return res.status(500).json({ error: "Database error" });
      }

      return res.status(200).json({ status: "Success" });
    });
  } catch (err) {
    console.error(err, " : Internal server error");
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const getProductByRand = async (req, res) => {
  
  try {
    const queryGetProductByRand = `
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
      ORDER BY RAND()
      LIMIT 4
     
    `;
    
    bd.query(queryGetProductByRand, [req], (err, result) => {
      
      if (err) {
        console.error(err, " : Database error");
        return res.status(500).json({ error: "Error fetching product by rand data" });
      }

      if (result.length > 0) {
        const product = result[0];
        const picture = product.picture ? product.picture.toString('base64') : null;
        const typeMachine = product.typeMachine;
        const nameMuscle = product.nameMuscle;
        return res.status(200).json({ 
          status: "Success",
          id: product.id,
          title: product.title,
          price: product.price,
          currency: product.currency,
          description: product.description,
          picture,
          typeMachine,
          nameMuscle
        });
      } else {
        return res.status(404).json({ Error: "product by rand not found" });      }
  
      
    });
  } catch (err) {
    console.error(err, " : Internal server error");
    return res.status(500).json({ error: "Internal server error" });
  }
};






