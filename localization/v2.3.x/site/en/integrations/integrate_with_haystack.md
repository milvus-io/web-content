---
id: integrate_with_haystack.md
summary: >-
  This page goes over how to search for the best answer to questions using
  Milvus as the Vector Database and Haystack as the LLM framework.
title: Build Retrieval Augmented Generative System with Milvus and Haystack
---
<h1 id="Build-Retrieval-Augmented-Generative-System-with-Milvus-and-Haystack" class="common-anchor-header">Build Retrieval Augmented Generative System with Milvus and Haystack<button data-href="#Build-Retrieval-Augmented-Generative-System-with-Milvus-and-Haystack" class="anchor-icon" translate="no">
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
    </button></h1><p><a href="https://github.com/deepset-ai/haystack">Haystack</a> is an open source LLM framework in Python by <a href="https://www.deepset.ai/">deepset</a> for building customizable, production-ready LLM applications. It is an end-to-end framework that assists the orchestration of complete NLP applications by providing tooling for each step of the application-building life cycle.</p>
<p>This guide demonstrates how to build an LLM-driven question-answering application <strong>on the Milvus documentation</strong> with the <a href="https://haystack.deepset.ai/integrations/milvus-document-store">Milvus integration of Haystack</a>. In this example, <strong>Haystack</strong> and <strong>Milvus</strong> work together first to ingest documentation pages and store them in a <code translate="no">MilvusDocumentStore</code>, and then to use <code translate="no">OpenAIGenerator</code> to answer questions using retrieval-augmentation.</p>
<p>🚀 See the full application that uses the <code translate="no">MilvusDocumentStore</code> to do Milvus documentation QA <a href="https://github.com/TuanaCelik/milvus-documentation-qa/tree/main">here</a>.</p>
<h2 id="Installation" class="common-anchor-header">Installation<button data-href="#Installation" class="anchor-icon" translate="no">
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
    </button></h2><p>Install Haystack and the Milvus integration:</p>
<pre><code translate="no" class="language-bash">pip install milvus-haystack
<button class="copy-code-btn"></button></code></pre>
<h2 id="Usage" class="common-anchor-header">Usage<button data-href="#Usage" class="anchor-icon" translate="no">
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
    </button></h2><p>First, start a Milvus service following the '<a href="https://milvus.io/docs/install_standalone-docker.md#Start-Milvus">Start Milvus</a>' instructions in the documentation.</p>
<p>Once you have Milvus running locally on <code translate="no">localhost:19530</code>, you can start using Milvus with Haystack by initializing a <code translate="no">MilvusDocumentStore</code>:</p>
<h3 id="Create-the-indexing-Pipeline-and-index-some-documents" class="common-anchor-header">Create the indexing Pipeline and index some documents</h3><pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> os

<span class="hljs-keyword">from</span> haystack <span class="hljs-keyword">import</span> Pipeline
<span class="hljs-keyword">from</span> haystack.components.converters <span class="hljs-keyword">import</span> MarkdownToDocument
<span class="hljs-keyword">from</span> haystack.components.embedders <span class="hljs-keyword">import</span> SentenceTransformersDocumentEmbedder, SentenceTransformersTextEmbedder
<span class="hljs-keyword">from</span> haystack.components.preprocessors <span class="hljs-keyword">import</span> DocumentSplitter
<span class="hljs-keyword">from</span> haystack.components.writers <span class="hljs-keyword">import</span> DocumentWriter

<span class="hljs-keyword">from</span> milvus_haystack <span class="hljs-keyword">import</span> MilvusDocumentStore
<span class="hljs-keyword">from</span> milvus_haystack.milvus_embedding_retriever <span class="hljs-keyword">import</span> MilvusEmbeddingRetriever

file_paths = [os.path.abspath(__file__)]  <span class="hljs-comment"># Your knowledge documents here</span>

document_store = MilvusDocumentStore(
    connection_args={
        <span class="hljs-string">&quot;host&quot;</span>: <span class="hljs-string">&quot;localhost&quot;</span>,
        <span class="hljs-string">&quot;port&quot;</span>: <span class="hljs-string">&quot;19530&quot;</span>,
        <span class="hljs-string">&quot;user&quot;</span>: <span class="hljs-string">&quot;&quot;</span>,
        <span class="hljs-string">&quot;password&quot;</span>: <span class="hljs-string">&quot;&quot;</span>,
        <span class="hljs-string">&quot;secure&quot;</span>: <span class="hljs-literal">False</span>,
    },
    drop_old=<span class="hljs-literal">True</span>,
)
indexing_pipeline = Pipeline()
indexing_pipeline.add_component(<span class="hljs-string">&quot;converter&quot;</span>, MarkdownToDocument())
indexing_pipeline.add_component(<span class="hljs-string">&quot;splitter&quot;</span>, DocumentSplitter(split_by=<span class="hljs-string">&quot;sentence&quot;</span>, split_length=<span class="hljs-number">2</span>))
indexing_pipeline.add_component(<span class="hljs-string">&quot;embedder&quot;</span>, SentenceTransformersDocumentEmbedder())
indexing_pipeline.add_component(<span class="hljs-string">&quot;writer&quot;</span>, DocumentWriter(document_store))
indexing_pipeline.connect(<span class="hljs-string">&quot;converter&quot;</span>, <span class="hljs-string">&quot;splitter&quot;</span>)
indexing_pipeline.connect(<span class="hljs-string">&quot;splitter&quot;</span>, <span class="hljs-string">&quot;embedder&quot;</span>)
indexing_pipeline.connect(<span class="hljs-string">&quot;embedder&quot;</span>, <span class="hljs-string">&quot;writer&quot;</span>)
indexing_pipeline.run({<span class="hljs-string">&quot;converter&quot;</span>: {<span class="hljs-string">&quot;sources&quot;</span>: file_paths}})

