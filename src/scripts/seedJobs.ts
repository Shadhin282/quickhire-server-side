import { prisma } from "../lib/prisma";

const seedJobs = async () => {
    try {
        const jobsData = [
            {
                title: 'Senior React Developer',
                company: 'Tech Corp',
                location: 'San Francisco',
                category: 'Technology',
                type: 'Full-time',
                description: 'We are looking for an experienced React developer to join our growing team. You will work on building scalable and performant web applications.',
                shortDescription: 'Senior React Developer needed at Tech Corp',
                requirements: ['5+ years of React experience', 'TypeScript proficiency', 'Experience with Next.js', 'REST API knowledge'],
                benefits: ['Health insurance', 'Dental coverage', '401k matching', 'Remote work'],
                salary: '$120,000 - $160,000',
                postedDate: new Date().toISOString().split('T')[0],
                logo: 'T',
                logoColor: '#3B82F6',
                tags: ['React', 'TypeScript', 'Next.js', 'JavaScript']
            },
            {
                title: 'Product Designer',
                company: 'Design Studio',
                location: 'New York',
                category: 'Design',
                type: 'Full-time',
                description: 'Join our creative design team to create beautiful and intuitive user interfaces for our clients worldwide.',
                shortDescription: 'Product Designer at Design Studio',
                requirements: ['3+ years of design experience', 'Figma expertise', 'UI/UX knowledge', 'Portfolio required'],
                benefits: ['Creative freedom', 'Flexible hours', 'Design tools', 'Collaborative team'],
                salary: '$80,000 - $120,000',
                postedDate: new Date().toISOString().split('T')[0],
                logo: 'D',
                logoColor: '#EC4899',
                tags: ['Design', 'UI/UX', 'Figma', 'Product']
            },
            {
                title: 'Marketing Manager',
                company: 'Marketing Pro',
                location: 'Remote',
                category: 'Marketing',
                type: 'Full-time',
                description: 'Lead our marketing initiatives and develop strategies to reach our global audience. Perfect for someone with proven marketing expertise.',
                shortDescription: 'Marketing Manager - Remote Position',
                requirements: ['5+ years of marketing experience', 'Digital marketing knowledge', 'Analytics proficiency', 'Leadership experience'],
                benefits: ['Remote work', 'Flexible schedule', 'Professional development', 'Competitive salary'],
                salary: '$90,000 - $140,000',
                postedDate: new Date().toISOString().split('T')[0],
                logo: 'M',
                logoColor: '#F59E0B',
                tags: ['Marketing', 'Digital', 'Strategy', 'Remote']
            },
            {
                title: 'Full Stack Developer',
                company: 'Innovation Labs',
                location: 'London',
                category: 'Technology',
                type: 'Full-time',
                description: 'Build end-to-end web applications using modern tech stack. We use Node.js, React, and PostgreSQL.',
                shortDescription: 'Full Stack Developer at Innovation Labs',
                requirements: ['4+ years of development experience', 'Node.js & React', 'Database design', 'REST APIs'],
                benefits: ['Competitive salary', 'Health insurance', 'Training budget', 'Stock options'],
                salary: '$100,000 - $150,000',
                postedDate: new Date().toISOString().split('T')[0],
                logo: 'I',
                logoColor: '#10B981',
                tags: ['Full Stack', 'Node.js', 'React', 'PostgreSQL']
            },
            {
                title: 'UX Researcher',
                company: 'Design Studio',
                location: 'New York',
                category: 'Design',
                type: 'Contract',
                description: 'Conduct user research and provide insights to improve our product experience.',
                shortDescription: 'UX Researcher - Contract Position',
                requirements: ['3+ years of UX research', 'User interview skills', 'Analytics knowledge', 'Reporting expertise'],
                benefits: ['Flexible contract', 'Professional growth', 'Collaborative environment'],
                salary: '$70,000 - $100,000',
                postedDate: new Date().toISOString().split('T')[0],
                logo: 'D',
                logoColor: '#EC4899',
                tags: ['Research', 'UX', 'Design', 'Analytics']
            },
            {
                title: 'Sales Executive',
                company: 'Sales Force',
                location: 'Remote',
                category: 'Sales',
                type: 'Full-time',
                description: 'Join our sales team and help clients find the perfect solutions for their business needs.',
                shortDescription: 'Sales Executive - Remote',
                requirements: ['2+ years of sales experience', 'CRM knowledge', 'Negotiation skills', 'Target-driven'],
                benefits: ['Commission structure', 'Remote work', 'Training provided', 'Career growth'],
                salary: '$50,000 - $100,000',
                postedDate: new Date().toISOString().split('T')[0],
                logo: 'S',
                logoColor: '#8B5CF6',
                tags: ['Sales', 'CRM', 'Remote']
            },
            {
                title: 'HR Specialist',
                company: 'People First',
                location: 'Tokyo',
                category: 'HR',
                type: 'Full-time',
                description: 'Manage recruitment and employee development for our expanding team.',
                shortDescription: 'HR Specialist at People First',
                requirements: ['3+ years of HR experience', 'Recruitment expertise', 'Employee relations', 'HRIS knowledge'],
                benefits: ['Relocation support', 'Health insurance', 'Career development', 'Bonus scheme'],
                salary: '$60,000 - $90,000',
                postedDate: new Date().toISOString().split('T')[0],
                logo: 'P',
                logoColor: '#EF4444',
                tags: ['HR', 'Recruitment', 'Employee Relations']
            },
            {
                title: 'Data Scientist',
                company: 'Tech Corp',
                location: 'San Francisco',
                category: 'Technology',
                type: 'Full-time',
                description: 'Work with large datasets to extract insights and build predictive models.',
                shortDescription: 'Data Scientist at Tech Corp',
                requirements: ['3+ years of data science', 'Python/R expertise', 'SQL knowledge', 'ML experience'],
                benefits: ['Competitive salary', 'Free courses', 'Gym membership', 'Remote days'],
                salary: '$130,000 - $180,000',
                postedDate: new Date().toISOString().split('T')[0],
                logo: 'T',
                logoColor: '#3B82F6',
                tags: ['Data Science', 'Python', 'ML', 'Analytics']
            },
            {
                title: 'Content Writer',
                company: 'Content Hub',
                location: 'Remote',
                category: 'Marketing',
                type: 'Part-time',
                description: 'Create engaging content for our blog and social media channels.',
                shortDescription: 'Content Writer - Part-time Remote',
                requirements: ['2+ years of writing experience', 'SEO knowledge', 'Content research', 'Social media'],
                benefits: ['Flexible schedule', 'Creative freedom', 'Portfolio building'],
                salary: '$30,000 - $50,000',
                postedDate: new Date().toISOString().split('T')[0],
                logo: 'C',
                logoColor: '#06B6D4',
                tags: ['Writing', 'Content', 'Marketing', 'Remote']
            },
            {
                title: 'DevOps Engineer',
                company: 'Innovation Labs',
                location: 'London',
                category: 'Technology',
                type: 'Full-time',
                description: 'Manage and optimize our cloud infrastructure and deployment pipelines.',
                shortDescription: 'DevOps Engineer at Innovation Labs',
                requirements: ['4+ years of DevOps experience', 'Kubernetes knowledge', 'CI/CD expertise', 'AWS/Azure'],
                benefits: ['Generous salary', 'Learning budget', 'Flexible hours', 'Remote options'],
                salary: '$110,000 - $160,000',
                postedDate: new Date().toISOString().split('T')[0],
                logo: 'I',
                logoColor: '#10B981',
                tags: ['DevOps', 'Kubernetes', 'Cloud', 'CI/CD']
            }
        ];

        // Check existing jobs count
        const existingJobs = await prisma.job.count();
        if (existingJobs > 0) {
            console.log(`${existingJobs} jobs already exist in database.`);
            return;
        }

        // Create jobs in database
        const createdJobs = await prisma.job.createMany({
            data: jobsData,
        });

        console.log(`✓ Successfully seeded ${createdJobs.count} jobs`);
    } catch (error) {
        console.error('Error seeding jobs:', error);
    } finally {
        await prisma.$disconnect();
    }
};

seedJobs();
