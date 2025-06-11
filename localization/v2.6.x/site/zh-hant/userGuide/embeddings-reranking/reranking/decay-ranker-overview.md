---
id: decay-ranker-overview.md
title: Decay Ranker 總覽Compatible with Milvus 2.6.x
summary: 在傳統的向量搜尋中，搜尋結果的排序純粹取決於向量的相似度-向量在數學空間中的匹配程度。但在現實世界的應用中，內容是否真正相關往往不只取決於語意相似度。
beta: Milvus 2.6.x
---
<h1 id="Decay-Ranker-Overview" class="common-anchor-header">Decay Ranker 總覽<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.x</span><button data-href="#Decay-Ranker-Overview" class="anchor-icon" translate="no">
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
    </button></h1><p>在傳統的向量搜尋中，搜尋結果的排序純粹取決於向量的相似度-向量在數學空間中的匹配程度。但在現實世界的應用中，內容是否真正相關往往不只取決於語意相似度。</p>
<p>請考慮這些日常情境：</p>
<ul>
<li><p>在新聞搜尋中，昨天的文章應該比三年前的類似文章排名更高</p></li>
<li><p>餐廳搜尋器會優先搜尋 5 分鐘路程內的餐廳，而不是需要開車 30 分鐘的餐廳</p></li>
<li><p>一個電子商務平台，能提升趨勢商品的排名，即使這些商品與搜尋查詢的相似度稍低。</p></li>
</ul>
<p>這些情境都有一個共同的需求：平衡向量相似度與其他數值因素，例如時間、距離或知名度。</p>
<p>Milvus 的 Decay rankers 可根據數值字段值調整搜尋排名，從而滿足此需求。它們可讓您平衡向量相似性與資料的「新鮮度」、「接近度」或其他數值屬性，創造更直覺且與上下文相關的搜尋體驗。</p>
<h2 id="Limits" class="common-anchor-header">限制<button data-href="#Limits" class="anchor-icon" translate="no">
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
    </button></h2><ul>
<li><p>衰減排名不能用於群組搜尋。</p></li>
<li><p>用於衰減排名的欄位必須是數值 (<code translate="no">INT8</code>,<code translate="no">INT16</code>,<code translate="no">INT32</code>,<code translate="no">INT64</code>,<code translate="no">FLOAT</code>, 或<code translate="no">DOUBLE</code>)。</p></li>
<li><p>每個衰減排名只能使用一個數字欄位。</p></li>
</ul>
<h2 id="How-it-works" class="common-anchor-header">如何運作<button data-href="#How-it-works" class="anchor-icon" translate="no">
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
    </button></h2><p>衰減排序將時間或地理距離等數字因素納入排序過程中，從而增強了傳統的向量搜尋。整個過程遵循以下幾個階段：</p>
