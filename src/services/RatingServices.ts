import { Express, Request, Response } from "express";
import MovieServices from "@services/movieservices";
import jwt from "jsonwebtoken";
import { AppDataSource } from "@config/data-source";
import { Movie } from "@entities/movie";
import { Rating } from "@entities/rating";
import { Account } from "@entities/account";

export default class RatingServices {

    static async GetRatingAndComment(req: Request, res: Response): Promise<any> {
        try {
            const idmovie = Number(req.params.idmovie);
            // console.log(idmovie);

            const rating = await AppDataSource.getRepository(Rating).find({
                where: {
                    movie: {
                        id: idmovie
                }},
                relations: ["account"]
            })

            if(rating.length < 0){
                return res.status(404).json({message: "No ratings found"});
            }

            return res.status(200).json({ rating: rating});

        } catch (error) {
            console.log(error);
        }
    }

    static async postcommentandrating(req: Request, res: Response): Promise<any> {
        try {
            const movieId = Number(req.body.movieId);
            const comment = req.body.comment;
            const rating = req.body.rating;
            const user = req.body.user;

            // console.log( movieId, comment, rating, JSON.stringify(user));

            const finduser = await AppDataSource.getRepository(Account).findOne({
                where: { 
                    id: user.id,
                    email: user.email,
                },
            });
            
            if (!finduser) {
                return res.status(404).json({ message: "User not found" });
            }

            const movie = await AppDataSource.getRepository(Movie).findOne({
                where: { id: movieId },
            });

            if(!movie){
                return res.status(404).json({ message: "Movie not found" });
            }

            const rate = new Rating();
            rate.comment = comment;
            rate.rating = rating;
            rate.movie = movie;
            rate.account = finduser;

            await AppDataSource.getRepository(Rating).save(rate);

            const RT = await AppDataSource.getRepository(Rating).find({
                where: {
                    movie: movie
                }
            });
            
            let SUMRT = 0;
            let COUNT = 0;

            for (let i = 0; i < RT.length; i++){
                SUMRT += RT[i].rating;
                COUNT++;
            }

            const MEANRT = SUMRT/COUNT;

            movie.rating = MEANRT;

            await AppDataSource.getRepository(Movie).save(movie);

            return res.status(200).json({ message: "Comment and rating posted successfully" });
            
        } catch (error){
            console.log(error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }

}