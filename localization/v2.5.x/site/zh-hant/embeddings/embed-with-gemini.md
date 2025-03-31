---
id: embed-with-gemini.md
order: 2
summary: Milvus 透過 GeminiEmbeddingFunction 類別與 OpenAI 的模型整合。
title: 雙子星
---
<h1 id="Gemini" class="common-anchor-header">雙子星<button data-href="#Gemini" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus 透過<strong>GeminiEmbeddingFunction</strong>類與<strong>Gemini</strong>的模型整合。這個類別提供了使用預先訓練的 Gemini 模型來編碼文件和查詢的方法，並將嵌入返回為與 Milvus 索引相容的密集向量。若要使用此功能，請在<a href="https://ai.google.dev/gemini-api/docs/api-key">Gemini</a>平台上建立帳號，從<a href="https://ai.google.dev/gemini-api/docs/api-key">Gemini</a>取得 API 金鑰。</p>
<p>要使用此功能，請安裝必要的相依性：</p>
<pre><code translate="no" class="language-bash">pip install --upgrade pymilvus
pip install <span class="hljs-string">&quot;pymilvus[model]&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>然後，實體化<strong>GeminiEmbeddingFunction</strong>：</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> model

gemini_ef = model.dense.GeminiEmbeddingFunction(
    model_name=<span class="hljs-string">&#x27;gemini-embedding-exp-03-07&#x27;</span>, <span class="hljs-comment"># Specify the model name</span>
    api_key=<span class="hljs-string">&#x27;YOUR_API_KEY&#x27;</span>, <span class="hljs-comment"># Provide your OpenAI API key</span>
)
<button class="copy-code-btn"></button></code></pre>
<p><strong>參數</strong>：</p>
<ul>
<li><p><strong>model_name</strong><em>(string</em>)</p>
<p>用於編碼的 Gemini 模型名稱。有效的選項為<strong>gemini-embedding-exp-03-07</strong>(預設)、<strong>models/</strong> <strong>embedding-001</strong> 及<strong>models/text-embedding-004</strong>。</p></li>
<li><p><strong>api_key</strong><em>(字串</em>)</p>
<p>存取 Gemini API 的 API 金鑰。</p></li>
<li><p><strong>config</strong><em>(types.EmbedContentConfig</em>) 嵌入模型的可選設定。</p>
<ul>
<li><strong>output_dimensionality</strong>可以指定為結果輸出嵌入的數量。</li>
<li>可指定<strong>task_type</strong>，以針對特定任務產生最佳化的嵌入，節省您的時間與成本，並提高效能。僅在<strong>gemini-embedding-exp-03-07</strong>模型中支援。</li>
</ul></li>
</ul>
<table>
<thead>
<tr><th>模型名稱</th><th>尺寸</th></tr>
</thead>
<tbody>
<tr><td>gemini-embedding-exp-03-07</td><td>3072<em>(default</em>),1536,768</td></tr>
<tr><td>模型/嵌入式-001</td><td>768</td></tr>
<tr><td>模型/文字嵌入-004</td><td>768</td></tr>
</tbody>
</table>
<table>
<thead>
<tr><th>任務類型</th><th>說明</th></tr>
</thead>
<tbody>
<tr><td>語意相似性</td><td>用來產生最適合評估文字相似性的嵌入。</td></tr>
<tr><td>分類</td><td>用來產生最佳化的內嵌，以便根據預設標籤對文字進行分類。</td></tr>
<tr><td>聚類</td><td>用於產生最佳化的嵌入式資料，以根據文字的相似性將文字聚類。</td></tr>
<tr><td>驗證_文件、驗證_查詢、問題解析和事實確認</td><td>用於產生最佳化的嵌入式文件搜尋或資訊檢索。</td></tr>
<tr><td>代碼擷取查詢</td><td>用於根據自然語言查詢來擷取程式碼區塊，例如排序陣列或反向鏈結清單。程式碼區塊的嵌入是使用 RETRIEVAL_DOCUMENT 計算出來的。</td></tr>
</tbody>
</table>
<p>若要為文件建立嵌入，請使用<strong>encode_documents()</strong>方法：</p>
<pre><code translate="no" class="language-python">docs = [
    <span class="hljs-string">&quot;Artificial intelligence was founded as an academic discipline in 1956.&quot;</span>,
    <span class="hljs-string">&quot;Alan Turing was the first person to conduct substantial research in AI.&quot;</span>,
    <span class="hljs-string">&quot;Born in Maida Vale, London, Turing was raised in southern England.&quot;</span>,
]

docs_embeddings = gemini_ef.encode_documents(docs)

<span class="hljs-comment"># Print embeddings</span>
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Embeddings:&quot;</span>, docs_embeddings)
<span class="hljs-comment"># Print dimension and shape of embeddings</span>
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Dim:&quot;</span>, gemini_ef.dim, docs_embeddings[<span class="hljs-number">0</span>].shape)
<button class="copy-code-btn"></button></code></pre>
<p>預期的輸出與下圖相似：</p>
<pre><code translate="no" class="language-python">Embeddings: [array([-0.00894029,  0.00573813,  0.013351  , ..., -0.00042766,
       -0.00603091, -0.00341043], shape=(3072,)), array([ 0.00222347,  0.03725113,  0.01152256, ...,  0.01047272,
       -0.01701597,  0.00565377], shape=(3072,)), array([ 0.00661134,  0.00232328, -0.01342973, ..., -0.00514429,
       -0.02374139, -0.00701721], shape=(3072,))]
Dim: 3072 (3072,)
<button class="copy-code-btn"></button></code></pre>
<p>要為查詢建立內嵌，請使用<strong>encode_queries()</strong>方法：</p>
<pre><code translate="no" class="language-python">queries = [<span class="hljs-string">&quot;When was artificial intelligence founded&quot;</span>, 
           <span class="hljs-string">&quot;Where was Alan Turing born?&quot;</span>]

query_embeddings = gemini_ef.encode_queries(queries)

<span class="hljs-comment"># Print embeddings</span>
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Embeddings:&quot;</span>, query_embeddings)
<span class="hljs-comment"># Print dimension and shape of embeddings</span>
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Dim&quot;</span>, gemini_ef.dim, query_embeddings[<span class="hljs-number">0</span>].shape)
<button class="copy-code-btn"></button></code></pre>
<p>預期的輸出與下列內容相似：</p>
<pre><code translate="no" class="language-python">Embeddings: [array([-0.02066572,  0.02459551,  0.00707774, ...,  0.00259341,
       -0.01797572, -0.00626168], shape=(3072,)), array([ 0.00674969,  0.03023903,  0.01230692, ...,  0.00160009,
       -0.01710967,  0.00972728], shape=(3072,))]
Dim 3072 (3072,)
<button class="copy-code-btn"></button></code></pre>
