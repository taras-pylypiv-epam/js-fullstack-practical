export interface Quiz {
    id: string;
    title: string;
    questionsCount: number;
}

export enum QuestionType {
    BOOLEAN = 'BOOLEAN',
    INPUT = 'INPUT',
    MULTIPLE = 'MULTIPLE',
}

export interface QuestionOption {
    id: string;
    text: string;
}

export interface Question {
    id: string;
    text: string;
    type: QuestionType;
    options: QuestionOption[]
}

export interface QuizDetails {
    id: string;
    title: string;
    questions: Question[];
}
