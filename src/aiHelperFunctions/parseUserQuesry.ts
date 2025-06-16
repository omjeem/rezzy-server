import { openaiClient } from '../config/client';


export async function parseUserQuery(input: string) {

    const systemPrompt = `
        You are a helpful assistant for a medical education app that supports two types of content:
        
        1. "flashcard" — concise Q&A-style cards with a front (prompt) and back (answer), e.g., "Griseofulvin will _____ serum levels of warfarin" → "decrease".
        2. "Question" — multiple-choice exam-style questions with four options and an explanation of the answer.
        
        Your task is to extract structured instructions from a user query. Always return **only** a JSON object with the following fields:
        
        - "type": either "flashcard" or "question" (default to "question" if not specified),
        - "query": the main topic the user is asking about,
        - "limit": number of results (default to 5 if not specified).
        `;

    const res = await openaiClient.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: input }
        ],
        temperature: 0.2
    });

    const data = res.choices[0].message.content || "{}"
    return JSON.parse(data)

}
