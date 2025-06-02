import AccountServices from "@services/accountservices";
import { AppDataSource } from "@config/data-source";
import express, { Request, Response } from "express";
import AdminServices from "@services/adminservices";

export default class AdminController {
    static async AdminPage(req: Request, res: Response): Promise<any> {
        try {
            
        } catch (error) {
            
        }
    }


    static async getAccount(req: Request, res: Response): Promise<any> {
        await AdminServices.getAccount(req, res);
    }


    static async blockAccount(req: Request, res: Response): Promise<any> {
        try {
            await AdminServices.blockAccount(req, res);
        } catch (error) {
            
        }
    }

    static async deleteAccount(req: Request, res: Response): Promise<any> {
        try {
            await AdminServices.deleteAccount(req, res);
        } catch (error) {
            
        }
    }

}