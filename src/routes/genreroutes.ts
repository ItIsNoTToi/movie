import GenresController from "@controllers/genrescontroller";
import express, { Request, Response } from "express";

const Routes = express.Router();

Routes.post('/createGenre', async (req: Request, res: Response) => await GenresController.createGenres(req, res));

export default Routes;