<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Number of documents:&quot;</span>, document_store.count_documents())

<button class="copy-code-btn"></button></code></pre>
<h3 id="Create-the-retrieval-pipeline-and-try-a-query" class="common-anchor-header">Create the retrieval pipeline and try a query</h3><pre><code translate="no" class="language-python">question = <span class="hljs-string">&quot;How to install Haystack and the Milvus integration?&quot;</span>

retrieval_pipeline = Pipeline()
retrieval_pipeline.add_component(<span class="hljs-string">&quot;embedder&quot;</span>, SentenceTransformersTextEmbedder())
retrieval_pipeline.add_component(<span class="hljs-string">&quot;retriever&quot;</span>, MilvusEmbeddingRetriever(document_store=document_store, top_k=<span class="hljs-number">3</span>))
retrieval_pipeline.connect(<span class="hljs-string">&quot;embedder&quot;</span>, <span class="hljs-string">&quot;retriever&quot;</span>)

retrieval_results = retrieval_pipeline.run({<span class="hljs-string">&quot;embedder&quot;</span>: {<span class="hljs-string">&quot;text&quot;</span>: question}})

<span class="hljs-keyword">for</span> doc <span class="hljs-keyword">in</span> retrieval_results[<span class="hljs-string">&quot;retriever&quot;</span>][<span class="hljs-string">&quot;documents&quot;</span>]:
    <span class="hljs-built_in">print</span>(doc.content)
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;-&quot;</span> * <span class="hljs-number">10</span>)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Create-the-RAG-pipeline-and-try-a-query" class="common-anchor-header">Create the RAG pipeline and try a query</h3><pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> haystack.utils <span class="hljs-keyword">import</span> Secret
<span class="hljs-keyword">from</span> haystack.components.embedders <span class="hljs-keyword">import</span> SentenceTransformersTextEmbedder
<span class="hljs-keyword">from</span> haystack.components.builders <span class="hljs-keyword">import</span> PromptBuilder
<span class="hljs-keyword">from</span> haystack.components.generators <span class="hljs-keyword">import</span> OpenAIGenerator

prompt_template = <span class="hljs-string">&quot;&quot;&quot;Answer the following query based on the provided context. If the context does
                     not include an answer, reply with &#x27;I don&#x27;t know&#x27;.\n
                     Query: {{query}}
                     Documents:
                     {% for doc in documents %}
                        {{ doc.content }}
                     {% endfor %}
                     Answer: 
                  &quot;&quot;&quot;</span>

rag_pipeline = Pipeline()
rag_pipeline.add_component(<span class="hljs-string">&quot;text_embedder&quot;</span>, SentenceTransformersTextEmbedder())
rag_pipeline.add_component(<span class="hljs-string">&quot;retriever&quot;</span>, MilvusEmbeddingRetriever(document_store=document_store, top_k=<span class="hljs-number">3</span>))
rag_pipeline.add_component(<span class="hljs-string">&quot;prompt_builder&quot;</span>, PromptBuilder(template=prompt_template))
rag_pipeline.add_component(<span class="hljs-string">&quot;generator&quot;</span>, OpenAIGenerator(api_key=Secret.from_token(os.getenv(<span class="hljs-string">&quot;OPENAI_API_KEY&quot;</span>)),
                                                        generation_kwargs={<span class="hljs-string">&quot;temperature&quot;</span>: <span class="hljs-number">0</span>}))
rag_pipeline.connect(<span class="hljs-string">&quot;text_embedder.embedding&quot;</span>, <span class="hljs-string">&quot;retriever.query_embedding&quot;</span>)
rag_pipeline.connect(<span class="hljs-string">&quot;retriever.documents&quot;</span>, <span class="hljs-string">&quot;prompt_builder.documents&quot;</span>)
rag_pipeline.connect(<span class="hljs-string">&quot;prompt_builder&quot;</span>, <span class="hljs-string">&quot;generator&quot;</span>)

results = rag_pipeline.run(
    {
        <span class="hljs-string">&quot;text_embedder&quot;</span>: {<span class="hljs-string">&quot;text&quot;</span>: question},
        <span class="hljs-string">&quot;prompt_builder&quot;</span>: {<span class="hljs-string">&quot;query&quot;</span>: question},
    }
)
<span class="hljs-built_in">print</span>(<span class="hljs-string">&#x27;RAG answer:&#x27;</span>, results[<span class="hljs-string">&quot;generator&quot;</span>][<span class="hljs-string">&quot;replies&quot;</span>][<span class="hljs-number">0</span>])
<button class="copy-code-btn"></button></code></pre>
