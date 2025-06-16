import { weaviateClient } from "../config/client";
import { flashCardSchema, questionSchema } from "./model";

async function createSchema(schema: any) {
    try {
        const res = await weaviateClient.post("/schema", schema);
        console.log("Schema created >>>> ", res.data)
        console.log(`✅ Created schema: ${schema.class}`);
    } catch (err: any) {
        if (err.response?.status === 422) {
            console.log(`ℹ️  ${schema.class} already exists.`);
        } else {
            console.log("Erroris >>>>>> ", err.response)
            console.error(`❌ Failed to create ${schema.class}`, err.message);
        }
    }
}

export async function createSchemaForVectors() {
    await createSchema(flashCardSchema);
    await createSchema(questionSchema)
}

