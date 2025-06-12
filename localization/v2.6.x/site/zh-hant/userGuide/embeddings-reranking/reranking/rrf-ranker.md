---
id: rrf-ranker.md
title: RRF 排序器
summary: >-
  Reciprocal Rank Fusion (RRF) Ranker 是 Milvus
  混合搜尋的重新排序策略，它根據多個向量搜尋路徑的排序位置而非原始相似度得分來平衡搜尋結果。就像體育賽事考量的是選手的排名而非個人的統計資料，RRF
  Ranker 會根據每個項目在不同搜尋路徑中的排名高低來結合搜尋結果，創造出公平且平衡的最終排名。
---
<h1 id="RRF-Ranker" class="common-anchor-header">RRF 排序器<button data-href="#RRF-Ranker" class="anchor-icon" translate="no">
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
    </button></h1><p>Reciprocal Rank Fusion (RRF) Ranker 是 Milvus 混合搜尋的重新排序策略，可根據多個向量搜尋路徑的排序位置而非原始相似度得分來平衡搜尋結果。就像體育比賽考慮的是球員的排名而不是個人統計，RRF Ranker 根據每個項目在不同搜索路徑中的排名高低來組合搜索結果，從而創建一個公平和平衡的最終排名。</p>
<h2 id="When-to-use-RRF-Ranker" class="common-anchor-header">何時使用 RRF Ranker<button data-href="#When-to-use-RRF-Ranker" class="anchor-icon" translate="no">
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
    </button></h2><p>RRF Ranker 專門設計用於混合搜尋情況，在這種情況下，您想要平衡來自多個向量搜尋路徑的結果，而無需指定明確的重要性權重。它對以下情況特別有效</p>
<table>
   <tr>
     <th><p>使用案例</p></th>
     <th><p>範例</p></th>
     <th><p>為什麼 RRF Ranker 運作良好</p></th>
   </tr>
   <tr>
     <td><p>具有同等重要性的多模式搜尋</p></td>
     <td><p>兩種模式同等重要的圖像-文字搜尋</p></td>
     <td><p>無需任意權重分配即可平衡結果</p></td>
   </tr>
   <tr>
     <td><p>集合向量搜尋</p></td>
     <td><p>結合不同嵌入模型的結果</p></td>
     <td><p>以民主方式合併排名，不偏向任何特定模型的得分分佈</p></td>
   </tr>
   <tr>
     <td><p>跨語言搜尋</p></td>
     <td><p>跨語言搜尋文件</p></td>
     <td><p>不考慮特定語言的嵌入特徵，公平地排列結果</p></td>
   </tr>
   <tr>
     <td><p>專家推薦</p></td>
     <td><p>結合來自多個專家系統的建議</p></td>
     <td><p>當不同系統使用無法比較的評分方法時，可建立共識排名</p></td>
   </tr>
</table>
<p>如果您的混合搜尋應用需要以民主方式平衡多個搜尋路徑，而不需要指定明確的權重，RRF Ranker 就是您的理想選擇。</p>
<h2 id="Mechanism-of-RRF-Ranker" class="common-anchor-header">RRF Ranker 的機制<button data-href="#Mechanism-of-RRF-Ranker" class="anchor-icon" translate="no">
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
    </button></h2><p>RRFRanker 策略的主要工作流程如下：</p>
<ol>
<li><p><strong>收集搜尋排名</strong>：收集向量搜尋各個路徑的結果排名 (rank_1、rank_2)。</p></li>
<li><p><strong>合併排名</strong>：根據公式轉換各路徑的排名 (rank_rrf_1, rank_rrf_2)。</p>
<p><em>Ranki</em><em>(d</em>) 是<em>第 i (th)</em> <em>個</em>擷取器產生的文件<em>d</em>的排名位置。</p></li>
<li><p><strong>總結排名</strong>：根據綜合排名對搜尋結果重新排序，以產生最終結果。</p></li>
</ol>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/rrf-ranker.png" alt="Rrf Ranker" class="doc-image" id="rrf-ranker" />
   </span> <span class="img-wrapper"> <span>RRF 排序器</span> </span></p>
<h2 id="Example-of-RRF-Ranker" class="common-anchor-header">RRF 排序器範例<button data-href="#Example-of-RRF-Ranker" class="anchor-icon" translate="no">
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
    </button></h2><p>此範例展示了在稀疏密集向量上的混合搜尋 (topK=5)，並說明 RRFRanker 策略如何將兩個 ANN 搜尋的結果重新排序。</p>
