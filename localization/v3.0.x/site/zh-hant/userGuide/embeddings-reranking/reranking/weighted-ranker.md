---
id: weighted-ranker.md
title: 加權排序器
summary: >-
  加權排序器（Weighted Ranker）透過為每個搜尋路徑賦予不同的重要性權重，智慧地整合並優先排序來自多個搜尋路徑的結果。
  就像技藝精湛的廚師會平衡多種食材以烹調出完美佳餚一樣，加權排序器會平衡不同的搜尋結果，以提供最相關的綜合結果。當橫跨多個向量欄位或模態進行搜尋時，若某些欄位應比其他欄位對最終排名產生更顯著的影響，此方法便為理想選擇。
---
<h1 id="Weighted-Ranker" class="common-anchor-header">加權排序器<button data-href="#Weighted-Ranker" class="anchor-icon" translate="no">
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
    </button></h1><p>加權排序器透過為每個搜尋路徑賦予不同的重要性權重，智慧地整合並優先排序來自多個搜尋路徑的結果。 正如技藝精湛的廚師會平衡多種食材以烹調出完美佳餚，加權排序器同樣會平衡不同的搜尋結果，以提供最相關的綜合結果。當跨多個向量欄位或模態進行搜尋時，若某些欄位應比其他欄位對最終排名產生更顯著的影響，此方法便為理想選擇。</p>
<h2 id="When-to-use-Weighted-Ranker" class="common-anchor-header">何時使用加權排序器<button data-href="#When-to-use-Weighted-Ranker" class="anchor-icon" translate="no">
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
    </button></h2><p>加權排序器專為混合搜尋情境設計，適用於需要整合來自多個向量搜尋路徑結果的場景。它特別適用於：</p>
<table>
   <tr>
     <th><p>應用案例</p></th>
     <th><p>範例</p></th>
     <th><p>為何加權排序器能發揮卓越效能</p></th>
   </tr>
   <tr>
     <td><p>電子商務搜尋</p></td>
     <td><p>結合圖像相似度與文字描述的產品搜尋</p></td>
     <td><p>讓零售商在時尚商品上優先考量視覺相似度，同時在技術型產品上著重文字描述</p></td>
   </tr>
   <tr>
     <td><p>媒體內容搜尋</p></td>
     <td><p>同時運用視覺特徵與音訊轉錄文字進行影片檢索</p></td>
     <td><p>根據查詢意圖，平衡視覺內容與語音對話的重要性</p></td>
   </tr>
   <tr>
     <td><p>文件檢索</p></td>
     <td><p>針對不同段落採用多種嵌入向量的企業級文件搜尋</p></td>
     <td><p>在考量全文嵌入向量的同時，賦予標題與摘要嵌入向量更高的權重</p></td>
   </tr>
</table>
<p>若您的混合搜尋應用程式需要結合多條搜尋路徑，同時控制各路徑的相對重要性，Weighted Ranker 將是您的理想選擇。</p>
<h2 id="Mechanism-of-Weighted-Ranker" class="common-anchor-header">加權排序器的運作機制<button data-href="#Mechanism-of-Weighted-Ranker" class="anchor-icon" translate="no">
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
<li><p><strong>收集搜尋分數</strong>：彙整來自每個向量搜尋路徑的結果與分數（score_1、score_2）。</p></li>
<li><p><strong>分數正規化</strong>：每種搜尋可能使用不同的相似度指標，導致分數分佈各異。 例如，若使用內積 (IP) 作為相似度類型，分數範圍可能落在 [−∞,+∞] 之間；而使用歐幾里得距離 (L2) 則會產生 [0,+∞] 範圍的分數。 由於不同搜尋的評分範圍各異且無法直接比較，因此必須對每個搜尋路徑的評分進行正規化。通常會應用<code translate="no">arctan</code> 函式，將評分轉換為 [0, 1] 之間的範圍（score_1_normalized, score_2_normalized）。 分數越接近 1，表示相似度越高。</p></li>
<li><p><strong>分配權重</strong>：根據賦予不同向量場的重要性，將權重 (<strong>wi</strong>) 分配給歸一化分數 (score_1_normalized, score_2_normalized)。 每條路徑的權重應介於 [0,1] 之間。最終的加權分數為 score_1_weighted 和 score_2_weighted。</p></li>
<li><p><strong>合併分數</strong>：將加權分數 (score_1_weighted, score_2_weighted) 從高到低排序，以產生最終的分數集 (score_final)。</p></li>
</ol>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/weighted-ranker.png" alt="Weighted Ranker" class="doc-image" id="weighted-ranker" /> 
   <span>加權排序器</span>
  
 </span></p>
