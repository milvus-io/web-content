---
id: integrate_with_langchain.md
summary: >-
  This page goes over how to search for the best answer to questions using
  Milvus as the Vector Database and LlamaIndex as the embedding system.
title: ''
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
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> os <span class="hljs-keyword">import</span> environ

MILVUS_HOST = <span class="hljs-string">&quot;localhost&quot;</span>
MILVUS_PORT = <span class="hljs-string">&quot;19530&quot;</span>
OPENAI_API_KEY = <span class="hljs-string">&quot;sk-******&quot;</span> <span class="hljs-comment"># example: &quot;sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx&quot;</span>

<span class="hljs-comment">## Set up environment variables</span>
environ[<span class="hljs-string">&quot;OPENAI_API_KEY&quot;</span>] = OPENAI_API_KEY
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
<span class="hljs-keyword">from</span> langchain.vectorstores <span class="hljs-keyword">import</span> Milvus
<span class="hljs-keyword">from</span> langchain.document_loaders <span class="hljs-keyword">import</span> WebBaseLoader
<span class="hljs-keyword">from</span> langchain.text_splitter <span class="hljs-keyword">import</span> CharacterTextSplitter

<span class="hljs-comment"># Use the WebBaseLoader to load specified web pages into documents</span>
loader = WebBaseLoader([
    <span class="hljs-string">&quot;https://milvus.io/docs/overview.md&quot;</span>,
])

docs = loader.load()

<span class="hljs-comment"># Split the documents into smaller chunks</span>
text_splitter = CharacterTextSplitter(chunk_size=<span class="hljs-number">1024</span>, chunk_overlap=<span class="hljs-number">0</span>)
docs = text_splitter.split_documents(docs)
<button class="copy-code-btn"></button></code></pre>
<p>The output of the text splitter would be similar to the following:</p>
<pre><code translate="no" class="language-shell">Created a chunk of size <span class="hljs-number">1745</span>, which <span class="hljs-keyword">is</span> longer than the specified <span class="hljs-number">1024</span>
Created a chunk of size <span class="hljs-number">1278</span>, which <span class="hljs-keyword">is</span> longer than the specified <span class="hljs-number">1024</span>
<button class="copy-code-btn"></button></code></pre>
<p>Once the documents are ready, we need to convert them into vector embeddings and save them into the vector store.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Set up an embedding model to covert document chunks into vector embeddings.</span>
embeddings = OpenAIEmbeddings(model=<span class="hljs-string">&quot;ada&quot;</span>)

<span class="hljs-comment"># Set up a vector store used to save the vector embeddings. Here we use Milvus as the vector store.</span>
vector_store = Milvus.from_documents(
    docs,
    embedding=embeddings,
    connection_args={<span class="hljs-string">&quot;host&quot;</span>: MILVUS_HOST, <span class="hljs-string">&quot;port&quot;</span>: MILVUS_PORT}
)
<button class="copy-code-btn"></button></code></pre>
<p>You can try text-to-text similarity searches using the following code snippet. The results returned will be the most relevant text in the document to the queries.</p>
<pre><code translate="no" class="language-python">query = <span class="hljs-string">&quot;What is milvus?&quot;</span>
docs = vector_store.similarity_search(query)

