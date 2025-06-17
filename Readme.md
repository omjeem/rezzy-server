# 🧠 AI-powered Study Assistant using Weaviate + OpenAI

This project is an AI-powered study assistant that uses **Weaviate Vector Database** and **OpenAI Embeddings** to store and search through educational content such as flashcards and exam questions. It utilizes an LLM to interpret natural language queries and intelligently fetch the most relevant study materials.

---

## 🚀 Features

- ✅ Semantic search via `text2vec-openai` embeddings
- ✅ Supports Flashcards and Multiple-choice Questions
- ✅ Vector storage and retrieval using Weaviate GraphQL
- ✅ Natural Language Query Analysis via OpenAI LLM
- ✅ Base64-safe blob encoding for complex fields like options/images

---

## 📁 Environment Variables

Create a `.env` file at the root of your project with the following variables:

```env
PORT=8009
OPEN_AI_KEY=your_openai_api_key
WEAVIATE_ENDPOINT=https://your-weaviate-instance.weaviate.cloud
WEAVIATE_APIKEY=your_weaviate_api_key
```

## 📁 Installation and run

npm install 
num run build && npm run start

## 🧠 Embedding Workflow
Weaviate uses the text2vec-openai module to generate vector embeddings automatically on insert, using the OpenAI model text-embedding-3-small.

You don't need to manually generate embeddings. Just ensure the schema is set up correctly, and insert your documents.

## 📌 One-time Route to Initialize Schema and Embed Data
```
GET /embed-data
```
This will:

Create the Flashcard and Question classes (if not already present)

Read raw .json files

Upload & vectorize flashcard and question data into Weaviate

Make sure you run the backend and hit this route only once during setup to avoid duplicate insertions.



