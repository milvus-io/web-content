---
id: milvus_lite.md
summary: Get started with Milvus Lite.
title: Run Milvus Lite Locally
---
<h1 id="Run-Milvus-Lite-Locally" class="common-anchor-header">Run Milvus Lite Locally<button data-href="#Run-Milvus-Lite-Locally" class="anchor-icon" translate="no">
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
    </button></h1><p>This page illustrates how to run Milvus locally with Milvus Lite. Milvus Lite is the lightweight version of <a href="https://github.com/milvus-io/milvus">Milvus</a>, an open-source vector database that powers AI applications with vector embeddings and similarity search.</p>
<h2 id="Overview" class="common-anchor-header">Overview<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus Lite can be imported into your Python application, providing the core vector search functionality of Milvus. Milvus Lite is already included in the <a href="https://github.com/milvus-io/pymilvus">Python SDK of Milvus</a>. It can be simply deployed with <code translate="no">pip install pymilvus</code>.</p>
<p>With Milvus Lite, you can start building an AI application with vector similarity search within minutes! Milvus Lite is good for running in the following environment:</p>
<ul>
<li>Jupyter Notebook / Google Colab</li>
<li>Laptops</li>
<li>Edge Devices</li>
</ul>
<p>Milvus Lite shares the same API with Milvus Standalone and Distributed, and covers most of the features such as vector data persistence and management, vector CRUD operations, sparse and dense vector search, metadata filtering, multi-vector and hybrid_search. Together, they provide a consistent experience across different types of environments, from edge devices to clusters in cloud, fitting use cases of different size. With the same client-side code, you can run GenAI apps with Milvus Lite on a laptop or Jupyter Notebook, or Milvus Standalone on Docker container, or Milvus Distributed on massive scale Kubernetes cluster serving billions of vectors in production.</p>
<h2 id="Prerequisites" class="common-anchor-header">Prerequisites<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus Lite currently supports the following environmnets:</p>
<ul>
<li>Ubuntu >= 20.04 (x86_64 and arm64)</li>
<li>MacOS >= 11.0 (Apple Silicon M1/M2 and x86_64)</li>
</ul>
<p>Please note that Milvus Lite is only suitable for small scale vector search use cases. For a large scale use case, we recommend using <a href="https://milvus.io/docs/install-overview.md#Milvus-Standalone">Milvus Standalone</a> or <a href="https://milvus.io/docs/install-overview.md#Milvus-Distributed">Milvus Distributed</a>. You can also consider the fully-managed Milvus on <a href="https://zilliz.com/cloud">Zilliz Cloud</a>.</p>
<h2 id="Set-up-Milvus-Lite" class="common-anchor-header">Set up Milvus Lite<button data-href="#Set-up-Milvus-Lite" class="anchor-icon" translate="no">
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
    </button></h2><pre><code translate="no" class="language-shell">pip install -U pymilvus
<button class="copy-code-btn"></button></code></pre>
<p>We recommend using <code translate="no">pymilvus</code>. Since <code translate="no">milvus-lite</code> is included in <code translate="no">pymilvus</code> version 2.4.2 or above, you can <code translate="no">pip install</code> with <code translate="no">-U</code> to force update to the latest version and <code translate="no">milvus-lite</code> is automatically installed.</p>
<p>If you want to explicitly install <code translate="no">milvus-lite</code> package, or you have installed an older version of <code translate="no">milvus-lite</code> and would like to update it, you can do <code translate="no">pip install -U milvus-lite</code>.</p>
<h2 id="Connect-to-Milvus-Lite" class="common-anchor-header">Connect to Milvus Lite<button data-href="#Connect-to-Milvus-Lite" class="anchor-icon" translate="no">
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
    </button></h2><p>In <code translate="no">pymilvus</code>, specify a local file name as uri parameter of MilvusClient will use Milvus Lite.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient
