import { Express, Request, Response } from "express";
import { DataSource } from "typeorm";
import { Movie } from "@entities/movie";
import { AppDataSource } from "@config/data-source";
import { Genre } from "@entities/genre";
import GenresServices from "@services/genresservices";

export default class GenresController {
    static async createGenres(req: Request, res: Response): Promise<any> {
        await GenresServices.createGenres(req, res);
    }
    
    static async getGenres(req: Request, res: Response): Promise<any> {
        await GenresServices.getGenres(req, res);
    }
}