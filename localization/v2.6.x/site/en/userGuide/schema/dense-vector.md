---
id: dense-vector.md
title: Dense Vector
summary: >-
  Dense vectors (often called embeddings) are the core technology that enables
  modern semantic search. While traditional search engines look for matching
  keywords, dense vectors allow you to search by meaning.
---
<h1 id="Dense-Vector" class="common-anchor-header">Dense Vector<button data-href="#Dense-Vector" class="anchor-icon" translate="no">
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
    </button></h1><p>Dense vectors (often called embeddings) are the core technology that enables modern semantic search. While traditional search engines look for matching keywords, dense vectors allow you to search by meaning.</p>
<p>Consider a user searching for <strong>“laptop for programming”</strong>:</p>
<ul>
<li><strong>Traditional keyword search:</strong> Looks for exact matches. It might miss a result labeled <em>“workstation for software engineers”</em> because the words strictly don’t match.</li>
<li><strong>Dense vector search:</strong> Understands context. It identifies documents about <em>“developer workstations”</em>, <em>“coding”</em>, or <em>“high-performance hardware”</em> as semantically similar, even if the words differ.</li>
</ul>
<p>Machine learning models (such as BERT, OpenAI embeddings, or image encoders) can convert your raw data into dense vectors:</p>
<ul>
<li><strong>Input (text):</strong> <em>“Milvus is a vector database”</em></li>
<li><strong>Model processing:</strong> → neural network layers</li>
<li><strong>Output (vector):</strong> [0.23, -0.15, 0.67, 0.12, …, 0.45] (for example, 768 numbers)</li>
</ul>
<p>Each number is a learned feature, and together they capture the semantic meaning of the input. Dense vectors are called <em>dense</em> because:</p>
<ul>
<li>Every dimension has a value (almost no zeros).</li>
<li>All vectors have the same fixed length (for example, 768 or 1536 dimensions).</li>
<li>They provide a compact representation of high-level meaning that Milvus can index and search efficiently.</li>
</ul>
<h2 id="Understand-and-choose-dense-vector-formats" class="common-anchor-header">Understand and choose dense vector formats<button data-href="#Understand-and-choose-dense-vector-formats" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus supports these data formats for dense vectors: <a href="https://en.wikipedia.org/wiki/Single-precision_floating-point_format">FP32</a>, <a href="https://en.wikipedia.org/wiki/Bfloat16_floating-point_format">BF16</a>, <a href="https://en.wikipedia.org/wiki/Half-precision_floating-point_format">FP16</a>, and INT8. Each maps to different Milvus vector field types:</p>
<ul>
<li><code translate="no">FLOAT_VECTOR</code> (FP32)</li>
<li><code translate="no">FLOAT16_VECTOR</code> (FP16)</li>
<li><code translate="no">BFLOAT16_VECTOR</code> (BF16)</li>
<li><code translate="no">INT8_VECTOR</code> (INT8)</li>
</ul>
<p>All four are standard data types in modern ML frameworks. They use different bit layouts to represent numbers, which leads to different trade-offs in precision, numeric range, and memory usage.</p>
<h3 id="How-the-formats-differ" class="common-anchor-header">How the formats differ<button data-href="#How-the-formats-differ" class="anchor-icon" translate="no">
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
    </button></h3><p>The illustration below shows how each format allocates bits.</p>
