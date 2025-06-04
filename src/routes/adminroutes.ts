import AdminController from "@controllers/admincontroller";
import MovieController from "@controllers/moviecontroller";
import express, { Request, Response } from "express";

const Routes = express.Router();

Routes.get('/9710010910511011297103101', async (req: Request, res: Response) => await AdminController.AdminPage(req, res));

Routes.post('/9710010910511011297103101/createMovie', async (req: Request, res: Response) => await MovieController.createMovie(req, res));

Routes.post('/9710010910511011297103101/editMovie', async (req: Request, res: Response) => await MovieController.editMovie(req, res));

Routes.delete('/9710010910511011297103101/deleteMovie/:id', async (req: Request, res: Response) => await MovieController.deleteMovie(req, res));

Routes.post('/9710010910511011297103101/createEpisode', async (req: Request, res: Response) => await MovieController.createEpisode(req, res));

Routes.delete('/9710010910511011297103101/:movieId/:epId', async (req: Request, res: Response) => await MovieController.deleteEpisode(req, res));

export default Routes;
