import AccountServices from "@services/accountservices";
import { AppDataSource } from "@config/data-source";
import express, { Request, Response } from "express";

export default class AccountController {
    static async Register(req: Request, res: Response) {
        await AccountServices.createAccount(req, res);
    }

    static async Login(req: Request, res: Response) {
        await AccountServices.Login(req, res);
    }

}