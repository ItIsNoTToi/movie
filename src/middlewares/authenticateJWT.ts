import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { Account } from "@entities/account";

const JWT_SECRET = "chuatecuanhungcaybut"; 

const authenticateJWT = (req: Request, res: Response, next: NextFunction): void => {
    const token = req.cookies?.token;  // Nếu dùng cookie
    //console.log(token);

    if (token) {
        jwt.verify(token, JWT_SECRET, (err: any, decoded: any) => {
            if (err) {
                return res.status(403).json({ message: "Invalid token" });
            }

            next();
        });
    } else {
        res.sendStatus(401);
    }
};

export default authenticateJWT;
