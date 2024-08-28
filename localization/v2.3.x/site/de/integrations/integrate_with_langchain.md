---
id: integrate_with_langchain.md
summary: >-
  This page goes over how to search for the best answer to questions using
  Milvus as the Vector Database and LangChain as the embedding system.
title: Question Answering over Documents with Milvus and LangChain
---
<h1 id="Question-Answering-over-Documents-with-Milvus-and-LangChain" class="common-anchor-header">Question Answering over Documents with Milvus and LangChain<button data-href="#Question-Answering-over-Documents-with-Milvus-and-LangChain" class="anchor-icon" translate="no">
      <svg translate="no"
        aria-hidden="true"
        focusable="false"
        height="20"
        version="1.1"
        viewBox="0 0 16 16"
        width="16"
      >
        <path
          fill="#0092E4"
          fill-rule="evenodd"
          d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"
        ></path>
      </svg>
    </button></h1><p>This guide demonstrates how to build an LLM-driven question-answering application with Milvus and LangChain.</p>
<h2 id="Before-you-begin" class="common-anchor-header">Before you begin<button data-href="#Before-you-begin" class="anchor-icon" translate="no">
      <svg translate="no"
        aria-hidden="true"
        focusable="false"
        height="20"
        version="1.1"
        viewBox="0 0 16 16"
        width="16"
      >
        <path
          fill="#0092E4"
          fill-rule="evenodd"
          d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"
        ></path>
      </svg>
    </button></h2><p>Code snippets on this page require <strong>pymilvus</strong> and <strong>langchain</strong> installed. OpenAI’s embedding API has also been used to embed docs into the vector store, and therefore <strong>openai</strong> and <strong>tiktoken</strong> are also required. If they are not present on your system, run the following commands to install them.</p>
<pre><code translate="no" class="language-shell">! python -m pip install --upgrade pymilvus langchain openai tiktoken
<button class="copy-code-btn"></button></code></pre>
<h2 id="Global-parameters" class="common-anchor-header">Global parameters<button data-href="#Global-parameters" class="anchor-icon" translate="no">
      <svg translate="no"
        aria-hidden="true"
        focusable="false"
        height="20"
        version="1.1"
        viewBox="0 0 16 16"
        width="16"
      >
        <path
          fill="#0092E4"
          fill-rule="evenodd"
          d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"
        ></path>
      </svg>
    </button></h2><p>In this section, you need to set up all parameters to be used in the following code snippets.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> os

<span class="hljs-comment"># 1. Set up the name of the collection to be created.</span>
COLLECTION_NAME = <span class="hljs-string">&#x27;doc_qa_db&#x27;</span>

<span class="hljs-comment"># 2. Set up the dimension of the embeddings.</span>
DIMENSION = <span class="hljs-number">768</span>

<span class="hljs-comment"># 3. Set up the cohere api key</span>
OPENAI_API_KEY = <span class="hljs-string">&quot;YOUR_OPENAI_API_KEY&quot;</span>
os.environ[<span class="hljs-string">&quot;OPENAI_API_KEY&quot;</span>] = OPENAI_API_KEY

<span class="hljs-comment"># 4. Set up the connection parameters for your Zilliz Cloud cluster.</span>
URI = <span class="hljs-string">&#x27;YOUR_CLUSTER_ENDPOINT&#x27;</span>

<span class="hljs-comment"># 5. Set up the token for your Zilliz Cloud cluster.</span>
<span class="hljs-comment"># You can either use an API key or a set of cluster username and password joined by a colon.</span>
TOKEN = <span class="hljs-string">&#x27;YOUR_CLUSTER_TOKEN&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Prepare-data" class="common-anchor-header">Prepare data<button data-href="#Prepare-data" class="anchor-icon" translate="no">
      <svg translate="no"
        aria-hidden="true"
        focusable="false"
        height="20"
        version="1.1"
        viewBox="0 0 16 16"
        width="16"
      >
        <path
          fill="#0092E4"
          fill-rule="evenodd"
          d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"
        ></path>
      </svg>
    </button></h2><p>Before you dive in, you should finish the following steps:</p>