<h2 id="Example-of-Weighted-Ranker" class="common-anchor-header">加權排序器的範例<button data-href="#Example-of-Weighted-Ranker" class="anchor-icon" translate="no">
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
    </button></h2><p>此範例展示了一項涉及圖像與文字的多模態混合搜尋（topK=5），並說明「加權排序器」（WeightedRanker）策略如何重新排序來自兩次人工神經網路（ANN）搜尋的結果。</p>
<ul>
<li><p>針對影像的 ANN 搜尋結果（topK=5）：</p>
<p><table>
<tr>
<th><p><strong>ID</strong></p></th>
<th><p><strong>分數（圖片）</strong></p></th>
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
</table></p></li>
<li><p>基於文本的 ANN 搜尋結果（topK=5）：</p>
<p><table>
<tr>
<th><p><strong>ID</strong></p></th>
<th><p><strong>分數（文本）</strong></p></th>
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
</table></p></li>
<li><p>使用 WeightedRanker 為圖片和文字搜尋結果指派權重。假設圖片人工神經網路（ANN）搜尋的權重為 0.6，而文字搜尋的權重為 0.4。</p>
<p><table>
<tr>
<th><p><strong>ID</strong></p></th>
<th><p><strong>分數（圖片）</strong></p></th>
<th><p><strong>分數（文字）</strong></p></th>
<th><p><strong>加權分數</strong></p></th>
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
<td><p>圖中未顯示</p></td>
<td><p>0.85</p></td>
<td><p>0.6×0+0.4×0.85=0.34</p></td>
</tr>
<tr>
<td><p>250</p></td>
<td><p>圖中未顯示</p></td>
<td><p>0.78</p></td>
<td><p>0.6×0+0.4×0.78=0.312</p></td>
</tr>
</table></p></li>
<li><p>重新排序後的最終結果（topK=5）：</p>
<p><table>
<tr>
<th><p><strong>排名</strong></p></th>
<th><p><strong>ID</strong></p></th>
<th><p><strong>最終分數</strong></p></th>
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
</table></p></li>
</ul>
<h2 id="Usage-of-Weighted-Ranker" class="common-anchor-header">加權排名器的使用方法<button data-href="#Usage-of-Weighted-Ranker" class="anchor-icon" translate="no">
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
    </button></h2><p>使用加權排序器 (WeightedRanker) 策略時，必須輸入權重值。輸入的權重值數量應與混合搜尋中基本人工神經網路 (ANN) 搜尋請求的數量相符。輸入的權重值應落在 [0,1] 範圍內，數值越接近 1 表示重要性越高。</p>
<h3 id="Create-a-Weighted-Ranker" class="common-anchor-header">建立加權排序器<button data-href="#Create-a-Weighted-Ranker" class="anchor-icon" translate="no">
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
    </button></h3><p>舉例來說，假設混合搜尋中包含兩個基本人工神經網路（ANN）搜尋請求：文字搜尋與圖片搜尋。若文字搜尋被視為更重要，則應賦予其較高的權重。</p>