<ul>
<li>文本稀疏向量上的 ANN 搜尋結果 （topK=5）：</li>
</ul>
<table>
   <tr>
     <th><p><strong>ID</strong></p></th>
     <th><p><strong>排名 (稀疏)</strong></p></th>
   </tr>
   <tr>
     <td><p>101</p></td>
     <td><p>1</p></td>
   </tr>
   <tr>
     <td><p>203</p></td>
     <td><p>2</p></td>
   </tr>
   <tr>
     <td><p>150</p></td>
     <td><p>3</p></td>
   </tr>
   <tr>
     <td><p>198</p></td>
     <td><p>4</p></td>
   </tr>
   <tr>
     <td><p>175</p></td>
     <td><p>5</p></td>
   </tr>
</table>
<ul>
<li>ANN 在密集文字向量上的搜尋結果 （topK=5):...</li>
</ul>
<table>
   <tr>
     <th><p><strong>ID</strong></p></th>
     <th><p><strong>排名 (密集)</strong></p></th>
   </tr>
   <tr>
     <td><p>198</p></td>
     <td><p>1</p></td>
   </tr>
   <tr>
     <td><p>101</p></td>
     <td><p>2</p></td>
   </tr>
   <tr>
     <td><p>110</p></td>
     <td><p>3</p></td>
   </tr>
   <tr>
     <td><p>175</p></td>
     <td><p>4</p></td>
   </tr>
   <tr>
     <td><p>250</p></td>
     <td><p>5</p></td>
   </tr>
</table>
<ul>
<li>使用 RRF 重新排列兩組搜尋結果的排名。假設平滑參數<code translate="no">k</code> 設定為 60。</li>
</ul>
<table>
   <tr>
     <th><p><strong>ID</strong></p></th>
     <th><p><strong>得分（稀疏）</strong></p></th>
     <th><p><strong>得分 (密集)</strong></p></th>
     <th><p><strong>最終得分</strong></p></th>
   </tr>
   <tr>
     <td><p>101</p></td>
     <td><p>1</p></td>
     <td><p>2</p></td>
     <td><p>1/(60+1)+1/(60+2) = 0.01639</p></td>
   </tr>
   <tr>
     <td><p>198</p></td>
     <td><p>4</p></td>
     <td><p>1</p></td>
     <td><p>1/(60+4)+1/(60+1) = 0.01593</p></td>
   </tr>
   <tr>
     <td><p>175</p></td>
     <td><p>5</p></td>
     <td><p>4</p></td>
     <td><p>1/(60+5)+1/(60+4) = 0.01554</p></td>
   </tr>
   <tr>
     <td><p>203</p></td>
     <td><p>2</p></td>
     <td><p>不適用</p></td>
     <td><p>1/(60+2) = 0.01613</p></td>
   </tr>
   <tr>
     <td><p>150</p></td>
     <td><p>3</p></td>
     <td><p>不適用</p></td>
     <td><p>1/(60+3) = 0.01587</p></td>
   </tr>
   <tr>
     <td><p>110</p></td>
     <td><p>不適用</p></td>
     <td><p>3</p></td>
     <td><p>1/(60+3) = 0.01587</p></td>
   </tr>
   <tr>
     <td><p>250</p></td>
     <td><p>不適用</p></td>
     <td><p>5</p></td>
     <td><p>1/(60+5) = 0.01554</p></td>
   </tr>
</table>
<ul>
<li>重排後的最終結果（topK=5):</li>
</ul>
<table>
   <tr>
     <th><p><strong>排名</strong></p></th>
     <th><p><strong>ID</strong></p></th>
     <th><p><strong>最終得分</strong></p></th>
   </tr>
   <tr>
     <td><p>1</p></td>
     <td><p>101</p></td>
     <td><p>0.01639</p></td>
   </tr>
   <tr>
     <td><p>2</p></td>
     <td><p>203</p></td>
     <td><p>0.01613</p></td>
   </tr>
   <tr>
     <td><p>3</p></td>
     <td><p>198</p></td>
     <td><p>0.01593</p></td>
   </tr>
   <tr>
     <td><p>4</p></td>
     <td><p>150</p></td>
     <td><p>0.01587</p></td>
   </tr>
   <tr>
     <td><p>5</p></td>
     <td><p>110</p></td>
     <td><p>0.01587</p></td>
   </tr>
</table>
<h2 id="Usage-of-RRF-Ranker" class="common-anchor-header">RRF 排序器的使用<button data-href="#Usage-of-RRF-Ranker" class="anchor-icon" translate="no">
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
    </button></h2><p>使用 RRF 重排策略時，需要設定參數<code translate="no">k</code> 。這是一個平滑參數，可以有效地改變全文搜索與向量搜索的相對權重。此參數的預設值為 60，可在 (0, 16384) 的範圍內調整。該值應為浮點數。建議值在 [10, 100] 之間。雖然<code translate="no">k=60</code> 是常見的選擇，但最佳的<code translate="no">k</code> 值可能因您的特定應用程式和資料集而異。我們建議根據您的特定用例來測試和調整此參數，以達到最佳效能。</p>
