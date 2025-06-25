import { Express, Request, Response } from "express";
import MovieServices from "@services/movieservices";

export default class MovieController {

    static async createMovie(req: Request, res: Response): Promise<any> {
        await MovieServices.createMovie(req, res);
    }

    static async editMovie(req: Request, res: Response): Promise<any> {
        await MovieServices.editMovie(req, res);
    }

    static async editEpisode(req: Request, res: Response): Promise<any> {
        await MovieServices.editEpisode(req, res);
    }

    static async deleteMovie(req: Request, res: Response): Promise<any> {
        await MovieServices.deleteMovie(req, res);
    }

    static async deleteEpisode(req: Request, res: Response): Promise<any> {
        await MovieServices.deleteEpisode(req, res);
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

    static async findmovies(req: Request, res: Response): Promise<any> {
        await MovieServices.findmovies(req, res);
    }

}