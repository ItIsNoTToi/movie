import { Express, Request, Response } from "express";
import MovieServices from "@services/movieservices";

export default class MovieController {
    static async createMovie(req: Request, res: Response): Promise<any> {
        await MovieServices.createMovie(req, res);
    }
}