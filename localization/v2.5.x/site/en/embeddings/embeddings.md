---
id: embeddings.md
order: 1
summary: Learn how to generate embeddings for your data.
title: Embedding Overview
---
<h1 id="Embedding-Overview" class="common-anchor-header">Embedding Overview<button data-href="#Embedding-Overview" class="anchor-icon" translate="no">
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
    </button></h1><p>Embedding is a machine learning concept for mapping data into a high-dimensional space, where data of similar semantic are placed close together. Typically being a Deep Neural Network from BERT or other Transformer families, the embedding model can effectively represent the semantics of text, images, and other data types with a series of numbers known as vectors. A key feature of these models is that the mathematical distance between vectors in the high-dimensional space can indicate the similarity of the semantics of original text or images. This property unlocks many information retrieval applications, such as web search engines like Google and Bing, product search and recommendations on e-commerce sites, and the recently popular Retrieval Augmented Generation (RAG) paradigm in generative AI.</p>
<p>There are two main categories of embeddings, each producing a different type of vector:</p>
<ul>
<li><p><strong>Dense embedding</strong>: Most embedding models represent information as a floating point vector of hundreds to thousands of dimensions. The output is called “dense” vectors as most dimensions have non-zero values. For instance, the popular open-source embedding model BAAI/bge-base-en-v1.5 outputs vectors of 768 floating point numbers (768-dimension float vector).</p></li>
<li><p><strong>Sparse embedding</strong>: In contrast, the output vectors of sparse embeddings has most dimensions being zero, namely “sparse” vectors. These vectors often have much higher dimensions (tens of thousands or more) which is determined by the size of the token vocabulary. Sparse vectors can be generated by Deep Neural Networks or statistical analysis of text corpora. Due to their interpretability and observed better out-of-domain generalization capabilities, sparse embeddings are increasingly adopted by developers as a complement to dense embeddings.</p></li>
</ul>
<p>Milvus is a vector database designed for vector data management, storage, and retrieval. By integrating mainstream embedding and <a href="https://milvus.io/docs/rerankers-overview.md">reranking</a> models, you can easily transform original text into searchable vectors or rerank the results using powerful models to achieve more accurate results for RAG. This integration simplifies text transformation and eliminates the need for additional embedding or reranking components, thereby streamlining RAG development and validation.</p>
<p>To create embeddings in action, refer to <a href="https://github.com/milvus-io/bootcamp/blob/master/bootcamp/model/embedding_functions.ipynb">Using PyMilvus’s Model To Generate Text Embeddings</a>.</p>
<table>
<thead>
<tr><th>Embedding Function</th><th>Type</th><th>API or Open-sourced</th></tr>
</thead>
<tbody>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.5.x/EmbeddingModels/OpenAIEmbeddingFunction/OpenAIEmbeddingFunction.md">openai</a></td><td>Dense</td><td>API</td></tr>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.5.x/EmbeddingModels/SentenceTransformerEmbeddingFunction/SentenceTransformerEmbeddingFunction.md">sentence-transformer</a></td><td>Dense</td><td>Open-sourced</td></tr>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.5.x/EmbeddingModels/SpladeEmbeddingFunction/SpladeEmbeddingFunction.md">Splade</a></td><td>Sparse</td><td>Open-sourced</td></tr>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.5.x/EmbeddingModels/BGEM3EmbeddingFunction/BGEM3EmbeddingFunction.md">bge-m3</a></td><td>Hybrid</td><td>Open-sourced</td></tr>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.5.x/EmbeddingModels/VoyageEmbeddingFunction/VoyageEmbeddingFunction.md">voyageai</a></td><td>Dense</td><td>API</td></tr>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.5.x/EmbeddingModels/JinaEmbeddingFunction/JinaEmbeddingFunction.md">jina</a></td><td>Dense</td><td>API</td></tr>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.5.x/EmbeddingModels/CohereEmbeddingFunction/CohereEmbeddingFunction.md">cohere</a></td><td>Dense</td><td>API</td></tr>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.5.x/EmbeddingModels/InstructorEmbeddingFunction/InstructorEmbeddingFunction.md">Instructor</a></td><td>Dense</td><td>Open-sourced</td></tr>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.5.x/EmbeddingModels/MistralAIEmbeddingFunction/MistralAIEmbeddingFunction.md">Mistral AI</a></td><td>Dense</td><td>API</td></tr>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.5.x/EmbeddingModels/NomicEmbeddingFunction/NomicEmbeddingFunction.md">Nomic</a></td><td>Dense</td><td>API</td></tr>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.5.x/EmbeddingModels/Model2VecEmbeddingFunction/Model2VecEmbeddingFunction.md">mGTE</a></td><td>Hybrid</td><td>Open-sourced</td></tr>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.5.x/EmbeddingModels/Model2VecEmbeddingFunction/Model2VecEmbeddingFunction.md">Model2Vec</a></td><td>Hybrid</td><td>Open-sourced</td></tr>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.5.x/EmbeddingModels/GeminiEmbeddingFunction/GeminiEmbeddingFunction.md">Gemini</a></td><td>Hybrid</td><td>Private</td></tr>
</tbody>
</table>
<h2 id="Example-1-Use-default-embedding-function-to-generate-dense-vectors" class="common-anchor-header">Example 1: Use default embedding function to generate dense vectors<button data-href="#Example-1-Use-default-embedding-function-to-generate-dense-vectors" class="anchor-icon" translate="no">
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
    </button></h2><p>To use embedding functions with Milvus, first install the PyMilvus client library with the <code translate="no">model</code> subpackage that wraps all the utilities for embedding generation.</p>
