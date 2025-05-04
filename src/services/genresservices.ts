import { Express, Request, Response } from "express";
import { DataSource } from "typeorm";
import { Movie } from "@entities/movie";
import { AppDataSource } from "@config/data-source";
import { Genre } from "@entities/genre";

export default class GenresServices {
    static async createGenres(req: Request, res: Response): Promise<any> {
        try {
            const {
                name
            } = req.body;
    
            const newGenres = new Genre();
            newGenres.name = name;
    
            await AppDataSource.getRepository(Genre).save(newGenres);
            res.status(201).json({ message: "Genre created successfully" });
    
        } catch (error) {
            console.error("Error creating movie:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    }
    
}