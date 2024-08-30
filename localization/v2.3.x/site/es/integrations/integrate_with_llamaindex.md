---
id: integrate_with_llamaindex.md
summary: >-
  This page goes over how to search for the best answer to questions using
  Milvus as the Vector Database and LlamaIndex as the embedding system.
title: Retrieval-Augmented Generation (RAG) with Milvus and LlamaIndex
---
<h1 id="Retrieval-Augmented-Generation-RAG-with-Milvus-and-LlamaIndex" class="common-anchor-header">Retrieval-Augmented Generation (RAG) with Milvus and LlamaIndex<button data-href="#Retrieval-Augmented-Generation-RAG-with-Milvus-and-LlamaIndex" class="anchor-icon" translate="no">
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
    </button></h1><p>This guide demonstrates how to build a Retrieval-Augmented Generation (RAG) system using LlamaIndex and Milvus.</p>
<p>The RAG system combines a retrieval system with a generative model to generate new text based on a given prompt. The system first retrieves relevant documents from a corpus using a vector similarity search engine like Milvus, and then uses a generative model to generate new text based on the retrieved documents.</p>
<p><a href="https://www.llamaindex.ai/">LlamaIndex</a> is a simple, flexible data framework for connecting custom data sources to large language models (LLMs). <a href="https://milvus.io/">Milvus</a> is the world’s most advanced open-source vector database, built to power embedding similarity search and AI applications.</p>
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
    </button></h2><p>Code snippets on this page require <strong>pymilvus</strong> and <strong>llamaindex</strong> libraries. You can install them using the following commands:</p>
<pre><code translate="no" class="language-shell">python3 -m pip install --upgrade pymilvus llama-index openai
<button class="copy-code-btn"></button></code></pre>
<p>What’s more, LlamaIndex requires an LLM model at the backend. In this article, we will use the OpenAI as the LLM backend. You can sign up for a free API key at <a href="https://openai.com/">OpenAI</a>.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> openai

openai.<span class="hljs-property">api_key</span> = <span class="hljs-string">&quot;sk-**************************&quot;</span>
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
    </button></h2><p>In this section, you need to prepare the data for the RAG system. Run the following command to download the example data.</p>
<pre><code translate="no" class="language-shell">!<span class="hljs-built_in">mkdir</span> -p <span class="hljs-string">&#x27;data/paul_graham/&#x27;</span>
!wget <span class="hljs-string">&#x27;https://raw.githubusercontent.com/run-llama/llama_index/main/docs/examples/data/paul_graham/paul_graham_essay.txt&#x27;</span> -O <span class="hljs-string">&#x27;data/paul_graham/paul_graham_essay.txt&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>The example data is a single essay from Paul Graham titled <em>What I Worked On</em>. Before you can use it for the RAG system, you need to make it accessible to LLamaIndex.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> llamaindex <span class="hljs-keyword">import</span> SimpleDirectoryReader

<span class="hljs-comment"># load documents</span>
documents = SimpleDirectoryReader(<span class="hljs-string">&quot;./data/paul_graham/&quot;</span>).load_data()

<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Document ID:&quot;</span>, documents[<span class="hljs-number">0</span>].doc_id)

<span class="hljs-comment"># Document ID: d33f0397-b51a-4455-9b0f-88a101254d95</span>
<button class="copy-code-btn"></button></code></pre>
<p>Now you can create a Milvus collection and insert the documents into it.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> llama_index.core <span class="hljs-keyword">import</span> VectorStoreIndex, StorageContext
<span class="hljs-keyword">from</span> llama_index.vector_stores.milvus <span class="hljs-keyword">import</span> MilvusVectorStore

vector_store = MilvusVectorStore(dim=<span class="hljs-number">1536</span>, overwrite=<span class="hljs-literal">True</span>)
storage_context = StorageContext.from_defaults(vector_store=vector_store)
index = VectorStoreIndex.from_documents(
    documents, storage_context=storage_context
)
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>The above code will generate a Milvus collection named <strong>llamalection</strong> on the Milvus server with default settings. You can include the following arguments to customize the MilvusVectorStore object to your needs:</p>
<ul>
<li><strong>uri</strong>: the URI to connect to, comes in the form of “http://address:port” and defaults to &quot;http://localhost:19530&quot;.</li>
<li><strong>token</strong>: the token used to authenticate the connection. You can leave it unspecified if RBAC is not enabled. Otherwise, use the username and password of an existing user. To be authenticated as the root user with the default password, use &quot;root:Milvus&quot;.</li>
<li><strong>collection_name</strong>: the name of the Milvus collection to create or use.</li>
<li><strong>dim</strong>: the dimension of the vector embeddings. If it is not provided, collection creation will be done upon the first insertion.</li>
<li><strong>embedding_field</strong>: the name of the field used to hold vector embeddings in the collection to create, defaults to <code translate="no">DEFAULT_EMBEDDING_KEY</code>.</li>
<li><strong>doc_id_field</strong>: the name of the field used to hold doc IDs in the collection to create, defaults to <code translate="no">DEFAULT_DOC_ID_KEY</code>.</li>
<li><strong>similarity_metric</strong>: the similarity metric to use. Possible options are <code translate="no">IP</code> and <code translate="no">L2</code> and defaults to <code translate="no">IP</code>.</li>
<li><strong>consistency_level</strong>: the consistency level to use in the collection to create. Possible options are <code translate="no">Strong</code>, <code translate="no">Bounded</code>, <code translate="no">Staleness</code>, <code translate="no">Eventually</code>, and defaults to <code translate="no">Strong</code>.</li>
<li><strong>overwrite</strong>: whether to overwrite the existing collection if it exists.</li>
<li><strong>text_key</strong>: the name of the field that holds text in an existing collection, defaults to <code translate="no">None</code>. This applies only when you want to use an existing collection instead of create a new one.</li>
<li><strong>index_config</strong>: the index parameters used to build an index for the specified collection, defaults to <code translate="no">None</code>.</li>
<li><strong>search_config</strong>: the search parameters used to prepare searches in the specified collection, defaults to <code translate="no">None</code>.</li>
</ul>
</div>
<h2 id="Query-the-data" class="common-anchor-header">Query the data<button data-href="#Query-the-data" class="anchor-icon" translate="no">
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
    </button></h2><p>Now that you have our document stored in the Milvus collection, you can ask questions against the collection. The collection will use its data as the knowledge base for ChatGPT to generate answers.</p>
