---
id: reranking.md
title: 重新排名
summary: >-
  混合搜尋 (Hybrid Search) 可透過多個同時進行的 ANN
  搜尋獲得更精確的搜尋結果。多重搜尋會返回數組結果，這需要重新排序策略來協助合併和重新排序結果，並返回單一結果集。本指南將介紹 Milvus
  支援的重排策略，並提供選擇適當重排策略的提示。
---

<h1 id="Reranking" class="common-anchor-header">重新排名<button data-href="#Reranking" class="anchor-icon" translate="no">
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
    </button></h1><p>混合搜尋可透過多個同時進行的 ANN 搜尋取得更精確的搜尋結果。多重搜尋會返回多組結果，這需要重新排序策略來幫助合併和重新排序結果，並返回單一結果集。本指南將介紹 Milvus 支援的重排策略，並提供選擇適當重排策略的提示。</p>
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
    </button></h2><p>下圖顯示在多模式搜尋應用程式中進行混合搜尋的主要工作流程。在圖中，一條路徑是對文字進行基本 ANN 搜尋，另一條路徑是對圖像進行基本 ANN 搜尋。每條路徑都會根據文字和圖像的相似度分數產生一組結果<strong>(Limit 1</strong>和<strong>Limit 2</strong>)。然後採用重排策略，根據統一標準對兩組結果進行重排，最終將兩組結果合併為一組最終的搜尋結果，即<strong>Limit(final)</strong>。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/multi-vector-rerank.png" alt="Multi Vector Rerank" class="doc-image" id="multi-vector-rerank" />
   </span> <span class="img-wrapper"> <span>多向量重排</span> </span></p>
<p>在混合搜尋中，重排是整合多向量搜尋結果的關鍵步驟，以確保最終輸出的結果是最相關、最準確的。目前，Milvus 支援以下兩種 reranking 策略：</p>
<ul>
<li><p><strong><a href="/docs/zh-hant/v2.5.x/reranking.md#WeightedRanker">加權排名</a></strong>：此策略透過計算來自不同向量搜尋的得分（或距離）的加權分數來合併結果。權重會根據每個向量欄位的重要性來分配，允許根據特定使用個案的優先順序來自訂。</p></li>
<li><p><strong><a href="/docs/zh-hant/v2.5.x/reranking.md#RRFRanker">RRFRanker</a>(Reciprocal Rank Fusion Ranker)：</strong>此策略會根據排名結合結果。它使用一種平衡不同搜尋結果等級的方法，通常可以更公平、有效地整合不同的資料類型或模式。</p></li>
</ul>
<h2 id="WeightedRanker" class="common-anchor-header">加權排名<button data-href="#WeightedRanker" class="anchor-icon" translate="no">
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
    </button></h2><p>WeightedRanker 策略會根據向量搜尋的每條路徑結果的重要性，分配不同的權重。</p>
<h3 id="Mechanism-of-WeightedRanker" class="common-anchor-header">WeightedRanker 的機制</h3><p>WeightedRanker 策略的主要工作流程如下：</p>
<ol>
<li><p><strong>收集搜尋分數</strong>：收集向量搜尋每條路徑的結果和分數 (score_1, score_2)。</p></li>
<li><p><strong>Score Normalization（分數規範化</strong>）：每次搜尋可能會使用不同的相似度指標，造成不同的分數分佈。例如，使用 Inner Product (IP) 作為相似度類型可能會產生 [-∞,+∞] 的分數範圍，而使用 Euclidean distance (L2) 則會產生 [0,+∞] 的分數範圍。由於不同搜尋的分數範圍各異，無法直接比較，因此有必要將每條搜尋路徑的分數歸一化。一般而言，<code translate="no">arctan</code> 函數會將分數轉換成 [0, 1] 之間的範圍 (score_1_normalized, score_2_normalized)。分數越接近 1 表示相似度越高。</p></li>
<li><p><strong>指定權重</strong>：根據分配給不同向量領域的重要性，將權重 (<strong>wi</strong>) 分配給歸一化的分數 (score_1_normalized, score_2_normalized)。每條路徑的權重範圍應該在 [0,1] 之間。所得的加權分數為 score_1_weighted 及 score_2_weighted。</p></li>
<li><p><strong>合併分數</strong>：將加權得分 (score_1_weighted, score_2_weighted) 由高到低排序，產生最後的得分集 (score_final)。</p></li>
</ol>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/weighted-reranker.png" alt="Weighted Reranker" class="doc-image" id="weighted-reranker" />
   </span> <span class="img-wrapper"> <span>加權 Reranker</span> </span></p>
