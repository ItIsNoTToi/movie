import { hash } from 'bcrypt-ts';
import e, { Express, Request, Response } from "express";
import { DataSource } from "typeorm";
import { Movie } from "@entities/movie";
import { AppDataSource } from "@config/data-source";
import { Genre } from "@entities/genre";
import { Episode } from "@entities/episode";
import jwt from "jsonwebtoken";
import { Hashtag } from "@entities/hashtag";
import { In } from "typeorm";

export default class MovieServices {

    static async createMovie(req: Request, res: Response): Promise<any> {
        try {
            const data = req.body;

            // Kiểm tra dữ liệu
            if (!Array.isArray(data.hashtag) || !Array.isArray(data.genres)) {
                return res.status(400).json({ error: "Hashtag and genres must be arrays" });
            }

            const hashtagRepo = AppDataSource.getRepository(Hashtag);

            const hashtagNames: string[] = data.hashtag.map((item: { name: string }) => item.name);

            // Tìm các hashtag đã tồn tại
            const existingHashtags = await hashtagRepo.find({
                where: { name: In(hashtagNames) }
            });

            const existingNames = existingHashtags.map(h => h.name);

            // Tạo những hashtag chưa có
            const newHashtags = hashtagNames
                .filter((name: string) => !existingNames.includes(name))
                .map((name: string) => hashtagRepo.create({ name }));

            await hashtagRepo.save(newHashtags);

            const allHashtags = [...existingHashtags, ...newHashtags];

            // Tạo movie
            const newMovie = new Movie();
            newMovie.title = data.title;
            newMovie.description = data.description;
            newMovie.releaseDate = data.releaseDate;
            newMovie.director = data.director;
            newMovie.duration = data.duration;
            newMovie.language = data.language;
            newMovie.posterUrl = data.posterUrl;
            newMovie.rating = data.rating;
            newMovie.isActive = data.isActive;
            newMovie.hashtags = allHashtags;

            // Xử lý genres
            const genreRepo = AppDataSource.getRepository(Genre);
            const genres = await genreRepo.findBy({
                id: In(data.genres)
            });

            if (genres.length !== data.genres.length) {
                return res.status(400).json({ error: "Some genre IDs are invalid" });
            }

            newMovie.genres = genres;

            await AppDataSource.getRepository(Movie).save(newMovie);
            res.status(201).json({ message: "Movie created successfully", movie: newMovie });

        } catch (error) {
            console.error("Error creating movie:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    }


    static async deleteMovie(req: Request, res: Response): Promise<any> {
        try {
            const id = Number(req.params.id);
            const movieRepo = AppDataSource.getRepository(Movie);

            const movie = await movieRepo.findOne({ where: { id } });
            if (!movie) {
            return res.status(400).json({ message: "Can't find movie with id = " + id });
            }

            await movieRepo.delete(id);

            res.status(200).json({ message: "Movie deleted successfully" });
        } catch (error) {
            console.error("Error deleting movie:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    }

    static async createEpisode(req: Request, res: Response): Promise<any> {
        try {
            const {
                MovieId, title, description, releaseDate, episodeNumber, videoUrl, quality, views, subtitlesUrl, 
            } = req.body;

            const movie = await AppDataSource.getRepository(Movie).findOne({
                where: {
                    id: MovieId,
                }
            })

            if(!movie){
                res.status(403).json({ error: "can't find movie" });
            }
    
            const newEpisode = new Episode();
            newEpisode.title = title;
            newEpisode.description = description;
            newEpisode.releaseDate = releaseDate;
            newEpisode.episodeNumber = episodeNumber;
            newEpisode.videoUrl = videoUrl;
            newEpisode.quality = quality;
            newEpisode.views = views;
            newEpisode.subtitlesUrl = subtitlesUrl;
            newEpisode.movie = movie!;
    
            await AppDataSource.getRepository(Episode).save(newEpisode);
            res.status(201).json({ message: "Episode created successfully", });
    
        } catch (error) {
            console.error("Error creating Episode:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    }
    
    static async getMovieByIdAndEpisode(req: Request, res: Response): Promise<any> {
        try {
            const movieId = parseInt(req.params.id);
            const episodeNumber = parseInt(req.params.episode);
    
            if (isNaN(movieId) || isNaN(episodeNumber)) {
                return res.status(400).json({ message: "Invalid movie ID or episode number" });
            }
    
            const episodeRepository = AppDataSource.getRepository(Episode);
            const episode = await episodeRepository.findOne({
                where: {
                    movie: { id: movieId },
                    episodeNumber: episodeNumber
                },
                relations: ['movie']
            });
    
            if (!episode) {
                return res.status(404).json({ message: "Episode not found" });
            }
    
            return res.status(200).json({ episode });
        } catch (error) {
            console.error("Error fetching episode:", error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }

    static async getMovie(req: Request, res: Response): Promise<any> {
        try {
            const JWT_SECRET = process.env.JWT_SECRET!;
            const token = req.cookies?.token;
            // console.log(token);
            // console.log(JWT_SECRET);

            const movieRepository = AppDataSource.getRepository(Movie);
            const movies = await movieRepository.find({
                relations:['genres', 'episodes']
            });

            if (!token) {
                return res.status(200).json({ movies, user: null });
            }

            try {
                const decoded = jwt.verify(token, JWT_SECRET);
                return res.status(200).json({
                    movies,
                    user: decoded,
                });
            } catch (err) {
                console.error("JWT verify error:", err);
                return res.status(403).json({ message: "Invalid token" });
            }
        } catch (error) {
            console.error("Error fetching movie:", error instanceof Error ? error.message : error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }


    static async getMoviebyId(req: Request, res: Response): Promise<any> {
        try {
            const movieId = parseInt(req.params.id);
    
            const movieEpository = AppDataSource.getRepository(Movie);
            const movie = await movieEpository.findOne({
                where: {
                    id: movieId,
                },
                relations: ['episodes', 'genres'],  // Trả về cả thông tin của episodes và genres
            });
    
            if (!movie) {
                return res.status(404).json({ message: "Movie not found" });
            }
    
            return res.status(200).json({ movie });

        } catch (error) {
            console.error("Error fetching movie:", error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }
    
}