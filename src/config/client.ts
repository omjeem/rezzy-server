import axios from "axios";
import { envConfig } from "./envConfig";
import OpenAI from "openai";


export const weaviateClient = axios.create({
    baseURL: `${envConfig.weaviate.endpoint}/v1`,
    headers: {
        "Content-Type": "application/json",
        "X-OpenAI-Api-Key": envConfig.openAiKey,
        "Authorization": `Bearer ${envConfig.weaviate.apiKey}`
    }
});

export const openaiClient = new OpenAI({
    apiKey: envConfig.openAiKey
});
