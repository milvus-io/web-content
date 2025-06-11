---
id: embed-with-jina.md
order: 8
summary: 本文介绍如何使用 JinaEmbeddingFunction 使用 Jina AI 嵌入模型对文档和查询进行编码。
title: Jina AI - 嵌入
---
<h1 id="Jina-AI" class="common-anchor-header">吉纳人工智能<button data-href="#Jina-AI" class="anchor-icon" translate="no">
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
    </button></h1><p>Jina AI 的嵌入模型是高性能的文本嵌入模型，可以将文本输入转化为数字表示，捕捉文本的语义。这些模型在密集检索、语义文本相似性和多语言理解等应用中表现出色。</p>
<p>Milvus 通过<code translate="no">JinaEmbeddingFunction</code> 类与 Jina AI 的 Embeddings 模型集成。该类提供了使用 Jina AI 嵌入模型对文档和查询进行编码的方法，并将嵌入作为与 Milvus 索引兼容的密集向量返回。要使用此功能，请从<a href="https://jina.ai/embeddings/">Jina AI</a> 获取 API 密钥。</p>
<p>要使用此功能，请安装必要的依赖项：</p>
<pre><code translate="no" class="language-bash">pip install --upgrade pymilvus
pip install <span class="hljs-string">&quot;pymilvus[model]&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>然后，实例化<code translate="no">JinaEmbeddingFunction</code> ：</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus.model.dense <span class="hljs-keyword">import</span> JinaEmbeddingFunction

