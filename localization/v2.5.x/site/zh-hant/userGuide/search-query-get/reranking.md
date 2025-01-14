---
id: reranking.md
summary: 本主題涵蓋重新排序流程，解釋其重要性以及兩種重新排序方法的實作。
title: 重排
---
<h1 id="Reranking" class="common-anchor-header">重排<button data-href="#Reranking" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus 使用<a href="https://milvus.io/api-reference/pymilvus/v2.4.x/ORM/Collection/hybrid_search.md">hybrid_search()</a>API 實現了混合搜尋功能，結合了精密的重排策略來精煉來自多個<code translate="no">AnnSearchRequest</code> 實例的搜尋結果。本主題涵蓋重排過程，解釋其重要性以及 Milvus 中不同重排策略的實作。</p>
<h2 id="Overview" class="common-anchor-header">概述<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><p>下圖說明了在 Milvus 中執行混合搜尋的過程，並強調了 reranking 在此過程中的作用。</p>
<p><img translate="no" src="/docs/v2.5.x/assets/multi-vector-rerank.png" alt="reranking_process" width="300"/></p>
<p>混合搜尋中的重新排序是一個關鍵步驟，可整合來自多個向量領域的結果，確保最終輸出為相關且優先順序準確。目前，Milvus 提供這些重新排序策略：</p>
<ul>
<li><p><code translate="no">WeightedRanker</code>:這種方法是透過計算來自不同向量搜尋的分數（或向量距離）的加權平均值來合併結果。它根據每個向量領域的重要性來分配權重。</p></li>
<li><p><code translate="no">RRFRanker</code>:此策略會根據不同向量列的排名來合併結果。</p></li>
</ul>
<h2 id="Weighted-Scoring-WeightedRanker" class="common-anchor-header">加權評分 (WeightedRanker)<button data-href="#Weighted-Scoring-WeightedRanker" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">WeightedRanker</code> 策略會根據每個向量欄位的重要性，為每個向量檢索路徑的結果指定不同的權重。當每個向量欄位的重要性不同時，就會採用此重新排序策略，讓您可以藉由賦予某些向量欄位較高的權重，來強調這些向量欄位而非其他向量欄位。例如，在多模式搜尋中，文字描述可能被認為比影像中的顏色分佈更重要。</p>
<p>WeightedRanker 的基本流程如下：</p>
<ul>
<li><p><strong>在擷取過程中收集分數</strong>：收集來自不同向量擷取路徑的結果及其分數。</p></li>
<li><p><strong>分數規範化</strong>：將每個路徑的分數歸一化為 [0,1] 的範圍，其中值越接近 1 表示相關性越高。由於分數分佈會因不同的度量類型而異，因此此歸一化非常重要。例如，IP 的距離範圍為 [-∞,+∞]，而 L2 的距離範圍為 [0,+∞]。Milvus 採用<code translate="no">arctan</code> 函數，將值轉換到 [0,1] 的範圍，為不同的度量類型提供標準化的基礎。</p>
<p><img translate="no" src="/docs/v2.5.x/assets/arctan.png" alt="arctan-function" width="300"/></p></li>
<li><p><strong>權重分配</strong>：為每個向量擷取路徑分配一個權重<code translate="no">w𝑖</code> 。使用者指定的權重可反映資料來源的可靠性、準確性或其他相關指標。每個權重的範圍為 [0,1]。</p></li>
<li><p><strong>分數融合</strong>：計算標準化分數的加權平均值，得出最終分數。然後根據這些從高到低的分數對結果進行排序，以產生最終的排序結果。</p></li>
</ul>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x//assets/weighted-reranker.png" alt="weighted-reranker" class="doc-image" id="weighted-reranker" />
   </span> <span class="img-wrapper"> <span>加權排序</span> </span></p>
<p>若要使用此策略，請套用<code translate="no">WeightedRanker</code> 實例，並透過傳入可變數量的數值參數來設定權重值。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> WeightedRanker

<span class="hljs-comment"># Use WeightedRanker to combine results with specified weights</span>
rerank = WeightedRanker(<span class="hljs-number">0.8</span>, <span class="hljs-number">0.8</span>, <span class="hljs-number">0.7</span>) 
<button class="copy-code-btn"></button></code></pre>
<p>請注意</p>
<ul>
<li><p>每個權重值的範圍從 0 (最不重要) 到 1 (最重要)，影響最後的彙總分數。</p></li>
<li><p><code translate="no">WeightedRanker</code> 中提供的權重值總數應該等於您之前建立的<code translate="no">AnnSearchRequest</code> 實體數量。</p></li>
<li><p>值得注意的是，由於不同度量類型的測量方式不同，我們會將召回結果的距離規範化，使其位於區間 [0,1]，其中 0 代表不同，1 代表相似。最終的分數將是權重值與距離的總和。</p></li>
</ul>
<h2 id="Reciprocal-Rank-Fusion-RRFRanker" class="common-anchor-header">對等排名融合 (RRFRanker)<button data-href="#Reciprocal-Rank-Fusion-RRFRanker" class="anchor-icon" translate="no">
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
    </button></h2><p>RRF 是一種資料融合方法，它根據排名清單的倒數結合排名清單。它是一種平衡各向量領域影響力的有效方法，尤其是當重要程度沒有明顯的先後次序時。當您想要對所有向量領域給予同等的考量，或是不確定各領域的相對重要性時，通常會使用此策略。</p>
<p>RRF 的基本流程如下：</p>
<ul>
<li><p><strong>在擷取過程中收集排名</strong>：跨多個向量欄位的擷取器擷取和排序結果。</p></li>
<li><p><strong>排名融合</strong>：RRF 演算法會對每個擷取器的排名進行權衡與合併。公式如下：</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x//assets/rrf-ranker.png" alt="rrf-ranker" class="doc-image" id="rrf-ranker" />
   </span> <span class="img-wrapper"> <span>RRF-ranker</span> </span></p>
<p>這裡，𝑁 代表不同擷取路徑的數量，rank𝑖(𝑑) 是𝑖th retriever 擷取文件𝑑 的排名位置，𝑘 是平滑參數，通常設定為 60。</p></li>
<li><p><strong>綜合排名</strong>：根據綜合評分對擷取的結果重新排序，以產生最終結果。</p></li>
</ul>
<p>若要使用此策略，請套用<code translate="no">RRFRanker</code> 實例。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> RRFRanker

<span class="hljs-comment"># Default k value is 60</span>
ranker = RRFRanker()

<span class="hljs-comment"># Or specify k value</span>
ranker = RRFRanker(k=<span class="hljs-number">100</span>)
<button class="copy-code-btn"></button></code></pre>
<p>RRF 允許平衡各領域的影響力，而無需指定明確的權重。多個欄位同意的頂尖匹配項目將在最後排名中被優先排序。</p>
