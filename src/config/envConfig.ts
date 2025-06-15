import dotenv from "dotenv"
import z from "zod"
dotenv.config()

const envVarsSchemma = z.object({
    PORT: z.string().transform((val) => parseInt(val, 10))
})

const envVars = envVarsSchemma.parse(process.env)

export const envConfig = {
    port: envVars.PORT
}

console.log("Env File", envVars)