<p><img translate="no" src="/docs/v2.6.x/assets/dense-vector-formats.png" alt="Dense vector formats" width="700"/></p>
<p>From this layout:</p>
<ul>
<li><strong>FP32</strong> (single-precision float)
<ul>
<li>Uses 32 bits: <strong>1 sign + 8 exponent + 23 fraction</strong>.</li>
<li>Provides a wide numeric range and high precision, and is the traditional default for deep learning.</li>
</ul></li>
<li><strong>FP16</strong> (half-precision float)
<ul>
<li>Uses 16 bits: <strong>1 sign + 5 exponent + 10 fraction</strong>.</li>
<li>Cuts memory and bandwidth in half compared to <strong>FP32</strong>, with a narrower range and slightly lower precision. Widely used for faster training and inference on GPUs.</li>
</ul></li>
<li><strong>BF16</strong> (bfloat16)
<ul>
<li>Uses 16 bits: <strong>1 sign + 8 exponent + 7 fraction</strong>.</li>
<li>Shares the same exponent width as <strong>FP32</strong>, so it has a similar dynamic range but fewer fraction bits. This keeps the range of FP32 while reducing precision and memory usage. It’s now native on many AI accelerators (TPUs, modern NVIDIA GPUs, Intel CPUs).</li>
</ul></li>
<li><strong>INT8 (8-bit signed integer)</strong>
<ul>
<li>Uses 8 bits: <strong>1 sign + 7 value bits</strong>, representing integers in the range <strong>−128 to +127</strong> (or 0–255 if unsigned).</li>
<li>There is no exponent or fraction. INT8 is typically used after quantization to dramatically reduce memory and speed up inference.</li>
</ul></li>
</ul>
<h3 id="Choose-the-right-dense-vector-format" class="common-anchor-header">Choose the right dense vector format<button data-href="#Choose-the-right-dense-vector-format" class="anchor-icon" translate="no">
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
    </button></h3><p>When choosing a format, consider:</p>
<ul>
<li><strong>Model output type</strong> – what your embedding model naturally produces</li>
<li><strong>Accuracy requirements</strong> – how much quality drop you can tolerate</li>
<li><strong>Resource constraints</strong> – memory, storage, and throughput</li>
</ul>
<table>
<thead>
<tr><th><strong>Format</strong></th><th><strong>Milvus Type</strong></th><th><strong>Description</strong></th><th><strong>When to Choose</strong></th></tr>
</thead>
<tbody>
<tr><td><strong>FP32</strong></td><td><code translate="no">FLOAT_VECTOR</code></td><td>32-bit standard float. Highest precision and widest dynamic range; most stable similarity scores.</td><td>Model outputs float32, accuracy is critical, and memory is not a major constraint.</td></tr>
<tr><td><strong>FP16</strong></td><td><code translate="no">FLOAT16_VECTOR</code></td><td>16-bit half float. ~50% memory/storage of FP32; good precision but smaller numeric range.</td><td>GPU-accelerated inference, need 50% memory savings, and can tolerate slight quality loss.</td></tr>
<tr><td><strong>BF16</strong></td><td><code translate="no">BFLOAT16_VECTOR</code></td><td>16-bit half float with FP32-like exponent. Same range as FP32, fewer fraction bits → lower precision.</td><td>PyTorch/TPU/modern GPU workflows where BF16 is native, and you want FP32-like range with smaller size.</td></tr>
<tr><td><strong>INT8</strong></td><td><code translate="no">INT8_VECTOR</code></td><td>8-bit quantized integers. Smallest footprint; lowest precision; no exponent/fraction.</td><td>100M+ vectors, strict memory or cost budget, and you already have an INT8 quantization pipeline.</td></tr>
</tbody>
</table>
<p><strong>Note</strong>:</p>
<ul>
<li><strong>No automatic conversion</strong>: Milvus strictly enforces data type matching. If a field is defined as <code translate="no">FLOAT16_VECTOR</code>, you <strong>cannot</strong> insert FP32 vectors into it.</li>
<li><strong>INT8 requires external quantization</strong>: Milvus stores INT8 vectors exactly as provided. To use <code translate="no">INT8_VECTOR</code>, you must quantize your embeddings (for example, post-training quantization or vector quantization) before insertion.</li>
</ul>
<h2 id="Basic-operations" class="common-anchor-header">Basic operations<button data-href="#Basic-operations" class="anchor-icon" translate="no">
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
    </button></h2><p>Working with dense vectors in Milvus typically follows the same pattern:</p>
