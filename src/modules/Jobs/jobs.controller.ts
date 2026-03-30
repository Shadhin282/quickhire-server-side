import { RequestHandler } from "express";
import { get } from "node:http";
import { JobsService } from "./jobs.service";

const getAllJobs: RequestHandler = async (req,res)=>{
    try {

        const search = req.query.search as string | undefined;
        const category = req.query.category as string | undefined;
        const location = req.query.location as string | undefined;
        console.log("Search query:", search); // Debugging log
        console.log("Category query:", category); // Debugging log
        console.log("Location query:", location); // Debugging log
        const result = await JobsService.getAllJobs(search,category,location);
        
        res.status(200).json({
            success: true,
            message: "Jobs retrieved successfully",
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

const getJobByid: RequestHandler = async (req,res)=>{
        try {
            const result = await JobsService.getJobByid(req.params.id as string);
            res.status(200).json({
                success: true,
                message: "Job retrieved successfully",
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


const createJob : RequestHandler = async (req,res)=>{
    try {
        const result = await JobsService.createJob(req.body);
        res.status(201).json({
            success: true,
            message: "Job created successfully",
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

const deleteJob : RequestHandler = async (req,res)=>{
    try {
        const result = await JobsService.deleteJob(req.params.id as string);
        res.status(200).json({
            success: true,
            message: "Job deleted successfully",
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

export const JobsController = {
    // Add controller methods here
    getAllJobs,
    getJobByid,
    createJob,
    deleteJob
    };