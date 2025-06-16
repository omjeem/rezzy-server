import express from "express"
import { envConfig } from "./config/envConfig"



const app = express()





app.listen(envConfig.port, () => {
    console.log(`Server url is http://localhost:${envConfig.port}`)
})
