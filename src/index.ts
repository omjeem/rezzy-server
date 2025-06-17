import express, { Request, Response } from "express"
import cors from "cors"
import { envConfig } from "./config/envConfig"
import { parseUserQuery } from "./aiHelperFunctions/parseUserQuesry"
import { queryOnFlashCardAndQuestions } from "./aiHelperFunctions/queryData"
import { createSchemaForVectors } from "./aiHelperFunctions/createSchema"
import { insertDataForEmbedding } from "./aiHelperFunctions/embedData"
import questionData from "./datasets/indian-medical-pg-questions.json"
import flashCardData from "./datasets/indian-medical-pg-flashcards.json"


const app = express()
app.use(cors())
app.use(express.json())


const createSchemaAndEmbedData = async () => {
    await createSchemaForVectors();
    await insertDataForEmbedding()
}

app.get("/embed-data", async (req: Request, res: Response): Promise<any> => {
    createSchemaAndEmbedData()
    return res.status(200).send({
        status: true,
        message: "Doc Embedding started"
    })
})


app.post("/", async (req: Request, res: Response): Promise<any> => {
    try {
        const { query } = req.body
        if (!query) {
            throw new Error("Query is required")
        }
        const parsed = await parseUserQuery(String(query))
        console.log("Parsed value is ", parsed)
        const type = parsed.type
        const queryText = parsed.query
        const limit = parsed.limit

        const response = await queryOnFlashCardAndQuestions(queryText, limit, type === "question")

        return res.send({
            status: true,
            response: response
        })

    } catch (error: any) {
        const message = error?.message || "Error while querying"
        return res.status(400).json({
            status: false,
            error: message
        })
    }
})

app.get("/health", async (req: Request, res: Response): Promise<any> => {
    return res.status(200).send({
        status: true,
        message: "Welcome to regzy server"
    })
})

app.listen(envConfig.port, () => {
    console.log(`Server url is http://localhost:${envConfig.port}`)
})
