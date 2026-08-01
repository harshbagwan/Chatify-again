import express from "express";
import { signup, login, logout,updateProfile } from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";
import { arcjetProtection } from "../middleware/arcjet.middleware.js";
const router = express.Router();

// router.get("/test", arcjetProtection, (req,res)=>{
//     res.status(200).json({message:"Test route"});
// });
// router.post("/signup",arcjetProtection, signup);
// router.post("/login",arcjetProtection, login);
// router.post("/logout",arcjetProtection, logout);
// router.put("/update-profile",arcjetProtection, protectRoute ,updateProfile);
// router.get("/check",arcjetProtection, protectRoute, (req,res) => res.status(200).json(req.user));

router.use(arcjetProtection); // Apply Arcjet protection to all routes in this router

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.put("/update-profile", protectRoute ,updateProfile);
router.get("/check", protectRoute, (req,res) => res.status(200).json(req.user));

export default router;