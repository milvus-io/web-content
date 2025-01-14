---
id: embed-with-cohere.md
order: 9
summary: 本文說明如何使用 CohereEmbeddingFunction 來使用 Cohere 嵌入模型來編碼文件和查詢。
title: 嵌入 Cohere
---
<h1 id="Cohere" class="common-anchor-header">Cohere<button data-href="#Cohere" class="anchor-icon" translate="no">
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
    </button></h1><p>Cohere 的內嵌模型用來產生文字內嵌，也就是捕捉文字語意資訊的浮點數字清單。這些嵌入資料可用於文字分類和語意搜尋等任務。</p>
<p>Milvus 使用<code translate="no">CohereEmbeddingFunction</code> 類與 Cohere 的嵌入模型整合。這個類別處理嵌入的計算，並將它們以與 Milvus 相容的格式傳回，以便進行索引和搜尋。</p>
<p>要使用此功能，請安裝必要的相依性：</p>
<pre><code translate="no" class="language-bash">pip install --upgrade pymilvus
pip install <span class="hljs-string">&quot;pymilvus[model]&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>然後，實體化<code translate="no">CohereEmbeddingFunction</code> ：</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus.<span class="hljs-property">model</span>.<span class="hljs-property">dense</span> <span class="hljs-keyword">import</span> <span class="hljs-title class_">CohereEmbeddingFunction</span>

cohere_ef = <span class="hljs-title class_">CohereEmbeddingFunction</span>(
    model_name=<span class="hljs-string">&quot;embed-english-light-v3.0&quot;</span>,
    api_key=<span class="hljs-string">&quot;YOUR_COHERE_API_KEY&quot;</span>,
    input_type=<span class="hljs-string">&quot;search_document&quot;</span>,
    embedding_types=[<span class="hljs-string">&quot;float&quot;</span>]
)
<button class="copy-code-btn"></button></code></pre>
<p><strong>參數</strong>：</p>
<ul>
<li><p><code translate="no">model_name</code> <em>(字串</em>)</p>
<p>用於編碼的 Cohere 嵌入模型名稱。您可以指定任何可用的 Cohere 嵌入模型名稱，例如<code translate="no">embed-english-v3.0</code>,<code translate="no">embed-multilingual-v3.0</code> 等。如果不指定此參數，則會使用<code translate="no">embed-english-light-v3.0</code> 。如需可用模型的清單，請參閱<a href="https://docs.cohere.com/docs/models#embed">Embed</a>。</p></li>
<li><p><code translate="no">api_key</code> <em>(字串</em>)</p>
<p>存取 Cohere API 的 API 金鑰。</p></li>
<li><p><code translate="no">input_type</code> <em>(字串</em>)</p>
<p>傳送到模型的輸入類型。嵌入模型 v3 及更高版本必須使用。</p>
<ul>
<li><code translate="no">&quot;search_document&quot;</code>:用於儲存在向量資料庫中的嵌入，用於搜索用例。</li>
<li><code translate="no">&quot;search_query&quot;</code>:用於對向量資料庫執行搜尋查詢的嵌入，以尋找相關文件。</li>
<li><code translate="no">&quot;classification&quot;</code>:用於通過文字分類器的嵌入。</li>
<li><code translate="no">&quot;clustering&quot;</code>:用於通過聚類演算法運行的嵌入。</li>
</ul></li>
<li><p><code translate="no">embedding_types</code> <em>(List[str]</em>)</p>
<p>您想要獲取的嵌入式資料類型。非必要，預設為 None，會返回 Embed Floats 回應類型。目前，您只能指定此參數的單一值。可能的值：</p>
<ul>
<li><code translate="no">&quot;float&quot;</code>:當您想要回傳預設的浮動嵌入時，請使用此值。對所有模型都有效。</li>
<li><code translate="no">&quot;binary&quot;</code>:當您想要取回有符號的二進位內嵌時，請使用此項。僅對 v3 模型有效。</li>
<li><code translate="no">&quot;ubinary&quot;</code>:當您想要取回無符號的二進位嵌入時，請使用此項。僅對 v3 模型有效。</li>
</ul></li>
</ul>
<p>要為文件建立嵌入式資料，請使用<code translate="no">encode_documents()</code> 方法：</p>
<pre><code translate="no" class="language-python">docs = [
    <span class="hljs-string">&quot;Artificial intelligence was founded as an academic discipline in 1956.&quot;</span>,
    <span class="hljs-string">&quot;Alan Turing was the first person to conduct substantial research in AI.&quot;</span>,
    <span class="hljs-string">&quot;Born in Maida Vale, London, Turing was raised in southern England.&quot;</span>,
]

docs_embeddings = cohere_ef.encode_documents(docs)

