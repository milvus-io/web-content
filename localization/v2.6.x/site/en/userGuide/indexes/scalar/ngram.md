---
id: ngram.md
title: NGRAM
summary: >-
  The NGRAM index in Milvus is built to accelerate LIKE queries on VARCHAR
  fields or specific JSON paths within JSON fields. Before building the index,
  Milvus splits text into short, overlapping substrings of a fixed length n,
  known as n-grams. For example, with n = 3, the word "Milvus" is split into
  3-grams: "Mil", "ilv", "lvu", and "vus". These n-grams are then stored in an
  inverted index that maps each gram to the document IDs in which it appears. At
  query time, this index allows Milvus to quickly narrow the search to a small
  set of candidates, resulting in much faster query execution.
beta: Milvus v2.6.2+
---
<h1 id="NGRAM" class="common-anchor-header">NGRAM<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus v2.6.2+</span><button data-href="#NGRAM" class="anchor-icon" translate="no">
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
    </button></h1><p>The <code translate="no">NGRAM</code> index in Milvus is built to accelerate <code translate="no">LIKE</code> queries on <code translate="no">VARCHAR</code> fields or specific JSON paths within <code translate="no">JSON</code> fields. Before building the index, Milvus splits text into short, overlapping substrings of a fixed length <em>n</em>, known as <em>n-grams</em>. For example, with <em>n = 3</em>, the word <em>“Milvus”</em> is split into 3-grams: <em>“Mil”</em>, <em>“ilv”</em>, <em>“lvu”</em>, and <em>“vus”</em>. These n-grams are then stored in an inverted index that maps each gram to the document IDs in which it appears. At query time, this index allows Milvus to quickly narrow the search to a small set of candidates, resulting in much faster query execution.</p>
<p>Use it when you need fast prefix, suffix, infix, or wildcard filtering such as:</p>
<ul>
<li><p><code translate="no">name LIKE &quot;data%&quot;</code></p></li>
<li><p><code translate="no">title LIKE &quot;%vector%&quot;</code></p></li>
<li><p><code translate="no">path LIKE &quot;%json&quot;</code></p></li>
</ul>
<div class="alert note">
<p>For details on filter expression syntax, refer to <a href="/docs/basic-operators.md#Range-operators">Basic Operators</a>.</p>
</div>
<h2 id="How-it-works" class="common-anchor-header">How it works<button data-href="#How-it-works" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus implements the <code translate="no">NGRAM</code> index in a two-phase process:</p>
<ol>
<li><p><strong>Build index</strong>: Generate n-grams for each document and build an inverted index during ingest.</p></li>
<li><p><strong>Accelerate queries</strong> : Use the index to filter to a small candidate set, then verify exact matches.</p></li>
</ol>
<h3 id="Phase-1-Build-the-index" class="common-anchor-header">Phase 1: Build the index<button data-href="#Phase-1-Build-the-index" class="anchor-icon" translate="no">
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
    </button></h3><p>During data ingestion, Milvus builds the NGRAM index by performing two main steps:</p>
<ol>
<li><p><strong>Decompose text into n-grams</strong>: Milvus slides a window of <em>n</em> across each string in the target field and extracts overlapping substrings, or <em>n-grams</em>. The length of these substrings falls within a configurable range, <code translate="no">[min_gram, max_gram]</code>.</p>
<ul>
<li><p><code translate="no">min_gram</code>: The shortest n-gram to generate. This also defines the minimum query substring length that can benefit from the index.</p></li>
<li><p><code translate="no">max_gram</code>: The longest n-gram to generate. At query time, it is also used as the maximum window size when splitting long query strings.</p></li>
</ul>
<p>For example, with <code translate="no">min_gram=2</code> and <code translate="no">max_gram=3</code>, the string <code translate="no">&quot;AI database&quot;</code> is broken down as follows:</p>
<ul>
<li><strong>2-grams:</strong> <code translate="no">AI</code>, <code translate="no">I_</code>, <code translate="no">_d</code>, <code translate="no">da</code>, <code translate="no">at</code>, …</li>
<li><strong>3-grams:</strong> <code translate="no">AI_</code>, <code translate="no">I_d</code>, <code translate="no">_da</code>, <code translate="no">dat</code>, <code translate="no">ata</code>, …</li>
</ul>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.6.x/assets/build-ngram-index.png" alt="Build Ngram Index" class="doc-image" id="build-ngram-index" />
    <span>Build Ngram Index</span>
  </span>
