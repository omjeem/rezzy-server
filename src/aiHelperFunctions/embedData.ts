import questionData from "./datasets/indian-medical-pg-questions.json"
import flashCardsData from "./datasets/indian-medical-pg-flashcards.json"
import { getDataInBatches } from "../config/dataBatches";
import { VectorSchemaClass } from "./model";
import axios from "axios";
import { envConfig } from "../config/envConfig";


async function insertData(formattedData: any, k: number) {
    await axios.post(
        `${envConfig.weaviate.endpoint}/v1/batch/objects`,
        { objects: formattedData },
        {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${envConfig.weaviate.apiKey}`,
                "X-OpenAI-Api-Key": envConfig.openAiKey
            }
        }
    ).then(res => {
        console.log("Response data is of success batch", k)
        const response = res.data
        response.map((r: any) => {
            if (r?.result?.errors) {
                throw new Error("Error occured at ",)
            }
            console.log("result is if error>>", r?.result?.errors)
        })
    }).catch(error => {
        console.log("Error while creating the embedding >>>", error.response)
    })
}

async function insertQuestionsData() {

    const largeData = questionData.questions

    for (let k = 1; true; k++) {
        const batch = getDataInBatches(largeData, k, 10);
        if (batch.length === 0) {
            console.log("All Questions data insersted successfully")
            return;
        }
        const formattedData = batch.map((b: any) => {
            return {
                id: b.id,
                class: VectorSchemaClass.Question,
                properties: {
                    question_text: b.question_text,
                    explanation: b.explanation,
                    subject: b.subject,
                    topic: b.topic,
                    options: Buffer.from(JSON.stringify(b.options)).toString("base64")
                }
            }
        })

        await insertData(formattedData, k)
    }


}

async function insertFlashCardData() {

    const largeData = flashCardsData.flashcards
    for (let k = 1; true; k++) {
        const batch = getDataInBatches(largeData, k, 10);
        if (batch.length === 0) {
            console.log("All Flash card data insersted successfully")
            return;
        }
        const formattedData = batch.map((b: any) => {
            return {
                id: b.id,
                class: VectorSchemaClass.Flashcard,
                properties: {
                    front_content: b.front_content,
                    back_content: b.back_content,
                    subject: b.subject,
                    topic: b.topic,
                    card_type: b.card_type,
                    card_variant: b.card_variant,
                    options: Buffer.from(JSON.stringify(b.image_urls)).toString("base64")
                }
            }
        })
        await insertData(formattedData, k)
    }

}

export async function insertDataForEmbedding() {
    await insertFlashCardData()
    await insertQuestionsData()
}
