# AI / RAG PDF Chatbot

An AI-powered document question-answering system using PDF ingestion, embeddings, vector search and generative AI.

## Features
- **PDF Upload**: Upload arbitrary PDFs for automated ingestion.
- **Recursive Chunking**: Configurable chunk size and overlap for context preservation.
- **Vector Search**: Semantic nearest-neighbor retrieval.
- **Gemini API Integration**: Accurate, context-grounded reasoning without hallucination.
- **Interactive Chat**: Streamlit chat interface with expandable context references.

## Installation & Running

```bash
# 1. Install dependencies
pip install -r requirements.txt

# 2. Run the application
streamlit run app.py
```

## Architecture
```
PDF Document -> Text Extraction -> Recursive Splitting -> Vector Embeddings -> ChromaDB / Top-K Search -> Gemini LLM -> Grounded Answer
```
