'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import api from '@/lib/api';
import { QuestionType } from '@/types/quiz';

const optionSchema = z.string().min(1, 'Option cannot be empty');
const questionSchema = z.object({
    text: z.string().min(5, 'Question text is required'),
    type: z.enum(QuestionType),
    options: z.array(optionSchema).optional(),
});
const quizSchema = z.object({
    title: z.string().min(5, 'Title is required'),
    description: z.string().optional(),
    questions: z.array(questionSchema).min(1, 'Add at least one question'),
});

export async function createQuiz(formData: FormData) {
    const rawData = Object.fromEntries(formData);
    const parsedQuestions = JSON.parse((rawData.questions as string) || '[]');
    console.log(parsedQuestions);

    const validation = quizSchema.safeParse({
        title: rawData.title,
        questions: parsedQuestions,
    });

    if (!validation.success) {
        throw new Error(validation.error.message);
    }

    const quizData = validation.data;
    console.log(quizData);

    try {
        await api.post('/quizzes', quizData);
    } catch (err) {
        console.error('Error creating quiz:', err);
        throw new Error('Failed to create quiz');
    }

    revalidatePath('/quizzes');
    redirect('/quizzes');
}