<pre><code translate="no" class="language-python">pip install <span class="hljs-string">&quot;pymilvus[model]&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>The <code translate="no">model</code> subpackage supports various embedding models, from <a href="https://milvus.io/docs/embed-with-openai.md">OpenAI</a>, <a href="https://milvus.io/docs/embed-with-sentence-transform.md">Sentence Transformers</a>, <a href="https://milvus.io/docs/embed-with-bgm-m3.md">BGE M3</a>, to <a href="https://milvus.io/docs/embed-with-splade.md">SPLADE</a> pretrained models. For simpilicity, this example uses the <code translate="no">DefaultEmbeddingFunction</code> which is <strong>all-MiniLM-L6-v2</strong> sentence transformer model, the model is about 70MB and it will be downloaded during first use:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> model

<span class="hljs-comment"># This will download &quot;all-MiniLM-L6-v2&quot;, a light weight model.</span>
ef = model.DefaultEmbeddingFunction()

<span class="hljs-comment"># Data from which embeddings are to be generated </span>
docs = [
    <span class="hljs-string">&quot;Artificial intelligence was founded as an academic discipline in 1956.&quot;</span>,
    <span class="hljs-string">&quot;Alan Turing was the first person to conduct substantial research in AI.&quot;</span>,
    <span class="hljs-string">&quot;Born in Maida Vale, London, Turing was raised in southern England.&quot;</span>,
]

embeddings = ef.encode_documents(docs)

<span class="hljs-comment"># Print embeddings</span>
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Embeddings:&quot;</span>, embeddings)
<span class="hljs-comment"># Print dimension and shape of embeddings</span>
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Dim:&quot;</span>, ef.dim, embeddings[<span class="hljs-number">0</span>].shape)
<button class="copy-code-btn"></button></code></pre>
<p>The expected output is similar to the following:</p>
<pre><code translate="no" class="language-python">Embeddings: [array([-<span class="hljs-number">3.09392996e-02</span>, -<span class="hljs-number">1.80662833e-02</span>,  <span class="hljs-number">1.34775648e-02</span>,  <span class="hljs-number">2.77156215e-02</span>,
       -<span class="hljs-number">4.86349640e-03</span>, -<span class="hljs-number">3.12581174e-02</span>, -<span class="hljs-number">3.55921760e-02</span>,  <span class="hljs-number">5.76934684e-03</span>,
        <span class="hljs-number">2.80773244e-03</span>,  <span class="hljs-number">1.35783911e-01</span>,  <span class="hljs-number">3.59678417e-02</span>,  <span class="hljs-number">6.17732145e-02</span>,
...
       -<span class="hljs-number">4.61330153e-02</span>, -<span class="hljs-number">4.85207550e-02</span>,  <span class="hljs-number">3.13997865e-02</span>,  <span class="hljs-number">7.82178566e-02</span>,
       -<span class="hljs-number">4.75336798e-02</span>,  <span class="hljs-number">5.21207601e-02</span>,  <span class="hljs-number">9.04406682e-02</span>, -<span class="hljs-number">5.36676683e-02</span>],
      dtype=float32)]
Dim: <span class="hljs-number">384</span> (<span class="hljs-number">384</span>,)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Example-2-Generate-dense-and-sparse-vectors-in-one-call-with-BGE-M3-model" class="common-anchor-header">Example 2: Generate dense and sparse vectors in one call with BGE M3 model<button data-href="#Example-2-Generate-dense-and-sparse-vectors-in-one-call-with-BGE-M3-model" class="anchor-icon" translate="no">
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
    </button></h2><p>In this example, we use <a href="https://milvus.io/docs/embed-with-bgm-m3.md">BGE M3</a> hybrid model to embed text into both dense and sparse vectors and use them to retrieve relevant documents. The overall steps are as follows:</p>
<ol>
<li><p>Embed the text as dense and sparse vectors using BGE-M3 model;</p></li>
<li><p>Set up a Milvus collection to store the dense and sparse vectors;</p></li>
<li><p>Insert the data to Milvus;</p></li>
<li><p>Search and inspect the result.</p></li>
</ol>
<p>First, we need to install the necessary dependencies.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus.model.hybrid <span class="hljs-keyword">import</span> BGEM3EmbeddingFunction
<span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> (
    utility,
    FieldSchema, CollectionSchema, DataType,
    Collection, AnnSearchRequest, RRFRanker, connections,
)
<button class="copy-code-btn"></button></code></pre>
<p>Use BGE M3 to encode docs and queries for embedding retrieval.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># 1. prepare a small corpus to search</span>
docs = [
    <span class="hljs-string">&quot;Artificial intelligence was founded as an academic discipline in 1956.&quot;</span>,
    <span class="hljs-string">&quot;Alan Turing was the first person to conduct substantial research in AI.&quot;</span>,
    <span class="hljs-string">&quot;Born in Maida Vale, London, Turing was raised in southern England.&quot;</span>,
]
query = <span class="hljs-string">&quot;Who started AI research?&quot;</span>

<span class="hljs-comment"># BGE-M3 model can embed texts as dense and sparse vectors.</span>
<span class="hljs-comment"># It is included in the optional `model` module in pymilvus, to install it,</span>
<span class="hljs-comment"># simply run &quot;pip install pymilvus[model]&quot;.</span>

bge_m3_ef = BGEM3EmbeddingFunction(use_fp16=<span class="hljs-literal">False</span>, device=<span class="hljs-string">&quot;cpu&quot;</span>)

docs_embeddings = bge_m3_ef(docs)
query_embeddings = bge_m3_ef([query])
<button class="copy-code-btn"></button></code></pre>
