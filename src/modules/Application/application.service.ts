import { prisma } from "../../lib/prisma";

const createApplication = async (applicationData: any)=>{
        const result = await prisma.application.create({
            data : applicationData
        })
        return result;
}

export const ApplicationService = {
    // Add service methods here
    createApplication
    };