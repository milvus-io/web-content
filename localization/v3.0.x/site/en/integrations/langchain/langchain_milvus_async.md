---
id: langchain_milvus_async.md
summary: >-
  This tutorial explores how to leverage asynchronous functions in
  langchain-milvus to build high-performance applications. By using async
  methods, you can significantly improve your application's throughput and
  responsiveness, especially when dealing with large-scale retrieval.
title: Asynchronous Functions in LangChain Milvus Integration
---
<h1 id="Asynchronous-Functions-in-LangChain-Milvus-Integration" class="common-anchor-header">Asynchronous Functions in LangChain Milvus Integration<button data-href="#Asynchronous-Functions-in-LangChain-Milvus-Integration" class="anchor-icon" translate="no">
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
    </button></h1><p><a href="https://colab.research.google.com/github/milvus-io/bootcamp/blob/master/integration/langchain/langchain_milvus_async.ipynb" target="_parent">
<img translate="no" src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"/>
</a>
<a href="https://github.com/milvus-io/bootcamp/blob/master/integration/langchain/langchain_milvus_async.ipynb" target="_blank">
<img translate="no" src="https://img.shields.io/badge/View%20on%20GitHub-555555?style=flat&logo=github&logoColor=white" alt="GitHub Repository"/>
</a></p>
<p>This tutorial explores how to leverage asynchronous functions in <a href="https://github.com/langchain-ai/langchain-milvus">langchain-milvus</a> to build high-performance applications. By using async methods, you can significantly improve your application’s throughput and responsiveness, especially when dealing with large-scale retrieval. Whether you’re building a real-time recommendation system, implementing semantic search in your application, or creating a RAG (Retrieval-Augmented Generation) pipeline, async operations can help you handle concurrent requests more efficiently. The high-performance vector database Milvus combined with LangChain’s powerful LLM abstractions can provide a robust foundation for building scalable AI applications.</p>
<h2 id="Async-API-Overview" class="common-anchor-header">Async API Overview<button data-href="#Async-API-Overview" class="anchor-icon" translate="no">
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
    </button></h2><p>langchain-milvus provides comprehensive asynchronous operation support, significantly improving performance in large-scale concurrent scenarios. The async API maintains consistent interface design with sync API.</p>
<h3 id="Core-Async-Functions" class="common-anchor-header">Core Async Functions<button data-href="#Core-Async-Functions" class="anchor-icon" translate="no">
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
    </button></h3><p>To use async operations in langchain-milvus, simply add an <code translate="no">a</code> prefix to method names. This allows for better resource utilization and improved throughput when handling concurrent retrieval requests.</p>