<h3 id="Create-an-RRF-Ranker" class="common-anchor-header">建立 RRF 排序器</h3><p>用多個向量場設定好您的資料集後，使用適當的平滑參數建立 RRF Ranker：</p>
<div class="alert note">
<p>Milvus 2.6.x 及更高版本可讓您直接透過<code translate="no">Function</code> API 設定重排策略。如果您使用的是早期版本（v2.6.0 之前），請參閱<a href="https://milvus.io/docs/2.5.x/reranking.md#Reranking">Reranking</a>文檔中的設定說明。</p>
</div>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> Function, FunctionType

ranker = Function(
    name=<span class="hljs-string">&quot;rrf&quot;</span>,
    input_field_names=[], <span class="hljs-comment"># Must be an empty list</span>
    function_type=FunctionType.RERANK,
    params={
        <span class="hljs-string">&quot;reranker&quot;</span>: <span class="hljs-string">&quot;rrf&quot;</span>, 
        <span class="hljs-string">&quot;k&quot;</span>: <span class="hljs-number">100</span>  <span class="hljs-comment"># Optional</span>
    }
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// Java</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// Nodejs</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// Go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># Restful</span>
<button class="copy-code-btn"></button></code></pre>
<table>
   <tr>
     <th><p>參數</p></th>
     <th><p>需要嗎？</p></th>
     <th><p>說明</p></th>
     <th><p>值/範例</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">name</code></p></td>
     <td><p>是</p></td>
     <td><p>此功能的唯一識別碼</p></td>
     <td><p><code translate="no">"rrf"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">input_field_names</code></p></td>
     <td><p>是</p></td>
     <td><p>要應用函式的向量欄位清單 (RRF Ranker 必須為空)</p></td>
     <td><p>[]</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">function_type</code></p></td>
     <td><p>是</p></td>
     <td><p>要調用的函數類型；使用<code translate="no">RERANK</code> 指定重排策略</p></td>
     <td><p><code translate="no">FunctionType.RERANK</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.reranker</code></p></td>
     <td><p>是</p></td>
     <td><p>指定要使用的排名方法。必須設定為<code translate="no">rrf</code> 才能使用 RRF Ranker。</p></td>
     <td><p><code translate="no">"weighted"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.k</code></p></td>
     <td><p>無</p></td>
     <td><p>平滑參數，用來控制文件排名的影響；較高的<code translate="no">k</code> 會降低對頂部排名的敏感度。範圍：(0, 16384)；預設：<code translate="no">60</code> 。如需詳細資訊，請參閱<a href="/docs/zh-hant/rrf-ranker.md#Mechanism-of-RRF-Ranker">RRF Ranker 的機制</a>。</p></td>
     <td><p><code translate="no">100</code></p></td>
   </tr>
</table>
<h3 id="Apply-to-hybrid-search" class="common-anchor-header">應用於混合搜尋</h3><p>RRF Ranker 是專為結合多向量場的混合搜尋作業而設計的。以下是如何在混合搜尋中使用它：</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, AnnSearchRequest

<span class="hljs-comment"># Connect to Milvus server</span>
milvus_client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

<span class="hljs-comment"># Assume you have a collection setup</span>

<span class="hljs-comment"># Define text vector search request</span>
text_search = AnnSearchRequest(
    data=[<span class="hljs-string">&quot;modern dining table&quot;</span>],
    anns_field=<span class="hljs-string">&quot;text_vector&quot;</span>,
    param={},
    limit=<span class="hljs-number">10</span>
)

<span class="hljs-comment"># Define image vector search request</span>
image_search = AnnSearchRequest(
    data=[image_embedding],  <span class="hljs-comment"># Image embedding vector</span>
    anns_field=<span class="hljs-string">&quot;image_vector&quot;</span>,
    param={},
    limit=<span class="hljs-number">10</span>
)

<span class="hljs-comment"># Apply RRF Ranker to product hybrid search</span>
<span class="hljs-comment"># The smoothing parameter k controls the balance</span>
hybrid_results = milvus_client.hybrid_search(
    collection_name,
    [text_search, image_search],  <span class="hljs-comment"># Multiple search requests</span>
<span class="highlighted-wrapper-line">    ranker=ranker,  <span class="hljs-comment"># Apply the RRF ranker</span></span>
    limit=<span class="hljs-number">10</span>,
    output_fields=[<span class="hljs-string">&quot;product_name&quot;</span>, <span class="hljs-string">&quot;price&quot;</span>, <span class="hljs-string">&quot;category&quot;</span>]
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// java</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// nodejs</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
<p>有關混合搜索的更多資訊，請參閱<a href="/docs/zh-hant/multi-vector-search.md">多向量混合搜索</a>。</p>
