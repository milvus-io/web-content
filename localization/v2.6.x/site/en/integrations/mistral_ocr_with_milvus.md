---
id: mistral_ocr_with_milvus.md
summary: >-
  This tutorial demonstrates how to build a document understanding system using
  Milvus and Mistral OCR.
title: Document Understanding with Mistral OCR and Milvus
---
<p><a href="https://colab.research.google.com/github/milvus-io/bootcamp/blob/master/integration/mistral_ocr_with_milvus.ipynb" target="_parent">
<img translate="no" src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"/>
</a>
<a href="https://github.com/milvus-io/bootcamp/blob/master/integration/mistral_ocr_with_milvus.ipynb" target="_blank">
<img translate="no" src="https://img.shields.io/badge/View%20on%20GitHub-555555?style=flat&logo=github&logoColor=white" alt="GitHub Repository"/>
</a></p>
<h1 id="Document-Understanding-with-Mistral-OCR-and-Milvus" class="common-anchor-header">Document Understanding with Mistral OCR and Milvus<button data-href="#Document-Understanding-with-Mistral-OCR-and-Milvus" class="anchor-icon" translate="no">
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
    </button></h1><p>This tutorial demonstrates how to build a document understanding system using:</p>
<h2 id="Mistral-OCR" class="common-anchor-header">Mistral OCR<button data-href="#Mistral-OCR" class="anchor-icon" translate="no">
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
    </button></h2><p>A powerful optical character recognition service that:</p>
<ul>
<li>Processes PDFs, images, and other document formats</li>
<li>Preserves document structure and formatting</li>
<li>Handles multi-page documents</li>
<li>Recognizes tables, lists, and other complex elements</li>
</ul>
<h2 id="Mistral-Embeddings" class="common-anchor-header">Mistral Embeddings<button data-href="#Mistral-Embeddings" class="anchor-icon" translate="no">
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
    </button></h2><ul>
<li>Transforms text into numerical representations:</li>
<li>Converts text into 1024-dimensional vectors</li>
<li>Captures semantic relationships between concepts</li>
<li>Enables similarity matching based on meaning</li>
<li>Provides foundation for semantic search</li>
</ul>
<h2 id="Milvus-Vector-Database" class="common-anchor-header">Milvus Vector Database<button data-href="#Milvus-Vector-Database" class="anchor-icon" translate="no">
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
    </button></h2><p>Specialized database for vector similarity search:</p>
<ul>
<li>Open-Source</li>
<li>Performs efficient Vector Search</li>
<li>Scales to large document collections</li>
<li>Supports hybrid search (vector similarity + metadata filtering)</li>
<li>Optimized for AI applications</li>
</ul>
<p>By the end of this tutorial, you’ll have a system that can:</p>
<ol>
<li>Process documents (PDFs/images) via URLs</li>
<li>Extract text using OCR</li>
<li>Store the text and vector embeddings in Milvus</li>
<li>Perform semantic search across your document collection</li>
</ol>
<hr>
<h2 id="Setup-and-Dependencies" class="common-anchor-header">Setup and Dependencies<button data-href="#Setup-and-Dependencies" class="anchor-icon" translate="no">
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
    </button></h2><p>First, let’s install the required packages:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">pip install mistralai pymilvus python-dotenv</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Environment-Setup" class="common-anchor-header">Environment Setup<button data-href="#Environment-Setup" class="anchor-icon" translate="no">
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
    </button></h2><p>You’ll need:</p>
