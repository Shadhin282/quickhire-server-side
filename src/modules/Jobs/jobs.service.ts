import { prisma } from "../../lib/prisma";

const getAllJobs = async()=>{
    return await prisma.job.findMany();
}

const getJobByid = async(id: string)=>{
    return await prisma.job.findUnique({
        where: {
            id
        }
    });
}

const createJob = async(data: any)=>{
    return await prisma.job.create({
        data
    });
}

const deleteJob = async(id: string)=>{
    return await prisma.job.delete({
        where: {
            id
        }
    });
}


export const JobsService = {
    // Add service methods here
    getAllJobs,
    getJobByid,
    createJob,
    deleteJob
    };