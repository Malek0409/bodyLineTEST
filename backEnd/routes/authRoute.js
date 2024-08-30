import express from "express"
import multer from "multer";
import { verifyUser } from "../helpers/verifyUser.js";
import { verifyCsrfToken } from "../helpers/verifyCsrfToken.js";
import { login, logout, signUp, authUser, updateUser, deactivateUser, verifyEmail } from "../controllers/auth.js";

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });






router.post('/signup', upload.single('profilePicture'), signUp)
router.post("/login", login);
router.get("/user", verifyUser, authUser );
router.get("/logout", logout);
router.put("/updateUser", verifyCsrfToken, updateUser);
router.post("/deactivateUser",verifyCsrfToken, deactivateUser);
router.post("/verify-code",verifyCsrfToken, verifyEmail);


export default router;


