import { Express, Request, Response } from "express";
import MovieServices from "@services/movieservices";

export default class RatingServices {

    static async GetRatingAndComment(req: Request, res: Response): Promise<any> {
        try {
            const idmovie = Number(req.params.idmovie);
            console.log(idmovie);
        } catch (error) {
            console.log(error);
        }
    }

}