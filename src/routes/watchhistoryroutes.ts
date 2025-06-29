import { AppDataSource } from "@config/data-source";
import { Account } from "@entities/account";
import { Movie } from "@entities/movie";
import { WatchHistory } from "@entities/watchhistory";
import express, { Router, Request, Response } from "express";

const router: Router = express.Router();

const accountRepo = AppDataSource.getRepository(Account);
const movieRepo = AppDataSource.getRepository(Movie);

// POST /api/watch-history
router.post('/api/watch-history', async (req: Request, res: Response): Promise<any> => {
    try {
        const { user, movieId } = req.body;
        
        const movie = await movieRepo.findOne({
            where:{
                id: movieId
            }
        });
        const account = await accountRepo.findOne({
            where: {
                id: user?.id,
                email: user?.email,
            },
        });

        if (!movie) {
            return res.status(404).json({ message: 'movie not found' });
        }
        if (!account) {
            return res.status(404).json({ message: 'Account not found' });
        }

        const watchHistory = await AppDataSource.getRepository(WatchHistory).findOne({
            where: {
                account: account,
                movie: movie
            }
        })

        if(watchHistory){
            return res.status(200).json({ message: 'Movie already watched', watchHistory });
        }

        const history = new WatchHistory();
        history.account = account;
        history.movie = movie;
        history.watchedAt = new Date();
        
        await AppDataSource.getRepository(WatchHistory).save(history);

        res.status(200).json({ message: 'Watch history saved.', history });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: ''});
    }
});

// GET /api/watch-history/:userId
router.get('/api/watch-history/:userId', async (req: Request, res: Response): Promise<any> => {
    try {
        const userId = parseInt(req.params.userId);
        // console.log(userId); 

        const history = await AppDataSource.getRepository(WatchHistory).find({
            where: { account: { id: userId } },
            relations: ['movie'],
            order: { watchedAt: 'DESC' }
        });
        res.status(200).json({data: history});
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: ''});
    }
});


export default router;
//end{code}