<table>
<thead>
<tr><th>Operation Type</th><th>Sync Method</th><th>Async Method</th><th>Description</th></tr>
</thead>
<tbody>
<tr><td>Add Texts</td><td><code translate="no">add_texts()</code></td><td><code translate="no">aadd_texts()</code></td><td>Add texts to vector store</td></tr>
<tr><td>Add Documents</td><td><code translate="no">add_documents()</code></td><td><code translate="no">aadd_documents()</code></td><td>Add documents to vector store</td></tr>
<tr><td>Add Embeddings</td><td><code translate="no">add_embeddings()</code></td><td><code translate="no">aadd_embeddings()</code></td><td>Add embedding vectors</td></tr>
<tr><td>Similarity Search</td><td><code translate="no">similarity_search()</code></td><td><code translate="no">asimilarity_search()</code></td><td>Semantic search by text</td></tr>
<tr><td>Vector Search</td><td><code translate="no">similarity_search_by_vector()</code></td><td><code translate="no">asimilarity_search_by_vector()</code></td><td>Semantic search by vector</td></tr>
<tr><td>Search with Score</td><td><code translate="no">similarity_search_with_score()</code></td><td><code translate="no">asimilarity_search_with_score()</code></td><td>Semantic search by text and return similarity scores</td></tr>
<tr><td>Vector Search with Score</td><td><code translate="no">similarity_search_with_score_by_vector()</code></td><td><code translate="no">asimilarity_search_with_score_by_vector()</code></td><td>Semantic search by vector and return similarity scores</td></tr>
<tr><td>Diversity Search</td><td><code translate="no">max_marginal_relevance_search()</code></td><td><code translate="no">amax_marginal_relevance_search()</code></td><td>MMR search (return similar ones while also optimizing for diversity)</td></tr>
<tr><td>Vector Diversity Search</td><td><code translate="no">max_marginal_relevance_search_by_vector()</code></td><td><code translate="no">amax_marginal_relevance_search_by_vector()</code></td><td>MMR search by vector</td></tr>
<tr><td>Delete Operation</td><td><code translate="no">delete()</code></td><td><code translate="no">adelete()</code></td><td>Delete documents</td></tr>
<tr><td>Upsert Operation</td><td><code translate="no">upsert()</code></td><td><code translate="no">aupsert()</code></td><td>Upsert (update if existing, otherwise insert) documents</td></tr>
<tr><td>Metadata Search</td><td><code translate="no">search_by_metadata()</code></td><td><code translate="no">asearch_by_metadata()</code></td><td>Query with metadata filtering</td></tr>
<tr><td>Get Primary Keys</td><td><code translate="no">get_pks()</code></td><td><code translate="no">aget_pks()</code></td><td>Get primary keys by expression</td></tr>
<tr><td>Create from Texts</td><td><code translate="no">from_texts()</code></td><td><code translate="no">afrom_texts()</code></td><td>Create vector store from texts</td></tr>
</tbody>
</table>
<p>For more detailed information about these functions, please refer to the <a href="https://python.langchain.com/api_reference/milvus/vectorstores/langchain_milvus.vectorstores.milvus.Milvus.html#milvus">API Reference</a>.</p>
<h3 id="Performance-Benefits" class="common-anchor-header">Performance Benefits<button data-href="#Performance-Benefits" class="anchor-icon" translate="no">
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
    </button></h3><p>Async operations provide significant performance improvements when handling large volumes of concurrent requests, particularly suitable for:</p>
<ul>
<li>Batch document processing</li>
<li>High-concurrency search scenarios</li>
<li>Production RAG applications</li>
<li>Large-scale data import/export</li>
</ul>
<p>In this tutorial, we’ll demonstrate these performance benefits through detailed comparisons of synchronous and asynchronous operations, showing you how to leverage async APIs for optimal performance in your applications.</p>
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
    </button></h2><p>Code snippets on this page require the following dependencies:</p>
<pre><code translate="no" class="language-python">! pip install -U pymilvus langchain-milvus langchain langchain-core langchain-openai langchain-text-splitters nest-asyncio
<button class="copy-code-btn"></button></code></pre>
<blockquote>
<p>If you are using Google Colab, to enable dependencies just installed, you may need to <strong>restart the runtime</strong> (click on the “Runtime” menu at the top of the screen, and select “Restart session” from the dropdown menu).</p>
</blockquote>
<p>We will use OpenAI models. You should prepare the <a href="https://platform.openai.com/docs/quickstart">api key</a> <code translate="no">OPENAI_API_KEY</code> as an environment variable:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> os

os.environ[<span class="hljs-string">&quot;OPENAI_API_KEY&quot;</span>] = <span class="hljs-string">&quot;sk-***********&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>If you are using Jupyter Notebook, you need to run this line of code before running the asynchronous code:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> nest_asyncio

nest_asyncio.apply()
<button class="copy-code-btn"></button></code></pre>
<h2 id="Exploring-Async-APIs-and-Performance-Comparison" class="common-anchor-header">Exploring Async APIs and Performance Comparison<button data-href="#Exploring-Async-APIs-and-Performance-Comparison" class="anchor-icon" translate="no">
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
    </button></h2><p>Now let’s dive deeper into the performance comparison between synchronous and asynchronous operations with langchain-milvus.</p>
<p>First, import the necessary libraries:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> asyncio
<span class="hljs-keyword">import</span> random
<span class="hljs-keyword">import</span> time
<span class="hljs-keyword">from</span> langchain_core.documents <span class="hljs-keyword">import</span> Document
<span class="hljs-keyword">from</span> langchain_openai <span class="hljs-keyword">import</span> OpenAIEmbeddings
<span class="hljs-keyword">from</span> langchain_milvus <span class="hljs-keyword">import</span> Milvus

