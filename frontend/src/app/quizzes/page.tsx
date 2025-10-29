'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import api from '@/lib/api';

import type { Quiz } from '@/types/quiz';

export default function QuizzesPage() {
    const [quizzes, setQuizzes] = useState<Quiz[]>([]);
    const [loading, setLoading] = useState(true);
    const [deletingId, setDeletingId] = useState<string | null>(null);

    useEffect(() => {
        fetchQuizzes();
    }, []);

    const fetchQuizzes = async () => {
        try {
            const { data } = await api.get('/quizzes');
            setQuizzes(data);
        } catch (error) {
            console.error('Failed to load quizzes', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this quiz?')) return;

        try {
            setDeletingId(id);
            await api.delete(`/quizzes/${id}`);
            setQuizzes((prev) => prev.filter((quiz) => quiz.id !== id));
        } catch (error) {
            console.error('Failed to delete quiz', error);
            alert('Error deleting quiz. Try again.');
        } finally {
            setDeletingId(null);
        }
    };

    if (loading) return <p className="p-8">Loading quizzes...</p>;

    return (
        <main className="p-8">
            <h1 className="text-2xl font-bold mb-4">All Quizzes</h1>

            <Link
                href="/quizzes/new"
                className="inline-block mb-4 text-blue-600 hover:underline"
            >
                + Create New Quiz
            </Link>

            {quizzes.length === 0 ? (
                <p>No quizzes found.</p>
            ) : (
                <ul className="space-y-3">
                    {quizzes.map((quiz) => (
                        <li
                            key={quiz.id}
                            className="flex justify-between items-center border p-4 rounded"
                        >
                            <Link
                                href={`/quizzes/${quiz.id}`}
                                className="flex-1"
                            >
                                <div>
                                    <h2 className="font-semibold text-lg">
                                        {quiz.title}
                                    </h2>
                                    <p className="text-sm text-gray-500">
                                        {quiz.questionsCount} questions
                                    </p>
                                </div>
                            </Link>

                            <button
                                onClick={() => handleDelete(quiz.id)}
                                disabled={deletingId === quiz.id}
                                className={`ml-4 px-3 py-1 rounded text-white ${
                                    deletingId === quiz.id
                                        ? 'bg-gray-400 cursor-not-allowed'
                                        : 'bg-red-600 hover:bg-red-700'
                                }`}
                            >
                                {deletingId === quiz.id
                                    ? 'Deleting...'
                                    : 'Delete'}
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </main>
    );
}
