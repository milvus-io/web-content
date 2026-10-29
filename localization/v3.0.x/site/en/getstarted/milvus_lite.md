---
id: milvus_lite.md
summary: >-
  Install Milvus Lite and run local vector search with a persistent database
  path.
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
    </button></h1><p>This page shows how to run local vector search with Milvus Lite. It covers installation, data persistence, filtering, and exporting data to another Milvus deployment.</p>
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
    </button></h2><p>Milvus Lite is a lightweight local backend for the <a href="https://github.com/milvus-io/pymilvus">Milvus Python SDK</a>. Install it with the optional <code translate="no">milvus-lite</code> extra; installing <code translate="no">pymilvus</code> alone does not install this backend in the SDK version used below.</p>
<p>Milvus Lite is suitable for local development and small-scale workloads in environments such as:</p>
<ul>
<li>Jupyter Notebook or Google Colab</li>
<li>Laptops</li>
<li>Edge devices with compatible Python dependencies</li>
</ul>
<p>Milvus Lite uses the <code translate="no">MilvusClient</code> API for supported operations, including vector data persistence, insert and delete, vector search, and metadata filtering. To move a supported application workflow to a remote deployment, change the connection URI and credentials, and review the differences in supported features. For large-scale production workloads, use <a href="/docs/install-overview.md">Milvus Standalone or Distributed</a>, or fully managed Milvus on <a href="https://zilliz.com/cloud">Zilliz Cloud</a>.</p>
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
    </button></h2><p>This guide uses PyMilvus <strong>3.0.2</strong> and Milvus Lite <strong>3.2.2</strong>. Prepare the following environment:</p>
<ul>
<li>Python 3.10 or newer. The local Lite backend has a higher minimum Python version than the remote PyMilvus client.</li>
<li>macOS, Linux, or Windows, with compatible wheels for dependencies such as <code translate="no">faiss-cpu</code> and <code translate="no">pyarrow</code>. Milvus Lite 3.2.2 is a pure-Python package, so the operating system and architecture must satisfy those dependencies rather than the Lite package itself.</li>
<li>A writable local directory for database storage.</li>
</ul>
<p>On Windows, pip skips the <code translate="no">milvus-lite</code> extra of PyMilvus 3.0.2 because of its platform marker, so <code translate="no">milvus-lite</code> must be named explicitly. The install command below already does this. For other package and platform combinations, consult the <a href="https://github.com/milvus-io/milvus-lite/blob/v3.2.2/README.md#requirements">Milvus Lite release requirements</a>.</p>
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
    </button></h2><p>Create an isolated Python environment and install both packages:</p>
