import express from "express"
import multer from "multer";
import { verifyUser } from "../helpers/verifyUser.js";
import { login, logout, signUp, authUser, verifyEmail } from "../controllers/authController.js";

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });






router.post('/signup', upload.single('profilePicture'), signUp)
router.post("/login", login);
router.get("/user", verifyUser, authUser );
router.get("/logout", logout);
router.post("/verify-code", verifyEmail);


export default router;


