import { NextFunction, Request, Response } from "express"
import { secret } from "../modules/Auth/auth.service";
import jwt, { JwtPayload } from "jsonwebtoken";
import { prisma } from "../lib/prisma";
import { UserRole } from "../generated/prisma/enums";




declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload
    }
  }
}



export const auth = (...roles : UserRole[])=>{
    return async (req: Request, res: Response, next : NextFunction)=>{
       
        // verify token
        // is decoded exit
        // is user status active
      try {
          let token = req.headers.authorization;
          console.log("Token:", token);
          
        if(!token){
            const error = new Error("Token not found") as any;
            error.status = 401;
            throw error;
        }

        // Handle "Bearer token" format
        if (token.startsWith('Bearer ')) {
          token = token.slice(7);
        }

        const decode = jwt.verify(token, secret) as JwtPayload

        console.log("decode info", decode);
        const isUserExits = await prisma.user.findUnique({
            where : {
                email: decode.email
            }
        })
        console.log("isUserExits", isUserExits);
        if(!isUserExits){
            const error = new Error("User not found") as any;
            error.status = 401;
            throw error;
        }

       
        console.log("roles", roles);
        if(roles.length && !roles.includes(decode.role)){
            const error = new Error("Insufficient permissions") as any;
            error.status = 403;
            throw error;
        }

        req.user = decode ;

        next()
      } catch (error: any) {
        if (error.status) {
          // Custom error with status code
          const err = error as any;
          err.status = error.status;
          next(err);
        } else if (error instanceof jwt.JsonWebTokenError) {
          // JWT-specific errors
          const err = new Error("Invalid token") as any;
          err.status = 401;
          next(err);
        } else {
          // Other errors
          const err = error as any;
          err.status = err.status || 500;
          next(err);
        }
      }
    }
}