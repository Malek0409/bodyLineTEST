import  jwt  from "jsonwebtoken"
import bcrypt from "bcrypt"
import { bd } from "../bd.js"

 

const saltRounds = 10

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,15}$/;


export const signUp = (req, res) => {
 
  const { firstName, lastName, email, password, confirmPassword } = req.body;
  const picture = req.file ? req.file.buffer : null;
  const type = "USER";
  const actif = "ACTIF";

  if (!firstName || !lastName || !email || !password || !confirmPassword) {
    return res.status(400).json({ Error: "All fields are required" });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ Error: "Passwords do not match" });
  }

  if (!passwordRegex.test(password)) {
    return res.status(400).json({ Error: "Password must be at least 8 characters long and include at least one lowercase letter, one uppercase letter, and one special character." });
  }


  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) return res.status(500).json({ Error: "Error hashing password" });

     const queryUserPost = "INSERT INTO user (`firstName`, `lastName`, `email`, `password`, `picture`, `type`, `actif`) VALUES (?, ?, ?, ?, ?, ?, ?)";
    const values = [firstName, lastName, email, hash, picture, type, actif];

      bd.query(queryUserPost, values, (err) => {
        
      if (err) {
        console.log(err);
        return res.status(409).json({ Error: "The email already exists; you need to try a different one." });
      }

      return res.status(200).json({ status: "Success" });
    });
  });
};

export const updateUser = (req, res) => {
  console.log("start update user !!!!")
  const { firstName, lastName, email, password, confirmPassword } = req.body;
  const picture = req.file ? req.file.buffer : null;
  const userId = req.userId; 
  console.log(req.body)
  
  if (firstName === "" || lastName === "" || email === "") {
    console.log("First Name, Last Name, and Email are required.");
    return res.status(400).json({ Error: "First Name, Last Name, and Email are required." });
  }

  if (password && confirmPassword) {
    if (password !== confirmPassword) {
      return res.status(400).json({ Error: "Passwords do not match." });
    }

    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        Error: "Password must be at least 8 characters long and include at least one lowercase letter, one uppercase letter, and one special character.",
      });
    }

    bcrypt.hash(password, saltRounds, (err, hash) => {
      if (err) return res.status(500).json({ Error: "Error hashing password" });

      const queryUpdateUser = `
        UPDATE user 
        SET firstName = ?, lastName = ?, email = ?, password = ?, picture = ? 
        WHERE id = ?`;
      const values = [firstName, lastName, email, hash, picture, userId];

      bd.query(queryUpdateUser, values, (err) => {
        if (err) {
          console.log(err);
          return res.status(500).json({ Error: "Error updating user information" });
        }

        return res.status(200).json({
          status: "Success",
          firstName,
          lastName,
          email,
          picture
        });
      });
    });
  } else {
    const queryUpdateUser = `
      UPDATE user 
      SET firstName = ?, lastName = ?, email = ?, picture = ? 
      WHERE id = ?`;
    const values = [firstName, lastName, email, picture, userId];

    bd.query(queryUpdateUser, values, (err) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ Error: "Error updating user information" });
      }

      return res.status(200).json({
        status: "Success",
        firstName,
        lastName,
        email,
        picture
      });
    });
  }
};
export const deactivateUser = (req, res) => {
  const userId = req.userId; 

  const queryDeactivateUser = `UPDATE user SET actif = 'INACTIF' WHERE id = ?`;
  bd.query(queryDeactivateUser, [userId], (err) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ Error: "Error deactivating user account" });
    }

    return res.status(200).json({ status: "Account deactivated successfully" });
  });
};

export const login =  (req, res) => {

  const queryFindEmailForUser = "SELECT * FROM user WHERE email = ?";
  bd.query(queryFindEmailForUser, [req.body.email], (err, data) => {
    if (err) {
      console.error("Login error in server: ", err);
      return res.status(500).json({ Error: "Login error in server" });
    }
    if (data.length > 0) {
      bcrypt.compare(req.body.password.toString(), data[0].password, (err, response) => {
        if (err) {
          console.error("Password compare error: ", err);
          return res.status(500).json({ Error: "Password compare error" });
        }

        if (response) {
          const { id } = data[0];
          const token = jwt.sign({ userId: id }, "jwt-secret-key", { expiresIn: "1d" });
          res.cookie('token', token);
          console.log("Login successfully");
          return res.status(200).json({ status: "Success" });
        } else {
          return res.status(401).json({ Error: "Password not matched" });
        }
      });
    } else {
      return res.status(404).json({ Error: "No email existed" });
    }
    console.log("Success")
  });
};

export const authUser = (req, res) => {
   if (!req.userId) {
        return res.status(401).json({ Error: "Unauthorized" });
    }
    const sql = `
        SELECT 
            u.firstName, 
            u.lastName, 
            u.email,
            u.picture,
            u.type
        FROM 
            user u 
        WHERE 
            u.id = ?
    `;
    
    bd.query(sql, [req.userId], (err, result) => {
        if (err) {
          console.error(err) 
          return res.status(500).json({ Error: "Error fetching user data" });
        }
        if (result.length > 0) {
            const user = result[0];
            const picture = user.picture ? user.picture.toString('base64') : null;
          
            return res.status(200).json({ 
                status: "Success", 
                firstName: user.firstName, 
                lastName: user.lastName, 
                email: user.email, 
                type: user.type,
                picture, 
                 
            });
        } else {
            return res.status(404).json({ Error: "User not found" });
        }
    });
};

export const logout = (req, res) => {
    res.clearCookie("token");
    return res.json({ status: "Success"});
}