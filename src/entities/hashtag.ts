// src/entities/hashtag.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
} from 'typeorm';
import { Movie } from './movie';

@Entity('hashtag')
export class Hashtag {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  name!: string;

  @ManyToMany(() => Movie, movie => movie.hashtags)
  movies!: Movie[];
}
