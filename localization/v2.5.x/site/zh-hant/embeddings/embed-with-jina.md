---
id: embed-with-jina.md
order: 8
summary: 本文說明如何使用 JinaEmbeddingFunction 來使用 Jina AI 嵌入模型對文件和查詢進行編碼。
title: Jina AI - 嵌入
---
<h1 id="Jina-AI" class="common-anchor-header">Jina AI<button data-href="#Jina-AI" class="anchor-icon" translate="no">
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
    </button></h1><p>Jina AI 的嵌入模型是高性能的文字嵌入模型，可以將文字輸入轉換為數字表示，捕捉文字的語義。這些模型在密集檢索、語義文字相似性和多語言理解等應用中表現優異。</p>
<p>Milvus 透過<code translate="no">JinaEmbeddingFunction</code> 類與 Jina AI 的嵌入模型整合。這個類別提供了使用 Jina AI 嵌入模型編碼文件和查詢的方法，並將嵌入作為與 Milvus 索引相容的密集向量傳回。若要使用此功能，請向<a href="https://jina.ai/embeddings/">Jina AI</a> 取得 API 金鑰。</p>
<p>若要使用此功能，請安裝必要的相依性：</p>
<pre><code translate="no" class="language-bash">pip install --upgrade pymilvus
pip install <span class="hljs-string">&quot;pymilvus[model]&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>然後，實體化<code translate="no">JinaEmbeddingFunction</code> ：</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus.model.dense <span class="hljs-keyword">import</span> JinaEmbeddingFunction