<ol>
<li>Define a dense vector field in the collection schema.</li>
<li>Insert vector data (in the chosen numeric format).</li>
<li>Create an index on the dense vector field.</li>
<li>Load the collection into memory and run semantic search on the vectors.</li>
<li>Define a dense vector field</li>
</ol>
<p>Vector fields in Milvus store the embeddings used for similarity search. When defining one:</p>
<ul>
<li>Select the correct dense vector type (<code translate="no">FLOAT_VECTOR</code>, <code translate="no">FLOAT16_VECTOR</code>, <code translate="no">BFLOAT16_VECTOR</code>, or <code translate="no">INT8_VECTOR</code>).</li>
<li>Set <code translate="no">dim</code> to match the vector dimensionality of your model.</li>
<li>Ensure the type exactly matches the insertion/search data you will use later.</li>
</ul>
<div class="filter">
<p><a href="#fp32">FP32</a></p>
<p><a href="#fp16">FP16</a></p>
<p><a href="#bf16">BF16</a></p>
<p><a href="#int8">INT8</a></p>
</div>
<div class="filter-fp32">
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType
<span class="hljs-keyword">import</span> random

COLLECTION_NAME = <span class="hljs-string">&quot;demo_fp32&quot;</span>
DIM = <span class="hljs-number">6</span>
NUM_ENTITIES = <span class="hljs-number">1000</span>

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

schema = client.create_schema(
    auto_id=<span class="hljs-literal">True</span>,
    enable_dynamic_fields=<span class="hljs-literal">True</span>,
)

schema.add_field(field_name=<span class="hljs-string">&quot;id&quot;</span>, datatype=DataType.INT64, is_primary=<span class="hljs-literal">True</span>)
<span class="highlighted-wrapper-line">schema.add_field(field_name=<span class="hljs-string">&quot;dense_vector&quot;</span>, datatype=DataType.FLOAT_VECTOR, dim=DIM)</span>

client.create_collection(
    collection_name=COLLECTION_NAME,
    schema=schema,
)

<button class="copy-code-btn"></button></code></pre>
</div>
<div class="filter-fp16">
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType
<span class="hljs-keyword">import</span> numpy <span class="hljs-keyword">as</span> np
<span class="hljs-keyword">import</span> random

COLLECTION_NAME = <span class="hljs-string">&quot;demo_fp16&quot;</span>
DIM = <span class="hljs-number">6</span>
NUM_ENTITIES = <span class="hljs-number">1000</span>

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

schema = client.create_schema(
    auto_id=<span class="hljs-literal">True</span>,
    enable_dynamic_fields=<span class="hljs-literal">True</span>,
)

schema.add_field(field_name=<span class="hljs-string">&quot;id&quot;</span>, datatype=DataType.INT64, is_primary=<span class="hljs-literal">True</span>)
<span class="highlighted-wrapper-line">schema.add_field(field_name=<span class="hljs-string">&quot;dense_vector&quot;</span>, datatype=DataType.FLOAT16_VECTOR, dim=DIM)</span>

client.create_collection(
    collection_name=COLLECTION_NAME,
    schema=schema,
)

<button class="copy-code-btn"></button></code></pre>
</div>
<div class="filter-bf16">
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType
<span class="hljs-keyword">import</span> numpy <span class="hljs-keyword">as</span> np
<span class="hljs-keyword">import</span> ml_dtypes
<span class="hljs-keyword">import</span> random

COLLECTION_NAME = <span class="hljs-string">&quot;demo_bf16&quot;</span>
DIM = <span class="hljs-number">6</span>
NUM_ENTITIES = <span class="hljs-number">1000</span>

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

schema = client.create_schema(
    auto_id=<span class="hljs-literal">True</span>,
    enable_dynamic_fields=<span class="hljs-literal">True</span>,
)

schema.add_field(field_name=<span class="hljs-string">&quot;id&quot;</span>, datatype=DataType.INT64, is_primary=<span class="hljs-literal">True</span>)
<span class="highlighted-wrapper-line">schema.add_field(field_name=<span class="hljs-string">&quot;dense_vector&quot;</span>, datatype=DataType.BFLOAT16_VECTOR, dim=DIM)</span>

client.create_collection(
    collection_name=COLLECTION_NAME,
    schema=schema,
)

<button class="copy-code-btn"></button></code></pre>
</div>
<div class="filter-int8">
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType
<span class="hljs-keyword">import</span> numpy <span class="hljs-keyword">as</span> np
<span class="hljs-keyword">import</span> random