</p>
<blockquote>
<p><strong>Note</strong></p>
<ul>
<li><p>For a range <code translate="no">[min_gram, max_gram]</code>, Milvus generates all n-grams for every length between the two values (inclusive).<br>
Example: with <code translate="no">[2,4]</code> and the word <code translate="no">&quot;text&quot;</code>, Milvus generates:</p>
<ul>
<li><strong>2-grams:</strong> <code translate="no">te</code>, <code translate="no">ex</code>, <code translate="no">xt</code></li>
<li><strong>3-grams:</strong> <code translate="no">tex</code>, <code translate="no">ext</code></li>
<li><strong>4-grams:</strong> <code translate="no">text</code></li>
</ul></li>
<li><p>N-gram decomposition is character-based and language-agnostic. For example, in Chinese, <code translate="no">&quot;向量数据库&quot;</code> with <code translate="no">min_gram = 2</code> is decomposed into: <code translate="no">&quot;向量&quot;</code>, <code translate="no">&quot;量数&quot;</code>, <code translate="no">&quot;数据&quot;</code>, <code translate="no">&quot;据库&quot;</code>.</p></li>
<li><p>Spaces and punctuation are treated as characters during decomposition.</p></li>
<li><p>Decomposition preserves original case, and matching is case-sensitive. For example, <code translate="no">&quot;Database&quot;</code> and <code translate="no">&quot;database&quot;</code> will generate different n-grams and require exact case matching during queries.</p></li>
</ul>
</blockquote></li>
<li><p><strong>Build an inverted index</strong>: An <strong>inverted index</strong> is created that maps each generated n-gram to a list of the document IDs containing it.</p>
<p>For instance, if the 2-gram <code translate="no">&quot;AI&quot;</code> appears in documents with IDs 1, 5, 6, 8, and 9, the index records <code translate="no">{&quot;AI&quot;: [1, 5, 6, 8, 9]}</code>. This index is then used at query time to quickly narrow the search scope.</p></li>
</ol>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.6.x/assets/build-ngram-index-2.png" alt="Build Ngram Index 2" class="doc-image" id="build-ngram-index-2" />
    <span>Build Ngram Index 2</span>
  </span>
</p>
<div class="alert note">
<p>A wider <code translate="no">[min_gram, max_gram]</code> range creates more grams and larger mapping lists. If memory is tight, consider mmap mode for very large posting lists. For details, refer to <a href="/docs/mmap.md">Use mmap</a>.</p>
</div>
<h3 id="Phase-2-Accelerate-queries" class="common-anchor-header">Phase 2: Accelerate queries<button data-href="#Phase-2-Accelerate-queries" class="anchor-icon" translate="no">
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
    </button></h3><p>When a <code translate="no">LIKE</code> filter is executed, Milvus uses the NGRAM index to accelerate the query in the following steps:</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.6.x/assets/accelerate-queries.png" alt="Accelerate Queries" class="doc-image" id="accelerate-queries" />
    <span>Accelerate Queries</span>
  </span>
