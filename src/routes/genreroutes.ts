import GenresController from "@controllers/genrescontroller";
import express, { Request, Response } from "express";

const Routes = express.Router();

Routes.post('/9710010910511011297103101/createGenre', async (req: Request, res: Response) => await GenresController.createGenres(req, res));

Routes.post('/9710010910511011297103101/deleteGenre', async (req: Request, res: Response) => await GenresController.createGenres(req, res));

Routes.get('/9710010910511011297103101/getGenre', async (req: Request, res: Response) => await GenresController.getGenres(req, res));

export default Routes;
