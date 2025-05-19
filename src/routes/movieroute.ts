import MovieController from "@controllers/moviecontroller";
import express, { Request, Response } from "express";

const Routes = express.Router();

Routes.get('/movie/:id/:episode', async (req: Request, res: Response) => {
    await MovieController.getMovieByIdAndEpisode(req, res);
});

Routes.get('/movie/:id', async (req: Request, res: Response) => {
    await MovieController.getMoviebyId(req, res);
});
  
Routes.get('/movie', async (req: Request, res: Response) => {
    await MovieController.getMovie(req, res);
});



export default Routes;
