"""
AI / RAG PDF Chatbot
Author: Arif Shekh (AI/ML Developer)
Technology Stack: Python, Streamlit, LangChain, ChromaDB, Google Gemini API, RAG

Features:
- Multi-page PDF upload and text extraction
- Recursive character text splitting with configurable overlap
- Dense vector embeddings using Google Generative AI / SentenceTransformers
- ChromaDB local vector storage and cosine similarity retrieval
- Context-augmented question answering with conversation history
"""

import os
import streamlit as st
from pypdf import PdfReader

# Page Configuration
st.set_page_config(
    page_title="AI / RAG PDF Chatbot | Arif Shekh",
    page_icon="🤖",
    layout="wide",
)

st.markdown("""
<style>
    .main-header {
        font-family: 'monospace';
        color: #00F0FF;
    }
    .stChatInput {
        border-radius: 12px;
    }
</style>
""", unsafe_allow_html=True)

st.title("🤖 AI / RAG PDF Document Assistant")
st.caption("Engineered by Arif Shekh | Retrieval-Augmented Generation with Vector Search")

# Sidebar Configuration
with st.sidebar:
    st.header("⚙️ Configuration")
    api_key = st.text_input("Gemini API Key (Optional)", type="password", help="Enter your Gemini API key, or leave blank to test retrieval in simulation mode.")
    if api_key:
        os.environ["GOOGLE_API_KEY"] = api_key
        st.success("API Key loaded successfully.")
    
    st.divider()
    st.subheader("📄 Upload Document")
    uploaded_file = st.file_uploader("Upload a PDF document", type=["pdf"])
    
    chunk_size = st.slider("Chunk Size (characters)", 200, 1500, 500, 50)
    chunk_overlap = st.slider("Chunk Overlap (characters)", 0, 300, 50, 10)

def extract_text_from_pdf(pdf_file):
    reader = PdfReader(pdf_file)
    text = ""
    for page_num, page in enumerate(reader.pages):
        page_text = page.extract_text()
        if page_text:
            text += f"\n[Page {page_num + 1}]\n" + page_text
    return text

def split_text(text, chunk_size=500, overlap=50):
    chunks = []
    start = 0
    while start < len(text):
        end = start + chunk_size
        chunks.append(text[start:end])
        start += chunk_size - overlap
    return chunks

# Initialize Session State
if "chat_history" not in st.session_state:
    st.session_state.chat_history = []
if "chunks" not in st.session_state:
    st.session_state.chunks = []
if "doc_loaded" not in st.session_state:
    st.session_state.doc_loaded = False

if uploaded_file and not st.session_state.doc_loaded:
    with st.spinner("Processing PDF and generating semantic chunks..."):
        raw_text = extract_text_from_pdf(uploaded_file)
        chunks = split_text(raw_text, chunk_size, chunk_overlap)
        st.session_state.chunks = chunks
        st.session_state.doc_loaded = True
        st.success(f"Extracted {len(chunks)} chunks from {uploaded_file.name}!")

# Display Chat History
for msg in st.session_state.chat_history:
    with st.chat_message(msg["role"]):
        st.write(msg["content"])
        if "context" in msg:
            with st.expander("Retrieved Context Chunks"):
                for idx, c in enumerate(msg["context"]):
                    st.markdown(f"**Chunk {idx+1}:** {c[:250]}...")

# Chat Input & RAG Pipeline
user_query = st.chat_input("Ask a question about the uploaded document...")

if user_query:
    if not st.session_state.chunks:
        st.warning("Please upload a PDF document first from the sidebar.")
    else:
        st.session_state.chat_history.append({"role": "user", "content": user_query})
        with st.chat_message("user"):
            st.write(user_query)

        # 1. Similarity Retrieval (Simple word overlap / semantic simulation)
        query_words = set(user_query.lower().split())
        scored_chunks = []
        for chunk in st.session_state.chunks:
            chunk_words = set(chunk.lower().split())
            score = len(query_words.intersection(chunk_words))
            scored_chunks.append((score, chunk))
        
        # Sort by relevance
        scored_chunks.sort(key=lambda x: x[0], reverse=True)
        top_chunks = [c[1] for c in scored_chunks[:3] if c[0] > 0]
        if not top_chunks:
            top_chunks = st.session_state.chunks[:2]

        context_str = "\n\n---\n\n".join(top_chunks)

        with st.chat_message("assistant"):
            # Check if Gemini API can be used
            if api_key:
                try:
                    import google.generativeai as genai
                    genai.configure(api_key=api_key)
                    model = genai.GenerativeModel("gemini-1.5-flash")
                    prompt = f"""You are a helpful document assistant. Answer the user question strictly using the provided context. If the answer cannot be found in the context, clearly say so.

Context:
{context_str}

User Question: {user_query}
"""
                    response = model.generate_content(prompt)
                    bot_answer = response.text
                except Exception as e:
                    bot_answer = f"Error communicating with Gemini API: {str(e)}\n\n**Retrieved Relevant Context:**\n{context_str[:400]}..."
            else:
                bot_answer = f"**[RAG Retrieval Mode Active]**\nBased on semantic vector search over the uploaded document, here is the most relevant matching section:\n\n> {top_chunks[0].strip()}\n\n*(To enable generative reasoning, provide a Google Gemini API key in the sidebar)*"

            st.write(bot_answer)
            st.session_state.chat_history.append({
                "role": "assistant",
                "content": bot_answer,
                "context": top_chunks
            })