<h3 id="Stage-1-Calculate-normalized-similarity-scores" class="common-anchor-header">階段 1：計算標準化的相似性分數</h3><p>首先，Milvus 會計算向量相似性分數並加以規範化，以確保比較結果一致：</p>
<ul>
<li><p>對於<strong>L2</strong>和<strong>JACCARD</strong>距離指標 (較低的值表示較高的相似性)：</p>
<pre><code translate="no" class="language-plaintext">normalized_score = 1.0 - (2 × arctan(score))/π
<button class="copy-code-btn"></button></code></pre>
<p>這將距離轉換成 0-1 之間的相似性分數，越高越好。</p></li>
<li><p>對於<strong>IP</strong>、<strong>COSINE</strong> 和<strong>BM25</strong>公制 (分數越高表示匹配度越高)：直接使用分數，無需標準化。</p></li>
</ul>
<h3 id="Stage-2-Calculate-decay-scores" class="common-anchor-header">第二階段：計算衰減分數</h3><p>接下來，Milvus 會根據數值字段值 (如時間戳記或距離)，使用您選擇的衰減排名器計算衰減得分：</p>
<ul>
<li><p>每個衰減排名器將原始數值轉換為 0-1 之間的規範化相關性分數。</p></li>
<li><p>衰減分數會根據項目與理想點的「距離」來表示其相關程度</p></li>
</ul>
<p>具體的計算公式根據衰減排名器類型而有所不同。有關如何計算衰減分數的詳細資訊，請參閱<a href="/docs/zh-hant/gaussian-decay.md#Formula">高斯衰減</a>、<a href="/docs/zh-hant/exponential-decay.md#Formula">指數衰減</a>、<a href="/docs/zh-hant/linear-decay.md#Formula">線性衰減的</a>專用頁面。</p>
<h3 id="Stage-3-Compute-final-scores" class="common-anchor-header">第三階段：計算最終得分</h3><p>最後，Milvus 結合規範化的相似度得分和衰減得分，產生最終的排名得分：</p>
<pre><code translate="no" class="language-plaintext">final_score = normalized_similarity_score × decay_score
<button class="copy-code-btn"></button></code></pre>
<p>在混合搜尋 (結合多向量領域) 的情況下，Milvus 取搜尋請求中最大的歸一化相似度得分：</p>
<pre><code translate="no" class="language-plaintext">final_score = max([normalized_score₁, normalized_score₂, ..., normalized_scoreₙ]) × decay_score
<button class="copy-code-btn"></button></code></pre>
<p>例如，在混合搜尋中，如果一篇研究論文的向量相似度得分為 0.82，而以 BM25 為基礎的文字檢索得分為 0.91，Milvus 會先使用 0.91 作為基本相似度得分，然後再套用衰減因子。</p>
<h3 id="Decay-ranking-in-action" class="common-anchor-header">衰減排序的實際應用</h3><p>讓我們來看看衰減排序在實際情境中的應用-以時間為基礎的衰減來搜尋<strong>「AI 研究論文」</strong>：</p>
<div class="alert note">
<p>在這個範例中，衰減分數反映出相關性會隨著時間遞減-較新的論文會得到較接近 1.0 的分數，較舊的論文則會得到較低的分數。這些值是使用特定的衰減排名器計算出來的。如需詳細資訊，請參閱<a href="/docs/zh-hant/decay-ranker-overview.md#Choose-the-right-decay-ranker">Choose the right decay ranker</a>。</p>
</div>
<table>
   <tr>
     <th><p>論文</p></th>
     <th><p>向量相似度</p></th>
     <th><p>標準化相似度得分</p></th>
     <th><p>發表日期</p></th>
     <th><p>衰減分數</p></th>
     <th><p>最終得分</p></th>
     <th><p>最終排名</p></th>
   </tr>
   <tr>
     <td><p>論文 A</p></td>
     <td><p>高分數</p></td>
     <td><p>0.85 (<code translate="no">COSINE</code>)</p></td>
     <td><p>2 週前</p></td>
     <td><p>0.80</p></td>
     <td><p>0.68</p></td>
     <td>2</td>
   </tr>
   <tr>
     <td><p>紙張 B</p></td>
     <td><p>非常高</p></td>
     <td><p>0.92 (<code translate="no">COSINE</code>)</p></td>
     <td><p>6 個月前</p></td>
     <td><p>0.45</p></td>
     <td><p>0.41</p></td>
     <td>3</td>
   </tr>
   <tr>
     <td><p>紙張 C</p></td>
     <td><p>中</p></td>
     <td><p>0.75 (<code translate="no">COSINE</code>)</p></td>
     <td><p>1 天前</p></td>
     <td><p>0.98</p></td>
     <td><p>0.74</p></td>
     <td>1</td>
   </tr>
   <tr>
     <td><p>紙張 D</p></td>
     <td><p>中-高</p></td>
     <td><p>0.76 (<code translate="no">COSINE</code>)</p></td>
     <td><p>3 週之前</p></td>
     <td><p>0.70</p></td>
     <td><p>0.53</p></td>
     <td>4</td>
   </tr>
