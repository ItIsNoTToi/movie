import AccountServices from "@services/accountservices";
import { AppDataSource } from "@config/data-source";
import express, { Request, Response } from "express";
import { Account } from "@entities/account";

export default class AdminServices {

    static accountrepo = AppDataSource.getRepository(Account);

    static async AdminPage(req: Request, res: Response): Promise<any> {
        try {
            
        } catch (error) {
            
        }
    }

    static async getAccount(req: Request, res: Response): Promise<any> {
        try {
            const accounts = await this.accountrepo.find({
                relations: ['admin']
            });

            if(!accounts){
                return res.status(400).json({ message: "can't find account"});
            }

            const result = accounts.map(({ password, ...rest }) => rest);
            return res.status(200).json({ account: result });
        } catch (error) {
            console.log(error);
        }
    }

    static async blockAccount(req: Request, res: Response): Promise<any> {
        try {
            const { id } = req.body;

            const account = await this.accountrepo.findOne({
                where: { id }
            });

            if (!account) {
                return res.status(400).json({ message: "Can't find account" });
            }

            // Đảo ngược trạng thái kích hoạt (block/unblock)
            account.isActived = !account.isActived;

            // Lưu lại thay đổi
            await this.accountrepo.save(account);

            return res.status(200).json({ 
                message: `Account has been ${account.isActived ? 'unblocked' : 'blocked'}.`,
                account 
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }

    static async deleteAccount(req: Request, res: Response): Promise<any> {
        try {
            const id = Number(req.params.id);

            const account = await this.accountrepo.findOne({ where: { id: id } });

            if (!account) {
                return res.status(400).json({ message: "Account not found" });
            }

            await this.accountrepo.remove(account);
            return res.status(200).json({ message: "Account deleted successfully" });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }

}