<ul>
<li>Prepare the documents you want the LLM to peak at when it thinks.</li>
<li>Set up an embedding model to convert documents into vector embeddings.</li>
<li>Set up a vector store used to save the vector embeddings.</li>
</ul>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> langchain.embeddings.openai <span class="hljs-keyword">import</span> OpenAIEmbeddings
<span class="hljs-keyword">from</span> langchain.vectorstores.zilliz <span class="hljs-keyword">import</span> Zilliz
<span class="hljs-keyword">from</span> langchain.document_loaders <span class="hljs-keyword">import</span> WebBaseLoader
<span class="hljs-keyword">from</span> langchain.text_splitter <span class="hljs-keyword">import</span> RecursiveCharacterTextSplitter
<span class="hljs-keyword">from</span> langchain.chat_models <span class="hljs-keyword">import</span> ChatOpenAI
<span class="hljs-keyword">from</span> langchain.vectorstores.milvus <span class="hljs-keyword">import</span> Milvus
<span class="hljs-keyword">from</span> langchain.schema.runnable <span class="hljs-keyword">import</span> RunnablePassthrough
<span class="hljs-keyword">from</span> langchain.prompts <span class="hljs-keyword">import</span> PromptTemplate

<span class="hljs-comment"># Use the WebBaseLoader to load specified web pages into documents</span>
loader = WebBaseLoader([
    <span class="hljs-string">&#x27;https://milvus.io/docs/overview.md&#x27;</span>,
    <span class="hljs-string">&#x27;https://milvus.io/docs/release_notes.md&#x27;</span>,
    <span class="hljs-string">&#x27;https://milvus.io/docs/architecture_overview.md&#x27;</span>,
    <span class="hljs-string">&#x27;https://milvus.io/docs/four_layers.md&#x27;</span>,
    <span class="hljs-string">&#x27;https://milvus.io/docs/main_components.md&#x27;</span>,
    <span class="hljs-string">&#x27;https://milvus.io/docs/data_processing.md&#x27;</span>,
    <span class="hljs-string">&#x27;https://milvus.io/docs/bitset.md&#x27;</span>,
    <span class="hljs-string">&#x27;https://milvus.io/docs/boolean.md&#x27;</span>,
    <span class="hljs-string">&#x27;https://milvus.io/docs/consistency.md&#x27;</span>,
    <span class="hljs-string">&#x27;https://milvus.io/docs/coordinator_ha.md&#x27;</span>,
    <span class="hljs-string">&#x27;https://milvus.io/docs/replica.md&#x27;</span>,
    <span class="hljs-string">&#x27;https://milvus.io/docs/knowhere.md&#x27;</span>,
    <span class="hljs-string">&#x27;https://milvus.io/docs/schema.md&#x27;</span>,
    <span class="hljs-string">&#x27;https://milvus.io/docs/dynamic_schema.md&#x27;</span>,
    <span class="hljs-string">&#x27;https://milvus.io/docs/json_data_type.md&#x27;</span>,
    <span class="hljs-string">&#x27;https://milvus.io/docs/metric.md&#x27;</span>,
    <span class="hljs-string">&#x27;https://milvus.io/docs/partition_key.md&#x27;</span>,
    <span class="hljs-string">&#x27;https://milvus.io/docs/multi_tenancy.md&#x27;</span>,
    <span class="hljs-string">&#x27;https://milvus.io/docs/timestamp.md&#x27;</span>,
    <span class="hljs-string">&#x27;https://milvus.io/docs/users_and_roles.md&#x27;</span>,
    <span class="hljs-string">&#x27;https://milvus.io/docs/index.md&#x27;</span>,
    <span class="hljs-string">&#x27;https://milvus.io/docs/disk_index.md&#x27;</span>,
    <span class="hljs-string">&#x27;https://milvus.io/docs/scalar_index.md&#x27;</span>,
    <span class="hljs-string">&#x27;https://milvus.io/docs/performance_faq.md&#x27;</span>,
    <span class="hljs-string">&#x27;https://milvus.io/docs/product_faq.md&#x27;</span>,
    <span class="hljs-string">&#x27;https://milvus.io/docs/operational_faq.md&#x27;</span>,
    <span class="hljs-string">&#x27;https://milvus.io/docs/troubleshooting.md&#x27;</span>,
])

