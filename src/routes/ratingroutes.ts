import express, { Router, Request, Response } from "express";
import authenticateJWT from "@middlewares/authenticateJWT"; // Import middleware của bạn
import { Account } from "@entities/account";
import { AppDataSource } from "@config/data-source";
import { Admin } from "@entities/admin";
import RatingController from "@controllers/ratingcontroller";

const router = express.Router();

// Route để lấy thông tin profile của người dùng
router.get('/getcommentandrating/:idmovie', RatingController.GetRatingAndComment );

router.post('/postcommentandrating', RatingController.postcommentandrating );

export default router;
//end{code}