<ol>
<li>A Mistral API key (get one at https://console.mistral.ai/)</li>
<li>Milvus running locally through <a href="https://milvus.io/docs/install_standalone-docker.md">Docker</a> or with <a href="https://zilliz.com">Zilliz Cloud</a></li>
</ol>
<p>Let’s set up our environment:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> json
<span class="hljs-keyword">import</span> os
<span class="hljs-keyword">import</span> re

<span class="hljs-keyword">from</span> dotenv <span class="hljs-keyword">import</span> load_dotenv
<span class="hljs-keyword">from</span> mistralai <span class="hljs-keyword">import</span> Mistral
<span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> CollectionSchema, DataType, FieldSchema, MilvusClient
<span class="hljs-keyword">from</span> pymilvus.client.types <span class="hljs-keyword">import</span> LoadState

<span class="hljs-comment"># Load environment variables from .env file</span>
load_dotenv()

<span class="hljs-comment"># Initialize clients</span>
api_key = os.getenv(<span class="hljs-string">&quot;MISTRAL_API_KEY&quot;</span>)
<span class="hljs-keyword">if</span> <span class="hljs-keyword">not</span> api_key:
    api_key = <span class="hljs-built_in">input</span>(<span class="hljs-string">&quot;Enter your Mistral API key: &quot;</span>)
    os.environ[<span class="hljs-string">&quot;MISTRAL_API_KEY&quot;</span>] = api_key

client = Mistral(api_key=api_key)

<span class="hljs-comment"># Define models</span>
text_model = <span class="hljs-string">&quot;mistral-small-latest&quot;</span>  <span class="hljs-comment"># For chat interactions</span>
ocr_model = <span class="hljs-string">&quot;mistral-ocr-latest&quot;</span>  <span class="hljs-comment"># For OCR processing</span>
embedding_model = <span class="hljs-string">&quot;mistral-embed&quot;</span>  <span class="hljs-comment"># For generating embeddings</span>

<span class="hljs-comment"># Connect to Milvus (default: localhost)</span>
milvus_uri = os.getenv(<span class="hljs-string">&quot;MILVUS_URI&quot;</span>, <span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
milvus_client = MilvusClient(uri=milvus_uri)

<span class="hljs-comment"># Milvus collection name</span>
COLLECTION_NAME = <span class="hljs-string">&quot;document_ocr&quot;</span>

<span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Connected to Mistral API and Milvus at <span class="hljs-subst">{milvus_uri}</span>&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Connected to Mistral API and Milvus at http://localhost:19530
</code></pre>
<h2 id="Setting-Up-Milvus-Collection" class="common-anchor-header">Setting Up Milvus Collection<button data-href="#Setting-Up-Milvus-Collection" class="anchor-icon" translate="no">
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
    </button></h2><p>Now, let’s create a Milvus collection to store our document data. The collection will have the following fields:</p>
<ul>
<li><code translate="no">id</code>: Primary key (auto-generated)</li>
<li><code translate="no">url</code>: Source URL of the document</li>
<li><code translate="no">page_num</code>: Page number within the document</li>
<li><code translate="no">content</code>: Extracted text content</li>
<li><code translate="no">embedding</code>: Vector representation of the content (1024 dimensions)</li>
</ul>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">setup_milvus_collection</span>():
    <span class="hljs-string">&quot;&quot;&quot;Create Milvus collection if it doesn&#x27;t exist.&quot;&quot;&quot;</span>
    <span class="hljs-comment"># Check if collection already exists</span>
    <span class="hljs-keyword">if</span> milvus_client.has_collection(COLLECTION_NAME):
        <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Collection &#x27;<span class="hljs-subst">{COLLECTION_NAME}</span>&#x27; already exists.&quot;</span>)
        <span class="hljs-keyword">return</span>

    <span class="hljs-comment"># Define collection schema</span>
    fields = [
        FieldSchema(name=<span class="hljs-string">&quot;id&quot;</span>, dtype=DataType.INT64, is_primary=<span class="hljs-literal">True</span>, auto_id=<span class="hljs-literal">True</span>),
        FieldSchema(name=<span class="hljs-string">&quot;url&quot;</span>, dtype=DataType.VARCHAR, max_length=<span class="hljs-number">500</span>),
        FieldSchema(name=<span class="hljs-string">&quot;page_num&quot;</span>, dtype=DataType.INT64),
        FieldSchema(name=<span class="hljs-string">&quot;content&quot;</span>, dtype=DataType.VARCHAR, max_length=<span class="hljs-number">65535</span>),
        FieldSchema(name=<span class="hljs-string">&quot;embedding&quot;</span>, dtype=DataType.FLOAT_VECTOR, dim=<span class="hljs-number">1024</span>),
    ]

    schema = CollectionSchema(fields=fields)

    <span class="hljs-comment"># Create collection</span>
    milvus_client.create_collection(
        collection_name=COLLECTION_NAME,
        schema=schema,
    )

    <span class="hljs-comment"># Create index for vector search</span>
    index_params = milvus_client.prepare_index_params()
    index_params.add_index(
        field_name=<span class="hljs-string">&quot;embedding&quot;</span>,
        index_type=<span class="hljs-string">&quot;IVF_FLAT&quot;</span>,  <span class="hljs-comment"># Index type for approximate nearest neighbor search</span>
        metric_type=<span class="hljs-string">&quot;COSINE&quot;</span>,  <span class="hljs-comment"># Similarity metric</span>
        params={<span class="hljs-string">&quot;nlist&quot;</span>: <span class="hljs-number">128</span>},  <span class="hljs-comment"># Number of clusters</span>
    )

    milvus_client.create_index(
        collection_name=COLLECTION_NAME, index_params=index_params
    )

    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Collection &#x27;<span class="hljs-subst">{COLLECTION_NAME}</span>&#x27; created successfully with index.&quot;</span>)


setup_milvus_collection()
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Collection 'document_ocr' already exists.
</code></pre>
<h2 id="Core-Functionality" class="common-anchor-header">Core Functionality<button data-href="#Core-Functionality" class="anchor-icon" translate="no">
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
    </button></h2><p>Let’s implement the core functions for our document understanding system:</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Generate embeddings using Mistral</span>
<span class="hljs-keyword">def</span> <span class="hljs-title function_">generate_embedding</span>(<span class="hljs-params">text</span>):
    <span class="hljs-string">&quot;&quot;&quot;Generate embedding for text using Mistral embedding model.&quot;&quot;&quot;</span>
    response = client.embeddings.create(model=embedding_model, inputs=[text])
    <span class="hljs-keyword">return</span> response.data[<span class="hljs-number">0</span>].embedding


<span class="hljs-comment"># Store OCR results in Milvus</span>
<span class="hljs-keyword">def</span> <span class="hljs-title function_">store_ocr_in_milvus</span>(<span class="hljs-params">url, ocr_result</span>):
    <span class="hljs-string">&quot;&quot;&quot;Process OCR results and store in Milvus.&quot;&quot;&quot;</span>
    <span class="hljs-comment"># Extract pages from OCR result</span>
    pages = []
    current_page = <span class="hljs-string">&quot;&quot;</span>
    page_num = <span class="hljs-number">0</span>

    <span class="hljs-keyword">for</span> line <span class="hljs-keyword">in</span> ocr_result.split(<span class="hljs-string">&quot;\n&quot;</span>):
        <span class="hljs-keyword">if</span> line.startswith(<span class="hljs-string">&quot;### Page &quot;</span>):
            <span class="hljs-keyword">if</span> current_page:
                pages.append((page_num, current_page.strip()))
            page_num = <span class="hljs-built_in">int</span>(line.replace(<span class="hljs-string">&quot;### Page &quot;</span>, <span class="hljs-string">&quot;&quot;</span>))
            current_page = <span class="hljs-string">&quot;&quot;</span>
        <span class="hljs-keyword">else</span>:
            current_page += line + <span class="hljs-string">&quot;\n&quot;</span>

    <span class="hljs-comment"># Add the last page</span>
    <span class="hljs-keyword">if</span> current_page:
        pages.append((page_num, current_page.strip()))

    <span class="hljs-comment"># Prepare data for Milvus</span>
    entities = []
    <span class="hljs-keyword">for</span> page_num, content <span class="hljs-keyword">in</span> pages:
        <span class="hljs-comment"># Generate embedding for the page content</span>
        embedding = generate_embedding(content)

        <span class="hljs-comment"># Create entity</span>
        entity = {
            <span class="hljs-string">&quot;url&quot;</span>: url,
            <span class="hljs-string">&quot;page_num&quot;</span>: page_num,
            <span class="hljs-string">&quot;content&quot;</span>: content,
            <span class="hljs-string">&quot;embedding&quot;</span>: embedding,
        }
        entities.append(entity)

    <span class="hljs-comment"># Insert into Milvus</span>
    <span class="hljs-keyword">if</span> entities:
        milvus_client.insert(collection_name=COLLECTION_NAME, data=entities)
        <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Stored <span class="hljs-subst">{<span class="hljs-built_in">len</span>(entities)}</span> pages from <span class="hljs-subst">{url}</span> in Milvus.&quot;</span>)

    <span class="hljs-keyword">return</span> <span class="hljs-built_in">len</span>(entities)


<span class="hljs-comment"># Define OCR function</span>
<span class="hljs-keyword">def</span> <span class="hljs-title function_">perform_ocr</span>(<span class="hljs-params">url</span>):
    <span class="hljs-string">&quot;&quot;&quot;Apply OCR to a URL (PDF or image).&quot;&quot;&quot;</span>
    <span class="hljs-keyword">try</span>:
        <span class="hljs-comment"># Try PDF OCR first</span>
        response = client.ocr.process(
            model=ocr_model, document={<span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;document_url&quot;</span>, <span class="hljs-string">&quot;document_url&quot;</span>: url}
        )
    <span class="hljs-keyword">except</span> Exception:
        <span class="hljs-keyword">try</span>:
            <span class="hljs-comment"># If PDF OCR fails, try Image OCR</span>
            response = client.ocr.process(
                model=ocr_model, document={<span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;image_url&quot;</span>, <span class="hljs-string">&quot;image_url&quot;</span>: url}
            )
        <span class="hljs-keyword">except</span> Exception <span class="hljs-keyword">as</span> e:
            <span class="hljs-keyword">return</span> <span class="hljs-built_in">str</span>(e)  <span class="hljs-comment"># Return error message</span>

    <span class="hljs-comment"># Format the OCR results</span>
    ocr_result = <span class="hljs-string">&quot;\n\n&quot;</span>.join(
        [
            <span class="hljs-string">f&quot;### Page <span class="hljs-subst">{i + <span class="hljs-number">1</span>}</span>\n<span class="hljs-subst">{response.pages[i].markdown}</span>&quot;</span>
            <span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-built_in">len</span>(response.pages))
        ]
    )

    <span class="hljs-comment"># Store in Milvus</span>
    store_ocr_in_milvus(url, ocr_result)

    <span class="hljs-keyword">return</span> ocr_result


<span class="hljs-comment"># Process URLs</span>
<span class="hljs-keyword">def</span> <span class="hljs-title function_">process_document</span>(<span class="hljs-params">url</span>):
    <span class="hljs-string">&quot;&quot;&quot;Process a document URL and return its contents.&quot;&quot;&quot;</span>
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Processing document: <span class="hljs-subst">{url}</span>&quot;</span>)
    ocr_result = perform_ocr(url)
    <span class="hljs-keyword">return</span> ocr_result
<button class="copy-code-btn"></button></code></pre>
<h2 id="Search-Functionality" class="common-anchor-header">Search Functionality<button data-href="#Search-Functionality" class="anchor-icon" translate="no">
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
    </button></h2><p>Now, let’s implement the search functionality to retrieve relevant document content:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">search_documents</span>(<span class="hljs-params">query, limit=<span class="hljs-number">5</span></span>):
    <span class="hljs-string">&quot;&quot;&quot;Search Milvus for similar content to the query.&quot;&quot;&quot;</span>
    <span class="hljs-comment"># Check if collection exists</span>
    <span class="hljs-keyword">if</span> <span class="hljs-keyword">not</span> milvus_client.has_collection(COLLECTION_NAME):
        <span class="hljs-keyword">return</span> <span class="hljs-string">&quot;No documents have been processed yet.&quot;</span>

    <span class="hljs-comment"># Load collection if not already loaded</span>
    <span class="hljs-keyword">if</span> milvus_client.get_load_state(COLLECTION_NAME) != LoadState.Loaded:
        milvus_client.load_collection(COLLECTION_NAME)

    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Searching for: <span class="hljs-subst">{query}</span>&quot;</span>)
    query_embedding = generate_embedding(query)

    search_params = {<span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;COSINE&quot;</span>, <span class="hljs-string">&quot;params&quot;</span>: {<span class="hljs-string">&quot;nprobe&quot;</span>: <span class="hljs-number">10</span>}}

    search_results = milvus_client.search(
        collection_name=COLLECTION_NAME,
        data=[query_embedding],
        anns_field=<span class="hljs-string">&quot;embedding&quot;</span>,
        search_params=search_params,
        limit=limit,
        output_fields=[<span class="hljs-string">&quot;url&quot;</span>, <span class="hljs-string">&quot;page_num&quot;</span>, <span class="hljs-string">&quot;content&quot;</span>],
    )

    results = []

    <span class="hljs-keyword">if</span> <span class="hljs-keyword">not</span> search_results <span class="hljs-keyword">or</span> <span class="hljs-keyword">not</span> search_results[<span class="hljs-number">0</span>]:
        <span class="hljs-keyword">return</span> <span class="hljs-string">&quot;No matching documents found.&quot;</span>

    <span class="hljs-keyword">for</span> i, hit <span class="hljs-keyword">in</span> <span class="hljs-built_in">enumerate</span>(search_results[<span class="hljs-number">0</span>]):
        url = hit[<span class="hljs-string">&quot;entity&quot;</span>][<span class="hljs-string">&quot;url&quot;</span>]
        page_num = hit[<span class="hljs-string">&quot;entity&quot;</span>][<span class="hljs-string">&quot;page_num&quot;</span>]
        content = hit[<span class="hljs-string">&quot;entity&quot;</span>][<span class="hljs-string">&quot;content&quot;</span>]
        score = hit[<span class="hljs-string">&quot;distance&quot;</span>]

        results.append(
            {
                <span class="hljs-string">&quot;rank&quot;</span>: i + <span class="hljs-number">1</span>,
                <span class="hljs-string">&quot;score&quot;</span>: score,
                <span class="hljs-string">&quot;url&quot;</span>: url,
                <span class="hljs-string">&quot;page&quot;</span>: page_num,
                <span class="hljs-string">&quot;content&quot;</span>: content[:<span class="hljs-number">500</span>] + <span class="hljs-string">&quot;...&quot;</span> <span class="hljs-keyword">if</span> <span class="hljs-built_in">len</span>(content) &gt; <span class="hljs-number">500</span> <span class="hljs-keyword">else</span> content,
            }
        )

    <span class="hljs-keyword">return</span> results


<span class="hljs-comment"># Get statistics about stored documents</span>
<span class="hljs-keyword">def</span> <span class="hljs-title function_">get_document_stats</span>():
    <span class="hljs-string">&quot;&quot;&quot;Get statistics about documents stored in Milvus.&quot;&quot;&quot;</span>
    <span class="hljs-keyword">if</span> <span class="hljs-keyword">not</span> milvus_client.has_collection(COLLECTION_NAME):
        <span class="hljs-keyword">return</span> <span class="hljs-string">&quot;No documents have been processed yet.&quot;</span>

    <span class="hljs-comment"># Get collection stats</span>
    stats = milvus_client.get_collection_stats(COLLECTION_NAME)
    row_count = stats[<span class="hljs-string">&quot;row_count&quot;</span>]

    <span class="hljs-comment"># Get unique URLs</span>
    results = milvus_client.query(
        collection_name=COLLECTION_NAME, <span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;&quot;</span>, output_fields=[<span class="hljs-string">&quot;url&quot;</span>], limit=<span class="hljs-number">10000</span>
    )

    unique_urls = <span class="hljs-built_in">set</span>()
    <span class="hljs-keyword">for</span> result <span class="hljs-keyword">in</span> results:
        unique_urls.add(result[<span class="hljs-string">&quot;url&quot;</span>])

    <span class="hljs-keyword">return</span> {
        <span class="hljs-string">&quot;total_pages&quot;</span>: row_count,
        <span class="hljs-string">&quot;unique_documents&quot;</span>: <span class="hljs-built_in">len</span>(unique_urls),
        <span class="hljs-string">&quot;documents&quot;</span>: <span class="hljs-built_in">list</span>(unique_urls),
    }
<button class="copy-code-btn"></button></code></pre>
<h2 id="Demo-Processing-Documents" class="common-anchor-header">Demo: Processing Documents<button data-href="#Demo-Processing-Documents" class="anchor-icon" translate="no">
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
    </button></h2><p>Let’s process some example documents. You can replace these URLs with your own documents.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Example PDF URL (Mistral AI paper)</span>
pdf_url = <span class="hljs-string">&quot;https://arxiv.org/pdf/2310.06825.pdf&quot;</span>

<span class="hljs-comment"># Process the document</span>
ocr_result = process_document(pdf_url)

<span class="hljs-comment"># Display a preview of the OCR result</span>
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;\nOCR Result Preview:&quot;</span>)
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;====================&quot;</span>)
<span class="hljs-built_in">print</span>(ocr_result[:<span class="hljs-number">1000</span>] + <span class="hljs-string">&quot;...&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Processing document: https://arxiv.org/pdf/2310.06825.pdf
Stored 9 pages from https://arxiv.org/pdf/2310.06825.pdf in Milvus.

OCR Result Preview:
====================
### Page 1
# Mistral 7B 

Albert Q. Jiang, Alexandre Sablayrolles, Arthur Mensch, Chris Bamford, Devendra Singh Chaplot, Diego de las Casas, Florian Bressand, Gianna Lengyel, Guillaume Lample, Lucile Saulnier, Lélio Renard Lavaud, Marie-Anne Lachaux, Pierre Stock, Teven Le Scao, Thibaut Lavril, Thomas Wang, Timothée Lacroix, William El Sayed

![img-0.jpeg](img-0.jpeg)


#### Abstract

We introduce Mistral 7B, a 7-billion-parameter language model engineered for superior performance and efficiency. Mistral 7B outperforms the best open 13B model (Llama 2) across all evaluated benchmarks, and the best released 34B model (Llama 1) in reasoning, mathematics, and code generation. Our model leverages grouped-query attention (GQA) for faster inference, coupled with sliding window attention (SWA) to effectively handle sequences of arbitrary length with a reduced inference cost. We also provide a model fine-tuned to follow instructions, Mistral 7B - Instruct, that surpasses Llama 2 13B - chat mod...
</code></pre>
<p>Let’s process an image as well:</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Example image URL (replace with your own)</span>
image_url = <span class="hljs-string">&quot;https://s3.eu-central-1.amazonaws.com/readcoop.cis.public-assets.prod/hero/old-german-scripts.png&quot;</span>

<span class="hljs-comment"># Process the image</span>
<span class="hljs-keyword">try</span>:
    ocr_result = process_document(image_url)
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;\nImage OCR Result:&quot;</span>)
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;=================&quot;</span>)
    <span class="hljs-built_in">print</span>(ocr_result)