<span class="hljs-built_in">print</span>(docs)
<button class="copy-code-btn"></button></code></pre>
<p>The output should be similar to the following:</p>
<pre><code translate="no" class="language-shell">[<span class="hljs-title class_">Document</span>(page_content=<span class="hljs-string">&#x27;Milvus workflow.&#x27;</span>, metadata={<span class="hljs-string">&#x27;source&#x27;</span>: <span class="hljs-string">&#x27;https://milvus.io/docs/overview.md&#x27;</span>, <span class="hljs-string">&#x27;title&#x27;</span>: <span class="hljs-string">&#x27;Introduction Milvus documentation&#x27;</span>, <span class="hljs-string">&#x27;description&#x27;</span>: <span class="hljs-string">&#x27;Milvus is an open-source vector database designed specifically for AI application development, embeddings similarity search, and MLOps v2.2.x.&#x27;</span>, <span class="hljs-string">&#x27;language&#x27;</span>: <span class="hljs-string">&#x27;en&#x27;</span>}), <span class="hljs-title class_">Document</span>(page_content=<span class="hljs-string">&quot;Installat...rved.&quot;</span>, metadata={<span class="hljs-string">&#x27;source&#x27;</span>: <span class="hljs-string">&#x27;https://milvus.io/docs/overview.md&#x27;</span>, <span class="hljs-string">&#x27;title&#x27;</span>: <span class="hljs-string">&#x27;Introduction Milvus documentation&#x27;</span>, <span class="hljs-string">&#x27;description&#x27;</span>: <span class="hljs-string">&#x27;Milvus is an open-source vector database designed specifically for AI application development, embeddings similarity search, and MLOps v2.2.x.&#x27;</span>, <span class="hljs-string">&#x27;language&#x27;</span>: <span class="hljs-string">&#x27;en&#x27;</span>}), <span class="hljs-title class_">Document</span>(page_content=<span class="hljs-string">&#x27;Introduction ... Milvus is able to analyze the correlation between two vectors by calculating their similarity distance. If the two embedding vectors are very similar, it means that the original data sources are similar as well.&#x27;</span>, metadata={<span class="hljs-string">&#x27;source&#x27;</span>: <span class="hljs-string">&#x27;https://milvus.io/docs/overview.md&#x27;</span>, <span class="hljs-string">&#x27;title&#x27;</span>: <span class="hljs-string">&#x27;Introduction Milvus documentation&#x27;</span>, <span class="hljs-string">&#x27;description&#x27;</span>: <span class="hljs-string">&#x27;Milvus is an open-source vector database designed specifically for AI application development, embeddings similarity search, and MLOps v2.2.x.&#x27;</span>, <span class="hljs-string">&#x27;language&#x27;</span>: <span class="hljs-string">&#x27;en&#x27;</span>}), <span class="hljs-title class_">Document</span>(page_content=<span class="hljs-string">&quot;Key concepts\n...search algorithms are used to accelerate the searching process. If the two embedding vectors are very similar, it means that the original data sources are similar as well.\nWhy Milvus?&quot;</span>, metadata={<span class="hljs-string">&#x27;source&#x27;</span>: <span class="hljs-string">&#x27;https://milvus.io/docs/overview.md&#x27;</span>, <span class="hljs-string">&#x27;title&#x27;</span>: <span class="hljs-string">&#x27;Introduction Milvus documentation&#x27;</span>, <span class="hljs-string">&#x27;description&#x27;</span>: <span class="hljs-string">&#x27;Milvus is an open-source vector database designed specifically for AI application development, embeddings similarity search, and MLOps v2.2.x.&#x27;</span>, <span class="hljs-string">&#x27;language&#x27;</span>: <span class="hljs-string">&#x27;en&#x27;</span>})]
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
    </button></h2><p>Once the documents are ready to serve, you can set up a chain to include them in a prompt so that LLM will use the docs as a reference when preparing answers.</p>
<p>Note that LangChain offers four chain types for question-answering with sources, namely <strong>stuff</strong>, <strong>map_reduce</strong>, <strong>refine</strong>, and <strong>map-rerank</strong>. In simple terms, a <strong>stuff</strong> chain will include the document as a whole, which is only suitable for small documents. As most LLMs impose restrictions on the maximum number of tokens a prompt can contain, it is recommended to use the other three types of chains. These chains split the input document into smaller pieces and feed them to the LLM in different ways. For details, refer to <a href="https://docs.langchain.com/docs/components/chains/index_related_chains">Index-related chains</a> in LangChain documents.</p>
<p>The following code snippet sets up a chain using OpenAI as the LLM and <strong>map-reduce</strong> the chain type.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> langchain.chains.qa_with_sources <span class="hljs-keyword">import</span> load_qa_with_sources_chain
<span class="hljs-keyword">from</span> langchain.llms <span class="hljs-keyword">import</span> OpenAI

chain = load_qa_with_sources_chain(OpenAI(temperature=<span class="hljs-number">0</span>), chain_type=<span class="hljs-string">&quot;map_reduce&quot;</span>, return_intermediate_steps=<span class="hljs-literal">True</span>)
query = <span class="hljs-string">&quot;What is Milvus?&quot;</span>
chain({<span class="hljs-string">&quot;input_documents&quot;</span>: docs, <span class="hljs-string">&quot;question&quot;</span>: query}, return_only_outputs=<span class="hljs-literal">True</span>)
<button class="copy-code-btn"></button></code></pre>
<p>The returned results include both the <strong>intermediate_steps</strong> and <strong>output_text</strong>. The former indicates what documents it refers to during the search, and the latter is the final answer to the question.</p>
<pre><code translate="no" class="language-shell">{<span class="hljs-string">&#x27;intermediate_steps&#x27;</span>: [<span class="hljs-string">&#x27; No relevant text.&#x27;</span>,
  <span class="hljs-string">&#x27; What is Milvus vector database?&#x27;</span>,
  <span class="hljs-string">&#x27;\nWhat is Milvus? Milvus was created in 2019 with a singular goal: store, index, and manage massive embedding vectors generated by deep neural networks and other machine learning (ML) models. As a database specifically designed to handle queries over input vectors, it is capable of indexing vectors on a trillion scale. Unlike existing relational databases which mainly deal with structured data following a pre-defined pattern, Milvus is designed from the bottom-up to handle embedding vectors converted from unstructured data.&#x27;</span>,
  <span class="hljs-string">&#x27; Milvus is a vector database and similarity search platform that enables users to quickly and accurately search for semantically similar vectors in an unstructured data repository. It uses modern embedding techniques to convert unstructured data to embedding vectors, and approximate nearest neighbor (ANN) search algorithms to accelerate the searching process.&#x27;</span>],
 <span class="hljs-string">&#x27;output_text&#x27;</span>: <span class="hljs-string">&#x27; Milvus is a vector database and similarity search platform that enables users to quickly and accurately search for semantically similar vectors in an unstructured data repository. It uses modern embedding techniques to convert unstructured data to embedding vectors, and approximate nearest neighbor (ANN) search algorithms to accelerate the searching process.\nSOURCES: https://milvus.io/docs/overview.md&#x27;</span>}
<button class="copy-code-btn"></button></code></pre>
