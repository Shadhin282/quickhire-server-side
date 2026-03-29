import { RequestHandler } from "express";
import { AuthService } from "./auth.service";

const register: RequestHandler = async (req,res)=>{
        try {
            const result = await AuthService.register(req.body)
            res.status(201).json({
                success: true,
                message : "User Registerd Successfully",
                data : result
            })
        } catch (error) {
            res.status(500).json({
                success : false,
                message : (error as Error).message,
                data : null
            })
        }
}

const login: RequestHandler = async (req,res)=>{
    try {
        const result = await AuthService.login(req.body)
        res.status(200).json({
            success: true,
            message : "User logged in Successfully",
            data : result
        })
    } catch (error) {
        res.status(500).json({
            success : false,
            message : (error as Error).message,
            data : null
        })
    }
}



export const AuthController = {
    // Add controller methods here
    register,
    login
    };