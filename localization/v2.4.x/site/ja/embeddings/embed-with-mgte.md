---
id: embed-with-mgte.md
order: 13
summary: >-
  This article describes how to use the MGTEEmbeddingFunction to encode
  documents and queries using the mGTE embedding model.
title: mGTE
---
<h1 id="mGTE" class="common-anchor-header">mGTE<button data-href="#mGTE" class="anchor-icon" translate="no">
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
    </button></h1><p>mGTE is a multilingual text representation model and reranking model for text retrieval tasks.</p>
<p>Milvus integrates with the mGTE embedding model via the MGTEEmbeddingFunction class. This class provides methods for encoding documents and queries using the mGTE embedding model and returning the embeddings as dense and sparse vectors compatible with Milvus indexing.</p>
<p>To use this feature, install the necessary dependencies:</p>
<pre><code translate="no" class="language-python">pip install --upgrade pymilvus
pip install <span class="hljs-string">&quot;pymilvus[model]&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Then, instantiate the MGTEEmbeddingFunction:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus.model.hybrid <span class="hljs-keyword">import</span> MGTEEmbeddingFunction

ef = MGTEEmbeddingFunction(
    model_name=<span class="hljs-string">&quot;Alibaba-NLP/gte-multilingual-base&quot;</span>, <span class="hljs-comment"># Defaults to `Alibaba-NLP/gte-multilingual-base`</span>
)
<button class="copy-code-btn"></button></code></pre>
<p><strong>Parameters</strong>:</p>
<ul>
<li><p><code translate="no">model_name</code> (<em>string</em>)</p>
<p>The name of the mGTE embedding model to use for encoding. The value defaults to <code translate="no">Alibaba-NLP/gte-multilingual-base</code>.</p></li>
</ul>
<p>To create embeddings for documents, use the <code translate="no">encode_documents()</code> method:</p>
<pre><code translate="no" class="language-python">docs = [
    <span class="hljs-string">&quot;Artificial intelligence was founded as an academic discipline in 1956.&quot;</span>,
    <span class="hljs-string">&quot;Alan Turing was the first person to conduct substantial research in AI.&quot;</span>,
    <span class="hljs-string">&quot;Born in Maida Vale, London, Turing was raised in southern England.&quot;</span>,
]

docs_embeddings = ef.encode_documents(docs)

<span class="hljs-comment"># Print embeddings</span>
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Embeddings:&quot;</span>, docs_embeddings)
<span class="hljs-comment"># Print dimension of embeddings</span>
<span class="hljs-built_in">print</span>(ef.dim)
<button class="copy-code-btn"></button></code></pre>
<p>The expected output is similar to the following:</p>
<pre><code translate="no" class="language-python">Embeddings: {<span class="hljs-string">&#x27;dense&#x27;</span>: [tensor([<span class="hljs-number">-4.9149e-03</span>, <span class="hljs-number">1.6553e-02</span>, <span class="hljs-number">-9.5524e-03</span>, <span class="hljs-number">-2.1800e-02</span>, <span class="hljs-number">1.2075e-02</span>,
        <span class="hljs-number">1.8500e-02</span>, <span class="hljs-number">-3.0632e-02</span>, <span class="hljs-number">5.5909e-02</span>, <span class="hljs-number">8.7365e-02</span>, <span class="hljs-number">1.8763e-02</span>,
        <span class="hljs-number">2.1708e-03</span>, <span class="hljs-number">-2.7530e-02</span>, <span class="hljs-number">-1.1523e-01</span>, <span class="hljs-number">6.5810e-03</span>, <span class="hljs-number">-6.4674e-02</span>,
        <span class="hljs-number">6.7966e-02</span>, <span class="hljs-number">1.3005e-01</span>, <span class="hljs-number">1.1942e-01</span>, <span class="hljs-number">-1.2174e-02</span>, <span class="hljs-number">-4.0426e-02</span>,
        ...
        <span class="hljs-number">2.0129e-02</span>, <span class="hljs-number">-2.3657e-02</span>, <span class="hljs-number">2.2626e-02</span>, <span class="hljs-number">2.1858e-02</span>, <span class="hljs-number">-1.9181e-02</span>,
        <span class="hljs-number">6.0706e-02</span>, <span class="hljs-number">-2.0558e-02</span>, <span class="hljs-number">-4.2050e-02</span>], device=<span class="hljs-string">&#x27;mps:0&#x27;</span>)], 
 <span class="hljs-string">&#x27;sparse&#x27;</span>: &lt;Compressed Sparse Row sparse array of dtype <span class="hljs-string">&#x27;float64&#x27;</span>
 <span class="hljs-keyword">with</span> <span class="hljs-number">41</span> <span class="hljs-function">stored elements <span class="hljs-keyword">and</span> <span class="hljs-title">shape</span> (<span class="hljs-params"><span class="hljs-number">3</span>, <span class="hljs-number">250002</span></span>)&gt;}</span>

