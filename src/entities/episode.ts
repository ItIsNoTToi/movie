import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
  } from "typeorm";
  import { Movie } from "./movie";
  
  @Entity('episode')
  export class Episode {
  
    @PrimaryGeneratedColumn()
    id!: number;
  
    @Column()
    title!: string;
  
    @Column({ type: 'text', nullable: true })
    description?: string;
  
    @Column()
    episodeNumber!: number;
  
    @Column()
    videoUrl!: string;
  
    @Column({ type: 'date', nullable: true })
    releaseDate?: Date;
  
    @Column({ type: 'int', default: 0 })
    views!: number;
  
    @Column({ nullable: true })
    subtitlesUrl?: string;
  
    @Column({ nullable: true })
    quality?: string;
  
    @ManyToOne(() => Movie, movie => movie.episodes, { onDelete: 'CASCADE' })
    movie!: Movie;
  }
  