COLLECTION_NAME = <span class="hljs-string">&quot;demo_int8&quot;</span>
DIM = <span class="hljs-number">6</span>
NUM_ENTITIES = <span class="hljs-number">1000</span>

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

schema = client.create_schema(
    auto_id=<span class="hljs-literal">True</span>,
    enable_dynamic_fields=<span class="hljs-literal">True</span>,
)

schema.add_field(field_name=<span class="hljs-string">&quot;id&quot;</span>, datatype=DataType.INT64, is_primary=<span class="hljs-literal">True</span>)
<span class="highlighted-wrapper-line">schema.add_field(field_name=<span class="hljs-string">&quot;dense_vector&quot;</span>, datatype=DataType.INT8_VECTOR, dim=DIM)</span>

client.create_collection(
    collection_name=COLLECTION_NAME,
    schema=schema,
)

<button class="copy-code-btn"></button></code></pre>
</div>
<ol>
<li>Insert vector data</li>
</ol>
<p>After creating the collection, insert your vector data into the vector field.</p>
<p>Milvus expects the vectors to:</p>
<ul>
<li>Use the same data type as defined in the schema.</li>
<li>Have the same dimensionality (<code translate="no">dim</code>).</li>
</ul>
<p>Below are examples of how to generate and insert sample data for each format.</p>
<div class="filter">
<p><a href="#fp32">FP32</a></p>
<p><a href="#fp16">FP16</a></p>
<p><a href="#bf16">BF16</a></p>
<p><a href="#int8">INT8</a></p>
</div>
<div class="filter-fp32">
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Generate random sample data</span>
sample_data = [
    {<span class="hljs-string">&quot;dense_vector&quot;</span>: [random.uniform(<span class="hljs-number">0</span>, <span class="hljs-number">10</span>) <span class="hljs-keyword">for</span> _ <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(DIM)]}
    <span class="hljs-keyword">for</span> _ <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(NUM_ENTITIES)
]

