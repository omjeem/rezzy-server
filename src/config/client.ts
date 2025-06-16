import axios from "axios";
import { envConfig } from "./envConfig";


export const weaviateClient = axios.create({
    baseURL: `${envConfig.weaviate.endpoint}/v1`,
    headers: {
        "Content-Type": "application/json",
        "X-OpenAI-Api-Key": envConfig.openAiKey,
        "Authorization": `Bearer ${envConfig.weaviate.apiKey}`
    }
});