import { prisma } from "../../lib/prisma";
import bcrypt from "bcrypt";
import jwt  from 'jsonwebtoken';



export const secret = 'kdjfkjkfjdjfklfffkjkdk'

const register = async(payload: any)=>{
    const hashPassword = await bcrypt.hash(payload.password,8)
    const result = await prisma.user.create({
        data : {...payload,
            password : hashPassword
        }
    })
    const {password, ...newResult} = result;
    
    // Generate token for new user
    const token = jwt.sign({
        id: newResult.id,
        name: newResult.name,
        email: newResult.email,
        role: newResult.role,
    }, secret, { expiresIn: "1d" });
    
    return {
        token,
        user: newResult
    }
}

const login = async (payload: any)=>{
    const user = await prisma.user.findUnique({
        where: {
            email: payload.email
        }
    })
    if(!user){
            throw new Error("user not found")
        }

       const ispasswordMatched = await bcrypt.compare(
    payload.password,
    user.password,
  );

  if (!ispasswordMatched) {
    throw new Error("Invalid credentials!!");
  }

  const userData = {
    id: user.id,
    name: user.name,
    role: user.role,
    email: user.email,
  };

  const token = jwt.sign(userData, secret, { expiresIn: "1d" });
  
  return {
    token,
    user: userData,
  };

}

export const AuthService = {
    // Add service methods here
    register,
    login
    };