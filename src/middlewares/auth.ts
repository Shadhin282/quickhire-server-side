// import { NextFunction, Request, Response } from "express"
// import { secret } from "../modules/Auth/auth.service";
// import jwt, { JwtPayload } from "jsonwebtoken";
// import { prisma } from "../lib/prisma";




// declare global {
//   namespace Express {
//     interface Request {
//       user?: JwtPayload
//     }
//   }
// }



// export const auth = (...roles : UserRole[])=>{
//     return async (req: Request, res: Response, next : NextFunction)=>{
       
//         // verify token
//         // is decoded exit
//         // is user status active
//       try {
//           const token = req.headers.authorization;
//         if(!token){
//             throw new Error("token not foound")
//         }
//         const decode = jwt.verify(token,secret) as JwtPayload


//         const isUserExits = await prisma.user.findUnique({
//             where : {
//                 email: decode.email
//             }
//         })

//         if(!isUserExits){
//             throw new Error("Unauthorized")
//         }

//         if(isUserExits.status !== 'ACTIVE'){
//             throw new Error("Unauthorized")
//         }

//         if(roles.length && roles.includes(decode.role)){
//             throw new Error("Unauthorized")
//         }

//         req.user = decode ;

//         next()
//       } catch (error) {
//         next(error)
//       }
//     }
// }