jina_ef = JinaEmbeddingFunction(
    model_name=<span class="hljs-string">&quot;jina-embeddings-v3&quot;</span>, <span class="hljs-comment"># Defaults to `jina-embeddings-v3`</span>
    api_key=JINAAI_API_KEY, <span class="hljs-comment"># Provide your Jina AI API key</span>
    task=<span class="hljs-string">&quot;retrieval.passage&quot;</span>, <span class="hljs-comment"># Specify the task</span>
    dimensions=<span class="hljs-number">1024</span>, <span class="hljs-comment"># Defaults to 1024</span>
)
<button class="copy-code-btn"></button></code></pre>
<p><strong>参数</strong>：</p>
<ul>
<li><p><code translate="no">model_name</code> <em>(字符串）</em></p>
<p>用于编码的 Jina AI 嵌入模型名称。您可以指定任何可用的 Jina AI 嵌入模型名称，例如<code translate="no">jina-embeddings-v3</code>,<code translate="no">jina-embeddings-v2-base-en</code> 等。如果不指定此参数，则将使用<code translate="no">jina-embeddings-v3</code> 。有关可用模型的列表，请参阅<a href="https://jina.ai/embeddings">Jina Embeddings</a>。</p></li>
<li><p><code translate="no">api_key</code> <em>（字符串）</em></p>
<p>访问 Jina AI API 的 API 密钥。</p></li>
<li><p><code translate="no">task</code> <em>（字符串）</em></p>
<p>传递给模型的输入类型。为嵌入模型 v3 及更高版本所必需。</p>
<ul>
<li><code translate="no">&quot;retrieval.passage&quot;</code>:用于在索引时对检索任务中的大型文档进行编码。</li>
<li><code translate="no">&quot;retrieval.query&quot;</code>:用于在检索任务中对用户查询或问题进行编码。</li>
<li><code translate="no">&quot;classification&quot;</code>:用于对文本分类任务中的文本进行编码。</li>
<li><code translate="no">&quot;text-matching&quot;</code>:用于对相似性匹配的文本进行编码，如测量两个句子之间的相似性。</li>
<li><code translate="no">&quot;clustering&quot;</code>:用于聚类或 Rerankers 任务。</li>
</ul></li>
<li><p><code translate="no">dimensions</code> <em>维数</em></p>
<p>输出嵌入结果的维数。默认为 1024。仅支持嵌入模型 v3 及更高版本。</p></li>
<li><p><code translate="no">late_chunking</code> <em>(二进制）</em></p>
<p>此参数控制是否使用<a href="https://arxiv.org/abs/2409.04701">Jina AI 上个月推出的</a>新分块方法对一批句子进行编码。默认设置为<code translate="no">False</code> 。当设置为<code translate="no">True</code> 时，Jina AI API 会将输入字段中的所有句子串联起来，并作为单个字符串送入模型。在内部，模型会嵌入这个长串联字符串，然后执行后期分块，返回一个与输入列表大小相匹配的嵌入列表。</p></li>
</ul>
<p>要创建文档嵌入，请使用<code translate="no">encode_documents()</code> 方法。该方法专为非对称检索任务中的文档嵌入而设计，例如为搜索或推荐任务编制文档索引。该方法使用<code translate="no">retrieval.passage</code> 作为任务。</p>
<pre><code translate="no" class="language-python:">
```python
docs = [
    &quot;Artificial intelligence was founded as an academic discipline in 1956.&quot;,
    &quot;Alan Turing was the first person to conduct substantial research in AI.&quot;,
    &quot;Born in Maida Vale, London, Turing was raised in southern England.&quot;,
]

docs_embeddings = jina_ef.encode_documents(docs)

# Print embeddings
print(&quot;Embeddings:&quot;, docs_embeddings)
# Print dimension and shape of embeddings
print(&quot;Dim:&quot;, jina_ef.dim, docs_embeddings[0].shape)
</code></pre>
<p>预期输出结果类似于下图：</p>
<pre><code translate="no" class="language-python">Embeddings: [array([<span class="hljs-number">9.80641991e-02</span>, -<span class="hljs-number">8.51697400e-02</span>,  <span class="hljs-number">7.36531913e-02</span>,  <span class="hljs-number">1.42558888e-02</span>,
       -<span class="hljs-number">2.23589484e-02</span>,  <span class="hljs-number">1.68494112e-03</span>, -<span class="hljs-number">3.50753777e-02</span>, -<span class="hljs-number">3.11530549e-02</span>,
       -<span class="hljs-number">3.26012149e-02</span>,  <span class="hljs-number">5.04568312e-03</span>,  <span class="hljs-number">3.69836427e-02</span>,  <span class="hljs-number">3.48948985e-02</span>,
        <span class="hljs-number">8.19722563e-03</span>,  <span class="hljs-number">5.88679723e-02</span>, -<span class="hljs-number">6.71099266e-03</span>, -<span class="hljs-number">1.82369724e-02</span>,
...
        <span class="hljs-number">2.48654783e-02</span>,  <span class="hljs-number">3.43279652e-02</span>, -<span class="hljs-number">1.66154150e-02</span>, -<span class="hljs-number">9.90478322e-03</span>,
       -<span class="hljs-number">2.96043139e-03</span>, -<span class="hljs-number">8.57473817e-03</span>, -<span class="hljs-number">7.39028037e-04</span>,  <span class="hljs-number">6.25024503e-03</span>,
       -<span class="hljs-number">1.08831357e-02</span>, -<span class="hljs-number">4.00776342e-02</span>,  <span class="hljs-number">3.25369164e-02</span>, -<span class="hljs-number">1.42691191e-03</span>])]
Dim: <span class="hljs-number">1024</span> (<span class="hljs-number">1024</span>,)
<button class="copy-code-btn"></button></code></pre>
<p>要创建查询嵌入，请使用<code translate="no">encode_queries()</code> 方法。这种方法是为非对称检索任务（如搜索查询或问题）中的查询嵌入而设计的。该方法使用<code translate="no">retrieval.query</code> 作为任务。</p>
<pre><code translate="no" class="language-python">queries = [<span class="hljs-string">&quot;When was artificial intelligence founded&quot;</span>, 
           <span class="hljs-string">&quot;Where was Alan Turing born?&quot;</span>]

query_embeddings = jina_ef.encode_queries(queries)

<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Embeddings:&quot;</span>, query_embeddings)
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Dim&quot;</span>, jina_ef.dim, query_embeddings[<span class="hljs-number">0</span>].shape)
<button class="copy-code-btn"></button></code></pre>
<p>预期输出类似于下面的内容：</p>
<pre><code translate="no" class="language-python">Embeddings: [array([<span class="hljs-number">8.79201014e-03</span>,  <span class="hljs-number">1.47551354e-02</span>,  <span class="hljs-number">4.02722731e-02</span>, -<span class="hljs-number">2.52991207e-02</span>,
        <span class="hljs-number">1.12719582e-02</span>,  <span class="hljs-number">3.75947170e-02</span>,  <span class="hljs-number">3.97946090e-02</span>, -<span class="hljs-number">7.36681819e-02</span>,
       -<span class="hljs-number">2.17952449e-02</span>, -<span class="hljs-number">1.16298944e-02</span>, -<span class="hljs-number">6.83426252e-03</span>, -<span class="hljs-number">5.12507409e-02</span>,
        <span class="hljs-number">5.26071340e-02</span>,  <span class="hljs-number">6.75181448e-02</span>,  <span class="hljs-number">3.92445624e-02</span>, -<span class="hljs-number">1.40817231e-02</span>,
...
        <span class="hljs-number">8.81703943e-03</span>,  <span class="hljs-number">4.24629413e-02</span>, -<span class="hljs-number">2.32944116e-02</span>, -<span class="hljs-number">2.05193572e-02</span>,
       -<span class="hljs-number">3.22035812e-02</span>,  <span class="hljs-number">2.81896023e-03</span>,  <span class="hljs-number">3.85326855e-02</span>,  <span class="hljs-number">3.64372656e-02</span>,
       -<span class="hljs-number">1.65050142e-02</span>, -<span class="hljs-number">4.26847413e-02</span>,  <span class="hljs-number">2.02664156e-02</span>, -<span class="hljs-number">1.72684863e-02</span>])]
Dim <span class="hljs-number">1024</span> (<span class="hljs-number">1024</span>,)
<button class="copy-code-btn"></button></code></pre>
<p>要为相似性匹配（如 STS 或对称检索任务）、文本分类、聚类或重排任务创建输入嵌入，请在实例化<code translate="no">JinaEmbeddingFunction</code> 类时使用适当的<code translate="no">task</code> 参数值。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus.model.dense <span class="hljs-keyword">import</span> JinaEmbeddingFunction

jina_ef = JinaEmbeddingFunction(
    model_name=<span class="hljs-string">&quot;jina-embeddings-v3&quot;</span>, <span class="hljs-comment"># Defaults to `jina-embeddings-v3`</span>
    api_key=JINA_API_KEY, <span class="hljs-comment"># Provide your Jina AI API key</span>
    task=<span class="hljs-string">&quot;text-matching&quot;</span>,
    dimensions=<span class="hljs-number">1024</span>, <span class="hljs-comment"># Defaults to 1024</span>
)

texts = [
    <span class="hljs-string">&quot;Follow the white rabbit.&quot;</span>,  <span class="hljs-comment"># English</span>
    <span class="hljs-string">&quot;Sigue al conejo blanco.&quot;</span>,  <span class="hljs-comment"># Spanish</span>
    <span class="hljs-string">&quot;Suis le lapin blanc.&quot;</span>,  <span class="hljs-comment"># French</span>
    <span class="hljs-string">&quot;跟着白兔走。&quot;</span>,  <span class="hljs-comment"># Chinese</span>
    <span class="hljs-string">&quot;اتبع الأرنب الأبيض.&quot;</span>,  <span class="hljs-comment"># Arabic</span>
    <span class="hljs-string">&quot;Folge dem weißen Kaninchen.&quot;</span>,  <span class="hljs-comment"># German</span>
]

embeddings = jina_ef(texts)

<span class="hljs-comment"># Compute similarities</span>
<span class="hljs-built_in">print</span>(embeddings[<span class="hljs-number">0</span>] @ embeddings[<span class="hljs-number">1</span>].T)
<button class="copy-code-btn"></button></code></pre>
