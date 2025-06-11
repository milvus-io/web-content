---
id: weighted-ranker.md
title: 加權排名器
summary: >-
  Weighted Ranker
  可透過為每個搜尋路徑指定不同的重要性權重，智慧地結合多個搜尋路徑的結果並排定優先順序。與技藝高超的廚師平衡多種食材以創造完美菜餚的方式類似，Weighted
  Ranker
  平衡不同的搜尋結果，以提供最相關的結合結果。當您在多個向量領域或模式中進行搜尋時，某些領域對最終排名的貢獻應該比其他領域更大，因此這種方法非常理想。
---
<h1 id="Weighted-Ranker" class="common-anchor-header">加權排名器<button data-href="#Weighted-Ranker" class="anchor-icon" translate="no">
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
    </button></h1><p>Weighted Ranker 可透過為每個搜尋路徑指定不同的重要性權重，智慧地結合多個搜尋路徑的結果並排定優先順序。與技藝高超的廚師平衡多種材料以創造完美菜餚的方式類似，Weighted Ranker 平衡不同的搜尋結果，以提供最相關的結合結果。當您在多個向量領域或模式之間進行搜尋時，如果某些領域對最終排名的貢獻應該比其他領域更大，那麼這種方法就是最理想的選擇。</p>
<h2 id="When-to-use-Weighted-Ranker" class="common-anchor-header">何時使用加權排名器<button data-href="#When-to-use-Weighted-Ranker" class="anchor-icon" translate="no">
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
    </button></h2><p>Weighted Ranker 專門設計用於混合搜尋的情況，在這種情況下，您需要結合來自多個向量搜尋路徑的結果。它對以下情況特別有效</p>
<table>
   <tr>
     <th><p>使用案例</p></th>
     <th><p>範例</p></th>
     <th><p>為什麼加權排名器運作良好</p></th>
   </tr>
   <tr>
     <td><p>電子商務搜尋</p></td>
     <td><p>結合圖片相似度與文字描述的產品搜尋</p></td>
     <td><p>允許零售商優先處理時尚商品的視覺相似性，同時強調技術產品的文字說明</p></td>
   </tr>
   <tr>
     <td><p>媒體內容搜尋</p></td>
     <td><p>同時使用視覺特徵和音訊謄本的視訊檢索</p></td>
     <td><p>根據查詢意圖平衡視覺內容與口語對話的重要性</p></td>
   </tr>
   <tr>
     <td><p>文件檢索</p></td>
     <td><p>針對不同部分使用多重嵌入的企業文件搜尋</p></td>
     <td><p>在考慮全文嵌入的同時，給予標題和摘要嵌入較高的權重</p></td>
   </tr>
</table>
<p>如果您的混合搜尋應用需要結合多個搜尋路徑，同時控制它們的相對重要性，Weighted Ranker 就是您的理想選擇。</p>
<h2 id="Mechanism-of-Weighted-Ranker" class="common-anchor-header">加權排名機制<button data-href="#Mechanism-of-Weighted-Ranker" class="anchor-icon" translate="no">
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
    </button></h2><p>WeightedRanker 策略的主要工作流程如下：</p>
<ol>
<li><p><strong>收集搜尋分數</strong>：收集向量搜尋每條路徑的結果和分數 (score_1, score_2)。</p></li>
<li><p><strong>Score Normalization（分數規範化</strong>）：每次搜尋可能會使用不同的相似度指標，造成不同的分數分佈。例如，使用 Inner Product (IP) 作為相似度類型可能會產生 [-∞,+∞] 的分數範圍，而使用 Euclidean distance (L2) 則會產生 [0,+∞] 的分數範圍。由於不同搜尋的分數範圍各異，無法直接比較，因此有必要將每條搜尋路徑的分數歸一化。一般而言，<code translate="no">arctan</code> 函數會將分數轉換成 [0, 1] 之間的範圍 (score_1_normalized, score_2_normalized)。分數越接近 1 表示相似度越高。</p></li>
<li><p><strong>指定權重</strong>：根據分配給不同向量領域的重要性，將權重 (<strong>wi</strong>) 分配給歸一化的分數 (score_1_normalized, score_2_normalized)。每條路徑的權重範圍應該在 [0,1] 之間。所得的加權分數為 score_1_weighted 及 score_2_weighted。</p></li>
<li><p><strong>合併分數</strong>：將加權得分 (score_1_weighted, score_2_weighted) 由高到低排序，產生最後的得分集 (score_final)。</p></li>
</ol>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/weighted-ranker.png" alt="Weighted Ranker" class="doc-image" id="weighted-ranker" />
   </span> <span class="img-wrapper"> <span>加權排名器</span> </span></p>
