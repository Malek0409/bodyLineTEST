import { findUserByEmail, createUser, verifyUserEmail, activateUser, findUserById } from "../model/authModel.js";
import { hashPassword, comparePasswords, generateTokens, generateConfirmationCode, validatePassword, sendConfirmation } from "../services/authServices.js";

export const signUp = async (req, res) => {
    const { firstName, lastName, email, password, confirmPassword } = req.body;
    const picture = req.file ? req.file.buffer : null;
    const type = "USER";
    const actif = "INACTIF";
    const code = generateConfirmationCode();

    if (!firstName || !lastName || !email || !password || !confirmPassword) {
        return res.status(400).json({ Error: "All fields are required" });
    }

    if (password !== confirmPassword) {
        return res.status(400).json({ Error: "Passwords do not match" });
    }

    if (!validatePassword(password)) {
        return res.status(400).json({ Error: "Password must be at least 8 characters long and include at least one lowercase letter, one uppercase letter, and one special character." });
    }

    try {
        const hashedPassword = await hashPassword(password);
        const newUser = { firstName, lastName, email, password: hashedPassword, picture, type, actif, confirmationCode: code };

        createUser(newUser, async (err) => {
            if (err) {
                return res.status(409).json({ Error: "The email already exists; you need to try a different one." });
            }
            await sendConfirmation(email, code);
            return res.status(200).json({ status: "Success", message: "Check your email for the confirmation code." });
        });
    } catch (err) {
        return res.status(500).json({ Error: "Server error" });
    }
};

export const verifyEmail = (req, res) => {
    const { email, code } = req.body;
    verifyUserEmail(email, code, (err, results) => {
        if (err) return res.status(500).json({ Error: "Server error" });
        if (results.length === 0) return res.status(400).json({ Error: "Invalid code or email" });

        activateUser(email, (err) => {
            if (err) return res.status(500).json({ Error: "Server error" });
            return res.status(200).json({ status: "Success", message: "Email verified successfully" });
        });
    });
};



export const login = (req, res) => {
    findUserByEmail(req.body.email, (err, data) => {
        if (err) return res.status(500).json({ Error: "Server error during login" });
        if (data.length === 0) return res.status(404).json({ Error: "Email not found" });

        const user = data[0];
        comparePasswords(req.body.password, user.password, (err, isMatch) => {
            if (err) return res.status(500).json({ Error: "Error comparing passwords" });
            if (!isMatch) return res.status(401).json({ Error: "Incorrect password" });

            const { token, csrfToken } = generateTokens(user.id);
            res.cookie("token", token);
            res.cookie("csrfToken", csrfToken);
            return res.status(200).json({ status: "Success" });
        });
    });
};

export const authUser = (req, res) => {
    findUserById(req.userId, (err, result) => {
        if (err) return res.status(500).json({ Error: "Error fetching user data" });
        if (result.length === 0) return res.status(404).json({ Error: "User not found" });

        const user = result[0];
        const picture = user.picture ? user.picture.toString("base64") : null;
        return res.status(200).json({ status: "Success", firstName: user.firstName, lastName: user.lastName, email: user.email, type: user.type, picture });
    });
};

export const logout = (req, res) => {
    res.clearCookie("token");
    return res.json({ status: "Success" });
};