<span class="hljs-keyword">except</span> Exception <span class="hljs-keyword">as</span> e:
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Error processing image: <span class="hljs-subst">{e}</span>&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Processing document: https://s3.eu-central-1.amazonaws.com/readcoop.cis.public-assets.prod/hero/old-german-scripts.png
Stored 1 pages from https://s3.eu-central-1.amazonaws.com/readcoop.cis.public-assets.prod/hero/old-german-scripts.png in Milvus.

Image OCR Result:
=================
### Page 1
![img-0.jpeg](img-0.jpeg)
![img-1.jpeg](img-1.jpeg)
![img-2.jpeg](img-2.jpeg)
![img-3.jpeg](img-3.jpeg)
![img-4.jpeg](img-4.jpeg)
![img-5.jpeg](img-5.jpeg)
![img-6.jpeg](img-6.jpeg)
![img-7.jpeg](img-7.jpeg)
![img-8.jpeg](img-8.jpeg)
![img-9.jpeg](img-9.jpeg)
![img-10.jpeg](img-10.jpeg)
![img-11.jpeg](img-11.jpeg)
![img-12.jpeg](img-12.jpeg)
![img-13.jpeg](img-13.jpeg)
![img-14.jpeg](img-14.jpeg)
![img-15.jpeg](img-15.jpeg)
![img-16.jpeg](img-16.jpeg)
![img-17.jpeg](img-17.jpeg)
![img-18.jpeg](img-18.jpeg)
![img-19.jpeg](img-19.jpeg)
![img-20.jpeg](img-20.jpeg)
![img-21.jpeg](img-21.jpeg)
![img-22.jpeg](img-22.jpeg)
![img-23.jpeg](img-23.jpeg)
![img-24.jpeg](img-24.jpeg)
![img-25.jpeg](img-25.jpeg)
![img-26.jpeg](img-26.jpeg)
![img-27.jpeg](img-27.jpeg)
![img-28.jpeg](img-28.jpeg)
![img-29.jpeg](img-29.jpeg)
![img-30.jpeg](img-30.jpeg)
</code></pre>
<h2 id="Demo-Searching-Documents" class="common-anchor-header">Demo: Searching Documents<button data-href="#Demo-Searching-Documents" class="anchor-icon" translate="no">
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
    </button></h2><p>Now that we’ve processed some documents, let’s search through them:</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Get document statistics</span>
