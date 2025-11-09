import express from "express";

const router = express.Router();
router.get("/welcome", (req,res) => {
    res.json({
        sucess:true,
        message: "Welcome to the AMUST!",
    });
});

export default router;