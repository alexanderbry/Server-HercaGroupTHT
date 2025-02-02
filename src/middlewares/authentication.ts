import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../helpers/jwt';
import db from '../../models/index';

interface AuthenticatedRequest extends Request {
    user?: {
        id: number;
    };
}

const authentication = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
        if (!req.headers.authorization) throw { name: 'Unauthorized' };
        const [bearer, token] = req.headers.authorization.split(' ');

        if (!token) throw { name: 'Unauthorized' };

        const data = verifyToken(token);

        if (typeof data === 'string') throw { name: 'Unauthorized' };

        const user = await db.User.findByPk(data.id);
        if (!user) throw { name: 'Unauthorized' };

        res.locals.loginSession = {
            id: user.id,
        };

        next();
    } catch (error) {
        next(error);
    }
};

export default authentication;
