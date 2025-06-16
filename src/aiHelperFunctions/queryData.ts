import { weaviateClient } from "../config/client";
import { VectorSchemaClass } from "../config/interface";

export async function queryOnFlashCardAndQuestions(queryData: string, limit: number, isQueryOnQuestion: boolean) {

    let query;

    if (isQueryOnQuestion) query = ` {
        Get {
            ${VectorSchemaClass.Question}(
            nearText: {
                concepts: ["${queryData}"]
            },
            limit: ${limit}
            ) {
                question_text
                explanation
                subject
                topic
                options
            }
        }
        }
        `
    else query = ` {
        Get {
            ${VectorSchemaClass.Flashcard}(
            nearText: {
                concepts: ["${queryData}"]
            },
            limit: ${limit}
            ) {
                front_content
                back_content
                subject
                topic
                card_type
                card_variant
                image_urls
            }
        }
        }
        `
    try {
        const res = await weaviateClient.post("/graphql", { query });
        const data = res.data.data.Get
        let response = []
        if (isQueryOnQuestion) {
            response = data[VectorSchemaClass.Question]?.map((d: any) => {
                const base64Options = d.options;
                const decoded = Buffer.from(base64Options, 'base64').toString('utf-8');
                const options = JSON.parse(decoded);
                return {
                    ...d,
                    options
                }
            })
        } else {
            const flashCardData = data[VectorSchemaClass.Flashcard]
            response = [...flashCardData]
        }
        return {
            type: isQueryOnQuestion ? VectorSchemaClass.Question : VectorSchemaClass.Flashcard,
            data: response
        }

    } catch (err: any) {
        console.error("Query failed:", err.response?.data || err.message);
    }
}