---
id: embed-with-bgm-m3.md
order: 4
summary: >-
  BGE-M3 is named for its capabilities in Multi-Linguality, Multi-Functionality,
  and Multi-Granularity.
title: BGE M3
---
<h1 id="BGE-M3" class="common-anchor-header">BGE M3<button data-href="#BGE-M3" class="anchor-icon" translate="no">
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
    </button></h1><p><a href="https://arxiv.org/abs/2402.03216">BGE-M3</a> is named for its capabilities in Multi-Linguality, Multi-Functionality, and Multi-Granularity. Capable of supporting over 100 languages, BGE-M3 sets new benchmarks in multi-lingual and cross-lingual retrieval tasks. Its unique ability to perform dense retrieval, multi-vector retrieval, and sparse retrieval within a single framework makes it an ideal choice for a wide range of information retrieval (IR) applications.</p>
<p>Milvus integrates with the BGE M3 model using the <strong>BGEM3EmbeddingFunction</strong> class. This class handles the computation of embeddings and returns them in a format compatible with Milvus for indexing and searching. To use this feature, FlagEmbedding must be installed.</p>
<p>To use this feature, install the necessary dependencies:</p>
<pre><code translate="no" class="language-bash">pip install --upgrade pymilvus
pip install <span class="hljs-string">&quot;pymilvus[model]&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Then, instantiate the <strong>BGEM3EmbeddingFunction</strong>:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus.model.hybrid <span class="hljs-keyword">import</span> BGEM3EmbeddingFunction

bge_m3_ef = BGEM3EmbeddingFunction(
    model_name=<span class="hljs-string">&#x27;BAAI/bge-m3&#x27;</span>, <span class="hljs-comment"># Specify the model name</span>
    device=<span class="hljs-string">&#x27;cpu&#x27;</span>, <span class="hljs-comment"># Specify the device to use, e.g., &#x27;cpu&#x27; or &#x27;cuda:0&#x27;</span>
    use_fp16=<span class="hljs-literal">False</span> <span class="hljs-comment"># Specify whether to use fp16. Set to `False` if `device` is `cpu`.</span>
)
<button class="copy-code-btn"></button></code></pre>
<p><strong>Parameters</strong>:</p>
<ul>
<li><p><strong>model_name</strong> (<em>string</em>)</p>
<p>The name of the model to use for encoding. The value defaults to <strong>BAAI/bge-m3</strong>.</p></li>
<li><p><strong>device</strong> (<em>string</em>)</p>
<p>The device to use, with <strong>cpu</strong> for the CPU and <strong>cuda:n</strong> for the nth GPU device.</p></li>
<li><p><strong>use_fp16</strong> (<em>bool</em>)</p>
<p>Whether to utilize 16-bit floating-point precision (fp16). Specify <strong>False</strong> when <strong>device</strong> is <strong>cpu</strong>.</p></li>
</ul>
<p>To create embeddings for documents, use the <strong>encode_documents()</strong> method:</p>
<pre><code translate="no" class="language-python">docs = [
    <span class="hljs-string">&quot;Artificial intelligence was founded as an academic discipline in 1956.&quot;</span>,
    <span class="hljs-string">&quot;Alan Turing was the first person to conduct substantial research in AI.&quot;</span>,
    <span class="hljs-string">&quot;Born in Maida Vale, London, Turing was raised in southern England.&quot;</span>,
]

docs_embeddings = bge_m3_ef.encode_documents(docs)

