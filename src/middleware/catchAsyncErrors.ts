import { Request, Response, NextFunction } from 'express';
import { UserRequest } from '../commonDto/user.dto';

type ErrFunc = (req: Request | UserRequest, res: Response, next: NextFunction) => any;

export default (errFunc: ErrFunc) => (req: Request, res: Response, next: NextFunction) => {
  Promise.resolve(errFunc(req, res, next)).catch(next);
};