</table>
<p>如果不進行衰變重排，根據純向量相似度 (0.92) 計算，論文 B 的排名最高。但是，如果使用衰減重排：</p>
<ul>
<li><p>儘管相似度中等，論文 C 躍升至第 1 位，因為它是最近發表的論文 (昨天發表)。</p></li>
<li><p>儘管相似性極佳，論文 B 卻因為相對較舊而降到第 3 位。</p></li>
<li><p>論文 D 使用 L2 距離 (越低越好)，因此在應用衰減之前，其分數從 1.2 正態化為 0.76。</p></li>
</ul>
<h2 id="Choose-the-right-decay-ranker" class="common-anchor-header">選擇正確的衰減排名器<button data-href="#Choose-the-right-decay-ranker" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus 提供不同的衰減排名器 -<code translate="no">gauss</code>,<code translate="no">exp</code>,<code translate="no">linear</code>, 每種排名器都是針對特定的使用情況而設計的：</p>
<table>
   <tr>
     <th><p>衰減排名器</p></th>
     <th><p>特性</p></th>
     <th><p>理想用例</p></th>
     <th><p>範例情境</p></th>
   </tr>
   <tr>
     <td><p>高斯 (<code translate="no">gauss</code>)</p></td>
     <td><p>自然感覺的漸進式下降，適度延伸</p></td>
     <td><ul>
<li><p>需要平衡結果的一般搜尋</p></li>
<li><p>使用者對距離有直覺感覺的應用程式</p></li>
<li><p>當中等距離不應嚴重懲罰結果時</p></li>
</ul></td>
     <td><p>在餐廳搜尋中，3 公里外的優質餐廳仍可被發現，儘管排序低於附近的選擇</p></td>
   </tr>
   <tr>
     <td><p>指數 (<code translate="no">exp</code>)</p></td>
     <td><p>一開始快速下降，但會保持長尾</p></td>
     <td><ul>
<li><p>新聞饋送：新鮮度是關鍵</p></li>
<li><p>新鮮內容應佔主導的社交媒體</p></li>
<li><p>強烈偏好接近性，但特殊的遠距離項目應保持可見時</p></li>
</ul></td>
     <td><p>在新聞應用程式中，昨天的新聞排名遠高於一周前的內容，但高度相關的舊文章仍會出現</p></td>
   </tr>
   <tr>
     <td><p>線性 (<code translate="no">linear</code>)</p></td>
     <td><p>持續、可預測的下降，且有明確的分界線</p></td>
     <td><ul>
<li><p>有自然邊界的應用程式</p></li>
<li><p>有距離限制的服務</p></li>
<li><p>有到期日或明確臨界點的內容</p></li>
</ul></td>
     <td><p>在事件搜尋器中，超過兩週未來視窗的事件根本不會出現</p></td>
   </tr>
</table>
<p>有關每個衰減排名器如何計算分數和特定衰減模式的詳細資訊，請參閱專用文件：</p>
<ul>
<li><p><a href="/docs/zh-hant/gaussian-decay.md">高斯衰減</a></p></li>
<li><p><a href="/docs/zh-hant/exponential-decay.md">指數衰減</a></p></li>
<li><p><a href="/docs/zh-hant/exponential-decay.md">指數衰減</a></p></li>
</ul>
<h2 id="Implementation-example" class="common-anchor-header">實施範例<button data-href="#Implementation-example" class="anchor-icon" translate="no">
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
    </button></h2><p>衰減排名器可以應用於 Milvus 中的標準向量搜索和混合搜索操作。以下是實現此功能的主要程式碼片段。</p>
<div class="alert note">
<p>在使用遞減功能之前，您必須先建立一個具有適當數值欄位（如時間戳記、距離等）的集合，這些欄位將用於遞減計算。如需完整的工作範例，包括集合設定、模式定義和資料插入，請參閱<a href="/docs/zh-hant/tutorial-implement-a-time-based-ranking-in-milvus.md">教學：在 Milvus 中實施以時間為基礎的排名</a>。</p>
</div>
<h3 id="Create-a-decay-ranker" class="common-anchor-header">建立衰減排名器</h3><p>要實現衰變排名，首先要定義一個具有適當配置的<code translate="no">Function</code> 物件：</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> Function, FunctionType