<pre><code translate="no" class="language-bash">python3 -m venv .venv
<span class="hljs-built_in">source</span> .venv/bin/activate
python -m pip install <span class="hljs-string">&quot;pymilvus[milvus-lite]==3.0.2&quot;</span> <span class="hljs-string">&quot;milvus-lite==3.2.2&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Quote the extras expression so shells such as zsh do not interpret the brackets. On Windows PowerShell, activate the environment with <code translate="no">.venv\Scripts\Activate.ps1</code> instead of <code translate="no">source .venv/bin/activate</code>. The explicit versions keep the SDK and local backend aligned with this guide.</p>
<div class="alert note">
<blockquote>
<p>Milvus Lite 3.x uses a different storage engine from the original 2.x package. It cannot open an existing 2.x <code translate="no">.db</code> file in place. Keep the original database and an environment that can open it, export its data there, and import the data into a new database. Installing a new package does not migrate the old storage format. See <a href="#Migrating-data-from-Milvus-Lite">Migrating data from Milvus Lite</a>.</p>
</blockquote>
</div>
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
    </button></h2><p>Pass a local path ending in <code translate="no">.db</code> to <code translate="no">MilvusClient</code>:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(<span class="hljs-string">&quot;./milvus_demo.db&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<p>For Milvus Lite 3.2.2, this creates a <strong>milvus_demo.db directory</strong> in the working directory. The directory contains the database’s storage files; the <code translate="no">.db</code> suffix does not mean it is a single portable file. Reuse the same path to reopen the database after closing the client or restarting the application.</p>
<p>Use a different path for a new database. To connect to a remote Milvus server instead, pass its endpoint and credentials:</p>
<pre><code translate="no" class="language-python">client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>, token=<span class="hljs-string">&quot;username:password&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Run-a-local-search-example" class="common-anchor-header">Run a local search example<button data-href="#Run-a-local-search-example" class="anchor-icon" translate="no">
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
    </button></h2><p>The following example demonstrates the API workflow with generated vectors. These vectors do not encode the meaning of the text; use an embedding model when building semantic search. Run the example against a new database path, or remove the existing <code translate="no">demo_collection</code> before running it again.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient
<span class="hljs-keyword">import</span> numpy <span class="hljs-keyword">as</span> np

client = MilvusClient(<span class="hljs-string">&quot;./milvus_demo.db&quot;</span>)
client.create_collection(
    collection_name=<span class="hljs-string">&quot;demo_collection&quot;</span>,
    dimension=<span class="hljs-number">384</span>  <span class="hljs-comment"># The vectors in this example have 384 dimensions.</span>
)

docs = [
    <span class="hljs-string">&quot;Artificial intelligence was founded as an academic discipline in 1956.&quot;</span>,
    <span class="hljs-string">&quot;Alan Turing was the first person to conduct substantial research in AI.&quot;</span>,
    <span class="hljs-string">&quot;Born in Maida Vale, London, Turing was raised in southern England.&quot;</span>,
]

<span class="hljs-comment"># Generate reproducible example vectors, not semantic embeddings.</span>
rng = np.random.default_rng(<span class="hljs-number">7</span>)
vectors = rng.uniform(-<span class="hljs-number">1</span>, <span class="hljs-number">1</span>, size=(<span class="hljs-built_in">len</span>(docs), <span class="hljs-number">384</span>)).tolist()
data = [
    {<span class="hljs-string">&quot;id&quot;</span>: i, <span class="hljs-string">&quot;vector&quot;</span>: vectors[i], <span class="hljs-string">&quot;text&quot;</span>: docs[i], <span class="hljs-string">&quot;subject&quot;</span>: <span class="hljs-string">&quot;history&quot;</span>}
    <span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-built_in">len</span>(docs))
]
res = client.insert(collection_name=<span class="hljs-string">&quot;demo_collection&quot;</span>, data=data)
<span class="hljs-built_in">print</span>(res)

<span class="hljs-comment"># Search only records whose subject is &quot;history&quot;.</span>
res = client.search(
    collection_name=<span class="hljs-string">&quot;demo_collection&quot;</span>,
    data=[vectors[<span class="hljs-number">0</span>]],
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;subject == &#x27;history&#x27;&quot;</span>,
    limit=<span class="hljs-number">2</span>,
    output_fields=[<span class="hljs-string">&quot;text&quot;</span>, <span class="hljs-string">&quot;subject&quot;</span>],
)
<span class="hljs-built_in">print</span>(res)

<span class="hljs-comment"># Retrieve all records that match the scalar filter, without vector ranking.</span>
res = client.query(
    collection_name=<span class="hljs-string">&quot;demo_collection&quot;</span>,
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;subject == &#x27;history&#x27;&quot;</span>,
    output_fields=[<span class="hljs-string">&quot;text&quot;</span>, <span class="hljs-string">&quot;subject&quot;</span>],
)
<span class="hljs-built_in">print</span>(res)

<span class="hljs-comment"># Delete one record and keep the others for the export example below.</span>
res = client.delete(collection_name=<span class="hljs-string">&quot;demo_collection&quot;</span>, ids=[<span class="hljs-number">2</span>])
<span class="hljs-built_in">print</span>(res)
client.close()
<button class="copy-code-btn"></button></code></pre>
<p>For an application that generates embeddings from text, continue with <a href="/docs/quickstart.md">Quickstart</a>. You can also explore the <a href="https://github.com/milvus-io/bootcamp">Milvus Bootcamp examples</a> for RAG, image search, and framework integrations.</p>
<h2 id="Supported-features-and-limits" class="common-anchor-header">Supported features and limits<button data-href="#Supported-features-and-limits" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus Lite 3.2.2 implements a subset of Milvus operations through its local PyMilvus adapter. Its <a href="https://github.com/milvus-io/milvus-lite/blob/v3.2.2/README.md#supported-features">versioned feature reference</a> describes the following capabilities:</p>
<table>
<thead>
<tr><th>Area</th><th>Support in this Lite version</th></tr>
</thead>
<tbody>
<tr><td>Dense and sparse vectors</td><td><code translate="no">FLOAT_VECTOR</code> and <code translate="no">SPARSE_FLOAT_VECTOR</code></td></tr>
<tr><td>Vector indexes</td><td><code translate="no">FLAT</code>, <code translate="no">BRUTE_FORCE</code>, <code translate="no">IVF_FLAT</code>, <code translate="no">IVF_SQ8</code>, <code translate="no">HNSW</code>, <code translate="no">HNSW_SQ</code>, and <code translate="no">AUTOINDEX</code></td></tr>
<tr><td>Scalar and sparse indexes</td><td><code translate="no">INVERTED</code> scalar indexes and <code translate="no">SPARSE_INVERTED_INDEX</code></td></tr>
<tr><td>Data operations</td><td>Insert, upsert, get, query, vector search, and delete</td></tr>
<tr><td>Search</td><td>Dense and sparse search, metadata filters, multiple vector fields, and hybrid search</td></tr>
<tr><td>Collection organization</td><td>Collections, named databases, aliases, and partitions, within the local adapter’s supported operations</td></tr>
</tbody>
</table>
<p>This version is not limited to <code translate="no">FLAT</code> indexes. Index availability and behavior depend on the Lite version; do not apply limits from the original 2.x backend to the 3.x engine.</p>
<p>Review these limits before choosing Lite for an application:</p>
<ul>
<li>Only one process can own a database storage directory at a time. The engine protects the directory with a file lock.</li>
<li>Serialize writes to the same collection. Concurrent writes are not supported safely.</li>
<li>The local adapter does not implement every Milvus RPC. Unsupported operations return <code translate="no">UNIMPLEMENTED</code>; schema alteration and partition-level load or release are not available.</li>
<li>Authentication, users, roles, RBAC, and TLS are not supported. Do not expose the local server to an untrusted network.</li>
<li>Binary, float16, bfloat16, and int8 vector fields, and Product Quantization indexes, are not supported.</li>
<li>Lite is designed for local workloads. Local API compatibility does not provide distributed scaling or the production isolation and availability of a remote deployment.</li>
</ul>
<p>See the <a href="https://github.com/milvus-io/milvus-lite/blob/v3.2.2/README.md#known-limitations">versioned known limitations</a> before relying on a server feature that the local example does not exercise.</p>
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
    </button></h2><p>Use <code translate="no">milvus-lite dump</code> to export a collection as Milvus BulkWriter JSON files. These files can be imported into a self-hosted Milvus deployment or Zilliz Cloud.</p>
<p>Install the SDK’s bulk writer dependencies in the environment that opens the source database:</p>
<pre><code translate="no" class="language-bash">python -m pip install <span class="hljs-string">&quot;pymilvus[bulk_writer]==3.0.2&quot;</span>
milvus-lite dump -h
<button class="copy-code-btn"></button></code></pre>
<p>Close the Python application that owns the local database before running the command in another process. Export the collection from the preceding example:</p>
<pre><code translate="no" class="language-bash">milvus-lite dump -d ./milvus_demo.db -c demo_collection -p ./data_dir
<button class="copy-code-btn"></button></code></pre>
<p>The command reads <code translate="no">demo_collection</code> from the <strong>milvus_demo.db storage directory</strong> and writes export files under <strong>data_dir</strong>. Import those files with <a href="/docs/import-data.md">Bulk Insert</a> or <a href="https://docs.zilliz.com/docs/data-import">Zilliz Cloud Data Import</a>.</p>
<div class="alert note">
<blockquote>
<p>To export an original 2.x database file, run the dump tool in an environment with the original Lite version that can open that file. The 3.x dump tool does not convert the old storage format by opening it directly. Preserve the source database until you have verified the imported row count and search results.</p>
</blockquote>
</div>
<p>For supported dump options and storage-format restrictions, see the <a href="https://github.com/milvus-io/milvus-lite/blob/v3.2.2/README.md#dump-data">Milvus Lite export reference</a>.</p>
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
    </button></h2><p>Continue with these tasks:</p>
<ul>
<li><a href="/docs/quickstart.md">Quickstart</a>: generate embeddings and run a search workflow.</li>
<li><a href="/docs/single-vector-search.md">Single-Vector Search</a> and <a href="/docs/multi-vector-search.md">Hybrid Search</a>: design queries for your application.</li>
<li><a href="/docs/install-overview.md">Choose a deployment</a>: move beyond local development.</li>
<li><a href="https://github.com/zilliztech/attu">Attu</a>: explore the Milvus GUI for a remote deployment.</li>
</ul>