<pre><code translate="no" class="language-python">query_engine = index.as_query_engine()
response = query_engine.query(<span class="hljs-string">&quot;What did the author learn?&quot;</span>)
<span class="hljs-built_in">print</span>(textwrap.fill(<span class="hljs-built_in">str</span>(response), <span class="hljs-number">100</span>))

<span class="hljs-comment"># The author learned several things during their time at Interleaf. They learned that it&#x27;s better for technology companies to be run by product people than sales people, that code edited by too many people leads to bugs, that cheap office space is not worth it if it&#x27;s depressing, that planned meetings are inferior to corridor conversations, that big bureaucratic customers can be a dangerous source of money, and that there&#x27;s not much overlap between conventional office hours and the optimal time for hacking. However, the most important thing the author learned is that the low end eats the high end, meaning that it&#x27;s advantageous to be the &quot;entry level&quot; option because if you&#x27;re not, someone else will be and will surpass you.</span>
<button class="copy-code-btn"></button></code></pre>
<p>Let’s give it another try.</p>
<pre><code translate="no" class="language-python">response = query_engine.query(<span class="hljs-string">&quot;What was a hard moment for the author?&quot;</span>)
<span class="hljs-built_in">print</span>(textwrap.fill(<span class="hljs-built_in">str</span>(response), <span class="hljs-number">100</span>))

<span class="hljs-comment"># The author experienced a difficult moment when their mother had a stroke and was put in a nursing home. The stroke destroyed her balance, and the author and their sister were determined to help her get out of the nursing home and back to her house.</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Notes-on-overwriting-the-Milvus-collection" class="common-anchor-header">Notes on overwriting the Milvus collection<button data-href="#Notes-on-overwriting-the-Milvus-collection" class="anchor-icon" translate="no">
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
    </button></h2><p>If you want to reuse an existing Milvus collection and overwrite its data, you can use the <code translate="no">overwrite</code> argument when creating the <code translate="no">MilvusVectorStore</code> object.</p>
<pre><code translate="no" class="language-python">vector_store = MilvusVectorStore(
    dim=<span class="hljs-number">1536</span>,
    overwrite=<span class="hljs-literal">True</span>,
)
<button class="copy-code-btn"></button></code></pre>
<p>In such a case, when you run the following code, all the data in the Milvus collection will be erased and replaced with the new data.</p>
<pre><code translate="no" class="language-python">storage_context = StorageContext.from_defaults(vector_store=vector_store)
index = VectorStoreIndex.from_documents(
    [<span class="hljs-meta">Document(text=<span class="hljs-string">&quot;The number that is being searched for is ten.&quot;</span>)</span>], 
    storage_context=storage_context
)
<button class="copy-code-btn"></button></code></pre>
<p>Now when you ask the same questions again, you will receive different answers.</p>
<p>If you want to append additional data to an existing Milvus collection, you should not use the <code translate="no">overwrite</code> argument or set it to <code translate="no">False</code> when creating the <code translate="no">MilvusVectorStore</code> object.</p>
<pre><code translate="no" class="language-python">vector_store = MilvusVectorStore(
    dim=<span class="hljs-number">1536</span>,
    overwrite=<span class="hljs-literal">False</span>,
)
<button class="copy-code-btn"></button></code></pre>
<p>In such a case, when you run the following code, the new data will be appended to the existing data in the Milvus collection.</p>
<pre><code translate="no" class="language-python">storage_context = StorageContext.from_defaults(vector_store=vector_store)
index = VectorStoreIndex.from_documents(
    documents, storage_context=storage_context
)
<button class="copy-code-btn"></button></code></pre>
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
    </button></h2><p>In this article, we demonstrated how to build a (RAG) system using LlamaIndex and Milvus. We used the OpenAI as the LLM backend and prepared the example data for the RAG system. We also demonstrated how to query the data and generate new text using the ChatGPT model.</p>