<div class="alert note">
<p>Milvus 2.6.x 及後續版本允許您透過 `<code translate="no">Function</code> ` API 直接配置重新排序策略。若您使用的是較早版本（v2.6.0 之前），請參<a href="https://milvus.io/docs/v2.5.x/reranking.md#Usage-of-WeightedRanker">閱重新排序</a>文件以獲取設定說明。</p>
</div>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#rust">   Rust</a>
 <a href="#cpp">   C++</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#csharp">   C#</a>
 <a href="#bash">   cURL</a>
</div>
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
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.common.clientenum.FunctionType;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.CreateCollectionReq;

CreateCollectionReq.<span class="hljs-type">Function</span> <span class="hljs-variable">rerank</span> <span class="hljs-operator">=</span> CreateCollectionReq.Function.builder()
                .name(<span class="hljs-string">&quot;weight&quot;</span>)
                .functionType(FunctionType.RERANK)
                .param(<span class="hljs-string">&quot;reranker&quot;</span>, <span class="hljs-string">&quot;weighted&quot;</span>)
                .param(<span class="hljs-string">&quot;weights&quot;</span>, <span class="hljs-string">&quot;[0.1, 0.9]&quot;</span>)
                .param(<span class="hljs-string">&quot;norm_score&quot;</span>, <span class="hljs-string">&quot;true&quot;</span>)
                .build();
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/entity&quot;</span>

