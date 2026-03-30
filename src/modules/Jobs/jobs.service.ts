import { prisma } from "../../lib/prisma";

const getAllJobs = async (search?: string | undefined, category?: string | undefined, location?: string | undefined) => {
    console.log("Received search parameter in service:", search); // Debugging log
    const result = await prisma.job.findMany({
        where: {
            AND: [
                ...(search ? [{
                    OR: [
                        { title: { contains: search as string, mode: 'insensitive' as const } },
                        { category: { contains: search as string, mode: 'insensitive' as const } },
                    ]
                }] : []),
                ...(category ? [{ category: { contains: category as string, mode: 'insensitive' as const } }] : []),
                ...(location ? [{ location: { contains: location as string, mode: 'insensitive' as const } }] : []),
            ]
        }
    });

    return result;
}

const getJobByid = async (id: string) => {
    return await prisma.job.findUnique({
        where: {
            id
        }
    });
}

const createJob = async (data: any) => {
    return await prisma.job.create({
        data
    });
}

const deleteJob = async (id: string) => {
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