</p>
<ol>
<li><p><strong>Extract the query term:</strong> The contiguous substring without wildcards is extracted from the <code translate="no">LIKE</code> expression (e.g., <code translate="no">&quot;%database%&quot;</code> becomes <code translate="no">&quot;database&quot;</code>).</p></li>
<li><p><strong>Decompose the query term:</strong> The query term is decomposed into <em>n-grams</em> based on its length (<code translate="no">L</code>) and the <code translate="no">min_gram</code> and <code translate="no">max_gram</code> settings.</p>
<ul>
<li><p>If <code translate="no">L &lt; min_gram</code>, the index cannot be used, and the query falls back to a full scan.</p></li>
<li><p>If <code translate="no">min_gram ≤ L ≤ max_gram</code>, the entire query term is treated as a single n-gram, and no further decomposition is necessary.</p></li>
<li><p>If <code translate="no">L &gt; max_gram</code>, the query term is broken down into overlapping grams using a window size equal to <code translate="no">max_gram</code>.</p></li>
</ul>
<p>For example, if the <code translate="no">max_gram</code> is set to <code translate="no">3</code> and the query term is <code translate="no">&quot;database&quot;</code>, which has a length of <strong>8</strong>, it is decomposed into 3-gram substrings like <code translate="no">&quot;dat&quot;</code>, <code translate="no">&quot;ata&quot;</code>, <code translate="no">&quot;tab&quot;</code>, and so on.</p></li>
<li><p><strong>Look for each gram & intersect</strong>: Milvus looks up each of the query grams in the inverted index and then intersects the resulting document ID lists to find a small set of candidate documents. These candidates contain all the grams from the query.</p></li>
<li><p><strong>Verify and return results:</strong> The original <code translate="no">LIKE</code> filter is then applied as a final check on only the small candidate set to find the exact matches.</p></li>
</ol>
<h2 id="Create-an-NGRAM-index" class="common-anchor-header">Create an NGRAM index<button data-href="#Create-an-NGRAM-index" class="anchor-icon" translate="no">
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
    </button></h2><p>You can create an NGRAM index on a <code translate="no">VARCHAR</code> field or on a specific path inside a <code translate="no">JSON</code> field.</p>
<h3 id="Example-1-Create-on-a-VARCHAR-field" class="common-anchor-header">Example 1: Create on a VARCHAR field<button data-href="#Example-1-Create-on-a-VARCHAR-field" class="anchor-icon" translate="no">
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
    </button></h3><p>For a <code translate="no">VARCHAR</code> field, you simply specify the <code translate="no">field_name</code> and configure <code translate="no">min_gram</code> and <code translate="no">max_gram</code>.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>) <span class="hljs-comment"># Replace with your server address</span>

<span class="hljs-comment"># Assume you have defined a VARCHAR field named &quot;text&quot; in your collection schema</span>

<span class="hljs-comment"># Prepare index parameters</span>
index_params = client.prepare_index_params()

<span class="hljs-comment"># Add NGRAM index on the &quot;text&quot; field</span>
<span class="highlighted-comment-line">index_params.add_index(</span>
<span class="highlighted-comment-line">    field_name=<span class="hljs-string">&quot;text&quot;</span>,   <span class="hljs-comment"># Target VARCHAR field</span></span>
<span class="highlighted-comment-line">    index_type=<span class="hljs-string">&quot;NGRAM&quot;</span>,           <span class="hljs-comment"># Index type is NGRAM</span></span>
<span class="highlighted-comment-line">    index_name=<span class="hljs-string">&quot;ngram_index&quot;</span>,     <span class="hljs-comment"># Custom name for the index</span></span>
<span class="highlighted-comment-line">    min_gram=<span class="hljs-number">2</span>,                   <span class="hljs-comment"># Minimum substring length (e.g., 2-gram: &quot;st&quot;)</span></span>
<span class="highlighted-comment-line">    max_gram=<span class="hljs-number">3</span>                    <span class="hljs-comment"># Maximum substring length (e.g., 3-gram: &quot;sta&quot;)</span></span>
<span class="highlighted-comment-line">)</span>