docs = loader.load()

<span class="hljs-comment"># Split the documents into smaller chunks</span>
text_splitter = RecursiveCharacterTextSplitter(chunk_size=<span class="hljs-number">1024</span>, chunk_overlap=<span class="hljs-number">0</span>)
all_splits = text_splitter.split_documents(docs)
<button class="copy-code-btn"></button></code></pre>
<p>After preparing the documents, the next step is to convert them into vector embeddings and save them in the vector store.</p>
<pre><code translate="no" class="language-python">embeddings = OpenAIEmbeddings()
connection_args = { <span class="hljs-string">&#x27;uri&#x27;</span>: URI, <span class="hljs-string">&#x27;token&#x27;</span>: TOKEN }

vector_store = Milvus(
    embedding_function=embeddings,
    connection_args=connection_args,
    collection_name=COLLECTION_NAME,
    drop_old=<span class="hljs-literal">True</span>,
).from_documents(
    all_splits,
    embedding=embeddings,
    collection_name=COLLECTION_NAME,
    connection_args=connection_args,
)
<button class="copy-code-btn"></button></code></pre>
<p>To perform text-to-text similarity searches, use the following code snippet. The results will return the most relevant text in the document to the queries.</p>
<pre><code translate="no" class="language-python">query = <span class="hljs-string">&quot;What are the main components of Milvus?&quot;</span>
docs = vector_store.similarity_search(query)

<span class="hljs-built_in">print</span>(<span class="hljs-built_in">len</span>(docs))
<button class="copy-code-btn"></button></code></pre>
<p>The output should be similar to the following:</p>
<pre><code translate="no" class="language-shell">4
<button class="copy-code-btn"></button></code></pre>
<h2 id="Ask-your-question" class="common-anchor-header">Ask your question<button data-href="#Ask-your-question" class="anchor-icon" translate="no">
      <svg translate="no"
        aria-hidden="true"
        focusable="false"
        height="20"
        version="1.1"
        viewBox="0 0 16 16"
        width="16"
      >
        <path
          fill="#0092E4"
          fill-rule="evenodd"
          d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"
        ></path>
      </svg>
    </button></h2><p>After preparing the documents, you can set up a chain to include them in a prompt. This will allow LLM to use the docs as a reference when preparing answers.</p>
<p>The following code snippet sets up a RAG chain using OpenAI as the LLM and a RAG prompt.</p>
<pre><code translate="no" class="language-python">llm = ChatOpenAI(model_name=<span class="hljs-string">&quot;gpt-3.5-turbo&quot;</span>, temperature=<span class="hljs-number">0</span>) 
retriever = vector_store.as_retriever()

template = <span class="hljs-string">&quot;&quot;&quot;Use the following pieces of context to answer the question at the end. 
If you don&#x27;t know the answer, just say that you don&#x27;t know, don&#x27;t try to make up an answer. 
Use three sentences maximum and keep the answer as concise as possible. 
Always say &quot;thanks for asking!&quot; at the end of the answer. 
{context}
Question: {question}
Helpful Answer:&quot;&quot;&quot;</span>
rag_prompt = PromptTemplate.from_template(template)

rag_chain = (
    {<span class="hljs-string">&quot;context&quot;</span>: retriever, <span class="hljs-string">&quot;question&quot;</span>: RunnablePassthrough()}
    | rag_prompt
    | llm
)

<span class="hljs-built_in">print</span>(rag_chain.invoke(<span class="hljs-string">&quot;Explain IVF_FLAT in Milvus.&quot;</span>))
<button class="copy-code-btn"></button></code></pre>
<p>The returned results include a content argument as the output_text.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Output</span>
<span class="hljs-comment">#</span>
<span class="hljs-comment"># content=&#x27;IVF_FLAT is an index mechanism in Milvus that divides a vector space into clusters. It compares the distances between a target vector and the centers of all clusters to find the nearest clusters. Then, it compares the distances between the target vector and the vectors in the selected clusters to find the nearest vectors. IVF_FLAT demonstrates performance advantages when the number of vectors exceeds the value of nlist. Thanks for asking!&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