client = MilvusClient(<span class="hljs-string">&quot;./milvus_demo.db&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<p>After running the above code snippet, a database file named <strong>milvus_demo.db</strong> will be generated in the current folder.</p>
<blockquote>
<p><strong><em>NOTE:</em></strong>  Note that the same API also applies to Milvus Standalone, Milvus Distributed and Zilliz Cloud, the only difference is to replace local file name to remote server endpoint and credentials, e.g.
<code translate="no">client = MilvusClient(uri=&quot;http://localhost:19530&quot;, token=&quot;username:password&quot;)</code>.</p>
</blockquote>
<h2 id="Examples" class="common-anchor-header">Examples<button data-href="#Examples" class="anchor-icon" translate="no">
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
    </button></h2><p>Following is a simple demo showing how to use Milvus Lite for text search. There are more comprehensive <a href="https://github.com/milvus-io/bootcamp/tree/master/bootcamp/tutorials">examples</a> for using Milvus Lite to build applications
such as <a href="https://github.com/milvus-io/bootcamp/blob/master/tutorials/quickstart/build_RAG_with_milvus.ipynb">RAG</a>, <a href="https://github.com/milvus-io/bootcamp/blob/master/tutorials/quickstart/image_search_with_milvus.ipynb">image search</a>, and using Milvus Lite in popular RAG framework such as <a href="https://github.com/milvus-io/bootcamp/blob/master/integration/rag_with_milvus_and_langchain.ipynb">LangChain</a> and <a href="https://github.com/milvus-io/bootcamp/blob/master/integration/rag_with_milvus_and_llamaindex.ipynb">LlamaIndex</a>!</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient
<span class="hljs-keyword">import</span> numpy <span class="hljs-keyword">as</span> np

client = MilvusClient(<span class="hljs-string">&quot;./milvus_demo.db&quot;</span>)
client.create_collection(
    collection_name=<span class="hljs-string">&quot;demo_collection&quot;</span>,
    dimension=<span class="hljs-number">384</span>  <span class="hljs-comment"># The vectors we will use in this demo has 384 dimensions</span>
)

<span class="hljs-comment"># Text strings to search from.</span>
docs = [
    <span class="hljs-string">&quot;Artificial intelligence was founded as an academic discipline in 1956.&quot;</span>,
    <span class="hljs-string">&quot;Alan Turing was the first person to conduct substantial research in AI.&quot;</span>,
    <span class="hljs-string">&quot;Born in Maida Vale, London, Turing was raised in southern England.&quot;</span>,
]
<span class="hljs-comment"># For illustration, here we use fake vectors with random numbers (384 dimension).</span>

vectors = [[ np.random.uniform(-<span class="hljs-number">1</span>, <span class="hljs-number">1</span>) <span class="hljs-keyword">for</span> _ <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">384</span>) ] <span class="hljs-keyword">for</span> _ <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-built_in">len</span>(docs)) ]
data = [ {<span class="hljs-string">&quot;id&quot;</span>: i, <span class="hljs-string">&quot;vector&quot;</span>: vectors[i], <span class="hljs-string">&quot;text&quot;</span>: docs[i], <span class="hljs-string">&quot;subject&quot;</span>: <span class="hljs-string">&quot;history&quot;</span>} <span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-built_in">len</span>(vectors)) ]
res = client.insert(
    collection_name=<span class="hljs-string">&quot;demo_collection&quot;</span>,
    data=data
)

<span class="hljs-comment"># This will exclude any text in &quot;history&quot; subject despite close to the query vector.</span>
res = client.search(
    collection_name=<span class="hljs-string">&quot;demo_collection&quot;</span>,
    data=[vectors[<span class="hljs-number">0</span>]],
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;subject == &#x27;history&#x27;&quot;</span>,
    limit=<span class="hljs-number">2</span>,
    output_fields=[<span class="hljs-string">&quot;text&quot;</span>, <span class="hljs-string">&quot;subject&quot;</span>],
)
<span class="hljs-built_in">print</span>(res)

<span class="hljs-comment"># a query that retrieves all entities matching filter expressions.</span>
res = client.query(
    collection_name=<span class="hljs-string">&quot;demo_collection&quot;</span>,
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;subject == &#x27;history&#x27;&quot;</span>,
    output_fields=[<span class="hljs-string">&quot;text&quot;</span>, <span class="hljs-string">&quot;subject&quot;</span>],
)
<span class="hljs-built_in">print</span>(res)

<span class="hljs-comment"># delete</span>
res = client.delete(
    collection_name=<span class="hljs-string">&quot;demo_collection&quot;</span>,
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;subject == &#x27;history&#x27;&quot;</span>,
)
<span class="hljs-built_in">print</span>(res)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Limits" class="common-anchor-header">Limits<button data-href="#Limits" class="anchor-icon" translate="no">
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
    </button></h2><p>When running Milvus Lite, note that some features are not supported. The following tables summarize the usage limits on Milvus Lite.</p>
<h3 id="Collection" class="common-anchor-header">Collection</h3><table>
<thead>
<tr><th>Method / Parameter</th><th>Supported in Milvus Lite</th></tr>
</thead>
<tbody>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Collections/create_collection.md">create_collection()</a></td><td>Support with limited parameters</td></tr>
<tr><td><code translate="no">collection_name</code></td><td>Y</td></tr>
<tr><td><code translate="no">dimension</code></td><td>Y</td></tr>
<tr><td><code translate="no">primary_field_name</code></td><td>Y</td></tr>
<tr><td><code translate="no">id_type</code></td><td>Y</td></tr>
<tr><td><code translate="no">vector_field_name</code></td><td>Y</td></tr>
<tr><td><code translate="no">metric_type</code></td><td>Y</td></tr>
<tr><td><code translate="no">auto_id</code></td><td>Y</td></tr>
<tr><td><code translate="no">schema</code></td><td>Y</td></tr>
<tr><td><code translate="no">index_params</code></td><td>Y</td></tr>
<tr><td><code translate="no">enable_dynamic_field</code></td><td>Y</td></tr>
<tr><td><code translate="no">num_shards</code></td><td>N</td></tr>
<tr><td><code translate="no">partition_key_field</code></td><td>N</td></tr>
<tr><td><code translate="no">num_partitions</code></td><td>N</td></tr>
<tr><td><code translate="no">consistency_level</code></td><td>N (Only supports <code translate="no">Strong</code>; Any configuration will be treated as <code translate="no">Strong</code>.)</td></tr>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Collections/get_collection_stats.md">get_collection_stats()</a></td><td>Supports getting collection statistics.</td></tr>
<tr><td><code translate="no">collection_name</code></td><td>Y</td></tr>
<tr><td><code translate="no">timeout</code></td><td>Y</td></tr>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Collections/describe_collection.md">describe_collection()</a></td><td><code translate="no">num_shards</code>, <code translate="no">consistency_level</code>, and <code translate="no">collection_id</code> in response are invalid.</td></tr>
<tr><td><code translate="no">timeout</code></td><td>Y</td></tr>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Collections/has_collection.md">has_collection()</a></td><td>Supports checking if a collection exists.</td></tr>
<tr><td><code translate="no">collection_name</code></td><td>Y</td></tr>
<tr><td><code translate="no">timeout</code></td><td>Y</td></tr>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Collections/list_collections.md">list_collections()</a></td><td>Supports listing all collections.</td></tr>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Collections/drop_collection.md">drop_collection()</a></td><td>Supports dropping a collection.</td></tr>
<tr><td><code translate="no">collection_name</code></td><td>Y</td></tr>
<tr><td><code translate="no">timeout</code></td><td>Y</td></tr>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Collections/rename_collection.md">rename_collection()</a></td><td>Renaming a collection is not supported.</td></tr>
</tbody>
</table>
<h3 id="Field--Schema" class="common-anchor-header">Field & Schema</h3><table>
<thead>
<tr><th>Method / Parameter</th><th>Supported in Milvus Lite</th></tr>
</thead>
<tbody>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Collections/create_schema.md">create_schema()</a></td><td>Support with limited parameters</td></tr>
<tr><td><code translate="no">auto_id</code></td><td>Y</td></tr>
<tr><td><code translate="no">enable_dynamic_field</code></td><td>Y</td></tr>
<tr><td><code translate="no">primary_field</code></td><td>Y</td></tr>
<tr><td><code translate="no">partition_key_field</code></td><td>N</td></tr>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/CollectionSchema/add_field.md">add_field()</a></td><td>Support with limited parameters</td></tr>
<tr><td><code translate="no">field_name</code></td><td>Y</td></tr>
<tr><td><code translate="no">datatype</code></td><td>Y</td></tr>
<tr><td><code translate="no">is_primary</code></td><td>Y</td></tr>
<tr><td><code translate="no">max_length</code></td><td>Y</td></tr>
<tr><td><code translate="no">element_type</code></td><td>Y</td></tr>
<tr><td><code translate="no">max_capacity</code></td><td>Y</td></tr>
<tr><td><code translate="no">dim</code></td><td>Y</td></tr>
<tr><td><code translate="no">is_partition_key</code></td><td>N</td></tr>
</tbody>
</table>
<h3 id="Insert--Search" class="common-anchor-header">Insert & Search</h3><table>
<thead>
<tr><th>Method / Parameter</th><th>Supported in Milvus Lite</th></tr>
</thead>
<tbody>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Vector/search.md">search()</a></td><td>Support with limited parameters</td></tr>
<tr><td><code translate="no">collection_name</code></td><td>Y</td></tr>
<tr><td><code translate="no">data</code></td><td>Y</td></tr>
<tr><td><code translate="no">filter</code></td><td>Y</td></tr>
<tr><td><code translate="no">limit</code></td><td>Y</td></tr>
<tr><td><code translate="no">output_fields</code></td><td>Y</td></tr>
<tr><td><code translate="no">search_params</code></td><td>Y</td></tr>
<tr><td><code translate="no">timeout</code></td><td>Y</td></tr>
<tr><td><code translate="no">partition_names</code></td><td>N</td></tr>
<tr><td><code translate="no">anns_field</code></td><td>Y</td></tr>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Vector/query.md">query()</a></td><td>Support with limited parameters</td></tr>
<tr><td><code translate="no">collection_name</code></td><td>Y</td></tr>
<tr><td><code translate="no">filter</code></td><td>Y</td></tr>
<tr><td><code translate="no">output_fields</code></td><td>Y</td></tr>
<tr><td><code translate="no">timeout</code></td><td>Y</td></tr>
<tr><td><code translate="no">ids</code></td><td>Y</td></tr>
<tr><td><code translate="no">partition_names</code></td><td>N</td></tr>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Vector/get.md">get()</a></td><td>Support with limited parameters</td></tr>
<tr><td><code translate="no">collection_name</code></td><td>Y</td></tr>
<tr><td><code translate="no">ids</code></td><td>Y</td></tr>
<tr><td><code translate="no">output_fields</code></td><td>Y</td></tr>
<tr><td><code translate="no">timeout</code></td><td>Y</td></tr>
<tr><td><code translate="no">partition_names</code></td><td>N</td></tr>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Vector/delete.md">delete()</a></td><td>Support with limited parameters</td></tr>
<tr><td><code translate="no">collection_name</code></td><td>Y</td></tr>
<tr><td><code translate="no">ids</code></td><td>Y</td></tr>
<tr><td><code translate="no">timeout</code></td><td>Y</td></tr>
<tr><td><code translate="no">filter</code></td><td>Y</td></tr>
<tr><td><code translate="no">partition_name</code></td><td>N</td></tr>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Vector/insert.md">insert()</a></td><td>Support with limited parameters</td></tr>
<tr><td><code translate="no">collection_name</code></td><td>Y</td></tr>
<tr><td><code translate="no">data</code></td><td>Y</td></tr>
<tr><td><code translate="no">timeout</code></td><td>Y</td></tr>
<tr><td><code translate="no">partition_name</code></td><td>N</td></tr>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Vector/upsert.md">upsert()</a></td><td>Support with limited parameters</td></tr>
<tr><td><code translate="no">collection_name</code></td><td>Y</td></tr>
<tr><td><code translate="no">data</code></td><td>Y</td></tr>
<tr><td><code translate="no">timeout</code></td><td>Y</td></tr>
<tr><td><code translate="no">partition_name</code></td><td>N</td></tr>
</tbody>
</table>
<h3 id="Load--Release" class="common-anchor-header">Load & Release</h3><table>
<thead>
<tr><th>Method / Parameter</th><th>Supported in Milvus Lite</th></tr>
</thead>
<tbody>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Management/load_collection.md">load_collection()</a></td><td>Y</td></tr>
<tr><td><code translate="no">collection_name</code></td><td>Y</td></tr>
<tr><td><code translate="no">timeout</code></td><td>Y</td></tr>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Management/release_collection.md">release_collection()</a></td><td>Y</td></tr>
<tr><td><code translate="no">collection_name</code></td><td>Y</td></tr>
<tr><td><code translate="no">timeout</code></td><td>Y</td></tr>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Management/get_load_state.md">get_load_state()</a></td><td>Getting load status is not supported.</td></tr>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Management/refresh_load.md">refresh_load()</a></td><td>Loading the unloaded data of a loaded collection is not supported.</td></tr>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Client/close.md">close()</a></td><td>Y</td></tr>
</tbody>
</table>
<h3 id="Index" class="common-anchor-header">Index</h3><table>
<thead>
<tr><th>Method / Parameter</th><th>Supported in Milvus Lite</th></tr>
</thead>
<tbody>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Collections/list_collections.md">list_indexes()</a></td><td>Listing indexes is supported.</td></tr>
<tr><td><code translate="no">collection_name</code></td><td>Y</td></tr>
<tr><td><code translate="no">field_name</code></td><td>Y</td></tr>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Management/create_index.md">create_index()</a></td><td>Only supports <code translate="no">FLAT</code> index type.</td></tr>
<tr><td><code translate="no">index_params</code></td><td>Y</td></tr>
<tr><td><code translate="no">timeout</code></td><td>Y</td></tr>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Management/drop_index.md">drop_index()</a></td><td>Dropping indexes is supported.</td></tr>
<tr><td><code translate="no">collection_name</code></td><td>Y</td></tr>
<tr><td><code translate="no">index_name</code></td><td>Y</td></tr>
<tr><td><code translate="no">timeout</code></td><td>Y</td></tr>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Management/describe_index.md">describe_index()</a></td><td>Describing indexes is supported.</td></tr>
<tr><td><code translate="no">collection_name</code></td><td>Y</td></tr>
<tr><td><code translate="no">index_name</code></td><td>Y</td></tr>
<tr><td><code translate="no">timeout</code></td><td>Y</td></tr>
</tbody>
</table>
<h3 id="Vector-Index-Types" class="common-anchor-header">Vector Index Types</h3><p>Milvus Lite only supports <a href="https://milvus.io/docs/index.md?tab=floating#FLAT">FLAT</a> index type. It uses FLAT type regardless of the specified index type in collection.</p>
<h3 id="Search-Features" class="common-anchor-header">Search Features</h3><p>Milvus Lite supports Sparse Vector, Multi-vector, Hybrid Search.</p>
<h3 id="Partition" class="common-anchor-header">Partition</h3><p>Milvus Lite does not support partitions and partition-related methods.</p>
<h3 id="Users--Roles" class="common-anchor-header">Users & Roles</h3><p>Milvus Lite does not support users and roles and related methods.</p>
<h3 id="Alias" class="common-anchor-header">Alias</h3><p>Milvus Lite does not support aliases and alias-related methods.</p>
<h2 id="Migrating-data-from-Milvus-Lite" class="common-anchor-header">Migrating data from Milvus Lite<button data-href="#Migrating-data-from-Milvus-Lite" class="anchor-icon" translate="no">
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
    </button></h2><p>All data stored in Milvus Lite can be easily exported and loaded into other types of Milvus deployment, such as Milvus Standalone on Docker, Milvus Distributed on K8s, or fully-managed Milvus on <a href="https://zilliz.com/cloud">Zilliz Cloud</a>.</p>
<p>Milvus Lite provides a command line tool that can dump data into a json file, which can be imported into <a href="https://github.com/milvus-io/milvus">milvus</a> and <a href="https://zilliz.com/cloud">Zilliz Cloud</a>(the fully managed cloud service for Milvus). The milvus-lite command will be installed together with milvus-lite python package</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_"># </span><span class="language-bash">Install</span>
pip install -U &quot;pymilvus[bulk_writer]&quot;

milvus-lite dump -h

usage: milvus-lite dump [-h] [-d DB_FILE] [-c COLLECTION] [-p PATH]

optional arguments:
  -h, --help            show this help message and exit
  -d DB_FILE, --db-file DB_FILE
                        milvus lite db file
  -c COLLECTION, --collection COLLECTION
                        collection that need to be dumped
  -p PATH, --path PATH  dump file storage dir
<button class="copy-code-btn"></button></code></pre>
<p>The following example dumps all data from <code translate="no">demo_collection</code> collection that’s stored in <code translate="no">./milvus_demo.db</code> (Milvus Lite database file)</p>
<p>To export data:</p>
<pre><code translate="no" class="language-shell">milvus-lite dump -d ./milvus_demo.db -c demo_collection -p ./data_dir
<span class="hljs-meta prompt_"># </span><span class="language-bash">./milvus_demo.db: milvus lite db file</span>
<span class="hljs-meta prompt_"># </span><span class="language-bash">demo_collection: collection that need to be dumped</span>
<span class="hljs-meta prompt_">#</span><span class="language-bash">./data_dir : dump file storage <span class="hljs-built_in">dir</span></span>
<button class="copy-code-btn"></button></code></pre>
<p>With the dump file, you can upload data to Zilliz Cloud via <a href="https://docs.zilliz.com/docs/data-import">Data Import</a>, or upload data to Milvus servers via <a href="https://milvus.io/docs/import-data.md">Bulk Insert</a>.</p>
<h2 id="Whats-next" class="common-anchor-header">What’s next<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
    </button></h2><p>Having connected to Milvus Lite, you can:</p>
<ul>
<li><p>Check <a href="/docs/quickstart.md">Quickstart</a> to see what Milvus can do.</p></li>
<li><p>Learn the basic operations of Milvus:</p>
<ul>
<li><a href="/docs/manage_databases.md">Manage Databases</a></li>
<li><a href="/docs/manage-collections.md">Manage Collections</a></li>
<li><a href="/docs/manage-partitions.md">Manage Partitions</a></li>
<li><a href="/docs/insert-update-delete.md">Insert, Upsert & Delete</a></li>
<li><a href="/docs/single-vector-search.md">Single-Vector Search</a></li>
<li><a href="/docs/multi-vector-search.md">Hybrid Search</a></li>
</ul></li>
<li><p><a href="/docs/upgrade_milvus_cluster-helm.md">Upgrade Milvus Using Helm Chart</a>.</p></li>
<li><p><a href="/docs/scaleout.md">Scale your Milvus cluster</a>.</p></li>
<li><p>Deploy your Milvus cluster on clouds:</p>
<ul>
<li><a href="/docs/eks.md">Amazon EKS</a></li>
<li><a href="/docs/gcp.md">Google Cloud</a></li>
<li><a href="/docs/azure.md">Microsoft Azure</a></li>
</ul></li>
<li><p>Explore <a href="/docs/milvus_backup_overview.md">Milvus Backup</a>, an open-source tool for Milvus data backups.</p></li>
<li><p>Explore <a href="/docs/birdwatcher_overview.md">Birdwatcher</a>, an open-source tool for debugging Milvus and dynamic configuration updates.</p></li>
<li><p>Explore <a href="https://github.com/zilliztech/attu">Attu</a>, an open-source GUI tool for intuitive Milvus management.</p></li>
<li><p><a href="/docs/monitor.md">Monitor Milvus with Prometheus</a>.</p></li>
</ul>