<h2 id="Example-of-Weighted-Ranker" class="common-anchor-header">加權排名器範例<button data-href="#Example-of-Weighted-Ranker" class="anchor-icon" translate="no">
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
    </button></h2><p>本範例展示了一個涉及圖片和文字的多模式混合搜尋 (topK=5)，並說明 WeightedRanker 策略如何將兩個 ANN 搜尋的結果重新排序。</p>
<ul>
<li>圖像的 ANN 搜尋結果 （topK=5）：</li>
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
<h2 id="Usage-of-Weighted-Ranker" class="common-anchor-header">使用加權排名器<button data-href="#Usage-of-Weighted-Ranker" class="anchor-icon" translate="no">
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
    </button></h2><p>使用 WeightedRanker 策略時，必須輸入權重值。輸入的權重值數量應對應於混合搜索中基本 ANN 搜索請求的數量。輸入的權重值應在 [0,1] 的範圍內，值越接近 1 表示重要性越高。</p>
<h3 id="Create-a-Weighted-Ranker" class="common-anchor-header">建立加權排名器</h3><p>例如，假設混合搜尋中有兩個基本 ANN 搜尋請求：文字搜尋和圖像搜尋。如果文字搜尋被視為更重要，就應該給予較大的權重。</p>
<div class="alert note">
<p>Milvus 2.6.x 及以後的版本可讓您直接透過<code translate="no">Function</code> API 設定重排策略。如果您使用的是較早的版本（v2.6.0 之前），請參閱<a href="https://milvus.io/docs/2.5.x/reranking.md#Reranking">Reranking</a>文件以取得設定指示。</p>
</div>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> Function, FunctionType

rerank = Function(
    name=<span class="hljs-string">&quot;weight&quot;</span>,
    input_field_names=[], <span class="hljs-comment"># Must be an empty list</span>
    function_type=FunctionType.RERANK,
    params={
        <span class="hljs-string">&quot;reranker&quot;</span>: <span class="hljs-string">&quot;weighted&quot;</span>, 
        <span class="hljs-string">&quot;weights&quot;</span>: [<span class="hljs-number">0.1</span>, <span class="hljs-number">0.9</span>],
        <span class="hljs-string">&quot;norm_score&quot;</span>: <span class="hljs-literal">True</span>  <span class="hljs-comment"># Optional</span>
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
     <td><p><code translate="no">"weight"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">input_field_names</code></p></td>
     <td><p>是</p></td>
     <td><p>要應用函式的向量欄位清單（對於加權排序器必須為空）</p></td>
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
     <td><p>指定要使用的排名方法。必須設定為<code translate="no">weighted</code> 才能使用 Weighted Ranker。</p></td>
     <td><p><code translate="no">"weighted"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.weights</code></p></td>
     <td><p>是</p></td>
     <td><p>每個搜尋路徑對應的權重陣列；值∈ [0,1]。 詳細資訊請參閱<a href="/docs/zh-hant/weighted-ranker.md#Mechanism-of-Weighted-Ranker">Weighted Ranker 的機制</a>。</p></td>
     <td><p><code translate="no">[0.1, 0.9]</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.norm_score</code></p></td>
     <td><p>否</p></td>
     <td><p>是否在加權之前將原始分數歸一化（使用 arctan）。 詳情請參閱加權<a href="/docs/zh-hant/weighted-ranker.md#Mechanism-of-Weighted-Ranker">排名機制</a>。</p></td>
     <td><p><code translate="no">True</code></p></td>
   </tr>
</table>
<h3 id="Apply-to-hybrid-search" class="common-anchor-header">應用於混合搜尋</h3><p>Weighted Ranker 專為結合多向量領域的混合搜尋作業而設計。執行混合搜尋時，您必須指定每條搜尋路徑的權重：</p>
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

<span class="hljs-comment"># Apply Weighted Ranker to product hybrid search</span>
<span class="hljs-comment"># Text search has 0.8 weight, image search has 0.3 weight</span>
hybrid_results = milvus_client.hybrid_search(
    collection_name,
    [text_search, image_search],  <span class="hljs-comment"># Multiple search requests</span>
<span class="highlighted-wrapper-line">    ranker=rerank,  <span class="hljs-comment"># Apply the weighted ranker</span></span>
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
<p>如需混合搜尋的詳細資訊，請參閱<a href="/docs/zh-hant/multi-vector-search.md">多向量混合搜尋</a>。</p>
