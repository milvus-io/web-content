---
id: embed-with-sentence-transform.md
order: 3
summary: 本文演示了如何使用 Milvus 中的 Sentence Transformers 将文档和查询编码为密集向量。
title: 句子转换器
---
<h1 id="Sentence-Transformers" class="common-anchor-header">句子转换器<button data-href="#Sentence-Transformers" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus 通过<strong>SentenceTransformerEmbeddingFunction</strong>类与<strong>Sentence Transformer</strong>预训练模型集成。该类提供了使用预训练的 Sentence Transformer 模型对文档和查询进行编码的方法，并将嵌入作为与 Milvus 索引兼容的密集向量返回。</p>
<p>要使用该功能，请安装必要的依赖项：</p>
<pre><code translate="no" class="language-bash">pip install --upgrade pymilvus
pip install <span class="hljs-string">&quot;pymilvus[model]&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>然后，实例化<strong>SentenceTransformerEmbeddingFunction</strong>：</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> model

sentence_transformer_ef = model.dense.SentenceTransformerEmbeddingFunction(
    model_name=<span class="hljs-string">&#x27;all-MiniLM-L6-v2&#x27;</span>, <span class="hljs-comment"># Specify the model name</span>
    device=<span class="hljs-string">&#x27;cpu&#x27;</span> <span class="hljs-comment"># Specify the device to use, e.g., &#x27;cpu&#x27; or &#x27;cuda:0&#x27;</span>
)
<button class="copy-code-btn"></button></code></pre>
<p><strong>参数</strong>：</p>
<ul>
<li><p><strong>model_name</strong><em>（字符串）</em></p>
<p>用于编码的 Sentence Transformer 模型名称。默认值为<strong>all-MiniLM-L6-v2</strong>。您可以使用任何一个 Sentence Transformers 的预训练模型。有关可用模型的列表，请参阅<a href="https://www.sbert.net/docs/pretrained_models.html">预训练模型</a>。</p></li>
<li><p><strong>设备</strong><em>（字符串）</em></p>
<p>要使用的设备，<strong>cpu</strong>表示 CPU，<strong>cuda:n</strong>表示第 n 个 GPU 设备。</p></li>
</ul>
<p>要为文档创建<strong>Embeddings</strong>，请使用<strong>encode_documents()</strong>方法：</p>
<pre><code translate="no" class="language-python">docs = [
    <span class="hljs-string">&quot;Artificial intelligence was founded as an academic discipline in 1956.&quot;</span>,
    <span class="hljs-string">&quot;Alan Turing was the first person to conduct substantial research in AI.&quot;</span>,
    <span class="hljs-string">&quot;Born in Maida Vale, London, Turing was raised in southern England.&quot;</span>,
]

docs_embeddings = sentence_transformer_ef.encode_documents(docs)

<span class="hljs-comment"># Print embeddings</span>
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Embeddings:&quot;</span>, docs_embeddings)
<span class="hljs-comment"># Print dimension and shape of embeddings</span>
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Dim:&quot;</span>, sentence_transformer_ef.dim, docs_embeddings[<span class="hljs-number">0</span>].shape)
<button class="copy-code-btn"></button></code></pre>
<p>预期输出类似于下图：</p>
<pre><code translate="no" class="language-python">Embeddings: [array([-<span class="hljs-number">3.09392996e-02</span>, -<span class="hljs-number">1.80662833e-02</span>,  <span class="hljs-number">1.34775648e-02</span>,  <span class="hljs-number">2.77156215e-02</span>,
       -<span class="hljs-number">4.86349640e-03</span>, -<span class="hljs-number">3.12581174e-02</span>, -<span class="hljs-number">3.55921760e-02</span>,  <span class="hljs-number">5.76934684e-03</span>,
        <span class="hljs-number">2.80773244e-03</span>,  <span class="hljs-number">1.35783911e-01</span>,  <span class="hljs-number">3.59678417e-02</span>,  <span class="hljs-number">6.17732145e-02</span>,
...
       -<span class="hljs-number">4.61330153e-02</span>, -<span class="hljs-number">4.85207550e-02</span>,  <span class="hljs-number">3.13997865e-02</span>,  <span class="hljs-number">7.82178566e-02</span>,
       -<span class="hljs-number">4.75336798e-02</span>,  <span class="hljs-number">5.21207601e-02</span>,  <span class="hljs-number">9.04406682e-02</span>, -<span class="hljs-number">5.36676683e-02</span>],
      dtype=float32)]
Dim: <span class="hljs-number">384</span> (<span class="hljs-number">384</span>,)
<button class="copy-code-btn"></button></code></pre>
<p>要为查询创建 Embeddings，请使用<strong>encode_queries()</strong>方法：</p>
<pre><code translate="no" class="language-python">queries = [<span class="hljs-string">&quot;When was artificial intelligence founded&quot;</span>, 
           <span class="hljs-string">&quot;Where was Alan Turing born?&quot;</span>]

query_embeddings = sentence_transformer_ef.encode_queries(queries)

<span class="hljs-comment"># Print embeddings</span>
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Embeddings:&quot;</span>, query_embeddings)
<span class="hljs-comment"># Print dimension and shape of embeddings</span>
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Dim:&quot;</span>, sentence_transformer_ef.dim, query_embeddings[<span class="hljs-number">0</span>].shape)
<button class="copy-code-btn"></button></code></pre>
<p>预期输出类似于下图：</p>
<pre><code translate="no" class="language-python">Embeddings: [array([-<span class="hljs-number">2.52114702e-02</span>, -<span class="hljs-number">5.29330298e-02</span>,  <span class="hljs-number">1.14570223e-02</span>,  <span class="hljs-number">1.95571519e-02</span>,
       -<span class="hljs-number">2.46500354e-02</span>, -<span class="hljs-number">2.66519729e-02</span>, -<span class="hljs-number">8.48201662e-03</span>,  <span class="hljs-number">2.82961670e-02</span>,
       -<span class="hljs-number">3.65092754e-02</span>,  <span class="hljs-number">7.50745758e-02</span>,  <span class="hljs-number">4.28900979e-02</span>,  <span class="hljs-number">7.18822703e-02</span>,
...
       -<span class="hljs-number">6.76431581e-02</span>, -<span class="hljs-number">6.45996556e-02</span>, -<span class="hljs-number">4.67132553e-02</span>,  <span class="hljs-number">4.78532910e-02</span>,
       -<span class="hljs-number">2.31596199e-03</span>,  <span class="hljs-number">4.13446948e-02</span>,  <span class="hljs-number">1.06935494e-01</span>, -<span class="hljs-number">1.08258888e-01</span>],
      dtype=float32)]
Dim: <span class="hljs-number">384</span> (<span class="hljs-number">384</span>,)
<button class="copy-code-btn"></button></code></pre>