<span class="hljs-comment"># Print embeddings</span>
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Embeddings:&quot;</span>, docs_embeddings)
<span class="hljs-comment"># Print dimension of dense embeddings</span>
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Dense document dim:&quot;</span>, bge_m3_ef.dim[<span class="hljs-string">&quot;dense&quot;</span>], docs_embeddings[<span class="hljs-string">&quot;dense&quot;</span>][<span class="hljs-number">0</span>].shape)
<span class="hljs-comment"># Since the sparse embeddings are in a 2D csr_array format, we convert them to a list for easier manipulation.</span>
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Sparse document dim:&quot;</span>, bge_m3_ef.dim[<span class="hljs-string">&quot;sparse&quot;</span>], <span class="hljs-built_in">list</span>(docs_embeddings[<span class="hljs-string">&quot;sparse&quot;</span>])[<span class="hljs-number">0</span>].shape)
<button class="copy-code-btn"></button></code></pre>
<p>The expected output is similar to the following:</p>
<pre><code translate="no" class="language-python">Embeddings: {<span class="hljs-string">&#x27;dense&#x27;</span>: [array([<span class="hljs-number">-0.02505937</span>, <span class="hljs-number">-0.00142193</span>,  <span class="hljs-number">0.04015467</span>, ..., <span class="hljs-number">-0.02094924</span>,
        <span class="hljs-number">0.02623661</span>,  <span class="hljs-number">0.00324098</span>], dtype=<span class="hljs-type">float32</span>), array([ <span class="hljs-number">0.00118463</span>,  <span class="hljs-number">0.00649292</span>, <span class="hljs-number">-0.00735763</span>, ..., <span class="hljs-number">-0.01446293</span>,
        <span class="hljs-number">0.04243685</span>, <span class="hljs-number">-0.01794822</span>], dtype=<span class="hljs-type">float32</span>), array([ <span class="hljs-number">0.00415287</span>, <span class="hljs-number">-0.0101492</span> ,  <span class="hljs-number">0.0009811</span> , ..., <span class="hljs-number">-0.02559666</span>,
        <span class="hljs-number">0.08084674</span>,  <span class="hljs-number">0.00141647</span>], dtype=<span class="hljs-type">float32</span>)], <span class="hljs-string">&#x27;sparse&#x27;</span>: &lt;<span class="hljs-number">3</span>x250002 sparse array of <span class="hljs-keyword">type</span> <span class="hljs-string">&#x27;&lt;class &#x27;</span>numpy.<span class="hljs-type">float32</span><span class="hljs-string">&#x27;&gt;&#x27;</span>
        with <span class="hljs-number">43</span> stored elements in Compressed Sparse Row format&gt;}
Dense document dim: <span class="hljs-number">1024</span> (<span class="hljs-number">1024</span>,)
Sparse document dim: <span class="hljs-number">250002</span> (<span class="hljs-number">1</span>, <span class="hljs-number">250002</span>)
<button class="copy-code-btn"></button></code></pre>
<p>To create embeddings for queries, use the <strong>encode_queries()</strong> method:</p>
<pre><code translate="no" class="language-python">queries = [<span class="hljs-string">&quot;When was artificial intelligence founded&quot;</span>, 
           <span class="hljs-string">&quot;Where was Alan Turing born?&quot;</span>]

query_embeddings = bge_m3_ef.encode_queries(queries)

<span class="hljs-comment"># Print embeddings</span>
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Embeddings:&quot;</span>, query_embeddings)
<span class="hljs-comment"># Print dimension of dense embeddings</span>
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Dense query dim:&quot;</span>, bge_m3_ef.dim[<span class="hljs-string">&quot;dense&quot;</span>], query_embeddings[<span class="hljs-string">&quot;dense&quot;</span>][<span class="hljs-number">0</span>].shape)
<span class="hljs-comment"># Since the sparse embeddings are in a 2D csr_array format, we convert them to a list for easier manipulation.</span>
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Sparse query dim:&quot;</span>, bge_m3_ef.dim[<span class="hljs-string">&quot;sparse&quot;</span>], <span class="hljs-built_in">list</span>(query_embeddings[<span class="hljs-string">&quot;sparse&quot;</span>])[<span class="hljs-number">0</span>].shape)
<button class="copy-code-btn"></button></code></pre>
<p>The expected output is similar to the following:</p>
<pre><code translate="no" class="language-python">Embeddings: {<span class="hljs-string">&#x27;dense&#x27;</span>: [array([<span class="hljs-number">-0.02024024</span>, <span class="hljs-number">-0.01514386</span>,  <span class="hljs-number">0.02380808</span>, ...,  <span class="hljs-number">0.00234648</span>,
       <span class="hljs-number">-0.00264978</span>, <span class="hljs-number">-0.04317448</span>], dtype=<span class="hljs-type">float32</span>), array([ <span class="hljs-number">0.00648045</span>, <span class="hljs-number">-0.0081542</span> , <span class="hljs-number">-0.02717067</span>, ..., <span class="hljs-number">-0.00380103</span>,
        <span class="hljs-number">0.04200587</span>, <span class="hljs-number">-0.01274772</span>], dtype=<span class="hljs-type">float32</span>)], <span class="hljs-string">&#x27;sparse&#x27;</span>: &lt;<span class="hljs-number">2</span>x250002 sparse array of <span class="hljs-keyword">type</span> <span class="hljs-string">&#x27;&lt;class &#x27;</span>numpy.<span class="hljs-type">float32</span><span class="hljs-string">&#x27;&gt;&#x27;</span>
        with <span class="hljs-number">14</span> stored elements in Compressed Sparse Row format&gt;}
Dense query dim: <span class="hljs-number">1024</span> (<span class="hljs-number">1024</span>,)
Sparse query dim: <span class="hljs-number">250002</span> (<span class="hljs-number">1</span>, <span class="hljs-number">250002</span>)
<button class="copy-code-btn"></button></code></pre>
