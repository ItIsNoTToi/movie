import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from "typeorm";
import { Movie } from "./movie";

@Entity('genre')
export class Genre {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string; // Ví dụ: 'Action', 'Comedy'

    @ManyToMany(() => Movie, movie => movie.genres)
    movies!: Movie[];
}