<h3 id="Example-of-WeightedRanker" class="common-anchor-header">WeightedRanker 的範例</h3><p>本範例展示了一個涉及圖片和文字的多模式混合搜尋 (topK=5)，並說明 WeightedRanker 策略如何將兩個 ANN 搜尋的結果重新排序。</p>
<ul>
<li>圖像上的 ANN 搜尋結果 （topK=5）：</li>
</ul>
<table>
   <tr>
     <th><p><strong>ID</strong></p></th>
     <th><p><strong>得分 (影像)</strong></p></th>
   </tr>
   <tr>
     <td><p>101</p></td>
     <td><p>0.92</p></td>
   </tr>
   <tr>
     <td><p>203</p></td>
     <td><p>0.88</p></td>
   </tr>
   <tr>
     <td><p>150</p></td>
     <td><p>0.85</p></td>
   </tr>
   <tr>
     <td><p>198</p></td>
     <td><p>0.83</p></td>
   </tr>
   <tr>
     <td><p>175</p></td>
     <td><p>0.8</p></td>
   </tr>
</table>
<ul>
<li>文本的 ANN 檢索結果（topK=5）： ID</li>
</ul>
<table>
   <tr>
     <th><p><strong>ID</strong></p></th>
     <th><p><strong>分數 (文字)</strong></p></th>
   </tr>
   <tr>
     <td><p>198</p></td>
     <td><p>0.91</p></td>
   </tr>
   <tr>
     <td><p>101</p></td>
     <td><p>0.87</p></td>
   </tr>
   <tr>
     <td><p>110</p></td>
     <td><p>0.85</p></td>
   </tr>
   <tr>
     <td><p>175</p></td>
     <td><p>0.82</p></td>
   </tr>
   <tr>
     <td><p>250</p></td>
     <td><p>0.78</p></td>
   </tr>
</table>
<ul>
<li>使用 WeightedRanker 為圖片和文字搜尋結果指定權重。假設影像 ANN 搜尋的權重為 0.6，文字搜尋的權重為 0.4。</li>
</ul>
<table>
   <tr>
     <th><p><strong>ID</strong></p></th>
     <th><p><strong>得分 (影像)</strong></p></th>
     <th><p><strong>得分（文字）</strong></p></th>
     <th><p><strong>加權得分</strong></p></th>
   </tr>
   <tr>
     <td><p>101</p></td>
     <td><p>0.92</p></td>
     <td><p>0.87</p></td>
     <td><p>0.6×0.92+0.4×0.87=0.90</p></td>
   </tr>
   <tr>
     <td><p>203</p></td>
     <td><p>0.88</p></td>
     <td><p>不適用</p></td>
     <td><p>0.6×0.88+0.4×0=0.528</p></td>
   </tr>
   <tr>
     <td><p>150</p></td>
     <td><p>0.85</p></td>
     <td><p>不適用</p></td>
     <td><p>0.6×0.85+0.4×0=0.51</p></td>
   </tr>
   <tr>
     <td><p>198</p></td>
     <td><p>0.83</p></td>
     <td><p>0.91</p></td>
     <td><p>0.6×0.83+0.4×0.91=0.86</p></td>
   </tr>
   <tr>
     <td><p>175</p></td>
     <td><p>0.80</p></td>
     <td><p>0.82</p></td>
     <td><p>0.6×0.80+0.4×0.82=0.81</p></td>
   </tr>
   <tr>
     <td><p>110</p></td>
     <td><p>不在影像中</p></td>
     <td><p>0.85</p></td>
     <td><p>0.6×0+0.4×0.85=0.34</p></td>
   </tr>
   <tr>
     <td><p>250</p></td>
     <td><p>不在影像中</p></td>
     <td><p>0.78</p></td>
     <td><p>0.6×0+0.4×0.78=0.312</p></td>
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
     <td><p>0.90</p></td>
   </tr>
   <tr>
     <td><p>2</p></td>
     <td><p>198</p></td>
     <td><p>0.86</p></td>
   </tr>
   <tr>
     <td><p>3</p></td>
     <td><p>175</p></td>
     <td><p>0.81</p></td>
   </tr>
   <tr>
     <td><p>4</p></td>
     <td><p>203</p></td>
     <td><p>0.528</p></td>
   </tr>
   <tr>
     <td><p>5</p></td>
     <td><p>150</p></td>
     <td><p>0.51</p></td>
   </tr>
</table>
<h3 id="Usage-of-WeightedRanker" class="common-anchor-header">使用 WeightedRanker</h3><p>使用 WeightedRanker 策略時，必須輸入權重值。輸入的權重值數量應對應於混合搜索中基本 ANN 搜索請求的數量。輸入的權重值應該在 [0,1] 的範圍內，值越接近 1 表示重要性越高。</p>
<p>例如，假設混合搜尋中有兩個基本 ANN 搜尋請求：文字搜尋和圖像搜尋。如果認為文字搜尋更重要，就應該給予它更大的權重。</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#go">Go</a> <a href="#javascript">NodeJS</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> WeightedRanker

rerank= WeightedRanker(<span class="hljs-number">0.8</span>, <span class="hljs-number">0.3</span>)
<button class="copy-code-btn"></button></code></pre>

<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.ranker.WeightedRanker;

<span class="hljs-type">WeightedRanker</span> <span class="hljs-variable">rerank</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">WeightedRanker</span>(Arrays.asList(<span class="hljs-number">0.8f</span>, <span class="hljs-number">0.3f</span>))
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2/milvusclient&quot;</span>

