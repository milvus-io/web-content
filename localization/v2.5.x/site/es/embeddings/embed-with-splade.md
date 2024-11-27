---
id: embed-with-splade.md
order: 6
summary: >-
  This article describes how to use the SpladeEmbeddingFunction to encode
  documents and queries using the SPLADE model.
title: SPLADE
---
<h1 id="SPLADE" class="common-anchor-header">SPLADE<button data-href="#SPLADE" class="anchor-icon" translate="no">
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
    </button></h1><p><a href="https://arxiv.org/abs/2109.10086">SPLADE</a> embedding is a model that offers highly sparse representations for documents and queries, inheriting desirable properties from bag-of-words (BOW) models such as exact term matching and efficiency.</p>
<p>Milvus integrates with the SPLADE model via the <strong>SpladeEmbeddingFunction</strong> class. This class provides methods for encoding documents and queries and returning the embeddings as sparse vectors compatible with Milvus indexing.</p>
<p>To use this feature, install the necessary dependencies:</p>
<pre><code translate="no" class="language-bash">pip install --upgrade pymilvus
pip install <span class="hljs-string">&quot;pymilvus[model]&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>To instantiate the <strong>SpladeEmbeddingFunction</strong>, use the command:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> model

splade_ef = model.<span class="hljs-property">sparse</span>.<span class="hljs-title class_">SpladeEmbeddingFunction</span>(
    model_name=<span class="hljs-string">&quot;naver/splade-cocondenser-selfdistil&quot;</span>, 
    device=<span class="hljs-string">&quot;cpu&quot;</span>
)
<button class="copy-code-btn"></button></code></pre>
<p><strong>Parameters</strong>:</p>
<ul>
<li><p><strong>model_name</strong> (<em>string</em>)</p>
<p>The name of the SPLADE model to use for encoding. Valid options are <strong>naver/splade-cocondenser-ensembledistil</strong> (default), <strong>naver/splade_v2_max</strong>, <strong>naver/splade_v2_distil</strong>, and <strong>naver/splade-cocondenser-selfdistil</strong>. For more information, refer to <a href="https://github.com/naver/splade?tab=readme-ov-file#playing-with-the-model">Play with models</a>.</p></li>
<li><p><strong>device</strong> (<em>string</em>)</p>
<p>The device to use, with <strong>cpu</strong> for the CPU and <strong>cuda:n</strong> for the nth GPU device.</p></li>
</ul>
<p>To create embeddings for documents, use the <strong>encode_documents()</strong> method:</p>
<pre><code translate="no" class="language-python">docs = [
    <span class="hljs-string">&quot;Artificial intelligence was founded as an academic discipline in 1956.&quot;</span>,
    <span class="hljs-string">&quot;Alan Turing was the first person to conduct substantial research in AI.&quot;</span>,
    <span class="hljs-string">&quot;Born in Maida Vale, London, Turing was raised in southern England.&quot;</span>,
]

docs_embeddings = splade_ef.encode_documents(docs)

<span class="hljs-comment"># Print embeddings</span>
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Embeddings:&quot;</span>, docs_embeddings)
<span class="hljs-comment"># since the output embeddings are in a 2D csr_array format, we convert them to a list for easier manipulation.</span>
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Sparse dim:&quot;</span>, splade_ef.dim, <span class="hljs-built_in">list</span>(docs_embeddings)[<span class="hljs-number">0</span>].shape)
<button class="copy-code-btn"></button></code></pre>
<p>The expected output is similar to the following:</p>
<pre><code translate="no" class="language-python">Embeddings:   (0, 2001) 0.6392706036567688
  (0, 2034) 0.024093208834528923
  (0, 2082) 0.3230178654193878
...
  (2, 23602)    0.5671860575675964
  (2, 26757)    0.5770265460014343
  (2, 28639)    3.1990697383880615
Sparse dim: 30522 (1, 30522)
<button class="copy-code-btn"></button></code></pre>
<p>To create embeddings for queries, use the <strong>encode_queries()</strong> method:</p>
<pre><code translate="no" class="language-python">queries = [<span class="hljs-string">&quot;When was artificial intelligence founded&quot;</span>, 
           <span class="hljs-string">&quot;Where was Alan Turing born?&quot;</span>]

query_embeddings = splade_ef.encode_queries(queries)

<span class="hljs-comment"># Print embeddings</span>
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Embeddings:&quot;</span>, query_embeddings)
<span class="hljs-comment"># since the output embeddings are in a 2D csr_array format, we convert them to a list for easier manipulation.</span>
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Sparse dim:&quot;</span>, splade_ef.dim, <span class="hljs-built_in">list</span>(query_embeddings)[<span class="hljs-number">0</span>].shape)
<button class="copy-code-btn"></button></code></pre>
<p>The expected output is similar to the following:</p>
<pre><code translate="no" class="language-python">Embeddings:   (0, 2001)        0.6353746056556702
  (0, 2194)        0.015553371049463749
  (0, 2301)        0.2756537199020386
...
  (1, 18522)        0.1282549500465393
  (1, 23602)        0.13133203983306885
  (1, 28639)        2.8150033950805664
Sparse dim: 30522 (1, 30522)
<button class="copy-code-btn"></button></code></pre>
