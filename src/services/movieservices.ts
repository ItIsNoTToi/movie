import { Express, Request, Response } from "express";
import { DataSource } from "typeorm";
import { Movie } from "@entities/movie";
import { AppDataSource } from "@config/data-source";
import { Genre } from "@entities/genre";

export default class MovieServices {
    static async createMovie(req: Request, res: Response): Promise<any> {
        try {
            const {
                title, description, releaseDate, director,
                duration, language, posterUrl, rating, isActive, genres
            } = req.body;
    
            const newMovie = new Movie();
            newMovie.title = title;
            newMovie.description = description;
            newMovie.releaseDate = releaseDate;
            newMovie.director = director;
            newMovie.duration = duration;
            newMovie.language = language;
            newMovie.posterUrl = posterUrl;
            newMovie.rating = rating;
            newMovie.isActive = isActive;
    
            // Tìm tất cả genres tương ứng
            const genreEntities = await Promise.all(
                genres.map((genreId: number) =>
                    AppDataSource.getRepository(Genre).findOne({ where: { id: genreId } })
                )
            );
    
            // Lọc ra những genre tồn tại
            newMovie.genres = genreEntities.filter((genre): genre is Genre => genre !== null);
    
            await AppDataSource.getRepository(Movie).save(newMovie);
            res.status(201).json({ message: "Movie created successfully", movie: newMovie });
    
        } catch (error) {
            console.error("Error creating movie:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    }
    
}