reranker := milvusclient.NewWeightedReranker([]<span class="hljs-type">float64</span>{<span class="hljs-number">0.8</span>, <span class="hljs-number">0.3</span>})
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-attr">rerank</span>: <span class="hljs-title class_">WeightedRanker</span>(<span class="hljs-number">0.8</span>, <span class="hljs-number">0.3</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> rerank=<span class="hljs-string">&#x27;{
        &quot;strategy&quot;: &quot;ws&quot;,
        &quot;params&quot;: {&quot;weights&quot;: [0.8,0.3]}
    }&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="RRFRanker" class="common-anchor-header">RRFRanker<button data-href="#RRFRanker" class="anchor-icon" translate="no">
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
    </button></h2><p>互易排名融合 (Reciprocal Rank Fusion, RRF) 是一種資料融合方法，可根據排名的互易程度來合併排名清單。這種重新排序策略能有效平衡向量搜尋的每條路徑的重要性。</p>
<h3 id="Mechanism-of-RRFRanker" class="common-anchor-header">RRFRanker 的機制</h3><p>RRFRanker 策略的主要工作流程如下：</p>
<ol>
<li><p><strong>收集搜尋排名</strong>：收集向量搜尋各個路徑的結果排名 (rank_1、rank_2)。</p></li>
<li><p><strong>合併排名</strong>：根據公式轉換各路徑的排名 (rank_rrf_1, rank_rrf_2)。</p>
<p><em>Ranki</em><em>(d</em>) 是<em>第 i (th)</em> <em>個</em>擷取器產生的文件<em>d</em>的排名位置。</p></li>
<li><p><strong>總結排名</strong>：根據綜合排名對搜尋結果重新排序，以產生最終結果。</p></li>
</ol>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/RRF-reranker.png" alt="RRF Reranker" class="doc-image" id="rrf-reranker" />
   </span> <span class="img-wrapper"> <span>RRF Reranker</span> </span></p>
<h3 id="Example-of-RRFRanker" class="common-anchor-header">RRFRanker 的範例</h3><p>本範例展示了在稀疏密集向量上的混合搜尋 (topK=5)，並說明 RRFRanker 策略如何將兩個 ANN 搜尋的結果重新排序。</p>
<ul>
<li>文字稀疏向量上的 ANN 搜尋結果 （topK=5）：</li>
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
<h3 id="Usage-of-RRFRanker" class="common-anchor-header">RRFRanker 的使用方法</h3><p>使用 RRF 重排策略時，需要設定參數<code translate="no">k</code> 。這是一個平滑參數，可以有效改變全文檢索相對於向量檢索的相對權重。這個參數的預設值是 60，可以在 (0, 16384) 的範圍內調整。該值應為浮點數。建議值在 [10, 100] 之間。雖然<code translate="no">k=60</code> 是常見的選擇，但最佳的<code translate="no">k</code> 值可能因您的特定應用程式和資料集而異。我們建議根據您的特定使用個案測試並調整此參數，以達到最佳效能。</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#go">Go</a> <a href="#javascript">NodeJS</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> RRFRanker

ranker = RRFRanker(<span class="hljs-number">100</span>)
<button class="copy-code-btn"></button></code></pre>

<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.ranker.RRFRanker;

<span class="hljs-type">RRFRanker</span> <span class="hljs-variable">ranker</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">RRFRanker</span>(<span class="hljs-number">100</span>);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">reranker := milvusclient.NewRRFReranker().WithK(<span class="hljs-number">100</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-attr">rerank</span>: <span class="hljs-title class_">RRFRanker</span>(<span class="hljs-string">&quot;100&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-string">&quot;rerank&quot;</span>: {
    <span class="hljs-string">&quot;strategy&quot;</span>: <span class="hljs-string">&quot;rrf&quot;</span>,
    <span class="hljs-string">&quot;params&quot;</span>: {
        <span class="hljs-string">&quot;k&quot;</span>: 100
    }
}
<span class="hljs-built_in">export</span> rerank=<span class="hljs-string">&#x27;{
        &quot;strategy&quot;: &quot;rrf&quot;,
        &quot;params&quot;: {&quot;k&quot;: 100}
    }&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Select-the-right-reranking-strategy" class="common-anchor-header">選擇正確的重排策略<button data-href="#Select-the-right-reranking-strategy" class="anchor-icon" translate="no">
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
    </button></h2><p>選擇重新排名策略時，需要考慮的一件事是，是否需要強調向量領域上的一個或多個基本 ANN 搜尋。</p>
<ul>
<li><p><strong>WeightedRanker</strong>：如果您要求結果強調特定向量領域，建議使用此策略。WeightedRanker 允許您為某些向量領域指定較高的權重，使其更受重視。例如，在多模式搜尋中，圖片的文字描述可能會被認為比這張圖片的顏色更重要。</p></li>
<li><p><strong>RRFRanker (Reciprocal Rank Fusion Ranker)：</strong>當沒有特定的重點時，建議使用此策略。RRF 可以有效平衡各向量領域的重要性。</p></li>
</ul>
