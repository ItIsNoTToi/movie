import MovieController from "@controllers/moviecontroller";
import express, { Request, Response } from "express";

const Routes = express.Router();

Routes.post('/createMovie', async (req: Request, res: Response) => await MovieController.createMovie(req, res));

export default Routes;
