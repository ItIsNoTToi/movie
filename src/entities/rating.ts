import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Movie } from "./movie";
import { Account } from "./account";

@Entity('rating')
export class Rating {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    rating!: number;

    @Column()
    comment!: string;

    @ManyToOne(() => Movie, movie => movie.ratings)
    movie!: Movie;

    @ManyToOne(() => Account, account => account.ratings)
    account!: Account;
}
