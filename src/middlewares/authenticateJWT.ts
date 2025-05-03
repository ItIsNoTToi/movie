import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { Account } from "@entities/account";

// Mở rộng kiểu Request
interface AuthenticatedRequest extends Request {
    user?: Account;
}

// Lấy giá trị `JWT_SECRET` từ environment hoặc sử dụng giá trị mặc định
const JWT_SECRET = process.env.JWT_SECRET || 'chuatecuanhungcaybut';  // Giá trị mặc định

const authenticateJWT = (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
    //const token = req.header("Authorization")?.split(" ")[1];  // Lấy token từ header

    const token = req.cookies.token;

    //console.log(token);

    jwt.verify(token!, JWT_SECRET, (err: any) => {
        if (err) {
            return res.status(403).json({ message: "Invalid token" });  // Trả về phản hồi và dừng middleware
        }

        // req.user = user as Account;  // Lưu thông tin người dùng vào request
        next();  // Chuyển tới route handler tiếp theo
    });
};

export default authenticateJWT;
