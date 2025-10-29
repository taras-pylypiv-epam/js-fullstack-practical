import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const quiz = await prisma.quiz.create({
        data: {
            title: 'General Knowledge Quiz',
            questions: {
                create: [
                    {
                        text: 'Is the Earth round?',
                        type: 'BOOLEAN',
                    },
                    {
                        text: 'Who developed the theory of relativity?',
                        type: 'INPUT',
                    },
                    {
                        text: 'Which of these are programming languages?',
                        type: 'MULTIPLE',
                        options: {
                            create: [
                                { text: 'JavaScript' },
                                { text: 'Python' },
                                { text: 'HTML' },
                                { text: 'CSS' },
                            ],
                        },
                    },
                ],
            },
        },
        include: {
            questions: {
                include: { options: true },
            },
        },
    });

    console.dir(quiz, { depth: null });
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
