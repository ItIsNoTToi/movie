import express, { Express, Request, Response} from "express";
import http from 'http';
import dotenv from "dotenv";
dotenv.config();
import bodyParser from "body-parser";
import "reflect-metadata";
import { AppDataSource } from "@config/data-source";
import session from 'express-session';
import path from 'path';
import cookieParser from "cookie-parser";
import cors from "cors";
import { config } from "dotenv";


// import routes ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
import loginroutes from '@routes/loginroutes';
import profileroutes from '@routes/profileroutes';
import genresroutes from '@routes/genreroutes';
import movieroutes from '@routes/movieroute';

// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
const app: Express = express();
const server = http.createServer(app);
app.use(cors({
  origin: 'http://localhost:3001', // Frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Các phương thức HTTP bạn muốn cho phép
  allowedHeaders: ['Content-Type', 'Authorization'], // Các header được phép
}));

const host = '0.0.0.0';
const port = +(process.env.PORT || 3000);

// socket.ip - send message ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

server.listen(port, host, () => {
  console.log(`[server]: 🚀 Server is running at http://localhost:${port}`);
});

// db ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
AppDataSource.initialize().then(() => {
    console.log("Connected to the database");
    // start your server here...
})

// app.set() ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// ejs
app.set('view engine', 'ejs');
app.set('views', './src/views'); 

// app.use() ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// session
app.use(
  session({
      secret: `${process.env.SESSION_KEY}`, 
      resave: false, 
      saveUninitialized: true, 
      cookie: {
          secure: false, 
          maxAge: 1000 * 60 * 60 * 24, 
      },
  })
);
// static files middleware
app.use(express.static(path.join(__dirname, '../public')));
// bodyParser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// cookies parser
app.use(cookieParser());

// 
app.use(loginroutes);
app.use(profileroutes);
app.use(genresroutes);
app.use(movieroutes);

