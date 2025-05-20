---
id: quickstart.md
summary: Get started with Milvus.
title: Quickstart
---
<h1 id="Quickstart-with-Milvus-Lite" class="common-anchor-header">Quickstart with Milvus Lite<button data-href="#Quickstart-with-Milvus-Lite" class="anchor-icon" translate="no">
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
    </button></h1><p><a href="https://colab.research.google.com/github/milvus-io/bootcamp/blob/master/bootcamp/tutorials/quickstart/quickstart.ipynb" target="_parent"><img translate="no" src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"/></a>
<a href="https://github.com/milvus-io/bootcamp/blob/master/bootcamp/tutorials/quickstart/quickstart.ipynb" target="_blank"><img translate="no" src="https://img.shields.io/badge/View%20on%20GitHub-555555?style=flat&logo=github&logoColor=white" alt="GitHub Repository"/></a></p>
<p>Vectors, the output data format of Neural Network models, can effectively encode information and serve a pivotal role in AI applications such as knowledge base, semantic search, Retrieval Augmented Generation (RAG) and more.</p>
<p>Milvus is an open-source vector database that suits AI applications of every size from running a demo chatbot in Jupyter notebook to building web-scale search that serves billions of users. In this guide, we will walk you through how to set up Milvus locally within minutes and use the Python client library to generate, store and search vectors.</p>
<h2 id="Install-Milvus" class="common-anchor-header">Install Milvus<button data-href="#Install-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>In this guide we use Milvus Lite, a python library included in <code translate="no">pymilvus</code> that can be embedded into the client application. Milvus also supports deployment on <a href="/docs/v2.4.x/install_standalone-docker.md">Docker</a> and <a href="/docs/v2.4.x/install_cluster-milvusoperator.md">Kubernetes</a> for production use cases.</p>
<p>Before starting, make sure you have Python 3.8+ available in the local environment. Install <code translate="no">pymilvus</code> which contains both the python client library and Milvus Lite:</p>
<pre><code translate="no" class="language-python">$ pip install -U pymilvus
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<blockquote>
<p>If you are using Google Colab, to enable dependencies just installed, you may need to <strong>restart the runtime</strong>. (Click on the “Runtime” menu at the top of the screen, and select “Restart session” from the dropdown menu).</p>
</blockquote>
</div>
<h2 id="Set-Up-Vector-Database" class="common-anchor-header">Set Up Vector Database<button data-href="#Set-Up-Vector-Database" class="anchor-icon" translate="no">
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
    </button></h2><p>To create a local Milvus vector database, simply instantiate a <code translate="no">MilvusClient</code> by specifying a file name to store all data, such as "milvus_demo.db".</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(<span class="hljs-string">&quot;milvus_demo.db&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Create-a-Collection" class="common-anchor-header">Create a Collection<button data-href="#Create-a-Collection" class="anchor-icon" translate="no">
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
    </button></h2><p>In Milvus, we need a collection to store vectors and their associated metadata. You can think of it as a table in traditional SQL databases. When creating a collection, you can define schema and index params to configure vector specs such as dimensionality, index types and distant metrics. There are also complex concepts to optimize the index for vector search performance. For now, let’s just focus on the basics and use default for everything possible. At minimum, you only need to set the collection name and the dimension of the vector field of the collection.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">if</span> client.has_collection(collection_name=<span class="hljs-string">&quot;demo_collection&quot;</span>):
    client.drop_collection(collection_name=<span class="hljs-string">&quot;demo_collection&quot;</span>)
client.create_collection(
    collection_name=<span class="hljs-string">&quot;demo_collection&quot;</span>,
    dimension=<span class="hljs-number">768</span>,  <span class="hljs-comment"># The vectors we will use in this demo has 768 dimensions</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>In the above setup,</p>
<ul>
<li>The primary key and vector fields use their default names (“id” and “vector”).</li>
<li>The metric type (vector distance definition) is set to its default value (<a href="/docs/v2.4.x/metric.md#Cosine-Similarity">COSINE</a>).</li>
<li>The primary key field accepts integers and does not automatically increments (namely not using <a href="/docs/v2.4.x/schema.md">auto-id feature</a>)
Alternatively, you can formally define the schema of the collection by following this <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Collections/create_schema.md">instruction</a>.</li>
</ul>
<h2 id="Prepare-Data" class="common-anchor-header">Prepare Data<button data-href="#Prepare-Data" class="anchor-icon" translate="no">
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
    </button></h2><p>In this guide, we use vectors to perform semantic search on text. We need to generate vectors for text by downloading embedding models. This can be easily done by using the utility functions from <code translate="no">pymilvus[model]</code> library.</p>
<h2 id="Represent-text-with-vectors" class="common-anchor-header">Represent text with vectors<button data-href="#Represent-text-with-vectors" class="anchor-icon" translate="no">
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
    </button></h2><p>First, install the model library. This package includes essential ML tools such as PyTorch. The package download may take some time if your local environment has never installed PyTorch.</p>
<pre><code translate="no" class="language-python">$ pip install <span class="hljs-string">&quot;pymilvus[model]&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Generate vector embeddings with default model. Milvus expects data to be inserted organized as a list of dictionaries, where each dictionary represents a data record, termed as an entity.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> model

<span class="hljs-comment"># If connection to https://huggingface.co/ failed, uncomment the following path</span>
<span class="hljs-comment"># import os</span>
<span class="hljs-comment"># os.environ[&#x27;HF_ENDPOINT&#x27;] = &#x27;https://hf-mirror.com&#x27;</span>

<span class="hljs-comment"># This will download a small embedding model &quot;paraphrase-albert-small-v2&quot; (~50MB).</span>
embedding_fn = model.DefaultEmbeddingFunction()

<span class="hljs-comment"># Text strings to search from.</span>
docs = [
    <span class="hljs-string">&quot;Artificial intelligence was founded as an academic discipline in 1956.&quot;</span>,
    <span class="hljs-string">&quot;Alan Turing was the first person to conduct substantial research in AI.&quot;</span>,
    <span class="hljs-string">&quot;Born in Maida Vale, London, Turing was raised in southern England.&quot;</span>,
]

vectors = embedding_fn.encode_documents(docs)
<span class="hljs-comment"># The output vector has 768 dimensions, matching the collection that we just created.</span>
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Dim:&quot;</span>, embedding_fn.dim, vectors[<span class="hljs-number">0</span>].shape)  <span class="hljs-comment"># Dim: 768 (768,)</span>

<span class="hljs-comment"># Each entity has id, vector representation, raw text, and a subject label that we use</span>
<span class="hljs-comment"># to demo metadata filtering later.</span>
data = [
    {<span class="hljs-string">&quot;id&quot;</span>: i, <span class="hljs-string">&quot;vector&quot;</span>: vectors[i], <span class="hljs-string">&quot;text&quot;</span>: docs[i], <span class="hljs-string">&quot;subject&quot;</span>: <span class="hljs-string">&quot;history&quot;</span>}
    <span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-built_in">len</span>(vectors))
]

<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Data has&quot;</span>, <span class="hljs-built_in">len</span>(data), <span class="hljs-string">&quot;entities, each with fields: &quot;</span>, data[<span class="hljs-number">0</span>].keys())
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Vector dim:&quot;</span>, <span class="hljs-built_in">len</span>(data[<span class="hljs-number">0</span>][<span class="hljs-string">&quot;vector&quot;</span>]))
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Dim: <span class="hljs-number">768</span> (<span class="hljs-number">768</span>,)
Data has <span class="hljs-number">3</span> entities, <span class="hljs-keyword">each</span> <span class="hljs-keyword">with</span> fields:  dict_keys([<span class="hljs-string">&#x27;id&#x27;</span>, <span class="hljs-string">&#x27;vector&#x27;</span>, <span class="hljs-string">&#x27;text&#x27;</span>, <span class="hljs-string">&#x27;subject&#x27;</span>])
Vector dim: <span class="hljs-number">768</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Alternatively-Use-fake-representation-with-random-vectors" class="common-anchor-header">[Alternatively] Use fake representation with random vectors<button data-href="#Alternatively-Use-fake-representation-with-random-vectors" class="anchor-icon" translate="no">
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
    </button></h2><p>If you couldn’t download the model due to network issues, as a walkaround, you can use random vectors to represent the text and still finish the example. Just note that the search result won’t reflect semantic similarity as the vectors are fake ones.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> random

<span class="hljs-comment"># Text strings to search from.</span>
docs = [
    <span class="hljs-string">&quot;Artificial intelligence was founded as an academic discipline in 1956.&quot;</span>,
    <span class="hljs-string">&quot;Alan Turing was the first person to conduct substantial research in AI.&quot;</span>,
    <span class="hljs-string">&quot;Born in Maida Vale, London, Turing was raised in southern England.&quot;</span>,
]
<span class="hljs-comment"># Use fake representation with random vectors (768 dimension).</span>
vectors = [[random.uniform(-<span class="hljs-number">1</span>, <span class="hljs-number">1</span>) <span class="hljs-keyword">for</span> _ <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">768</span>)] <span class="hljs-keyword">for</span> _ <span class="hljs-keyword">in</span> docs]
data = [
    {<span class="hljs-string">&quot;id&quot;</span>: i, <span class="hljs-string">&quot;vector&quot;</span>: vectors[i], <span class="hljs-string">&quot;text&quot;</span>: docs[i], <span class="hljs-string">&quot;subject&quot;</span>: <span class="hljs-string">&quot;history&quot;</span>}
    <span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-built_in">len</span>(vectors))
]

<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Data has&quot;</span>, <span class="hljs-built_in">len</span>(data), <span class="hljs-string">&quot;entities, each with fields: &quot;</span>, data[<span class="hljs-number">0</span>].keys())
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Vector dim:&quot;</span>, <span class="hljs-built_in">len</span>(data[<span class="hljs-number">0</span>][<span class="hljs-string">&quot;vector&quot;</span>]))
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Data has <span class="hljs-number">3</span> entities, <span class="hljs-keyword">each</span> <span class="hljs-keyword">with</span> fields:  dict_keys([<span class="hljs-string">&#x27;id&#x27;</span>, <span class="hljs-string">&#x27;vector&#x27;</span>, <span class="hljs-string">&#x27;text&#x27;</span>, <span class="hljs-string">&#x27;subject&#x27;</span>])
Vector dim: <span class="hljs-number">768</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Insert-Data" class="common-anchor-header">Insert Data<button data-href="#Insert-Data" class="anchor-icon" translate="no">
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
    </button></h2><p>Let’s insert the data into the collection:</p>
<pre><code translate="no" class="language-python">res = client.insert(collection_name=<span class="hljs-string">&quot;demo_collection&quot;</span>, data=data)

<span class="hljs-built_in">print</span>(res)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">{<span class="hljs-string">&#x27;insert_count&#x27;</span>: 3, <span class="hljs-string">&#x27;ids&#x27;</span>: [0, 1, 2], <span class="hljs-string">&#x27;cost&#x27;</span>: 0}
<button class="copy-code-btn"></button></code></pre>
<h2 id="Semantic-Search" class="common-anchor-header">Semantic Search<button data-href="#Semantic-Search" class="anchor-icon" translate="no">
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
    </button></h2><p>Now we can do semantic searches by representing the search query text as vector, and conduct vector similarity search on Milvus.</p>
<h3 id="Vector-search" class="common-anchor-header">Vector search</h3><p>Milvus accepts one or multiple vector search requests at the same time. The value of the query_vectors variable is a list of vectors, where each vector is an array of float numbers.</p>
<pre><code translate="no" class="language-python">query_vectors = embedding_fn.encode_queries([<span class="hljs-string">&quot;Who is Alan Turing?&quot;</span>])
<span class="hljs-comment"># If you don&#x27;t have the embedding function you can use a fake vector to finish the demo:</span>
<span class="hljs-comment"># query_vectors = [ [ random.uniform(-1, 1) for _ in range(768) ] ]</span>

res = client.search(
    collection_name=<span class="hljs-string">&quot;demo_collection&quot;</span>,  <span class="hljs-comment"># target collection</span>
    data=query_vectors,  <span class="hljs-comment"># query vectors</span>
    limit=<span class="hljs-number">2</span>,  <span class="hljs-comment"># number of returned entities</span>
    output_fields=[<span class="hljs-string">&quot;text&quot;</span>, <span class="hljs-string">&quot;subject&quot;</span>],  <span class="hljs-comment"># specifies fields to be returned</span>
)

<span class="hljs-built_in">print</span>(res)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no"><span class="hljs-keyword">data</span>: [<span class="hljs-string">&quot;[{&#x27;id&#x27;: 2, &#x27;distance&#x27;: 0.5859944820404053, &#x27;entity&#x27;: {&#x27;text&#x27;: &#x27;Born in Maida Vale, London, Turing was raised in southern England.&#x27;, &#x27;subject&#x27;: &#x27;history&#x27;}}, {&#x27;id&#x27;: 1, &#x27;distance&#x27;: 0.5118255615234375, &#x27;entity&#x27;: {&#x27;text&#x27;: &#x27;Alan Turing was the first person to conduct substantial research in AI.&#x27;, &#x27;subject&#x27;: &#x27;history&#x27;}}]&quot;</span>] , extra_info: {<span class="hljs-string">&#x27;cost&#x27;</span>: <span class="hljs-number">0</span>}
<button class="copy-code-btn"></button></code></pre>
<p>The output is a list of results, each mapping to a vector search query. Each query contains a list of results, where each result contains the entity primary key, the distance to the query vector, and the entity details with specified <code translate="no">output_fields</code>.</p>
<h2 id="Vector-Search-with-Metadata-Filtering" class="common-anchor-header">Vector Search with Metadata Filtering<button data-href="#Vector-Search-with-Metadata-Filtering" class="anchor-icon" translate="no">
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
    </button></h2><p>You can also conduct vector search while considering the values of the metadata (called “scalar” fields in Milvus, as scalar refers to non-vector data). This is done with a filter expression specifying certain criteria. Let’s see how to search and filter with the <code translate="no">subject</code> field in the following example.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Insert more docs in another subject.</span>
docs = [
    <span class="hljs-string">&quot;Machine learning has been used for drug design.&quot;</span>,
    <span class="hljs-string">&quot;Computational synthesis with AI algorithms predicts molecular properties.&quot;</span>,
    <span class="hljs-string">&quot;DDR1 is involved in cancers and fibrosis.&quot;</span>,
]
vectors = embedding_fn.encode_documents(docs)
data = [
    {<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">3</span> + i, <span class="hljs-string">&quot;vector&quot;</span>: vectors[i], <span class="hljs-string">&quot;text&quot;</span>: docs[i], <span class="hljs-string">&quot;subject&quot;</span>: <span class="hljs-string">&quot;biology&quot;</span>}
    <span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-built_in">len</span>(vectors))
]

client.insert(collection_name=<span class="hljs-string">&quot;demo_collection&quot;</span>, data=data)

<span class="hljs-comment"># This will exclude any text in &quot;history&quot; subject despite close to the query vector.</span>
res = client.search(
    collection_name=<span class="hljs-string">&quot;demo_collection&quot;</span>,
    data=embedding_fn.encode_queries([<span class="hljs-string">&quot;tell me AI related information&quot;</span>]),
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;subject == &#x27;biology&#x27;&quot;</span>,
    limit=<span class="hljs-number">2</span>,
    output_fields=[<span class="hljs-string">&quot;text&quot;</span>, <span class="hljs-string">&quot;subject&quot;</span>],
)

<span class="hljs-built_in">print</span>(res)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no"><span class="hljs-keyword">data</span>: [<span class="hljs-string">&quot;[{&#x27;id&#x27;: 4, &#x27;distance&#x27;: 0.27030569314956665, &#x27;entity&#x27;: {&#x27;text&#x27;: &#x27;Computational synthesis with AI algorithms predicts molecular properties.&#x27;, &#x27;subject&#x27;: &#x27;biology&#x27;}}, {&#x27;id&#x27;: 3, &#x27;distance&#x27;: 0.16425910592079163, &#x27;entity&#x27;: {&#x27;text&#x27;: &#x27;Machine learning has been used for drug design.&#x27;, &#x27;subject&#x27;: &#x27;biology&#x27;}}]&quot;</span>] , extra_info: {<span class="hljs-string">&#x27;cost&#x27;</span>: <span class="hljs-number">0</span>}
<button class="copy-code-btn"></button></code></pre>
<p>By default, the scalar fields are not indexed. If you need to perform metadata filtered search in large dataset, you can consider using fixed schema and also turn on the <a href="/docs/v2.4.x/scalar_index.md">index</a> to improve the search performance.</p>
<p>In addition to vector search, you can also perform other types of searches:</p>
<h3 id="Query" class="common-anchor-header">Query</h3><p>A query() is an operation that retrieves all entities matching a criteria, such as a <a href="/docs/v2.4.x/boolean.md">filter expression</a> or matching some ids.</p>
<p>For example, retrieving all entities whose scalar field has a particular value:</p>
<pre><code translate="no" class="language-python">res = client.query(
    collection_name=<span class="hljs-string">&quot;demo_collection&quot;</span>,
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;subject == &#x27;history&#x27;&quot;</span>,
    output_fields=[<span class="hljs-string">&quot;text&quot;</span>, <span class="hljs-string">&quot;subject&quot;</span>],
)
<button class="copy-code-btn"></button></code></pre>
<p>Directly retrieve entities by primary key:</p>
<pre><code translate="no" class="language-python">res = client.query(
    collection_name=<span class="hljs-string">&quot;demo_collection&quot;</span>,
    ids=[<span class="hljs-number">0</span>, <span class="hljs-number">2</span>],
    output_fields=[<span class="hljs-string">&quot;vector&quot;</span>, <span class="hljs-string">&quot;text&quot;</span>, <span class="hljs-string">&quot;subject&quot;</span>],
)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Delete-Entities" class="common-anchor-header">Delete Entities<button data-href="#Delete-Entities" class="anchor-icon" translate="no">
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
    </button></h2><p>If you’d like to purge data, you can delete entities specifying the primary key or delete all entities matching a particular filter expression.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Delete entities by primary key</span>
res = client.delete(collection_name=<span class="hljs-string">&quot;demo_collection&quot;</span>, ids=[<span class="hljs-number">0</span>, <span class="hljs-number">2</span>])

<span class="hljs-built_in">print</span>(res)

<span class="hljs-comment"># Delete entities by a filter expression</span>
res = client.delete(
    collection_name=<span class="hljs-string">&quot;demo_collection&quot;</span>,
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;subject == &#x27;biology&#x27;&quot;</span>,
)

<span class="hljs-built_in">print</span>(res)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">[<span class="hljs-meta">0, 2</span>]
[<span class="hljs-meta">3, 4, 5</span>]
<button class="copy-code-btn"></button></code></pre>
<h2 id="Load-Existing-Data" class="common-anchor-header">Load Existing Data<button data-href="#Load-Existing-Data" class="anchor-icon" translate="no">
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
    </button></h2><p>Since all data of Milvus Lite is stored in a local file, you can load all data into memory even after the program terminates, by creating a <code translate="no">MilvusClient</code> with the existing file. For example, this will recover the collections from “milvus_demo.db” file and continue to write data into it.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(<span class="hljs-string">&quot;milvus_demo.db&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Drop-the-collection" class="common-anchor-header">Drop the collection<button data-href="#Drop-the-collection" class="anchor-icon" translate="no">
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
    </button></h2><p>If you would like to delete all the data in a collection, you can drop the collection with</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Drop collection</span>
client.drop_collection(collection_name=<span class="hljs-string">&quot;demo_collection&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Learn-More" class="common-anchor-header">Learn More<button data-href="#Learn-More" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus Lite is great for getting started with a local python program. If you have large scale data or would like to use Milvus in production, you can learn about deploying Milvus on <a href="/docs/v2.4.x/install_standalone-docker.md">Docker</a> and <a href="/docs/v2.4.x/install_cluster-milvusoperator.md">Kubernetes</a>. All deployment modes of Milvus share the same API, so your client side code doesn’t need to change much if moving to another deployment mode. Simply specify the <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Client/MilvusClient.md">URI and Token</a> of a Milvus server deployed anywhere:</p>
<pre><code translate="no" class="language-python">client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>, token=<span class="hljs-string">&quot;root:Milvus&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<p>Milvus provides REST and gRPC API, with client libraries in languages such as <a href="/docs/v2.4.x/install-pymilvus.md">Python</a>, <a href="/docs/v2.4.x/install-java.md">Java</a>, <a href="/docs/v2.4.x/install-go.md">Go</a>, C# and <a href="/docs/v2.4.x/install-node.md">Node.js</a>.</p>