stats = get_document_stats()
<span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Total pages stored: <span class="hljs-subst">{stats[<span class="hljs-string">&#x27;total_pages&#x27;</span>]}</span>&quot;</span>)
<span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Unique documents: <span class="hljs-subst">{stats[<span class="hljs-string">&#x27;unique_documents&#x27;</span>]}</span>&quot;</span>)
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;\nProcessed documents:&quot;</span>)
<span class="hljs-keyword">for</span> i, url <span class="hljs-keyword">in</span> <span class="hljs-built_in">enumerate</span>(stats[<span class="hljs-string">&quot;documents&quot;</span>]):
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;<span class="hljs-subst">{i + <span class="hljs-number">1</span>}</span>. <span class="hljs-subst">{url}</span>&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Total pages stored: 58
Unique documents: 3

Processed documents:
1. https://arxiv.org/pdf/2310.06825.pdf
2. https://s3.eu-central-1.amazonaws.com/readcoop.cis.public-assets.prod/hero/old-german-scripts.png
3. https://arxiv.org/pdf/2410.07073
</code></pre>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Search for information</span>
query = <span class="hljs-string">&quot;What is Mistral 7B?&quot;</span>
results = search_documents(query, limit=<span class="hljs-number">3</span>)

<span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Search results for: &#x27;<span class="hljs-subst">{query}</span>&#x27;\n&quot;</span>)

<span class="hljs-keyword">if</span> <span class="hljs-built_in">isinstance</span>(results, <span class="hljs-built_in">str</span>):
    <span class="hljs-built_in">print</span>(results)
<span class="hljs-keyword">else</span>:
    <span class="hljs-keyword">for</span> result <span class="hljs-keyword">in</span> results:
        <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Result <span class="hljs-subst">{result[<span class="hljs-string">&#x27;rank&#x27;</span>]}</span> (Score: <span class="hljs-subst">{result[<span class="hljs-string">&#x27;score&#x27;</span>]:<span class="hljs-number">.2</span>f}</span>)&quot;</span>)
        <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Source: <span class="hljs-subst">{result[<span class="hljs-string">&#x27;url&#x27;</span>]}</span> (Page <span class="hljs-subst">{result[<span class="hljs-string">&#x27;page&#x27;</span>]}</span>)&quot;</span>)
        <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Content: <span class="hljs-subst">{result[<span class="hljs-string">&#x27;content&#x27;</span>]}</span>\n&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Searching for: What is Mistral 7B?
Search results for: 'What is Mistral 7B?'

Result 1 (Score: 0.83)
Source: https://arxiv.org/pdf/2310.06825.pdf (Page 2)
Content: Mistral 7B is released under the Apache 2.0 license. This release is accompanied by a reference implementation ${ }^{1}$ facilitating easy deployment either locally or on cloud platforms such as AWS, GCP, or Azure using the vLLM [17] inference server and SkyPilot ${ }^{2}$. Integration with Hugging Face ${ }^{3}$ is also streamlined for easier integration. Moreover, Mistral 7B is crafted for ease of fine-tuning across a myriad of tasks. As a demonstration of its adaptability and superior perform...

Result 2 (Score: 0.83)
Source: https://arxiv.org/pdf/2310.06825.pdf (Page 2)
Content: Mistral 7B is released under the Apache 2.0 license. This release is accompanied by a reference implementation ${ }^{1}$ facilitating easy deployment either locally or on cloud platforms such as AWS, GCP, or Azure using the vLLM [17] inference server and SkyPilot ${ }^{2}$. Integration with Hugging Face ${ }^{3}$ is also streamlined for easier integration. Moreover, Mistral 7B is crafted for ease of fine-tuning across a myriad of tasks. As a demonstration of its adaptability and superior perform...

Result 3 (Score: 0.82)
Source: https://arxiv.org/pdf/2310.06825.pdf (Page 1)
Content: # Mistral 7B 

Albert Q. Jiang, Alexandre Sablayrolles, Arthur Mensch, Chris Bamford, Devendra Singh Chaplot, Diego de las Casas, Florian Bressand, Gianna Lengyel, Guillaume Lample, Lucile Saulnier, Lélio Renard Lavaud, Marie-Anne Lachaux, Pierre Stock, Teven Le Scao, Thibaut Lavril, Thomas Wang, Timothée Lacroix, William El Sayed

![img-0.jpeg](img-0.jpeg)


#### Abstract

We introduce Mistral 7B, a 7-billion-parameter language model engineered for superior performance and efficiency. Mistral 7...
</code></pre>
<p>Try another search query:</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Search for more specific information</span>
query = <span class="hljs-string">&quot;What are the capabilities of Mistral&#x27;s language models?&quot;</span>
results = search_documents(query, limit=<span class="hljs-number">3</span>)

<span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Search results for: &#x27;<span class="hljs-subst">{query}</span>&#x27;\n&quot;</span>)

<span class="hljs-keyword">if</span> <span class="hljs-built_in">isinstance</span>(results, <span class="hljs-built_in">str</span>):
    <span class="hljs-built_in">print</span>(results)
<span class="hljs-keyword">else</span>:
    <span class="hljs-keyword">for</span> result <span class="hljs-keyword">in</span> results:
        <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Result <span class="hljs-subst">{result[<span class="hljs-string">&#x27;rank&#x27;</span>]}</span> (Score: <span class="hljs-subst">{result[<span class="hljs-string">&#x27;score&#x27;</span>]:<span class="hljs-number">.2</span>f}</span>)&quot;</span>)
        <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Source: <span class="hljs-subst">{result[<span class="hljs-string">&#x27;url&#x27;</span>]}</span> (Page <span class="hljs-subst">{result[<span class="hljs-string">&#x27;page&#x27;</span>]}</span>)&quot;</span>)
        <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Content: <span class="hljs-subst">{result[<span class="hljs-string">&#x27;content&#x27;</span>]}</span>\n&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Searching for: What are the capabilities of Mistral's language models?
Search results for: 'What are the capabilities of Mistral's language models?'

Result 1 (Score: 0.85)
Source: https://arxiv.org/pdf/2310.06825.pdf (Page 2)
Content: Mistral 7B is released under the Apache 2.0 license. This release is accompanied by a reference implementation ${ }^{1}$ facilitating easy deployment either locally or on cloud platforms such as AWS, GCP, or Azure using the vLLM [17] inference server and SkyPilot ${ }^{2}$. Integration with Hugging Face ${ }^{3}$ is also streamlined for easier integration. Moreover, Mistral 7B is crafted for ease of fine-tuning across a myriad of tasks. As a demonstration of its adaptability and superior perform...

Result 2 (Score: 0.85)
Source: https://arxiv.org/pdf/2310.06825.pdf (Page 2)
Content: Mistral 7B is released under the Apache 2.0 license. This release is accompanied by a reference implementation ${ }^{1}$ facilitating easy deployment either locally or on cloud platforms such as AWS, GCP, or Azure using the vLLM [17] inference server and SkyPilot ${ }^{2}$. Integration with Hugging Face ${ }^{3}$ is also streamlined for easier integration. Moreover, Mistral 7B is crafted for ease of fine-tuning across a myriad of tasks. As a demonstration of its adaptability and superior perform...

Result 3 (Score: 0.84)
Source: https://arxiv.org/pdf/2310.06825.pdf (Page 6)
Content: | Model | Answer |
| :--: | :--: |
| Mistral 7B - Instruct with Mistral system prompt | To kill a Linux process, you can use the `kill' command followed by the process ID (PID) of the process you want to terminate. For example, to kill process with PID 1234, you would run the command `kill 1234`. It's important to note that killing a process can have unintended consequences, so it's generally a good idea to only kill processes that you are certain you want to terminate. Additionally, it's genera...
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
    </button></h2><p>In this tutorial, we’ve built a complete document understanding system using Mistral OCR and Milvus. This system can:</p>
<ol>
<li>Process documents from URLs</li>
<li>Extract text using Mistral’s OCR capabilities</li>
<li>Generate vector embeddings for the content</li>
<li>Store both text and vectors in Milvus</li>
<li>Perform semantic search across all processed documents</li>
</ol>
<p>This approach enables powerful document understanding capabilities that go beyond simple keyword matching, allowing users to find information based on meaning rather than exact text matches.</p>