res = client.insert(collection_name=COLLECTION_NAME, data=sample_data)
<span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Inserted <span class="hljs-subst">{res[<span class="hljs-string">&#x27;insert_count&#x27;</span>]}</span> entities&quot;</span>)

<span class="hljs-comment"># Expected output:</span>
<span class="hljs-comment"># Inserted 1000 entities</span>

<button class="copy-code-btn"></button></code></pre>
</div>
<div class="filter-fp16">
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Generate random sample data with float16 precision</span>
sample_data = [
    {<span class="hljs-string">&quot;dense_vector&quot;</span>: np.array([random.uniform(<span class="hljs-number">0</span>, <span class="hljs-number">10</span>) <span class="hljs-keyword">for</span> _ <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(DIM)], dtype=np.float16)}
    <span class="hljs-keyword">for</span> _ <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(NUM_ENTITIES)
]

res = client.insert(collection_name=COLLECTION_NAME, data=sample_data)
<span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Inserted <span class="hljs-subst">{res[<span class="hljs-string">&#x27;insert_count&#x27;</span>]}</span> entities&quot;</span>)

<span class="hljs-comment"># Expected output:</span>
<span class="hljs-comment"># Inserted 1000 entities</span>

<button class="copy-code-btn"></button></code></pre>
</div>
<div class="filter-bf16">
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Generate random sample data with bfloat16 precision</span>
sample_data = [
    {<span class="hljs-string">&quot;dense_vector&quot;</span>: np.array([random.uniform(<span class="hljs-number">0</span>, <span class="hljs-number">10</span>) <span class="hljs-keyword">for</span> _ <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(DIM)], dtype=ml_dtypes.bfloat16)}
    <span class="hljs-keyword">for</span> _ <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(NUM_ENTITIES)
]

res = client.insert(collection_name=COLLECTION_NAME, data=sample_data)
<span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Inserted <span class="hljs-subst">{res[<span class="hljs-string">&#x27;insert_count&#x27;</span>]}</span> entities&quot;</span>)

<span class="hljs-comment"># Expected output:</span>
<span class="hljs-comment"># Inserted 1000 entities</span>

<button class="copy-code-btn"></button></code></pre>
</div>
<div class="filter-int8">
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Generate random sample data with int8 values (range: -128 to 127)</span>
<span class="hljs-comment"># Note: In practice, these should be generated by your quantization workflow</span>
sample_data = [
    {<span class="hljs-string">&quot;dense_vector&quot;</span>: np.array([random.randint(-<span class="hljs-number">128</span>, <span class="hljs-number">127</span>) <span class="hljs-keyword">for</span> _ <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(DIM)], dtype=np.int8)}
    <span class="hljs-keyword">for</span> _ <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(NUM_ENTITIES)
]

res = client.insert(collection_name=COLLECTION_NAME, data=sample_data)
<span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Inserted <span class="hljs-subst">{res[<span class="hljs-string">&#x27;insert_count&#x27;</span>]}</span> entities&quot;</span>)

<span class="hljs-comment"># Expected output:</span>
<span class="hljs-comment"># Inserted 1000 entities</span>

<button class="copy-code-btn"></button></code></pre>
</div>
<ol>
<li>Create index on dense vector field</li>
</ol>
<p>To accelerate semantic search, it is mandatory to create a vector index before searches.</p>
<p>In this example, we use <strong>AUTOINDEX</strong>, which lets Milvus automatically choose optimal index parameters based on your collection and workload.</p>
<pre><code translate="no" class="language-python">index_params = client.prepare_index_params()

index_params.add_index(
    field_name=<span class="hljs-string">&quot;dense_vector&quot;</span>,
    index_name=<span class="hljs-string">&quot;dense_vector_index&quot;</span>,
<span class="highlighted-wrapper-line">    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,</span>
    metric_type=<span class="hljs-string">&quot;COSINE&quot;</span>
)

client.create_index(
    collection_name=COLLECTION_NAME,
    index_params=index_params,
)

<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<ul>
<li><code translate="no">INT8_VECTOR</code> currently supports only the <strong>HNSW</strong> index.</li>
<li>Alternatively, you can also set a custom index type. For a list of index types available for dense vectors, refer to <a href="/docs/index-explained.md">Index Explained</a>.</li>
</ul>
</div>
<ol>
<li>Semantic search on dense vectors</li>
</ol>
<p>Before performing vector searches, load your collection:</p>
<pre><code translate="no" class="language-python">client.load_collection(collection_name=COLLECTION_NAME)
<span class="hljs-built_in">print</span>(client.get_load_state(collection_name=COLLECTION_NAME))

<span class="hljs-comment"># Expected output:</span>
<span class="hljs-comment"># {&#x27;state&#x27;: &lt;LoadState: Loaded&gt;}</span>

<button class="copy-code-btn"></button></code></pre>
<p>Then, run a vector search using a query vector of the same type and dimension as your stored vectors.</p>
<div class="filter">
<p><a href="#fp32">FP32</a></p>
<p><a href="#fp16">FP16</a></p>
<p><a href="#bf16">BF16</a></p>
<p><a href="#int8">INT8</a></p>
</div>
<div class="filter-fp32">
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Generate a random query vector</span>
query_vector = [random.uniform(<span class="hljs-number">0</span>, <span class="hljs-number">10</span>) <span class="hljs-keyword">for</span> _ <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(DIM)]

results = client.search(
    collection_name=COLLECTION_NAME,
    data=[query_vector],
    anns_field=<span class="hljs-string">&quot;dense_vector&quot;</span>,
    limit=<span class="hljs-number">5</span>,
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;dense_vector&quot;</span>],
)

<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Search results:&quot;</span>)
<span class="hljs-keyword">for</span> hits <span class="hljs-keyword">in</span> results:
    <span class="hljs-keyword">for</span> hit <span class="hljs-keyword">in</span> hits:
        <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;  ID: <span class="hljs-subst">{hit[<span class="hljs-string">&#x27;id&#x27;</span>]}</span>, Distance: <span class="hljs-subst">{hit[<span class="hljs-string">&#x27;distance&#x27;</span>]:<span class="hljs-number">.4</span>f}</span>, Vector: <span class="hljs-subst">{hit[<span class="hljs-string">&#x27;entity&#x27;</span>][<span class="hljs-string">&#x27;dense_vector&#x27;</span>]}</span>&quot;</span>)

<span class="hljs-comment"># Expected output:</span>
<span class="hljs-comment"># Query vector: [0.04829983311732566, 7.242046533136467, 4.749595032784661, 6.538280898507523, 2.927369010676787, 7.130210349120606]</span>

<span class="hljs-comment"># Search results:</span>
<span class="hljs-comment">#   ID: 462276891999427419, Distance: 0.9863, Vector: [0.717526912689209, 9.375789642333984, 5.504298210144043, 5.678950786590576, 4.515065670013428, 9.119729042053223]</span>
<span class="hljs-comment">#   ID: 462276891999428167, Distance: 0.9858, Vector: [0.3835741877555847, 6.094085693359375, 3.7625980377197266, 3.6146297454833984, 1.652050495147705, 4.706247329711914]</span>
<span class="hljs-comment">#   ID: 462276891999427800, Distance: 0.9810, Vector: [2.6610236167907715, 8.234763145446777, 5.404249668121338, 6.806085586547852, 2.198822259902954, 8.617210388183594]</span>
<span class="hljs-comment">#   ID: 462276891999428070, Distance: 0.9767, Vector: [0.7160412669181824, 7.404406547546387, 7.226160526275635, 6.292483806610107, 1.1760412454605103, 7.476434230804443]</span>
<span class="hljs-comment">#   ID: 462276891999427972, Distance: 0.9763, Vector: [0.7996429204940796, 7.207499027252197, 4.7528157234191895, 8.581534385681152, 3.2311313152313232, 5.160025119781494]</span>

<button class="copy-code-btn"></button></code></pre>
</div>
<div class="filter-fp16">
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Generate a random query vector</span>
query_vector = np.array([random.uniform(<span class="hljs-number">0</span>, <span class="hljs-number">10</span>) <span class="hljs-keyword">for</span> _ <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(DIM)], dtype=np.float16)
<span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;\nQuery vector: <span class="hljs-subst">{query_vector}</span>\n&quot;</span>)

results = client.search(
    collection_name=COLLECTION_NAME,
    data=[query_vector],
    anns_field=<span class="hljs-string">&quot;dense_vector&quot;</span>,
    limit=<span class="hljs-number">5</span>,
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;dense_vector&quot;</span>],
)

<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Search results:&quot;</span>)
<span class="hljs-keyword">for</span> hits <span class="hljs-keyword">in</span> results:
    <span class="hljs-keyword">for</span> hit <span class="hljs-keyword">in</span> hits:
        <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;  ID: <span class="hljs-subst">{hit[<span class="hljs-string">&#x27;id&#x27;</span>]}</span>, Distance: <span class="hljs-subst">{hit[<span class="hljs-string">&#x27;distance&#x27;</span>]:<span class="hljs-number">.4</span>f}</span>, Vector: <span class="hljs-subst">{hit[<span class="hljs-string">&#x27;entity&#x27;</span>][<span class="hljs-string">&#x27;dense_vector&#x27;</span>]}</span>&quot;</span>)

<span class="hljs-comment"># Expected output:</span>
<span class="hljs-comment"># Query vector: [4.133  0.1598 7.348  3.623  2.727  6.88  ]</span>

<span class="hljs-comment"># Search results:</span>
<span class="hljs-comment">#   ID: 462276891999429161, Distance: 0.9921, Vector: b&#x27;\xbeD\x874\xabH\x9eEhC0G&#x27;</span>
<span class="hljs-comment">#   ID: 462276891999428326, Distance: 0.9874, Vector: b&#x27;\xb9D\x9a=\xd4H\xa2F[D&lt;H&#x27;</span>
<span class="hljs-comment">#   ID: 462276891999428783, Distance: 0.9824, Vector: b&#x27;&lt;F\xeb:\x8dG\xacE7A.G&#x27;</span>
<span class="hljs-comment">#   ID: 462276891999428366, Distance: 0.9819, Vector: b&#x27;\x15E\xe3?\xecG\xf5D&quot;@\xd2H&#x27;</span>
<span class="hljs-comment">#   ID: 462276891999428808, Distance: 0.9795, Vector: b&#x27;RE\xf8&gt;HH\x17Fe&gt;\xe8H&#x27;</span>

<button class="copy-code-btn"></button></code></pre>
</div>
<div class="filter-bf16">
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Generate a random query vector</span>
query_vector = np.array([random.uniform(<span class="hljs-number">0</span>, <span class="hljs-number">10</span>) <span class="hljs-keyword">for</span> _ <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(DIM)], dtype=ml_dtypes.bfloat16)
<span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;\nQuery vector: <span class="hljs-subst">{query_vector}</span>\n&quot;</span>)

results = client.search(
    collection_name=COLLECTION_NAME,
    data=[query_vector],
    anns_field=<span class="hljs-string">&quot;dense_vector&quot;</span>,
    limit=<span class="hljs-number">5</span>,
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;dense_vector&quot;</span>],
)

<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Search results:&quot;</span>)
<span class="hljs-keyword">for</span> hits <span class="hljs-keyword">in</span> results:
    <span class="hljs-keyword">for</span> hit <span class="hljs-keyword">in</span> hits:
        <span class="hljs-comment"># Convert bytes back to numpy bfloat16 array for display</span>
        vector_bytes = hit[<span class="hljs-string">&#x27;entity&#x27;</span>][<span class="hljs-string">&#x27;dense_vector&#x27;</span>]
        vector_array = np.frombuffer(vector_bytes, dtype=ml_dtypes.bfloat16)
        <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;  ID: <span class="hljs-subst">{hit[<span class="hljs-string">&#x27;id&#x27;</span>]}</span>, Distance: <span class="hljs-subst">{hit[<span class="hljs-string">&#x27;distance&#x27;</span>]:<span class="hljs-number">.4</span>f}</span>, Vector: <span class="hljs-subst">{vector_array}</span>&quot;</span>)

<span class="hljs-comment"># Expected output:</span>
<span class="hljs-comment"># Query vector: [2.85938 9 0.761719 8 9 10]</span>

<span class="hljs-comment"># Search results:</span>
<span class="hljs-comment">#   ID: 462276891999429941, Distance: 0.9969, Vector: [1.78125 8 0.121582 6.78125 7.46875 9.5]</span>
<span class="hljs-comment">#   ID: 462276891999429646, Distance: 0.9903, Vector: [2.51562 8.5625 0.0224609 7.625 6.875 7.03125]</span>
<span class="hljs-comment">#   ID: 462276891999429243, Distance: 0.9888, Vector: [0.253906 7.78125 1.17188 7.15625 8.125 8.1875]</span>
<span class="hljs-comment">#   ID: 462276891999429439, Distance: 0.9833, Vector: [3.78125 6.4375 1.96875 4.9375 7.59375 8.4375]</span>
<span class="hljs-comment">#   ID: 462276891999429986, Distance: 0.9825, Vector: [1.64062 5.0625 0.0130615 7.15625 8.4375 7.84375]</span>

<button class="copy-code-btn"></button></code></pre>
</div>
<div class="filter-int8">
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Generate a random query vector (int8 range: -128 to 127)</span>
query_vector = np.array([random.randint(-<span class="hljs-number">128</span>, <span class="hljs-number">127</span>) <span class="hljs-keyword">for</span> _ <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(DIM)], dtype=np.int8)
<span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;\nQuery vector: <span class="hljs-subst">{query_vector}</span>\n&quot;</span>)

results = client.search(
    collection_name=COLLECTION_NAME,
    data=[query_vector],
    anns_field=<span class="hljs-string">&quot;dense_vector&quot;</span>,
    limit=<span class="hljs-number">5</span>,
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;dense_vector&quot;</span>],
)

<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Search results:&quot;</span>)
<span class="hljs-keyword">for</span> hits <span class="hljs-keyword">in</span> results:
    <span class="hljs-keyword">for</span> hit <span class="hljs-keyword">in</span> hits:
        <span class="hljs-comment"># Convert bytes back to numpy int8 array for display</span>
        vector_bytes = hit[<span class="hljs-string">&#x27;entity&#x27;</span>][<span class="hljs-string">&#x27;dense_vector&#x27;</span>]
        vector_array = np.frombuffer(vector_bytes, dtype=np.int8)
        <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;  ID: <span class="hljs-subst">{hit[<span class="hljs-string">&#x27;id&#x27;</span>]}</span>, Distance: <span class="hljs-subst">{hit[<span class="hljs-string">&#x27;distance&#x27;</span>]:<span class="hljs-number">.4</span>f}</span>, Vector: <span class="hljs-subst">{vector_array}</span>&quot;</span>)

<span class="hljs-comment"># Expected output:</span>
<span class="hljs-comment"># Query vector: [-72 -76 -35 -44  33 103]</span>

<span class="hljs-comment"># Search results:</span>
<span class="hljs-comment">#   ID: 462276891999430363, Distance: 0.9280, Vector: [-118  -84  -14   -6   86  126]</span>
<span class="hljs-comment">#   ID: 462276891999430447, Distance: 0.9222, Vector: [-101  -83  -37  -85  -31  125]</span>
<span class="hljs-comment">#   ID: 462276891999430628, Distance: 0.9210, Vector: [-47 -61 -33 -99  40  89]</span>
<span class="hljs-comment">#   ID: 462276891999430902, Distance: 0.9181, Vector: [-107  -71  -69 -105   62   80]</span>
<span class="hljs-comment">#   ID: 462276891999431014, Distance: 0.9179, Vector: [-109 -117  -79  -42   96   79]</span>

<button class="copy-code-btn"></button></code></pre>
</div>
<h2 id="Next-steps" class="common-anchor-header">Next steps<button data-href="#Next-steps" class="anchor-icon" translate="no">
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
    </button></h2><p>Once you can store and search dense vectors, you can:</p>
<ul>
<li><p><strong>Combine vector and scalar filters</strong></p>
<p>Add filter conditions on other fields along with vector similarity. For details, refer to <a href="/docs/filtered-search.md">Filtered Search</a>.</p></li>
<li><p><strong>Run hybrid search</strong></p>
<p>Combine multiple vector fields (for example, text + image embeddings) or mix sparse and dense vectors. See <a href="/docs/multi-vector-search.md">Multi-Vector Hybrid Search</a> for details.</p></li>
</ul>
<h2 id="FAQ" class="common-anchor-header">FAQ<button data-href="#FAQ" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Can-a-collection-have-multiple-dense-vector-fields-with-different-types" class="common-anchor-header">Can a collection have multiple dense vector fields with different types?<button data-href="#Can-a-collection-have-multiple-dense-vector-fields-with-different-types" class="anchor-icon" translate="no">
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
    </button></h3><p>Yes. Each vector field can have its own type (<code translate="no">FLOAT_VECTOR</code>, <code translate="no">FLOAT16_VECTOR</code>, <code translate="no">BFLOAT16_VECTOR</code>, or <code translate="no">INT8_VECTOR</code>) and dimension. Define each field explicitly in the schema.</p>
<h3 id="Can-I-modify-the-vector-type-after-collection-creation" class="common-anchor-header">Can I modify the vector type after collection creation?<button data-href="#Can-I-modify-the-vector-type-after-collection-creation" class="anchor-icon" translate="no">
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
    </button></h3><p>No. Field data types are immutable. To change the vector type, create a new field or a new collection and migrate data.</p>
<h3 id="Does-Milvus-handle-FP32-→-FP16-or-FP16-→-INT8-conversion-automatically" class="common-anchor-header">Does Milvus handle FP32 → FP16 or FP16 → INT8 conversion automatically?<button data-href="#Does-Milvus-handle-FP32-→-FP16-or-FP16-→-INT8-conversion-automatically" class="anchor-icon" translate="no">
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
    </button></h3><p>No. Milvus stores vectors as-is. Perform any datatype conversions or quantization in your application code or preprocessing pipeline before insertion.</p>