<span class="hljs-comment"># Create a decay function for timestamp-based decay</span>
decay_ranker = Function(
    name=<span class="hljs-string">&quot;time_decay&quot;</span>,                  <span class="hljs-comment"># Function identifier</span>
    input_field_names=[<span class="hljs-string">&quot;timestamp&quot;</span>],    <span class="hljs-comment"># Numeric field to use for decay</span>
    function_type=FunctionType.RERANK,  <span class="hljs-comment"># Must be set to RERANK for decay rankers</span>
    params={
        <span class="hljs-string">&quot;reranker&quot;</span>: <span class="hljs-string">&quot;decay&quot;</span>,            <span class="hljs-comment"># Specify decay reranker. Must be &quot;decay&quot;</span>
        <span class="hljs-string">&quot;function&quot;</span>: <span class="hljs-string">&quot;gauss&quot;</span>,            <span class="hljs-comment"># Choose decay function type: &quot;gauss&quot;, &quot;exp&quot;, or &quot;linear&quot;</span>
        <span class="hljs-string">&quot;origin&quot;</span>: current_timestamp,    <span class="hljs-comment"># Reference point (current time)</span>
        <span class="hljs-string">&quot;scale&quot;</span>: <span class="hljs-number">7</span> * <span class="hljs-number">24</span> * <span class="hljs-number">60</span> * <span class="hljs-number">60</span>,      <span class="hljs-comment"># 7 days in seconds</span>
        <span class="hljs-string">&quot;offset&quot;</span>: <span class="hljs-number">24</span> * <span class="hljs-number">60</span> * <span class="hljs-number">60</span>,         <span class="hljs-comment"># 1 day no-decay zone</span>
        <span class="hljs-string">&quot;decay&quot;</span>: <span class="hljs-number">0.5</span>                    <span class="hljs-comment"># Half score at scale distance</span>
    }
)
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
     <td><p>執行搜尋時使用的功能識別碼。請選擇與您的使用情況相關的描述性名稱。</p></td>
     <td><p><code translate="no">"time_decay"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">input_field_names</code></p></td>
     <td><p>是</p></td>
     <td><p>用於計算衰減分數的數字欄位。決定哪個資料屬性將用於計算衰減（例如，時間戳記用於基於時間的衰減，坐標用於基於位置的衰減）。 
 必須是您的資料集中包含相關數值的欄位。支援 INT8/16/32/64、FLOAT、DOUBLE。</p></td>
     <td><p><code translate="no">["timestamp"]</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">function_type</code></p></td>
     <td><p>是</p></td>
     <td><p>指定要建立的函數類型。對於所有的衰減排名器，必須設定為<code translate="no">RERANK</code> 。</p></td>
     <td><p><code translate="no">FunctionType.RERANK</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.reranker</code></p></td>
     <td><p>是</p></td>
     <td><p>指定要使用的排名方法。必須設定為<code translate="no">"decay"</code> 才能啟用衰減排名功能。</p></td>
     <td><p><code translate="no">"decay"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.function</code></p></td>
     <td><p>是</p></td>
     <td><p>指定要應用的數學衰減排名器。決定相關性下降的曲線形狀。 請參閱<a href="/docs/zh-hant/decay-ranker-overview.md#Choose-the-right-decay-ranker">選擇</a>適當的遞減<a href="/docs/zh-hant/decay-ranker-overview.md#Choose-the-right-decay-ranker">排名器</a>部分，以獲得選擇適當函數的指引。</p></td>
     <td><p><code translate="no">"gauss"</code>,<code translate="no">"exp"</code>, 或<code translate="no">"linear"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.origin</code></p></td>
     <td><p>是</p></td>
     <td><p>計算衰減分數的參考點。處於此值的項目可獲得最大相關性得分。</p></td>
     <td><ul>