<span class="hljs-comment"># Create the index on the collection</span>
client.create_index(
    collection_name=<span class="hljs-string">&quot;Documents&quot;</span>,
    index_params=index_params
)
<button class="copy-code-btn"></button></code></pre>
<p>This configuration generates 2-grams and 3-grams for each string in <code translate="no">text</code> and stores them in the inverted index.</p>
<h3 id="Example-2-Create-on-a-JSON-path" class="common-anchor-header">Example 2: Create on a JSON path<button data-href="#Example-2-Create-on-a-JSON-path" class="anchor-icon" translate="no">
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
    </button></h3><p>For a <code translate="no">JSON</code> field, in addition to the gram settings, you must also specify:</p>
<ul>
<li><p><code translate="no">params.json_path</code> – the JSON path that points to the value you want to index.</p></li>
<li><p><code translate="no">params.json_cast_type</code> – must be <code translate="no">&quot;varchar&quot;</code> (case-insensitive), because NGRAM indexing operates on strings.</p></li>
</ul>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Assume you have defined a JSON field named &quot;json_field&quot; in your collection schema, with a JSON path named &quot;body&quot;</span>

<span class="hljs-comment"># Prepare index parameters</span>
index_params = client.prepare_index_params()

<span class="hljs-comment"># Add NGRAM index on a JSON field</span>
<span class="highlighted-comment-line">index_params.add_index(</span>
<span class="highlighted-comment-line">    field_name=<span class="hljs-string">&quot;json_field&quot;</span>,              <span class="hljs-comment"># Target JSON field</span></span>
<span class="highlighted-comment-line">    index_type=<span class="hljs-string">&quot;NGRAM&quot;</span>,                   <span class="hljs-comment"># Index type is NGRAM</span></span>
<span class="highlighted-comment-line">    index_name=<span class="hljs-string">&quot;json_ngram_index&quot;</span>,        <span class="hljs-comment"># Custom index name</span></span>
<span class="highlighted-comment-line">    min_gram=<span class="hljs-number">2</span>,                           <span class="hljs-comment"># Minimum n-gram length</span></span>
<span class="highlighted-comment-line">    max_gram=<span class="hljs-number">4</span>,                           <span class="hljs-comment"># Maximum n-gram length</span></span>
<span class="highlighted-comment-line">    params={</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;json_path&quot;</span>: <span class="hljs-string">&quot;json_field[\&quot;body\&quot;]&quot;</span>,  <span class="hljs-comment"># Path to the value inside the JSON field</span></span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;json_cast_type&quot;</span>: <span class="hljs-string">&quot;varchar&quot;</span>                  <span class="hljs-comment"># Required: cast the value to varchar</span></span>
<span class="highlighted-comment-line">    }</span>
<span class="highlighted-comment-line">)</span>

<span class="hljs-comment"># Create the index on the collection</span>
client.create_index(
    collection_name=<span class="hljs-string">&quot;Documents&quot;</span>,
    index_params=index_params
)
<button class="copy-code-btn"></button></code></pre>
<p>In this example:</p>
<ul>
<li><p>Only the value at <code translate="no">json_field[&quot;body&quot;]</code> is indexed.</p></li>
<li><p>The value is cast to <code translate="no">VARCHAR</code> before n-gram tokenization.</p></li>
<li><p>Milvus generates substrings of length 2 to 4 and stores them in the inverted index.</p></li>
</ul>
<p>For more information on how to index a JSON field, refer to <a href="/docs/json-indexing.md">JSON Indexing</a>.</p>
<h2 id="Queries-accelerated-by-NGRAM" class="common-anchor-header">Queries accelerated by NGRAM<button data-href="#Queries-accelerated-by-NGRAM" class="anchor-icon" translate="no">
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
    </button></h2><p>For the NGRAM index to be applied:</p>
