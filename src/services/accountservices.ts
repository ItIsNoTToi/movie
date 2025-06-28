import express, { Request, Response } from "express";
import { Account } from "@entities/account";
import { AppDataSource } from "@config/data-source";
import { genSalt, hash, compare } from "bcrypt-ts";
import jwt from "jsonwebtoken";
import { Admin } from "@entities/admin";
import { Role } from "@entities/admin";
import { DetailAccount } from "@entities/detailaccount";


export default class AccountServices {
    // Tạo tài khoản mới
    static async createAccount(req: Request, res: Response) {
        try {
            const { username, email, password } = req.body;

            const accountRepo = AppDataSource.getRepository(Account);

            const existing = await accountRepo.findOneBy({ email });
            if (existing) {
                return res.status(400).json({ message: "Email already registered" });
            }

            const salt = await genSalt(10);
            const hashedPassword = await hash(password, salt);

            const newAccount = new Account();
            newAccount.username = username;
            newAccount.email = email;
            newAccount.password = hashedPassword;
            newAccount.createdAt = new Date();
            newAccount.updatedAt = new Date();
            
            await accountRepo.save(newAccount);

            const newRole = new Admin();
            newRole.account = newAccount;
            newRole.role = Role.User;

            await AppDataSource.getRepository(Admin).save(newRole);

            return res.status(201).json({
                message: "Account created successfully",
                account: {
                    id: newAccount.id,
                    username: newAccount.username,
                    email: newAccount.email
                }
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Server error", error });
        }
    }

    // Đăng nhập và tạo JWT
    static async Login(req: Request, res: Response) {
        try {
            const { email, password } = req.body;

            const accountRepo = AppDataSource.getRepository(Account);
            const account = await accountRepo.findOneBy({ email });

            if (!account) {
                return res.status(400).json({ message: "Invalid email or password" });
            }

            // Kiểm tra mật khẩu
            const isPasswordValid = await compare(password, account.password!);
            if (!isPasswordValid) {
                return res.status(404).json({ message: "Invalid email or password" });
            }

            // console.log(JSON.stringify(account));

            const role = await AppDataSource.getRepository(Admin).findOne({
                where:{
                    account: account
                }
            })

            if(!role){
                return res.status(404).json({ message: "Account don't have role" });
            }

            // Tạo JWT token
            const token = jwt.sign(
                { id: account.id, email: account.email, username: account.username },
                process.env.JWT_SECRET_1 as string,
                { expiresIn: "1h" }
            );
    
            res.cookie("token", token, {
                httpOnly: true,     // Bảo vệ khỏi XSS
                secure: false,      // Chỉ đặt true nếu dùng HTTPS (local thì để false)
                sameSite: "lax", // Ngăn CSRF (optional)
                maxAge: 3600000 * 24 * 7,    // Hết hạn sau 1h
            });

            return res.status(200).json({
                message: "Login successful",
                token: token,
                role: role.role,
                user: {
                    id: account.id,
                    username: account.username,
                    email: account.email
                }
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Server error", error });
        }
    }

    static async UpdateInformation(req: Request, res: Response){

    }

    static async logout(req: Request, res: Response) {
        try {
            // Xóa cookie chứa token
            res.clearCookie("token", {
                httpOnly: true,
                secure: false,      // true nếu dùng HTTPS
                sameSite: "lax", // nếu bạn có cấu hình SameSite
            });
        
    
            return res.status(200).json({ message: "Logout successful" });
        } catch (error) {
            console.error("Logout error:", error);
            return res.status(500).json({ message: "Server error" });
        }
    }
}
