import { RequestHandler } from "express";
import { ApplicationService } from "./application.service";

const createApplication: RequestHandler = async (req,res)=>{
    try {
        const result = await ApplicationService.createApplication(req.body);
        res.status(201).json({
            success: true,
            message: "Application created successfully",
            data: result
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: (error as Error).message,
            data: null
        });
    }
}

export const ApplicationController = {
    // Add controller methods here
    createApplication
    };