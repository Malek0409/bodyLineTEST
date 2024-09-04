import  jwt  from "jsonwebtoken"
import { bd } from "../bd.js"
import crypto from 'crypto';
import sendConfirmationEmail from "../helpers/sendMail.js";
import { promisify } from 'util';
import bcrypt from "bcrypt"
import csrf from 'csrf';


const csrfProtection = new csrf();
const saltRounds = 10

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,15}$/;

export const signUp = async (req, res) => {
  console.log("start signUP")
    const { firstName, lastName, email, password, confirmPassword } = req.body;
    const picture = req.file ? req.file.buffer : null;
    const type = "USER";
    const actif = "INACTIF"; 
    const code = crypto.randomBytes(3).toString('hex'); 

    if (!firstName || !lastName || !email || !password || !confirmPassword) {
        return res.status(400).json({ Error: "All fields are required" });
    }

    if (password !== confirmPassword) {
        return res.status(400).json({ Error: "Passwords do not match" });
    }

    if (!passwordRegex.test(password)) {
        return res.status(400).json({ Error: "Password must be at least 8 characters long and include at least one lowercase letter, one uppercase letter, and one special character." });
    }

    try {
        const hash = await promisify(bcrypt.hash)(password, saltRounds);
        
      const queryUserPost = "INSERT INTO user (`firstName`, `lastName`, `email`, `password`, `picture`, `type`, `actif`, `confirmationCode`) VALUES(?, ?, ?, ?, ?, ?, ?, ?)";
        const values = [firstName, lastName, email, hash, picture, type, actif, code];

        bd.query(queryUserPost, values, async (err) => {
          if (err) {
                console.log(err);
                return res.status(409).json({ Error: "The email already exists; you need to try a different one." });
            }

            
            await sendConfirmationEmail(email, code);

            return res.status(200).json({ status: "Success", message: "Check your email for the confirmation code." });
        });
    } catch (err) {
        return res.status(500).json({ Error: "Server error" });
    }
};


export const verifyEmail = (req, res) => {
    const { email, code } = req.body;

    const query = "SELECT * FROM user WHERE email = ? AND confirmationCode = ?";
    bd.query(query, [email, code], (err, results) => {
        if (err) return res.status(500).json({ Error: "Server error" });
        if (results.length === 0) return res.status(400).json({ Error: "Invalid code or email" });

        const updateQuery = "UPDATE user SET actif = 'ACTIF', confirmationCode = NULL WHERE email = ?";
        bd.query(updateQuery, [email], (err) => {
            if (err) return res.status(500).json({ Error: "Server error" });

            return res.status(200).json({ status: "Success", message: "Email verified successfully" });
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

export const login = (req, res) => {
  const queryFindEmailForUser = "SELECT * FROM user WHERE email = ?";

  bd.query(queryFindEmailForUser, [req.body.email], (err, data) => {
    if (err) {
      console.error("Login error in server:", err);
      return res.status(500).json({ Error: "Server error during login" });
    }

    if (data.length === 0) {
      return res.status(404).json({ Error: "Email not found" });
    }

    const user = data[0];

    bcrypt.compare(req.body.password.toString(), user.password, (err, isMatch) => {
      if (err) {
        console.error("Password compare error:", err);
        return res.status(500).json({ Error: "Error comparing passwords" });
      }

      if (!isMatch) {
        return res.status(401).json({ Error: "Incorrect password" });
      }

      const csrfToken = csrfProtection.create('csrf-secret-key');
      const token = jwt.sign({ userId: user.id }, "jwt-secret-key", { expiresIn: "1d" });
      
      res.cookie('token', token);
      res.cookie('csrfToken', csrfToken);
      
      console.log("Login successful");
      return res.status(200).json({ status: "Success" });
    });
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