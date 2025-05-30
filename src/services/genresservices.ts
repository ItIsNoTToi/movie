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

    static async getGenres(req: Request, res: Response): Promise<any> {
        try {
            const genres = await AppDataSource.getRepository(Genre).find();

            if (genres.length === 0) {
                return res.status(404).json({ message: "No genres found" });
            }

            res.status(200).json({ 
                message: "Genres fetched successfully", 
                data: genres 
            });
        } catch (error) {
            console.error("Error fetching genres:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    }
}