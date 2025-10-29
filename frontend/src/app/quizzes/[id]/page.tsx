import Link from 'next/link';
import api from '@/lib/api';

import type { QuizDetails } from '@/types/quiz';

export default async function QuizDetails({
    params,
}: {
    params: { id: string };
}) {
    const { id } = await params;
    const { data: quiz } = await api.get<QuizDetails>(`/quizzes/${id}`);

    return (
        <main className="p-8">
            <Link
                href="/quizzes"
                className="text-blue-500 underline mb-4 inline-block"
            >
                Back to all quizzes
            </Link>
            <h1 className="text-2xl font-bold mb-2">{quiz.title}</h1>
            <ul className="space-y-4">
                {quiz.questions.map((q) => (
                    <li key={q.id} className="border p-4 rounded">
                        <p className="font-medium">{q.text}</p>
                        <p className="text-sm text-gray-500">Type: {q.type}</p>
                        {q.options?.length > 0 && (
                            <ul className="list-disc pl-6 mt-2">
                                {q.options.map((opt) => (
                                    <li key={opt.id}>{opt.text}</li>
                                ))}
                            </ul>
                        )}
                    </li>
                ))}
            </ul>
        </main>
    );
}
