import { weaviateClient } from "../config/client";
import { VectorSchemaClass } from "./model";

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
        console.log("Results >>>", JSON.stringify(res.data, null, 2));
        return res
    } catch (err: any) {
        console.error("❌ Query failed:", err.response?.data || err.message);
    }
}