rerank := entity.NewFunction().
    WithName(<span class="hljs-string">&quot;weight&quot;</span>).
    WithType(entity.FunctionTypeRerank).
    WithInputFields().
    WithParam(<span class="hljs-string">&quot;reranker&quot;</span>, <span class="hljs-string">&quot;weighted&quot;</span>).
    WithParam(<span class="hljs-string">&quot;weights&quot;</span>, <span class="hljs-string">&quot;[0.1, 0.9]&quot;</span>).
    WithParam(<span class="hljs-string">&quot;norm_score&quot;</span>, <span class="hljs-string">&quot;true&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> milvus::v2::prelude::*;
<span class="hljs-keyword">use</span> std::collections::HashMap;

<span class="hljs-keyword">let</span> <span class="hljs-variable">rerank</span> = Function::<span class="hljs-title function_ invoke__">new</span>()
    .<span class="hljs-title function_ invoke__">name</span>(<span class="hljs-string">&quot;weight&quot;</span>)
    .<span class="hljs-title function_ invoke__">function_type</span>(FunctionType::Rerank)
    .<span class="hljs-title function_ invoke__">input_fields</span>(<span class="hljs-type">Vec</span>::&lt;<span class="hljs-type">String</span>&gt;::<span class="hljs-title function_ invoke__">new</span>())
    .<span class="hljs-title function_ invoke__">params</span>(HashMap::<span class="hljs-title function_ invoke__">from</span>([
        (<span class="hljs-string">&quot;reranker&quot;</span>.<span class="hljs-title function_ invoke__">into</span>(), <span class="hljs-string">&quot;weighted&quot;</span>.<span class="hljs-title function_ invoke__">into</span>()),
        (<span class="hljs-string">&quot;weights&quot;</span>.<span class="hljs-title function_ invoke__">into</span>(), <span class="hljs-string">&quot;[0.1, 0.9]&quot;</span>.<span class="hljs-title function_ invoke__">into</span>()),
        (<span class="hljs-string">&quot;norm_score&quot;</span>.<span class="hljs-title function_ invoke__">into</span>(), <span class="hljs-string">&quot;true&quot;</span>.<span class="hljs-title function_ invoke__">into</span>()),
    ]));
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;memory&gt;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&quot;milvus/MilvusClientV2.h&quot;</span></span>

<span class="hljs-keyword">auto</span> rerank = std::<span class="hljs-built_in">make_shared</span>&lt;milvus::Function&gt;(<span class="hljs-string">&quot;weight&quot;</span>, milvus::FunctionType::RERANK);
rerank-&gt;<span class="hljs-built_in">AddParam</span>(<span class="hljs-string">&quot;reranker&quot;</span>, <span class="hljs-string">&quot;weighted&quot;</span>);
rerank-&gt;<span class="hljs-built_in">AddParam</span>(<span class="hljs-string">&quot;weights&quot;</span>, <span class="hljs-string">&quot;[0.1, 0.9]&quot;</span>);
rerank-&gt;<span class="hljs-built_in">AddParam</span>(<span class="hljs-string">&quot;norm_score&quot;</span>, <span class="hljs-string">&quot;true&quot;</span>);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">FunctionType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@zilliz/milvus2-sdk-node&#x27;</span>;

<span class="hljs-keyword">const</span> rerank = {
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;weight&quot;</span>,
    <span class="hljs-attr">input_field_names</span>: [],
    <span class="hljs-attr">type</span>: <span class="hljs-title class_">FunctionType</span>.<span class="hljs-property">RERANK</span>,
    <span class="hljs-attr">params</span>: {
        <span class="hljs-attr">reranker</span>: <span class="hljs-string">&quot;weighted&quot;</span>,
        <span class="hljs-attr">weights</span>: [<span class="hljs-number">0.1</span>, <span class="hljs-number">0.9</span>],
        <span class="hljs-attr">norm_score</span>: <span class="hljs-literal">true</span>
    }
};
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">using</span> Milvus.Client.V2;

<span class="hljs-comment">// Note: defining a weighted rerank function with FunctionSchema params</span>
<span class="hljs-comment">// (reranker/weights/norm_score) is not yet supported in milvus-sdk-csharp as of v3.0.0</span>
<span class="hljs-comment">// (FunctionSchema.Params cannot be populated externally). Use WeightedReranker instead.</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># Restful</span>
<span class="hljs-built_in">export</span> rerank=<span class="hljs-string">&#x27;{
  &quot;name&quot;: &quot;weight&quot;,
  &quot;inputFieldNames&quot;: [],
  &quot;functionType&quot;: &quot;RERANK&quot;,
  &quot;params&quot;: {
    &quot;reranker&quot;: &quot;weighted&quot;,
    &quot;weights&quot;: &quot;[0.1, 0.9]&quot;,
    &quot;norm_score&quot;: &quot;true&quot;
  }
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<table>
   <tr>
     <th><p>參數</p></th>
     <th><p>是否必填？</p></th>
     <th><p>說明</p></th>
     <th><p>值／範例</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">name</code></p></td>
     <td><p>是</p></td>
     <td><p>此函式的唯一識別碼</p></td>
     <td><p><code translate="no">"weight"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">input_field_names</code></p></td>
     <td><p>是</p></td>
     <td><p>要套用此函數的向量場清單（若為「加權排名器」，此參數必須為空）</p></td>
     <td><p>[]</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">function_type</code></p></td>
     <td><p>是</p></td>
     <td><p>要呼叫的函數類型；請使用 `<code translate="no">RERANK</code> ` 來指定重新排序策略</p></td>
     <td><p><code translate="no">FunctionType.RERANK</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.reranker</code></p></td>
     <td><p>是</p></td>
     <td><p>指定要使用的重新排序方法。</p><p>若要使用加權排序器 (Weighted Ranker)，必須將此參數設定為<code translate="no">weighted</code> 。</p></td>
     <td><p><code translate="no">"weighted"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.weights</code></p></td>
     <td><p>是</p></td>
     <td><p>對應於每個搜尋路徑的權重陣列；數值 ∈ [0,1]。</p><p>詳情請參閱「<a href="/docs/zh-hant/weighted-ranker.md#Mechanism-of-Weighted-Ranker">加權排序器」的運作機制</a>。</p></td>
     <td><p><code translate="no">[0.1, 0.9]</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.norm_score</code></p></td>
     <td><p>否</p></td>
     <td><p>是否在加權前對原始分數進行正規化（使用 arctan）。</p><p>詳情請參閱「<a href="/docs/zh-hant/weighted-ranker.md#Mechanism-of-Weighted-Ranker">加權排序器」的運作機制</a>。</p></td>
     <td><p><code translate="no">True</code></p></td>
   </tr>
</table>
<h3 id="Apply-to-hybrid-search" class="common-anchor-header">適用於混合搜尋<button data-href="#Apply-to-hybrid-search" class="anchor-icon" translate="no">
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
    </button></h3><p>加權排序器專為結合多個向量場的混合搜尋操作而設計。執行混合搜尋時，您必須為每個搜尋路徑指定權重：</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#rust">   Rust</a>
 <a href="#cpp">   C++</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#csharp">   C#</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, AnnSearchRequest

<span class="hljs-comment"># Connect to the Milvus server</span>
milvus_client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    token=<span class="hljs-string">&quot;root:Milvus&quot;</span>
)

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
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.AnnSearchReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.HybridSearchReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.SearchResp;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.data.EmbeddedText;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.data.FloatVec;
<span class="hljs-keyword">import</span> java.util.ArrayList;
<span class="hljs-keyword">import</span> java.util.Arrays;
<span class="hljs-keyword">import</span> java.util.Collections;
<span class="hljs-keyword">import</span> java.util.List;