<span class="hljs-comment"># Define the Milvus URI</span>
URI = <span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Setting-up-Test-Functions" class="common-anchor-header">Setting up Test Functions<button data-href="#Setting-up-Test-Functions" class="anchor-icon" translate="no">
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
    </button></h3><p>Let’s create helper functions to generate test data:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">random_id</span>():
    <span class="hljs-string">&quot;&quot;&quot;Generate a random string ID&quot;&quot;&quot;</span>
    random_num_str = <span class="hljs-string">&quot;&quot;</span>
    <span class="hljs-keyword">for</span> _ <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">16</span>):
        random_digit = <span class="hljs-built_in">str</span>(random.randint(<span class="hljs-number">0</span>, <span class="hljs-number">9</span>))
        random_num_str += random_digit
    <span class="hljs-keyword">return</span> random_num_str


<span class="hljs-keyword">def</span> <span class="hljs-title function_">generate_test_documents</span>(<span class="hljs-params">num_docs</span>):
    <span class="hljs-string">&quot;&quot;&quot;Generate test documents for performance testing&quot;&quot;&quot;</span>
    docs = []
    <span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(num_docs):
        content = (
            <span class="hljs-string">f&quot;This is test document <span class="hljs-subst">{i}</span> with some random content: <span class="hljs-subst">{random.random()}</span>&quot;</span>
        )
        metadata = {
            <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-string">f&quot;doc_<span class="hljs-subst">{i}</span>&quot;</span>,
            <span class="hljs-string">&quot;score&quot;</span>: random.random(),
            <span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">f&quot;cat_<span class="hljs-subst">{i % <span class="hljs-number">5</span>}</span>&quot;</span>,
        }
        doc = Document(page_content=content, metadata=metadata)
        docs.append(doc)
    <span class="hljs-keyword">return</span> docs
<button class="copy-code-btn"></button></code></pre>
<h3 id="Initialize-the-Vector-Store" class="common-anchor-header">Initialize the Vector Store<button data-href="#Initialize-the-Vector-Store" class="anchor-icon" translate="no">
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
    </button></h3><p>Before we can run our performance tests, we need to set up a clean Milvus vector store. This function ensures we start with a fresh collection for each test, eliminating any interference from previous data:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">init_vector_store</span>():
    <span class="hljs-string">&quot;&quot;&quot;Initialize and return a fresh vector store for testing&quot;&quot;&quot;</span>
    <span class="hljs-keyword">return</span> Milvus(
        embedding_function=OpenAIEmbeddings(),
        collection_name=<span class="hljs-string">&quot;langchain_perf_test&quot;</span>,
        connection_args={<span class="hljs-string">&quot;uri&quot;</span>: URI},
        auto_id=<span class="hljs-literal">True</span>,
        drop_old=<span class="hljs-literal">True</span>,  <span class="hljs-comment"># Always start with a fresh collection</span>
    )
<button class="copy-code-btn"></button></code></pre>
<h3 id="Async-vs-Sync-Add-Documents" class="common-anchor-header">Async vs Sync: Add Documents<button data-href="#Async-vs-Sync-Add-Documents" class="anchor-icon" translate="no">
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
    </button></h3><p>Now let’s compare the performance of synchronous vs asynchronous document addition. These functions will help us measure how much faster async operations can be when adding multiple documents to the vector store. The async version creates tasks for each document addition and runs them concurrently, while the sync version processes documents one by one:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">async</span> <span class="hljs-keyword">def</span> <span class="hljs-title function_">async_add</span>(<span class="hljs-params">milvus_store, num_adding</span>):
    <span class="hljs-string">&quot;&quot;&quot;Add documents asynchronously and measure the time&quot;&quot;&quot;</span>
    docs = generate_test_documents(num_adding)
    start_time = time.time()
    tasks = []
    <span class="hljs-keyword">for</span> doc <span class="hljs-keyword">in</span> docs:
        <span class="hljs-comment"># Create tasks for each document addition</span>
        task = milvus_store.aadd_documents([doc])
        tasks.append(task)
    results = <span class="hljs-keyword">await</span> asyncio.gather(*tasks)
    end_time = time.time()
    <span class="hljs-keyword">return</span> end_time - start_time


