'use client';

import { useState } from 'react';
import { createQuiz } from '@/app/quizzes/create/actions';
import { QuestionType } from '@/types/quiz';

export default function NewQuizPage() {
    const [title, setTitle] = useState('');
    const [questions, setQuestions] = useState<any[]>([]);
    const [error, setError] = useState<string | null>(null);

    const addQuestion = () => {
        setQuestions([
            ...questions,
            { text: '', type: QuestionType.INPUT, options: [] },
        ]);
    };

    const removeQuestion = (index: number) => {
        setQuestions(questions.filter((_, i) => i !== index));
    };

    const updateQuestion = (index: number, field: string, value: any) => {
        const updated = [...questions];
        updated[index][field] = value;
        setQuestions(updated);
    };

    const addOption = (index: number) => {
        const updated = [...questions];
        updated[index].options = [...(updated[index].options || []), ''];
        setQuestions(updated);
    };

    const updateOption = (qIndex: number, oIndex: number, value: string) => {
        const updated = [...questions];
        updated[qIndex].options[oIndex] = value;
        setQuestions(updated);
    };

    const removeOption = (qIndex: number, oIndex: number) => {
        const updated = [...questions];
        updated[qIndex].options.splice(oIndex, 1);
        setQuestions(updated);
    };

    return (
        <main className="min-h-screen flex items-center justify-center bg-black p-4 text-gray-100">
            <form
                action={async (formData) => {
                    formData.append('questions', JSON.stringify(questions));
                    try {
                        await createQuiz(formData);
                    } catch (err: any) {
                        setError(err.message);
                    }
                }}
                className="bg-neutral-900 border border-neutral-800 rounded-lg p-6 w-full max-w-2xl shadow-md space-y-4"
            >
                <h1 className="text-xl font-semibold text-white text-center">
                    Create New Quiz
                </h1>

                <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-300">
                        Title <span className="text-red-500">*</span>
                    </label>
                    <input
                        name="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full bg-neutral-800 border border-neutral-700 rounded-md p-2 text-sm text-gray-100 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        required
                    />
                </div>

                <div className="space-y-3">
                    <div className="flex justify-between items-center">
                        <h2 className="font-medium text-gray-200">Questions</h2>
                        <button
                            type="button"
                            onClick={addQuestion}
                            className="text-blue-400 hover:text-blue-300 text-sm"
                        >
                            + Add Question
                        </button>
                    </div>

                    {questions.map((q, index) => (
                        <div
                            key={index}
                            className="border border-neutral-700 rounded-md p-4 space-y-3 bg-neutral-800"
                        >
                            <div className="flex justify-between items-center">
                                <label className="text-sm font-medium text-gray-300">
                                    Question {index + 1}
                                </label>
                                <button
                                    type="button"
                                    onClick={() => removeQuestion(index)}
                                    className="text-red-400 hover:text-red-300 text-xs"
                                >
                                    Remove
                                </button>
                            </div>

                            <input
                                type="text"
                                placeholder="Enter question text"
                                value={q.text}
                                onChange={(e) =>
                                    updateQuestion(
                                        index,
                                        'text',
                                        e.target.value
                                    )
                                }
                                className="w-full bg-neutral-900 border border-neutral-700 rounded-md p-2 text-sm text-gray-100 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />

                            <div className="space-y-1">
                                <label className="text-sm text-gray-400">
                                    Type
                                </label>
                                <select
                                    value={q.type}
                                    onChange={(e) =>
                                        updateQuestion(
                                            index,
                                            'type',
                                            e.target.value
                                        )
                                    }
                                    className="w-full bg-neutral-900 border border-neutral-700 rounded-md p-2 text-sm text-gray-100 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                >
                                    <option value={QuestionType.INPUT}>
                                        Text Input
                                    </option>
                                    <option value={QuestionType.BOOLEAN}>
                                        True / False
                                    </option>
                                    <option value={QuestionType.MULTIPLE}>
                                        Multiple Choice
                                    </option>
                                </select>
                            </div>

                            {q.type === 'checkbox' && (
                                <div className="space-y-2 mt-2">
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm text-gray-400">
                                            Options
                                        </span>
                                        <button
                                            type="button"
                                            onClick={() => addOption(index)}
                                            className="text-blue-400 hover:text-blue-300 text-xs"
                                        >
                                            + Add Option
                                        </button>
                                    </div>

                                    {(q.options || []).map(
                                        (opt: string, optIdx: number) => (
                                            <div
                                                key={optIdx}
                                                className="flex items-center gap-2 text-sm"
                                            >
                                                <input
                                                    type="text"
                                                    value={opt}
                                                    onChange={(e) =>
                                                        updateOption(
                                                            index,
                                                            optIdx,
                                                            e.target.value
                                                        )
                                                    }
                                                    placeholder={`Option ${optIdx + 1}`}
                                                    className="flex-1 bg-neutral-900 border border-neutral-700 rounded-md p-2 text-gray-100 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        removeOption(
                                                            index,
                                                            optIdx
                                                        )
                                                    }
                                                    className="text-red-400 hover:text-red-300 text-xs"
                                                >
                                                    ✕
                                                </button>
                                            </div>
                                        )
                                    )}
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {error && <p className="text-red-400 text-sm">{error}</p>}

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
