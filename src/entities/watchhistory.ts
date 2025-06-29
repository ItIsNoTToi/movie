// watchhistory.ts
import { Entity, PrimaryGeneratedColumn, ManyToOne, Column, CreateDateColumn } from "typeorm";
import { Account } from "./account"; // hoặc User
import { Movie } from "./movie";

@Entity()
export class WatchHistory {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Account, account => account.watchHistory)
  account!: Account;

  @ManyToOne(() => Movie, movie => movie.watchHistory)
  movie!: Movie;

  @CreateDateColumn()
  watchedAt!: Date;
}
