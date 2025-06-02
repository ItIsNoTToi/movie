import AdminController from "@controllers/admincontroller";
import MovieController from "@controllers/moviecontroller";
import express, { Request, Response } from "express";

const Routes = express.Router();

Routes.get('/9710010910511011297103101/account', async (req: Request, res: Response) => await AdminController.getAccount(req, res));

Routes.post('/9710010910511011297103101/block', async (req: Request, res: Response) => await AdminController.blockAccount(req, res));

Routes.delete('/9710010910511011297103101/deleteAccount/:id', async (req: Request, res: Response) => await AdminController.deleteAccount(req, res));

export default Routes;