{<span class="hljs-string">&#x27;dense&#x27;</span>: <span class="hljs-number">768</span>, <span class="hljs-string">&#x27;sparse&#x27;</span>: <span class="hljs-number">250002</span>}
<button class="copy-code-btn"></button></code></pre>
<p>To create embeddings for queries, use the <code translate="no">encode_queries()</code> method:</p>
<pre><code translate="no" class="language-python">queries = [<span class="hljs-string">&quot;When was artificial intelligence founded&quot;</span>,
           <span class="hljs-string">&quot;Where was Alan Turing born?&quot;</span>]

query_embeddings = ef.encode_queries(queries)

<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Embeddings:&quot;</span>, query_embeddings)
<span class="hljs-built_in">print</span>(ef.dim)
<button class="copy-code-btn"></button></code></pre>
<p>The expected output is similar to the following:</p>
<pre><code translate="no" class="language-python">Embeddings: {<span class="hljs-string">&#x27;dense&#x27;</span>: [tensor([ <span class="hljs-number">6.5883e-03</span>, <span class="hljs-number">-7.9415e-03</span>, <span class="hljs-number">-3.3669e-02</span>, <span class="hljs-number">-2.6450e-02</span>, <span class="hljs-number">1.4345e-02</span>,
        <span class="hljs-number">1.9612e-02</span>, <span class="hljs-number">-8.1679e-02</span>, <span class="hljs-number">5.6361e-02</span>, <span class="hljs-number">6.9020e-02</span>, <span class="hljs-number">1.9827e-02</span>,
       <span class="hljs-number">-9.2933e-03</span>, <span class="hljs-number">-1.9995e-02</span>, <span class="hljs-number">-1.0055e-01</span>, <span class="hljs-number">-5.4053e-02</span>, <span class="hljs-number">-8.5991e-02</span>,
        <span class="hljs-number">8.3004e-02</span>, <span class="hljs-number">1.0870e-01</span>, <span class="hljs-number">1.1565e-01</span>, <span class="hljs-number">2.1268e-02</span>, <span class="hljs-number">-1.3782e-02</span>,
        ...
        <span class="hljs-number">3.2847e-02</span>, <span class="hljs-number">-2.3751e-02</span>, <span class="hljs-number">3.4475e-02</span>, <span class="hljs-number">5.3623e-02</span>, <span class="hljs-number">-3.3894e-02</span>,
        <span class="hljs-number">7.9408e-02</span>, <span class="hljs-number">8.2720e-03</span>, <span class="hljs-number">-2.3459e-02</span>], device=<span class="hljs-string">&#x27;mps:0&#x27;</span>)], 
 <span class="hljs-string">&#x27;sparse&#x27;</span>: &lt;Compressed Sparse Row sparse array of dtype <span class="hljs-string">&#x27;float64&#x27;</span>
 <span class="hljs-keyword">with</span> <span class="hljs-number">13</span> <span class="hljs-function">stored elements <span class="hljs-keyword">and</span> <span class="hljs-title">shape</span> (<span class="hljs-params"><span class="hljs-number">2</span>, <span class="hljs-number">250002</span></span>)&gt;}</span>

{<span class="hljs-string">&#x27;dense&#x27;</span>: <span class="hljs-number">768</span>, <span class="hljs-string">&#x27;sparse&#x27;</span>: <span class="hljs-number">250002</span>}
<button class="copy-code-btn"></button></code></pre>
