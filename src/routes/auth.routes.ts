import {hash, compare} from 'bcryptjs';
import {sign} from 'jsonwebtoken';
import { Router, Request, Response } from "express";
import User from '../models/user.model';

const config = require('config');

const authRouter = Router();

authRouter.post('/login', async(req: Request, res: Response) => {
    const {username, password} = req.body;
    const targetUser = await User.findOne({username});

    if (!targetUser)
        return res.status(400)
                  .json({message: 'User not found'});

    const passwordMatches = await compare(password, targetUser.password);

    if (!passwordMatches)
        return res.status(400)
            .json({message: 'Invalid password'});

    const jwtToken = sign(
        {userId: targetUser._id},
        config.get("JWT_SECRET_TOKEN"),
        {expiresIn: '1h'}
    );

    res.json({
        userId: targetUser._id,
        jwtToken
    })
});

export default authRouter;