<span class="hljs-comment"># Print embeddings</span>
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Embeddings:&quot;</span>, docs_embeddings)
<span class="hljs-comment"># Print dimension and shape of embeddings</span>
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Dim:&quot;</span>, cohere_ef.dim, docs_embeddings[<span class="hljs-number">0</span>].shape)
<button class="copy-code-btn"></button></code></pre>
<p>預期的輸出與以下相似：</p>
<pre><code translate="no" class="language-python">Embeddings: [array([ <span class="hljs-number">3.43322754e-02</span>,  <span class="hljs-number">1.16252899e-03</span>, <span class="hljs-number">-5.25207520e-02</span>,  <span class="hljs-number">1.32846832e-03</span>,
       <span class="hljs-number">-6.80541992e-02</span>,  <span class="hljs-number">6.10961914e-02</span>, <span class="hljs-number">-7.06176758e-02</span>,  <span class="hljs-number">1.48925781e-01</span>,
        <span class="hljs-number">1.54174805e-01</span>,  <span class="hljs-number">1.98516846e-02</span>,  <span class="hljs-number">2.43835449e-02</span>,  <span class="hljs-number">3.55224609e-02</span>,
        <span class="hljs-number">1.82952881e-02</span>,  <span class="hljs-number">7.57446289e-02</span>, <span class="hljs-number">-2.40783691e-02</span>,  <span class="hljs-number">4.40063477e-02</span>,
...
        <span class="hljs-number">0.06359863</span>, <span class="hljs-number">-0.01971436</span>, <span class="hljs-number">-0.02253723</span>,  <span class="hljs-number">0.00354195</span>,  <span class="hljs-number">0.00222015</span>,
        <span class="hljs-number">0.00184727</span>,  <span class="hljs-number">0.03408813</span>, <span class="hljs-number">-0.00777817</span>,  <span class="hljs-number">0.04919434</span>,  <span class="hljs-number">0.01519775</span>,
       <span class="hljs-number">-0.02862549</span>,  <span class="hljs-number">0.04760742</span>, <span class="hljs-number">-0.07891846</span>,  <span class="hljs-number">0.0124054</span> ], dtype=<span class="hljs-type">float32</span>)]
Dim: <span class="hljs-number">384</span> (<span class="hljs-number">384</span>,)
<button class="copy-code-btn"></button></code></pre>
<p>若要為查詢建立嵌入式資料，請使用<code translate="no">encode_queries()</code> 方法：</p>
<pre><code translate="no" class="language-python">queries = [<span class="hljs-string">&quot;When was artificial intelligence founded&quot;</span>, 
           <span class="hljs-string">&quot;Where was Alan Turing born?&quot;</span>]

query_embeddings = cohere_ef.encode_queries(queries)

<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Embeddings:&quot;</span>, query_embeddings)
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Dim&quot;</span>, cohere_ef.dim, query_embeddings[<span class="hljs-number">0</span>].shape)
<button class="copy-code-btn"></button></code></pre>
<p>預期輸出與下列內容相似：</p>
<pre><code translate="no" class="language-python">Embeddings: [array([<span class="hljs-number">-1.33361816e-02</span>,  <span class="hljs-number">9.79423523e-04</span>, <span class="hljs-number">-7.28759766e-02</span>, <span class="hljs-number">-1.93786621e-02</span>,
       <span class="hljs-number">-9.71679688e-02</span>,  <span class="hljs-number">4.34875488e-02</span>, <span class="hljs-number">-9.81445312e-02</span>,  <span class="hljs-number">1.16882324e-01</span>,
        <span class="hljs-number">5.89904785e-02</span>, <span class="hljs-number">-4.19921875e-02</span>,  <span class="hljs-number">4.95910645e-02</span>,  <span class="hljs-number">5.83496094e-02</span>,
        <span class="hljs-number">3.47595215e-02</span>, <span class="hljs-number">-5.87463379e-03</span>, <span class="hljs-number">-7.30514526e-03</span>,  <span class="hljs-number">2.92816162e-02</span>,
...
        <span class="hljs-number">0.00749969</span>, <span class="hljs-number">-0.01192474</span>,  <span class="hljs-number">0.02719116</span>,  <span class="hljs-number">0.03347778</span>,  <span class="hljs-number">0.07696533</span>,
        <span class="hljs-number">0.01409149</span>,  <span class="hljs-number">0.00964355</span>, <span class="hljs-number">-0.01681519</span>, <span class="hljs-number">-0.0073204</span> ,  <span class="hljs-number">0.00043154</span>,
       <span class="hljs-number">-0.04577637</span>,  <span class="hljs-number">0.03591919</span>, <span class="hljs-number">-0.02807617</span>, <span class="hljs-number">-0.04812622</span>], dtype=<span class="hljs-type">float32</span>)]
Dim <span class="hljs-number">384</span> (<span class="hljs-number">384</span>,)
<button class="copy-code-btn"></button></code></pre>
