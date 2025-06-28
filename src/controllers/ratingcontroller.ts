import { Express, Request, Response } from "express";
import MovieServices from "@services/movieservices";
import RatingServices from "@services/RatingServices";

export default class RatingController {

    static async GetRatingAndComment(req: Request, res: Response): Promise<any> {
        await RatingServices.GetRatingAndComment(req, res);
    }

    static async postcommentandrating(req: Request, res: Response): Promise<any> {
        await RatingServices.postcommentandrating(req, res);
    }
}