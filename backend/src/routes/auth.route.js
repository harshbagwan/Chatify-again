import express from "express";

const router = express.Router();

router.get("/api/auth/signup",(req,res)=>{
    res.send("Signup endpoint");
})
router.get("/api/auth/login",(req,res)=>{
    res.send("login endpoint");
})
router.get("/api/auth/logout",(req,res)=>{
    res.send("logout endpoint");
})

export default router;