import express, { Request, Response } from "express";
import AccountServices from "@services/accountservices";
import AccountController from "@controllers/accountcontroller";

const Routes = express.Router();

// Đăng ký tài khoản
Routes.post('/register', async (req: Request, res: Response) => await AccountController.Register(req, res));

// Đăng nhập
Routes.post('/login', async (req: Request, res: Response) => await AccountController.Login(req, res));

export default Routes;
