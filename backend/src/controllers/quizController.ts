import { Request, Response } from 'express';
import { PrismaClient, QuestionType } from '@prisma/client';
import { z } from 'zod';

const prisma = new PrismaClient();

const optionSchema = z.object({
    text: z.string().min(5),
});

const questionSchema = z.object({
    text: z.string().min(5),
    type: z.enum(QuestionType),
    options: z.array(optionSchema).optional(),
});

const createQuizSchema = z.object({
    title: z.string().min(5),
    questions: z.array(questionSchema).min(1),
});

export const getAllQuizzes = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const quizzes = await prisma.quiz.findMany({
            include: {
                _count: {
                    select: { questions: true },
                },
            },
        });

        const result = quizzes.map((q) => ({
            id: q.id,
            title: q.title,
            questionsCount: q._count.questions,
        }));

        res.json(result);
    } catch (error) {
        console.error('Error fetching quizzes:', error);
        res.status(500).json({ error: 'Failed to fetch quizzes' });
    }
};

export const getQuizById = async (
    req: Request,
    res: Response
): Promise<void> => {
    const { id } = req.params;

    try {
        const quiz = await prisma.quiz.findUnique({
            where: { id },
            include: {
                questions: {
                    include: {
                        options: true,
                    },
                },
            },
        });

        if (!quiz) {
            res.status(404).json({ error: 'Quiz not found' });
            return;
        }

        const result = {
            id: quiz.id,
            title: quiz.title,
            questions: quiz.questions.map((q) => ({
                id: q.id,
                text: q.text,
                type: q.type,
                options: q.options.map((o) => ({ id: o.id, text: o.text })),
            })),
        };

        res.json(result);
    } catch (error) {
        console.error('Error fetching quiz:', error);
        res.status(500).json({ error: 'Failed to fetch quiz' });
    }
};

export const createQuiz = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const parsedData = createQuizSchema.parse(req.body);

        const quiz = await prisma.quiz.create({
            data: {
                title: parsedData.title,
                questions: {
                    create: parsedData.questions.map((q) => ({
                        text: q.text,
                        type: q.type,
                        options:
                            q.type === 'MULTIPLE' && q.options
                                ? { create: q.options }
                                : undefined,
                    })),
                },
            },
            include: {
                questions: {
                    include: { options: true },
                },
            },
        });

        res.status(201).json(quiz);
    } catch (error) {
        if (error instanceof z.ZodError) {
            res.status(400).json({ errors: error });
            return;
        }
        console.error('Error creating quiz:', error);
        res.status(500).json({ error: 'Failed to create quiz' });
    }
};

export const deleteQuiz = async (
    req: Request,
    res: Response
): Promise<void> => {
    const { id } = req.params;

    try {
        const quiz = await prisma.quiz.findUnique({ where: { id } });
        if (!quiz) {
            res.status(404).json({ error: 'Quiz not found' });
            return;
        }

        await prisma.quiz.delete({ where: { id } });

        res.status(200).json({ message: 'Quiz deleted successfully' });
    } catch (error) {
        console.error('Error deleting quiz:', error);
        res.status(500).json({ error: 'Failed to delete quiz' });
    }
};
