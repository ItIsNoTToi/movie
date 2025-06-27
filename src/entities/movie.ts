import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToMany,
    JoinTable,
    OneToMany,
  } from "typeorm";
  import "reflect-metadata";
  import { Genre } from "./genre";
  import { Episode } from "./episode";
import { Hashtag } from "./hashtag";
import { Rating } from "./rating";
  
  @Entity('movie')
  export class Movie {
  
    @PrimaryGeneratedColumn()
    id!: number;
  
    @Column()
    title!: string;
  
    @Column({ type: 'text', nullable: true })
    description?: string;
  
    @Column({ type: 'date', nullable: true })
    releaseDate?: Date;
  
    @Column({ nullable: true })
    director?: string;
  
    @Column({ nullable: true })
    duration?: number;
  
    @Column({ nullable: true })
    language?: string;
  
    @Column({ nullable: true })
    posterUrl?: string;
  
    @Column({ type: 'float', default: 0 })
    rating!: number;
  
    @Column({ default: true })
    isActive!: boolean;
  
    @ManyToMany(() => Genre, genre => genre.movies, { cascade: true })
    @JoinTable()
    genres!: Genre[];
  
    @OneToMany(() => Episode, episode => episode.movie, { cascade: true })
    episodes!: Episode[];

    @OneToMany(() => Rating, rate => rate.movie)
    ratings!: Rating[];

    @ManyToMany(() => Hashtag, hashtag => hashtag.movies, { cascade: true })
    @JoinTable()
    hashtags!: Hashtag[];
  }
  