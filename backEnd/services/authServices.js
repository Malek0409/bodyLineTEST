import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import csrf from "csrf";
import sendConfirmationEmail from "../helpers/sendMail.js";
import { promisify } from "util";

const saltRounds = 10;
const csrfProtection = new csrf();

export const hashPassword = async (password) => {
    return await promisify(bcrypt.hash)(password, saltRounds);
};

export const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

export const generateConfirmationCode = () => {
    return crypto.randomBytes(3).toString("hex");
};

export const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,15}$/;
    return passwordRegex.test(password);
};

export const sendConfirmation = async (email, code) => {
    await sendConfirmationEmail(email, code);
};
export const comparePasswords = (password, hash, callback) => {
    bcrypt.compare(password.toString(), hash, callback);
};

export const generateTokens = (userId) => {
    const csrfToken = csrfProtection.create("csrf-secret-key");
    const token = jwt.sign({ userId: userId }, "jwt-secret-key", { expiresIn: "1d" });
    return { token, csrfToken };
};