<span class="hljs-keyword">def</span> <span class="hljs-title function_">sync_add</span>(<span class="hljs-params">milvus_store, num_adding</span>):
    <span class="hljs-string">&quot;&quot;&quot;Add documents synchronously and measure the time&quot;&quot;&quot;</span>
    docs = generate_test_documents(num_adding)
    start_time = time.time()
    <span class="hljs-keyword">for</span> doc <span class="hljs-keyword">in</span> docs:
        result = milvus_store.add_documents([doc])
    end_time = time.time()
    <span class="hljs-keyword">return</span> end_time - start_time
<button class="copy-code-btn"></button></code></pre>
<p>Now let’s execute our performance tests with different document counts to see the real-world performance differences. We’ll test with varying loads to understand how async operations scale compared to their synchronous counterparts. The tests will measure execution time for both approaches and help demonstrate the performance benefits of asynchronous operations:</p>
<pre><code translate="no" class="language-python">add_counts = [<span class="hljs-number">10</span>, <span class="hljs-number">100</span>]

<span class="hljs-comment"># Get the event loop</span>
loop = asyncio.get_event_loop()

<span class="hljs-comment"># Create a new vector store for testing</span>
milvus_store = init_vector_store()

<span class="hljs-comment"># Test async document addition</span>
<span class="hljs-keyword">for</span> count <span class="hljs-keyword">in</span> add_counts:

    <span class="hljs-keyword">async</span> <span class="hljs-keyword">def</span> <span class="hljs-title function_">measure_async_add</span>():
        async_time = <span class="hljs-keyword">await</span> async_add(milvus_store, count)
        <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Async add for <span class="hljs-subst">{count}</span> documents took <span class="hljs-subst">{async_time:<span class="hljs-number">.2</span>f}</span> seconds&quot;</span>)
        <span class="hljs-keyword">return</span> async_time

    loop.run_until_complete(measure_async_add())

<span class="hljs-comment"># Reset vector store for sync tests</span>
milvus_store = init_vector_store()

<span class="hljs-comment"># Test sync document addition</span>
<span class="hljs-keyword">for</span> count <span class="hljs-keyword">in</span> add_counts:
    sync_time = sync_add(milvus_store, count)
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Sync add for <span class="hljs-subst">{count}</span> documents took <span class="hljs-subst">{sync_time:<span class="hljs-number">.2</span>f}</span> seconds&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">2025-06-05 10:44:12,274 [DEBUG][_create_connection]: Created new connection using: dd5f77bb78964c079da42c2446b03bf6 (async_milvus_client.py:599)


Async add for 10 documents took 1.74 seconds


2025-06-05 10:44:16,940 [DEBUG][_create_connection]: Created new connection using: 8b13404a78654cdd9b790371eb44e427 (async_milvus_client.py:599)


Async add for 100 documents took 2.77 seconds
Sync add for 10 documents took 5.36 seconds
Sync add for 100 documents took 65.60 seconds
</code></pre>
<h3 id="Async-vs-Sync-Search" class="common-anchor-header">Async vs Sync: Search<button data-href="#Async-vs-Sync-Search" class="anchor-icon" translate="no">
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
    </button></h3><p>For the search performance comparison, we’ll need to populate the vector store first. The following functions will help us measure search performance by creating multiple concurrent search queries and comparing the execution time between synchronous and asynchronous approaches:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">populate_vector_store</span>(<span class="hljs-params">milvus_store, num_docs=<span class="hljs-number">1000</span></span>):
    <span class="hljs-string">&quot;&quot;&quot;Populate the vector store with test documents&quot;&quot;&quot;</span>
    docs = generate_test_documents(num_docs)
    milvus_store.add_documents(docs)
    <span class="hljs-keyword">return</span> docs


