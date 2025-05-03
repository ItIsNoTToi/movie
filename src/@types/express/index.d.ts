// src/@types/express/index.d.ts
import { Account } from '@entities/account';

declare global {
    namespace Express {
        interface Request {
            user?: Account;  // Hoặc kiểu người dùng bạn đang sử dụng
        }
    }
}