<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(ConnectConfig.builder()
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
        .token(<span class="hljs-string">&quot;root:Milvus&quot;</span>)
        .build());

List&lt;AnnSearchReq&gt; searchRequests = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ArrayList</span>&lt;&gt;();
searchRequests.add(AnnSearchReq.builder()
        .vectorFieldName(<span class="hljs-string">&quot;text_vector&quot;</span>)
        .vectors(Collections.singletonList(<span class="hljs-keyword">new</span> <span class="hljs-title class_">EmbeddedText</span>(<span class="hljs-string">&quot;modern dining table&quot;</span>)))
        .limit(<span class="hljs-number">10</span>)
        .build());
searchRequests.add(AnnSearchReq.builder()
        .vectorFieldName(<span class="hljs-string">&quot;image_vector&quot;</span>)
        .vectors(Collections.singletonList(<span class="hljs-keyword">new</span> <span class="hljs-title class_">FloatVec</span>(imageEmbedding)))
        .limit(<span class="hljs-number">10</span>)
        .build());

<span class="hljs-type">HybridSearchReq</span> <span class="hljs-variable">hybridSearchReq</span> <span class="hljs-operator">=</span> HybridSearchReq.builder()
                .collectionName(COLLECTION_NAME)
                .searchRequests(searchRequests)
                .ranker(rerank)
                .limit(<span class="hljs-number">10</span>)
                .outputFields(Arrays.asList(<span class="hljs-string">&quot;product_name&quot;</span>, <span class="hljs-string">&quot;price&quot;</span>, <span class="hljs-string">&quot;category&quot;</span>))
                .build();
<span class="hljs-type">SearchResp</span> <span class="hljs-variable">searchResp</span> <span class="hljs-operator">=</span> client.hybridSearch(hybridSearchReq);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;context&quot;</span>
    <span class="hljs-string">&quot;log&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/entity&quot;</span>
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/milvusclient&quot;</span>
)

ctx := context.Background()

<span class="hljs-comment">// Define two ANN sub-search requests</span>
textSearch := milvusclient.NewAnnRequest(<span class="hljs-string">&quot;text_vector&quot;</span>, <span class="hljs-number">10</span>, []entity.Vector{textEmbedding}...).WithSearchParam(<span class="hljs-string">&quot;metric_type&quot;</span>, <span class="hljs-string">&quot;COSINE&quot;</span>)
imageSearch := milvusclient.NewAnnRequest(<span class="hljs-string">&quot;image_vector&quot;</span>, <span class="hljs-number">10</span>, []entity.Vector{imageEmbedding}...).WithSearchParam(<span class="hljs-string">&quot;metric_type&quot;</span>, <span class="hljs-string">&quot;IP&quot;</span>)