<span class="hljs-keyword">async</span> <span class="hljs-keyword">def</span> <span class="hljs-title function_">async_search</span>(<span class="hljs-params">milvus_store, num_queries</span>):
    <span class="hljs-string">&quot;&quot;&quot;Perform async searches and measure the time&quot;&quot;&quot;</span>
    start_time = time.time()
    tasks = []
    <span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(num_queries):
        query = <span class="hljs-string">f&quot;test document <span class="hljs-subst">{i % <span class="hljs-number">50</span>}</span>&quot;</span>
        task = milvus_store.asimilarity_search(query=query, k=<span class="hljs-number">3</span>)
        tasks.append(task)
    results = <span class="hljs-keyword">await</span> asyncio.gather(*tasks)
    end_time = time.time()
    <span class="hljs-keyword">return</span> end_time - start_time


<span class="hljs-keyword">def</span> <span class="hljs-title function_">sync_search</span>(<span class="hljs-params">milvus_store, num_queries</span>):
    <span class="hljs-string">&quot;&quot;&quot;Perform sync searches and measure the time&quot;&quot;&quot;</span>
    start_time = time.time()
    <span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(num_queries):
        query = <span class="hljs-string">f&quot;test document <span class="hljs-subst">{i % <span class="hljs-number">50</span>}</span>&quot;</span>
        result = milvus_store.similarity_search(query=query, k=<span class="hljs-number">3</span>)
    end_time = time.time()
    <span class="hljs-keyword">return</span> end_time - start_time
<button class="copy-code-btn"></button></code></pre>
<p>Now let’s run comprehensive search performance tests to see how async operations scale compared to synchronous ones. We’ll test with different query volumes to demonstrate the performance benefits of asynchronous operations, especially as the number of concurrent operations increases:</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Initialize and populate the vector store</span>
milvus_store = init_vector_store()
populate_vector_store(milvus_store, <span class="hljs-number">1000</span>)

query_counts = [<span class="hljs-number">10</span>, <span class="hljs-number">100</span>]

<span class="hljs-comment"># Test async search</span>
<span class="hljs-keyword">for</span> count <span class="hljs-keyword">in</span> query_counts:

    <span class="hljs-keyword">async</span> <span class="hljs-keyword">def</span> <span class="hljs-title function_">measure_async_search</span>():
        async_time = <span class="hljs-keyword">await</span> async_search(milvus_store, count)
        <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Async search for <span class="hljs-subst">{count}</span> queries took <span class="hljs-subst">{async_time:<span class="hljs-number">.2</span>f}</span> seconds&quot;</span>)
        <span class="hljs-keyword">return</span> async_time

    loop.run_until_complete(measure_async_search())

<span class="hljs-comment"># Test sync search</span>
<span class="hljs-keyword">for</span> count <span class="hljs-keyword">in</span> query_counts:
    sync_time = sync_search(milvus_store, count)
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Sync search for <span class="hljs-subst">{count}</span> queries took <span class="hljs-subst">{sync_time:<span class="hljs-number">.2</span>f}</span> seconds&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">2025-06-05 10:45:28,131 [DEBUG][_create_connection]: Created new connection using: 851824591c64415baac843e676e78cdd (async_milvus_client.py:599)


Async search for 10 queries took 2.31 seconds
Async search for 100 queries took 3.72 seconds
Sync search for 10 queries took 6.07 seconds
Sync search for 100 queries took 54.22 seconds
</code></pre>
<h3 id="Async-vs-Sync-Delete" class="common-anchor-header">Async vs Sync: Delete<button data-href="#Async-vs-Sync-Delete" class="anchor-icon" translate="no">
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
    </button></h3><p>Delete operations are another critical aspect where async operations can provide significant performance improvements. Let’s create functions to measure the performance difference between synchronous and asynchronous delete operations. These tests will help demonstrate how async operations can handle batch deletions more efficiently:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">async</span> <span class="hljs-keyword">def</span> <span class="hljs-title function_">async_delete</span>(<span class="hljs-params">milvus_store, num_deleting</span>):
    <span class="hljs-string">&quot;&quot;&quot;Delete documents asynchronously and measure the time&quot;&quot;&quot;</span>
    start_time = time.time()
    tasks = []
    <span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(num_deleting):
        expr = <span class="hljs-string">f&quot;id == &#x27;doc_<span class="hljs-subst">{i}</span>&#x27;&quot;</span>
        task = milvus_store.adelete(expr=expr)
        tasks.append(task)
    results = <span class="hljs-keyword">await</span> asyncio.gather(*tasks)
    end_time = time.time()
    <span class="hljs-keyword">return</span> end_time - start_time


