---
id: embed-with-splade.md
order: 6
summary: 本文介绍如何使用 SpladeEmbeddingFunction 使用 SPLADE 模型对文档和查询进行编码。
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
    </button></h1><p><a href="https://arxiv.org/abs/2109.10086">SPLADE</a>Embeddings 是一种为文档和查询提供高度稀疏表示的模型，它继承了词袋（BOW）模型的理想特性，如精确的术语匹配和效率。</p>
<p>Milvus 通过<strong>SpladeEmbeddingFunction</strong>类与 SPLADE 模型集成。该类提供了对文档和查询进行编码并将嵌入作为与 Milvus 索引兼容的稀疏向量返回的方法。</p>
<p>要使用该功能，请安装必要的依赖项：</p>
<pre><code translate="no" class="language-bash">pip install --upgrade pymilvus
pip install <span class="hljs-string">&quot;pymilvus[model]&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>要实例化<strong>SpladeEmbeddingFunction</strong>，请使用以下命令：</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> model

splade_ef = model.sparse.SpladeEmbeddingFunction(
    model_name=<span class="hljs-string">&quot;naver/splade-cocondenser-selfdistil&quot;</span>, 
    device=<span class="hljs-string">&quot;cpu&quot;</span>
)
<button class="copy-code-btn"></button></code></pre>
<p><strong>参数</strong>：</p>
<ul>
<li><p><strong>model_name</strong><em>（字符串）</em></p>
<p>用于编码的 SPLADE 模型名称。有效选项包括：<strong>naver/splade-cocondenser-ensembledistil</strong>（默认）、<strong>naver/splade_v2_max</strong>、<strong>naver/splade_v2_distil</strong> 和<strong>naver/splade-cocondenser-selfdistil</strong>。更多信息，请参阅<a href="https://github.com/naver/splade?tab=readme-ov-file#playing-with-the-model">玩转模型</a>。</p></li>
<li><p><strong>设备</strong><em>（字符串）</em></p>
<p>要使用的设备，<strong>cpu</strong>表示 CPU，<strong>cuda:n</strong>表示第 n 个 GPU 设备。</p></li>
</ul>
<p>要为文档创建<strong>Embeddings</strong>，请使用<strong>encode_documents()</strong>方法：</p>
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
<p>预期输出类似于下图：</p>
<pre><code translate="no" class="language-python">Embeddings:   (<span class="hljs-number">0</span>, <span class="hljs-number">2001</span>) <span class="hljs-number">0.6392706036567688</span>
  (<span class="hljs-number">0</span>, <span class="hljs-number">2034</span>) <span class="hljs-number">0.024093208834528923</span>
  (<span class="hljs-number">0</span>, <span class="hljs-number">2082</span>) <span class="hljs-number">0.3230178654193878</span>
...
  (<span class="hljs-number">2</span>, <span class="hljs-number">23602</span>)    <span class="hljs-number">0.5671860575675964</span>
  (<span class="hljs-number">2</span>, <span class="hljs-number">26757</span>)    <span class="hljs-number">0.5770265460014343</span>
  (<span class="hljs-number">2</span>, <span class="hljs-number">28639</span>)    <span class="hljs-number">3.1990697383880615</span>
Sparse dim: <span class="hljs-number">30522</span> (<span class="hljs-number">1</span>, <span class="hljs-number">30522</span>)
<button class="copy-code-btn"></button></code></pre>
<p>要为查询创建 Embeddings，请使用<strong>encode_queries()</strong>方法：</p>
<pre><code translate="no" class="language-python">queries = [<span class="hljs-string">&quot;When was artificial intelligence founded&quot;</span>, 
           <span class="hljs-string">&quot;Where was Alan Turing born?&quot;</span>]

query_embeddings = splade_ef.encode_queries(queries)

<span class="hljs-comment"># Print embeddings</span>
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Embeddings:&quot;</span>, query_embeddings)
<span class="hljs-comment"># since the output embeddings are in a 2D csr_array format, we convert them to a list for easier manipulation.</span>
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Sparse dim:&quot;</span>, splade_ef.dim, <span class="hljs-built_in">list</span>(query_embeddings)[<span class="hljs-number">0</span>].shape)
<button class="copy-code-btn"></button></code></pre>
<p>预期输出类似于下图：</p>
<pre><code translate="no" class="language-python">Embeddings:   (<span class="hljs-number">0</span>, <span class="hljs-number">2001</span>)        <span class="hljs-number">0.6353746056556702</span>
  (<span class="hljs-number">0</span>, <span class="hljs-number">2194</span>)        <span class="hljs-number">0.015553371049463749</span>
  (<span class="hljs-number">0</span>, <span class="hljs-number">2301</span>)        <span class="hljs-number">0.2756537199020386</span>
...
  (<span class="hljs-number">1</span>, <span class="hljs-number">18522</span>)        <span class="hljs-number">0.1282549500465393</span>
  (<span class="hljs-number">1</span>, <span class="hljs-number">23602</span>)        <span class="hljs-number">0.13133203983306885</span>
  (<span class="hljs-number">1</span>, <span class="hljs-number">28639</span>)        <span class="hljs-number">2.8150033950805664</span>
Sparse dim: <span class="hljs-number">30522</span> (<span class="hljs-number">1</span>, <span class="hljs-number">30522</span>)
<button class="copy-code-btn"></button></code></pre>
