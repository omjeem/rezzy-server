import express, { Request, Response } from "express"
import cors from "cors"
import { envConfig } from "./config/envConfig"
import { parseUserQuery } from "./aiHelperFunctions/parseUserQuesry"
import { queryOnFlashCardAndQuestions } from "./aiHelperFunctions/queryData"


const app = express()
app.use(cors())
app.use(express.json())

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

app.listen(envConfig.port, () => {
    console.log(`Server url is http://localhost:${envConfig.port}`)
})