<ul>
<li><p>The query must target a <code translate="no">VARCHAR</code> field (or JSON path) that has an <code translate="no">NGRAM</code> index.</p></li>
<li><p>The literal part of the <code translate="no">LIKE</code> pattern must be at least <code translate="no">min_gram</code> characters long.
<em>(For example, if your shortest expected query term is 2 characters, set min_gram=2 when creating the index.)</em></p></li>
</ul>
<p>Supported query types:</p>
<ul>
<li><p><strong>Prefix match</strong></p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Match any string that starts with the substring &quot;database&quot;</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;text LIKE &quot;database%&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>Suffix match</strong></p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Match any string that ends with the substring &quot;database&quot;</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;text LIKE &quot;%database&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>Infix match</strong></p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Match any string that contains the substring &quot;database&quot; anywhere</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;text LIKE &quot;%database%&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>Wildcard match</strong></p>
<p>Milvus supports both <code translate="no">%</code> (zero or more characters) and <code translate="no">_</code> (exactly one character).</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Match any string where &quot;st&quot; appears first, and &quot;um&quot; appears later in the text </span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;text LIKE &quot;%st%um%&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>JSON path queries</strong></p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;json_field[&quot;body&quot;] LIKE &quot;%database%&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre></li>
</ul>
<p>For more information on filter expression syntax, refer to <a href="/docs/basic-operators.md">Basic Operators</a>.</p>
<h2 id="Drop-an-index" class="common-anchor-header">Drop an index<button data-href="#Drop-an-index" class="anchor-icon" translate="no">
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
    </button></h2><p>Use the <code translate="no">drop_index()</code> method to remove an existing index from a collection.</p>
<div class="alert note">
<ul>
<li><p>In <strong>v2.6.3</strong> or earlier, you must release the collection before dropping a scalar index.</p></li>
<li><p>From <strong>v2.6.4</strong> or later, you can drop a scalar index directly once it’s no longer needed—no need to release the collection first.</p></li>
</ul>
</div>
<pre><code translate="no" class="language-python">client.drop_index(
    collection_name=<span class="hljs-string">&quot;Documents&quot;</span>,   <span class="hljs-comment"># Name of the collection</span>
    index_name=<span class="hljs-string">&quot;ngram_index&quot;</span> <span class="hljs-comment"># Name of the index to drop</span>
)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Usage-notes" class="common-anchor-header">Usage notes<button data-href="#Usage-notes" class="anchor-icon" translate="no">
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
<li><p><strong>Field types</strong>: Supported on <code translate="no">VARCHAR</code> and <code translate="no">JSON</code> fields. For JSON, provide both <code translate="no">params.json_path</code> and <code translate="no">params.json_cast_type=&quot;varchar&quot;</code>.</p></li>
<li><p><strong>Unicode</strong>: NGRAM decomposition is character-based and language-agnostic and includes whitespace and punctuation.</p></li>
<li><p><strong>Space–time trade-off</strong>: Wider gram ranges <code translate="no">[min_gram, max_gram]</code> produce more grams and larger indexes. If memory is tight, consider <code translate="no">mmap</code> mode for large posting lists. For more information, refer to <a href="/docs/mmap.md">Use mmap</a>.</p></li>
<li><p><strong>Immutability</strong>: <code translate="no">min_gram</code> and <code translate="no">max_gram</code> cannot be changed in place—rebuild the index to adjust them.</p></li>
</ul>
<h2 id="Best-practices" class="common-anchor-header">Best practices<button data-href="#Best-practices" class="anchor-icon" translate="no">
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
<li><p><strong>Choose min_gram and max_gram to match search behavior</strong></p>
<ul>
<li><p>Start with <code translate="no">min_gram=2</code>, <code translate="no">max_gram=3</code>.</p></li>
<li><p>Set <code translate="no">min_gram</code> to the shortest literal you expect users to type.</p></li>
<li><p>Set <code translate="no">max_gram</code> near the typical length of meaningful substrings; larger <code translate="no">max_gram</code> improves filtering but increases space.</p></li>
</ul></li>
<li><p><strong>Avoid low-selectivity grams</strong></p>
<p>Highly repetitive patterns (e.g., <code translate="no">&quot;aaaaaa&quot;</code>) provide weak filtering and may yield limited gains.</p></li>
<li><p><strong>Normalize consistently</strong></p>
<p>Apply the same normalization to ingested text and query literals (e.g., lowercasing, trimming) if your use case needs it.</p></li>
</ul>
