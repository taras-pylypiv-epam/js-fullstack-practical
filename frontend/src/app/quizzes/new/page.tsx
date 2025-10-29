import { redirect } from 'next/navigation';
import api from '@/lib/api';

export async function createQuiz(formData: FormData) {
    'use server';

    const title = formData.get('title')?.toString().trim();

    if (!title) {
        throw new Error('Title is required');
    }

    await api.post('/quizzes', {
        title,
        questions: [
            {
                text: 'test question',
                type: 'BOOLEAN',
            },
        ],
    });

    redirect('/quizzes');
}

export default function NewQuizPage() {
    return (
        <main className="min-h-screen flex items-center justify-center bg-black p-4 text-gray-100">
            <form
                action={createQuiz}
                className="bg-neutral-900 border border-neutral-800 rounded-lg p-6 w-full max-w-md shadow-md space-y-4"
            >
                <h1 className="text-xl font-semibold text-white text-center">
                    Create New Quiz
                </h1>

                <div className="space-y-1">
                    <label
                        htmlFor="title"
                        className="block text-sm font-medium text-gray-300"
                    >
                        Quiz Title <span className="text-red-500">*</span>
                    </label>
                    <input
                        id="title"
                        name="title"
                        type="text"
                        required
                        placeholder="Enter quiz title"
                        className="w-full bg-neutral-800 border border-neutral-700 rounded-md p-2 text-sm text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 rounded-md transition"
                >
                    Create Quiz
                </button>
            </form>
        </main>
    );
}
