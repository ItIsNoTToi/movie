import { Express, Request, Response } from "express";
import MovieServices from "@services/movieservices";

export default class MovieController {
    static async createMovie(req: Request, res: Response): Promise<any> {
        await MovieServices.createMovie(req, res);
    }

    static async createEpisode(req: Request, res: Response): Promise<any> {
        await MovieServices.createEpisode(req, res);
    }

    static async getMovieByIdAndEpisode(req: Request, res: Response): Promise<any> {
        await MovieServices.getMovieByIdAndEpisode(req, res);
    }

    static async getMoviebyId(req: Request, res: Response): Promise<any> {
        await MovieServices.getMoviebyId(req, res);
    }

    static async getMovie(req: Request, res: Response): Promise<any> {
        await MovieServices.getMovie(req, res);
    }
}