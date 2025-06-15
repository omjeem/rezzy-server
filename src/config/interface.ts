export interface Question {
    id: string; topic: string; subtopic: string; question: string;
    type: "multiple_choice" | "true_false" | "short_answer";
    options?: string[]; correct_answer: string; difficulty: "easy" | "medium" | "hard";
    tags: string[];
}

export interface Flashcard {
    id: string; topic: string; subtopic: string; front: string; back: string;
    difficulty: "easy" | "medium" | "hard"; tags: string[];
}
