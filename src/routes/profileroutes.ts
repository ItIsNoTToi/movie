import express, { Router, Request, Response } from "express";
import authenticateJWT from "@middlewares/authenticateJWT"; // Import middleware của bạn
import { Account } from "@entities/account";
import jwt from "jsonwebtoken";
import { AppDataSource } from "@config/data-source";
import { Admin } from "@entities/admin";

const router = express.Router();

// Route để lấy thông tin profile của người dùng
router.get('/profile', authenticateJWT, async (req: Request, res: Response): Promise<any> => {
    try {
        const JWT_SECRET = process.env.JWT_SECRET!;
        const token = req.cookies?.token;

        if (!token) {
            return res.status(200).json({ user: null });
        }

        const decoded = jwt.verify(token, JWT_SECRET) as { id: number; email?: string };

        if (!decoded || !decoded.id) {
            return res.status(400).json({ message: "Can't verify JWT" });
        }

        const user = await AppDataSource.getRepository(Account).findOne({
            where: { 
                id: decoded.id,
                email: decoded.email,
            },
            relations: ['detailAccount', 'admin'], // Nạp thêm quan hệ nếu cần
        });
        
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        
        const userrole = await AppDataSource.getRepository(Admin).findOne({
            where:{
                account: user,
            }
        });

         if (!userrole) {
            return res.status(404).json({ message: "User don't have role" });
        }

        return res.status(200).json({
            user: user,
            userrole: userrole.role,
        });

    } catch (error) {
        console.error(error instanceof Error ? error.message : error);
        return res.status(500).json({ message: "Internal server error" });
    }
});


export default router;