jina_ef = JinaEmbeddingFunction(
    model_name=<span class="hljs-string">&quot;jina-embeddings-v3&quot;</span>, <span class="hljs-comment"># Defaults to `jina-embeddings-v3`</span>
    api_key=JINAAI_API_KEY, <span class="hljs-comment"># Provide your Jina AI API key</span>
    task=<span class="hljs-string">&quot;retrieval.passage&quot;</span>, <span class="hljs-comment"># Specify the task</span>
    dimensions=<span class="hljs-number">1024</span>, <span class="hljs-comment"># Defaults to 1024</span>
)
<button class="copy-code-btn"></button></code></pre>
<p><strong>參數</strong>：</p>
<ul>
<li><p><code translate="no">model_name</code> <em>(字串</em>)</p>
<p>用於編碼的 Jina AI 嵌入模型名稱。您可以指定任何可用的 Jina AI 嵌入模型名稱，例如<code translate="no">jina-embeddings-v3</code>,<code translate="no">jina-embeddings-v2-base-en</code> 等。如果不指定此参数，将使用<code translate="no">jina-embeddings-v3</code> 。如需可用模型的清單，請參閱<a href="https://jina.ai/embeddings">Jina Embeddings</a>。</p></li>
<li><p><code translate="no">api_key</code> <em>(字串</em>)</p>
<p>存取 Jina AI API 的 API 金鑰。</p></li>
<li><p><code translate="no">task</code> <em>(字串</em>)</p>
<p>傳送到模型的輸入類型。嵌入模型 v3 及更高版本必須使用。</p>
<ul>
<li><code translate="no">&quot;retrieval.passage&quot;</code>:用於在索引時對檢索任務中的大型文件進行編碼。</li>
<li><code translate="no">&quot;retrieval.query&quot;</code>:用於在檢索任務中編碼使用者查詢或問題。</li>
<li><code translate="no">&quot;classification&quot;</code>:用於對文字分類任務中的文字進行編碼。</li>
<li><code translate="no">&quot;text-matching&quot;</code>:用於編碼相似性匹配的文字，例如測量兩個句子之間的相似性。</li>
<li><code translate="no">&quot;clustering&quot;</code>:用於聚類或重排任務。</li>
</ul></li>
<li><p><code translate="no">dimensions</code> <em>(int</em>)</p>
<p>輸出嵌入結果的維數。預設為 1024。僅支援嵌入模型 v3 及更高版本。</p></li>
<li><p><code translate="no">late_chunking</code> <em>(bool</em>)</p>
<p>此參數控制是否使用<a href="https://arxiv.org/abs/2409.04701">Jina AI 上月推出的</a>新分塊方法來編碼一批句子。預設為<code translate="no">False</code> 。當設定為<code translate="no">True</code> 時，Jina AI API 會將輸入欄位中的所有句子串連起來，並以單一字串的方式送入模型。在內部，模型會嵌入這個長串連的字串，然後執行後期的分塊，並傳回一個與輸入清單大小相符的嵌入清單。</p></li>
</ul>
<p>若要為文件建立嵌入式資料，請使用<code translate="no">encode_documents()</code> 方法。此方法專為非對稱檢索任務中的文件嵌入而設計，例如為搜尋或推薦任務建立文件索引。此方法使用<code translate="no">retrieval.passage</code> 作為任務。</p>
<pre><code translate="no" class="language-python:">
```python
docs = [
    <span class="hljs-string">&quot;Artificial intelligence was founded as an academic discipline in 1956.&quot;</span>,
    <span class="hljs-string">&quot;Alan Turing was the first person to conduct substantial research in AI.&quot;</span>,
    <span class="hljs-string">&quot;Born in Maida Vale, London, Turing was raised in southern England.&quot;</span>,
]

docs_embeddings = jina_ef.encode_documents(docs)

<span class="hljs-comment"># Print embeddings</span>
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Embeddings:&quot;</span>, docs_embeddings)
<span class="hljs-comment"># Print dimension and shape of embeddings</span>
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Dim:&quot;</span>, jina_ef.dim, docs_embeddings[<span class="hljs-number">0</span>].shape)
<button class="copy-code-btn"></button></code></pre>
<p>預期的輸出類似如下：</p>
<pre><code translate="no" class="language-python">Embeddings: [array([9.80641991e-02, -8.51697400e-02,  7.36531913e-02,  1.42558888e-02,
       -2.23589484e-02,  1.68494112e-03, -3.50753777e-02, -3.11530549e-02,
       -3.26012149e-02,  5.04568312e-03,  3.69836427e-02,  3.48948985e-02,
        8.19722563e-03,  5.88679723e-02, -6.71099266e-03, -1.82369724e-02,
...
        2.48654783e-02,  3.43279652e-02, -1.66154150e-02, -9.90478322e-03,
       -2.96043139e-03, -8.57473817e-03, -7.39028037e-04,  6.25024503e-03,
       -1.08831357e-02, -4.00776342e-02,  3.25369164e-02, -1.42691191e-03])]
Dim: 1024 (1024,)
<button class="copy-code-btn"></button></code></pre>
<p>若要建立查詢嵌入，請使用<code translate="no">encode_queries()</code> 方法。此方法專為非對稱檢索任務（如搜尋查詢或問題）中的查詢嵌入而設計。此方法使用<code translate="no">retrieval.query</code> 作為任務。</p>
<pre><code translate="no" class="language-python">queries = [<span class="hljs-string">&quot;When was artificial intelligence founded&quot;</span>, 
           <span class="hljs-string">&quot;Where was Alan Turing born?&quot;</span>]

query_embeddings = jina_ef.encode_queries(queries)

<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Embeddings:&quot;</span>, query_embeddings)
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Dim&quot;</span>, jina_ef.dim, query_embeddings[<span class="hljs-number">0</span>].shape)
<button class="copy-code-btn"></button></code></pre>
<p>預期的輸出類似如下：</p>
<pre><code translate="no" class="language-python">Embeddings: [array([8.79201014e-03,  1.47551354e-02,  4.02722731e-02, -2.52991207e-02,
        1.12719582e-02,  3.75947170e-02,  3.97946090e-02, -7.36681819e-02,
       -2.17952449e-02, -1.16298944e-02, -6.83426252e-03, -5.12507409e-02,
        5.26071340e-02,  6.75181448e-02,  3.92445624e-02, -1.40817231e-02,
...
        8.81703943e-03,  4.24629413e-02, -2.32944116e-02, -2.05193572e-02,
       -3.22035812e-02,  2.81896023e-03,  3.85326855e-02,  3.64372656e-02,
       -1.65050142e-02, -4.26847413e-02,  2.02664156e-02, -1.72684863e-02])]
Dim 1024 (1024,)
<button class="copy-code-btn"></button></code></pre>
<p>若要為相似性比對（例如 STS 或對稱檢索任務）、文字分類、聚類或重排任務建立輸入的內嵌，請在實體化<code translate="no">JinaEmbeddingFunction</code> 類別時使用適當的<code translate="no">task</code> 參數值。</p>
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