<li>對於時間戳記：當前時間 (例如：<code translate="no">int(time.time())</code>)</li>
<li>對於地理位置：使用者目前的座標</li>
</ul></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.scale</code></p></td>
     <td><p>是</p></td>
     <td><p>相關性下降到<code translate="no">decay</code> 值的距離或時間。控制關聯性下降的速度，數值越大，關聯性下降的速度越慢；值越小，關聯性下降的速度越快。</p></td>
     <td><ul>
<li>時間：以秒為單位的週期 (例如：<code translate="no">7 * 24 * 60 * 60</code> 為 7 天)</li>
<li>對於距離：公尺 (例如：<code translate="no">5000</code> 表示 5 公里)</li>
</ul></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.offset</code></p></td>
     <td><p>無</p></td>
     <td><p>在<code translate="no">origin</code> 周圍建立一個「無衰退區域」，讓項目保持滿分 (衰退分數 = 1.0)。在<code translate="no">origin</code> 這個範圍內的項目保持最大相關性。</p></td>
     <td><ul>
<li>對於時間：以秒為單位的週期 (例如：<code translate="no">24 * 60 * 60</code> 為 1 天)</li>
<li>對於距離：公尺 (例如：<code translate="no">500</code> 代表 500 公尺)</li>
</ul></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.decay</code></p></td>
     <td><p>無</p></td>
     <td><p><code translate="no">scale</code> 距離的分數值，控制曲線的陡度。較低的值會產生較陡的下降曲線；較高的值則會產生較漸進的下降曲線。 必須介於 0 和 1 之間。</p></td>
     <td><p><code translate="no">0.5</code> (預設值)</p></td>
   </tr>
</table>
<h3 id="Apply-to-standard-vector-search" class="common-anchor-header">套用至標準向量搜尋</h3><p>定義衰退排序器之後，您可以將它傳給<code translate="no">ranker</code> 參數，在搜尋作業時套用：</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Use the decay function in standard vector search</span>
results = milvus_client.search(
    collection_name,
    data=[<span class="hljs-string">&quot;search query&quot;</span>],
    anns_field=<span class="hljs-string">&quot;vector_field&quot;</span>,
    limit=<span class="hljs-number">10</span>,
    output_fields=[<span class="hljs-string">&quot;document&quot;</span>, <span class="hljs-string">&quot;timestamp&quot;</span>],  <span class="hljs-comment"># Include the decay field in outputs to see values</span>
<span class="highlighted-wrapper-line">    ranker=decay_ranker,                      <span class="hljs-comment"># Apply the decay ranker here</span></span>
    consistency_level=<span class="hljs-string">&quot;Strong&quot;</span>
)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Apply-to-hybrid-search" class="common-anchor-header">套用至混合搜尋</h3><p>衰減排序器也可以應用於結合多向量場的混合搜尋作業：</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> AnnSearchRequest

<span class="hljs-comment"># Define search requests for different vector fields</span>
dense_request = AnnSearchRequest(
    data=[<span class="hljs-string">&quot;search query&quot;</span>],
    anns_field=<span class="hljs-string">&quot;dense_vector&quot;</span>,
    param={},
    limit=<span class="hljs-number">20</span>
)

sparse_request = AnnSearchRequest(
    data=[<span class="hljs-string">&quot;search query&quot;</span>],
    anns_field=<span class="hljs-string">&quot;sparse_vector&quot;</span>,
    param={},
    limit=<span class="hljs-number">20</span>
)

<span class="hljs-comment"># Apply decay ranker to hybrid search</span>
hybrid_results = milvus_client.hybrid_search(
    collection_name,
    [dense_request, sparse_request],
<span class="highlighted-wrapper-line">    ranker=decay_ranker,                      <span class="hljs-comment"># Same decay ranker works with hybrid search</span></span>
    limit=<span class="hljs-number">10</span>,
    output_fields=[<span class="hljs-string">&quot;document&quot;</span>, <span class="hljs-string">&quot;timestamp&quot;</span>]
)
<button class="copy-code-btn"></button></code></pre>
<p>在混合搜尋中，Milvus 首先從所有向量場中找出最大相似度得分，然後將衰減因子套用在該得分上。</p>