<span class="hljs-keyword">def</span> <span class="hljs-title function_">sync_delete</span>(<span class="hljs-params">milvus_store, num_deleting</span>):
    <span class="hljs-string">&quot;&quot;&quot;Delete documents synchronously and measure the time&quot;&quot;&quot;</span>
    start_time = time.time()
    <span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(num_deleting):
        expr = <span class="hljs-string">f&quot;id == &#x27;doc_<span class="hljs-subst">{i}</span>&#x27;&quot;</span>
        result = milvus_store.delete(expr=expr)
    end_time = time.time()
    <span class="hljs-keyword">return</span> end_time - start_time
<button class="copy-code-btn"></button></code></pre>
<p>Now let’s execute the delete performance tests to quantify the performance difference. We’ll start with a fresh vector store populated with test data, then perform delete operations using both synchronous and asynchronous approaches:</p>
<pre><code translate="no" class="language-python">delete_counts = [<span class="hljs-number">10</span>, <span class="hljs-number">100</span>]

<span class="hljs-comment"># Initialize and populate the vector store</span>
milvus_store = init_vector_store()
populate_vector_store(milvus_store, <span class="hljs-number">1000</span>)

<span class="hljs-comment"># Test async delete</span>
<span class="hljs-keyword">for</span> count <span class="hljs-keyword">in</span> delete_counts:

    <span class="hljs-keyword">async</span> <span class="hljs-keyword">def</span> <span class="hljs-title function_">measure_async_delete</span>():
        async_time = <span class="hljs-keyword">await</span> async_delete(milvus_store, count)
        <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Async delete for <span class="hljs-subst">{count}</span> operations took <span class="hljs-subst">{async_time:<span class="hljs-number">.2</span>f}</span> seconds&quot;</span>)
        <span class="hljs-keyword">return</span> async_time

    loop.run_until_complete(measure_async_delete())

<span class="hljs-comment"># Reset and repopulate the vector store for sync tests</span>
milvus_store = init_vector_store()
populate_vector_store(milvus_store, <span class="hljs-number">1000</span>)

<span class="hljs-comment"># Test sync delete</span>
<span class="hljs-keyword">for</span> count <span class="hljs-keyword">in</span> delete_counts:
    sync_time = sync_delete(milvus_store, count)
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Sync delete for <span class="hljs-subst">{count}</span> operations took <span class="hljs-subst">{sync_time:<span class="hljs-number">.2</span>f}</span> seconds&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">2025-06-05 10:46:57,211 [DEBUG][_create_connection]: Created new connection using: 504e9ce3be92411e87077971c82baca2 (async_milvus_client.py:599)


Async delete for 10 operations took 0.58 seconds


2025-06-05 10:47:12,309 [DEBUG][_create_connection]: Created new connection using: 22c1513b444e4c40936e2176d7a1a154 (async_milvus_client.py:599)


Async delete for 100 operations took 0.61 seconds
Sync delete for 10 operations took 2.82 seconds
Sync delete for 100 operations took 29.21 seconds
</code></pre>
<h2 id="Conclusion" class="common-anchor-header">Conclusion<button data-href="#Conclusion" class="anchor-icon" translate="no">
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
    </button></h2><p>This tutorial demonstrated the significant performance advantages of using asynchronous operations with LangChain and Milvus. We compared the synchronous and asynchronous versions of add, search, and delete operations, showing how async operations can provide substantial speed improvements, especially for large batch operations.</p>
<p>Key takeaways:</p>
<ol>
<li>Async operations deliver the most benefit when performing many individual operations that can run in parallel</li>
<li>For workload that generates higher throughput, the performance gap between sync and async operations widens</li>
<li>Async operations fully utilize the compute power of the machines</li>
</ol>
<p>When building production RAG applications with LangChain and Milvus, consider using the async API when performance is a concern, especially for concurrent operations.</p>
