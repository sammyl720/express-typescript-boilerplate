import { NextFunction, Request, RequestHandler, Response } from "express";
import UserController from "../controller/users/user-controller";

export interface IRequest extends Request {
  [key: string]: any;
}
const ensureAuth = (req: IRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  if(!authHeader){
    return res.status(401).json({
      error: {
        message: "Please provide authorization header in the format of 'Bearer <token>'"
      }
    })
  }

  const token = authHeader.split(' ')[1].trim();
  if(!token){
    return res.status(400).json({
      error: {
        message: "Please provide authorization header in the format of 'Bearer <token>'"
      }
    })
  }

  try {
    const user = UserController.getUserFromToken(token);
    req.user = user;
    next();
  } catch (error) {
    return res.status(501).json({ error: { message: "Something went wrong" }})
  }
}

export default {
  ensureAuth: ensureAuth
}