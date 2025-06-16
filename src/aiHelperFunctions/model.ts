import { VectorSchemaClass } from "../config/interface";

export const questionSchema = {
    class: VectorSchemaClass.Question,
    description: "Exam questions with explanations and multiple choice options",
    vectorizer: "text2vec-openai",
    moduleConfig: {
        "text2vec-openai": { vectorizeClassName: false }
    },
    properties: [
        { name: "question_text", dataType: ["text"] },
        { name: "explanation", dataType: ["text"] },
        { name: "subject", dataType: ["text"] },
        { name: "topic", dataType: ["text"] },
        { name: "options", dataType: ["blob"] }
    ]
};

export const flashCardSchema = {
    class: VectorSchemaClass.Flashcard,
    description: "Flashcards with front-back content and metadata",
    vectorizer: "text2vec-openai",
    moduleConfig: {
        "text2vec-openai": { vectorizeClassName: false }
    },
    properties: [
        { name: "front_content", dataType: ["text"] },
        { name: "back_content", dataType: ["text"] },
        { name: "subject", dataType: ["text"] },
        { name: "topic", dataType: ["text"] },
        { name: "card_type", dataType: ["text"] },
        { name: "card_variant", dataType: ["text"] },
        { name: "image_urls", dataType: ["blob"] }
    ]
};

