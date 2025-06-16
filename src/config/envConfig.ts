import dotenv from "dotenv"
import z from "zod"
dotenv.config()

const envVarsSchemma = z.object({
    PORT: z.string().transform((val) => parseInt(val, 10)),
    OPEN_AI_KEY: z.string(),
    WEAVIATE_ENDPOINT: z.string(),
    WEAVIATE_APIKEY :z.string()
})

const envVars = envVarsSchemma.parse(process.env)

export const envConfig = {
    port: envVars.PORT,
    openAiKey: envVars.OPEN_AI_KEY,
    weaviate : {
        endpoint : envVars.WEAVIATE_ENDPOINT,
        apiKey : envVars.WEAVIATE_APIKEY
    }
}

