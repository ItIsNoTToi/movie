import { DataSource } from "typeorm";
import dotenv from 'dotenv';
dotenv.config();
import "reflect-metadata"

// entities
import { Movie } from "@entities/movie";
import { Account } from "@entities/account";
import { DetailAccount } from "@entities/detailaccount";
import { Genre } from "@entities/genre";
import { Episode } from "@entities/episode";
import { Admin } from "@entities/admin";
import { Hashtag } from "@entities/hashtag";

export const AppDataSource = new DataSource({
    type: process.env.MYSQL_TYPE as "mysql",
    host: process.env.MYSQL_HOST,
    port: 27243,
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASS,
    database: process.env.MYSQL_NAME,
    synchronize: true,
    logging: false,
    ssl: {
        rejectUnauthorized: false,
    },
    entities: [Movie, Account, DetailAccount, Genre, Episode, Admin, Hashtag],
    subscribers: [],
    migrations: ["src/migrations/*.ts"],
});