<span class="hljs-comment">// Apply Weighted Ranker: text search has 0.8 weight, image search has 0.3 weight</span>
rerank := milvusclient.NewWeightedReranker([]<span class="hljs-type">float64</span>{<span class="hljs-number">0.8</span>, <span class="hljs-number">0.3</span>})

hybridResults, err := cli.HybridSearch(ctx, milvusclient.NewHybridSearchOption(collectionName, <span class="hljs-number">10</span>, textSearch, imageSearch).
    WithReranker(rerank).
    WithOutputFields(<span class="hljs-string">&quot;product_name&quot;</span>, <span class="hljs-string">&quot;price&quot;</span>, <span class="hljs-string">&quot;category&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    log.Fatal(err)
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> milvus::v2::prelude::*;

<span class="hljs-comment">// Define two ANN sub-search requests</span>
<span class="hljs-keyword">let</span> <span class="hljs-variable">text_search</span> = SubSearchRequest::<span class="hljs-title function_ invoke__">builder</span>()
    .<span class="hljs-title function_ invoke__">vector_field</span>(<span class="hljs-string">&quot;text_vector&quot;</span>)
    .<span class="hljs-title function_ invoke__">vectors</span>(SearchVectors::<span class="hljs-title function_ invoke__">Float</span>(<span class="hljs-built_in">vec!</span>[text_embedding]))
    .<span class="hljs-title function_ invoke__">metric_type</span>(MetricType::Cosine)
    .<span class="hljs-title function_ invoke__">limit</span>(<span class="hljs-number">10</span>)
    .<span class="hljs-title function_ invoke__">build</span>()?;
<span class="hljs-keyword">let</span> <span class="hljs-variable">image_search</span> = SubSearchRequest::<span class="hljs-title function_ invoke__">builder</span>()
    .<span class="hljs-title function_ invoke__">vector_field</span>(<span class="hljs-string">&quot;image_vector&quot;</span>)
    .<span class="hljs-title function_ invoke__">vectors</span>(SearchVectors::<span class="hljs-title function_ invoke__">Float</span>(<span class="hljs-built_in">vec!</span>[image_embedding]))
    .<span class="hljs-title function_ invoke__">metric_type</span>(MetricType::Ip)
    .<span class="hljs-title function_ invoke__">limit</span>(<span class="hljs-number">10</span>)
    .<span class="hljs-title function_ invoke__">build</span>()?;

<span class="hljs-comment">// Apply Weighted Ranker: text search has 0.8 weight, image search has 0.3 weight</span>
<span class="hljs-keyword">let</span> <span class="hljs-variable">rerank</span> = WeightedRerank::<span class="hljs-title function_ invoke__">new</span>().<span class="hljs-title function_ invoke__">weights</span>(<span class="hljs-built_in">vec!</span>[<span class="hljs-number">0.8</span>, <span class="hljs-number">0.3</span>]);

<span class="hljs-keyword">let</span> <span class="hljs-variable">response</span> = client
    .<span class="hljs-title function_ invoke__">hybrid_search</span>(
        HybridSearchRequest::<span class="hljs-title function_ invoke__">builder</span>()
            .<span class="hljs-title function_ invoke__">collection_name</span>(collection_name)
            .<span class="hljs-title function_ invoke__">sub_requests</span>(<span class="hljs-built_in">vec!</span>[text_search, image_search])
            .<span class="hljs-title function_ invoke__">rerank</span>(rerank)
            .<span class="hljs-title function_ invoke__">limit</span>(<span class="hljs-number">10</span>)
            .<span class="hljs-title function_ invoke__">output_fields</span>([<span class="hljs-string">&quot;product_name&quot;</span>, <span class="hljs-string">&quot;price&quot;</span>, <span class="hljs-string">&quot;category&quot;</span>])
            .<span class="hljs-title function_ invoke__">build</span>()?,
    )
    .<span class="hljs-keyword">await</span>?;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;iostream&gt;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;memory&gt;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;utility&gt;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&quot;milvus/MilvusClientV2.h&quot;</span></span>

<span class="hljs-keyword">auto</span> text_search = milvus::<span class="hljs-built_in">SubSearchRequest</span>()
                    .<span class="hljs-built_in">WithLimit</span>(<span class="hljs-number">10</span>)
                    .<span class="hljs-built_in">WithAnnsField</span>(<span class="hljs-string">&quot;text_vector&quot;</span>)
                    .<span class="hljs-built_in">AddEmbeddedText</span>(<span class="hljs-string">&quot;modern dining table&quot;</span>);

<span class="hljs-keyword">auto</span> image_search = milvus::<span class="hljs-built_in">SubSearchRequest</span>()
                    .<span class="hljs-built_in">WithLimit</span>(<span class="hljs-number">10</span>)
                    .<span class="hljs-built_in">WithAnnsField</span>(<span class="hljs-string">&quot;image_vector&quot;</span>)
                    .<span class="hljs-built_in">AddFloatVector</span>(image_embedding);

<span class="hljs-keyword">auto</span> request = milvus::<span class="hljs-built_in">HybridSearchRequest</span>()
                    .<span class="hljs-built_in">WithCollectionName</span>(collection_name)
                    .<span class="hljs-built_in">WithLimit</span>(<span class="hljs-number">10</span>)
                    .<span class="hljs-built_in">AddSubRequest</span>(std::<span class="hljs-built_in">make_shared</span>&lt;milvus::SubSearchRequest&gt;(std::<span class="hljs-built_in">move</span>(text_search)))
                    .<span class="hljs-built_in">AddSubRequest</span>(std::<span class="hljs-built_in">make_shared</span>&lt;milvus::SubSearchRequest&gt;(std::<span class="hljs-built_in">move</span>(image_search)))
                    .<span class="hljs-built_in">WithRerank</span>(rerank)
                    .<span class="hljs-built_in">AddOutputField</span>(<span class="hljs-string">&quot;product_name&quot;</span>)
                    .<span class="hljs-built_in">AddOutputField</span>(<span class="hljs-string">&quot;price&quot;</span>)
                    .<span class="hljs-built_in">AddOutputField</span>(<span class="hljs-string">&quot;category&quot;</span>);

milvus::SearchResponse response;
<span class="hljs-keyword">auto</span> status = client-&gt;<span class="hljs-built_in">HybridSearch</span>(request, response);
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;

<span class="hljs-keyword">const</span> milvusClient = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({
  <span class="hljs-attr">address</span>: <span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
  <span class="hljs-attr">token</span>: <span class="hljs-string">&quot;root:Milvus&quot;</span>,
});

<span class="hljs-keyword">const</span> text_search = {
  <span class="hljs-attr">data</span>: [<span class="hljs-string">&quot;modern dining table&quot;</span>],
  <span class="hljs-attr">anns_field</span>: <span class="hljs-string">&quot;text_vector&quot;</span>,
  <span class="hljs-attr">params</span>: {},
};

<span class="hljs-keyword">const</span> image_search = {
  <span class="hljs-attr">data</span>: [image_embedding],
  <span class="hljs-attr">anns_field</span>: <span class="hljs-string">&quot;image_vector&quot;</span>,
  <span class="hljs-attr">params</span>: {},
};

<span class="hljs-keyword">const</span> search = <span class="hljs-keyword">await</span> milvusClient.<span class="hljs-title function_">search</span>({
  <span class="hljs-attr">collection_name</span>: collection_name,
  <span class="hljs-attr">limit</span>: <span class="hljs-number">10</span>,
  <span class="hljs-attr">data</span>: [text_search, image_search],
  <span class="hljs-attr">rerank</span>: rerank,
  <span class="hljs-attr">output_fields</span>: [<span class="hljs-string">&quot;product_name&quot;</span>, <span class="hljs-string">&quot;price&quot;</span>, <span class="hljs-string">&quot;category&quot;</span>],
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">using</span> Milvus.Client.V2;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Collection;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Dml;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Dql;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Index;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Types;

<span class="hljs-keyword">var</span> client = <span class="hljs-keyword">new</span> MilvusClientV2(<span class="hljs-keyword">new</span> ConnectConfig
{
    Uri = <span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    ApiKey = <span class="hljs-string">&quot;root:Milvus&quot;</span>
});

<span class="hljs-comment">// Define text vector search request</span>
<span class="hljs-keyword">var</span> textSearch = <span class="hljs-keyword">new</span> AnnSearchReq
{
    VectorFieldName = <span class="hljs-string">&quot;text_vector&quot;</span>,
    Texts = <span class="hljs-keyword">new</span>[] { <span class="hljs-string">&quot;modern dining table&quot;</span> },
    Limit = <span class="hljs-number">10</span>
};

<span class="hljs-comment">// Define image vector search request</span>
<span class="hljs-keyword">var</span> imageSearch = <span class="hljs-keyword">new</span> AnnSearchReq
{
    VectorFieldName = <span class="hljs-string">&quot;image_vector&quot;</span>,
    Vectors = <span class="hljs-keyword">new</span>[] { <span class="hljs-keyword">new</span> ReadOnlyMemory&lt;<span class="hljs-built_in">float</span>&gt;(imageEmbedding) },  <span class="hljs-comment">// Image embedding vector</span>
    Limit = <span class="hljs-number">10</span>
};

<span class="hljs-comment">// Apply Weighted Ranker to product hybrid search</span>
<span class="hljs-comment">// Text search has 0.8 weight, image search has 0.3 weight</span>
<span class="hljs-keyword">var</span> hybridResults = <span class="hljs-keyword">await</span> client.HybridSearchAsync(<span class="hljs-keyword">new</span> HybridSearchReq
{
    CollectionName = collectionName,
    SearchRequests = <span class="hljs-keyword">new</span>[] { textSearch, imageSearch },  <span class="hljs-comment">// Multiple search requests</span>
    Reranker = rerank,  <span class="hljs-comment">// Apply the weighted ranker</span>
    Limit = <span class="hljs-number">10</span>,
    Parameters = <span class="hljs-keyword">new</span> SearchParameters { OutputFields = { <span class="hljs-string">&quot;product_name&quot;</span>, <span class="hljs-string">&quot;price&quot;</span>, <span class="hljs-string">&quot;category&quot;</span> } }
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/hybrid_search&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
--data <span class="hljs-string">&quot;{
    \&quot;collectionName\&quot;: \&quot;<span class="hljs-variable">${COLLECTION_NAME}</span>\&quot;,
    \&quot;search\&quot;: [
        {
            \&quot;annsField\&quot;: \&quot;text_vector\&quot;,
            \&quot;data\&quot;: [\&quot;modern dining table\&quot;],
            \&quot;params\&quot;: { \&quot;metric_type\&quot;: \&quot;COSINE\&quot; },
            \&quot;limit\&quot;: 10
        },
        {
            \&quot;annsField\&quot;: \&quot;image_vector\&quot;,
            \&quot;data\&quot;: [<span class="hljs-variable">${IMAGE_EMBEDDING}</span>],
            \&quot;params\&quot;: { \&quot;metric_type\&quot;: \&quot;IP\&quot; },
            \&quot;limit\&quot;: 10
        }
    ],
    \&quot;rerank\&quot;: <span class="hljs-variable">${rerank}</span>,
    \&quot;limit\&quot;: 10,
    \&quot;outputFields\&quot;: [\&quot;product_name\&quot;, \&quot;price\&quot;, \&quot;category\&quot;]
}&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>有關混合搜尋的更多資訊，請參閱《<a href="/docs/zh-hant/multi-vector-search.md">多向量混合搜尋</a>》。</p>
