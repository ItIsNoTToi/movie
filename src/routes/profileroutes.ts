import express, { Router, Request, Response } from "express";
import authenticateJWT from "@middlewares/authenticateJWT"; // Import middleware của bạn
import { Account } from "@entities/account";

const router = express.Router();

// Route để lấy thông tin profile của người dùng
router.get('/profile', authenticateJWT, (req: Request, res: Response): any => {

    res.status(200).json({ message: 'This is your profile' });
});


export default router;
